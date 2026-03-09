from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

import models
import schemas

from database import engine
from deps import get_db
from auth import create_access_token, get_current_user

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

#Remote access on LAN via CORS
from fastapi.middleware.cors import CORSMiddleware

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Password helpers

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


# Home

@app.get("/")
def home():
    return {"message": "Coding Tracker API running"}


# Register

@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):

    hashed_password = hash_password(user.password)

    new_user = models.User(
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created"}


# Login

@app.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    print("Email entered:", user.email)
    print("Password entered:", user.password)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    print("Stored hash:", db_user.password)

    result = verify_password(user.password, db_user.password)
    print("Verify result:", result)

    if not result:
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token({"user_id": db_user.id})

    return {"access_token": token, "token_type": "bearer"}


# Add Problem

@app.post("/problems")
def add_problem(
    problem: schemas.ProblemCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    new_problem = models.Problem(
        title=problem.title,
        platform=problem.platform,
        difficulty=problem.difficulty,
        tags=problem.tags,
        user_id=current_user.id
    )

    db.add(new_problem)
    db.commit()
    db.refresh(new_problem)

    return new_problem


# Get Problems

@app.get("/problems")
def get_problems(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    problems = db.query(models.Problem).filter(
        models.Problem.user_id == current_user.id
    ).all()

    return problems


# Delete Problem

@app.delete("/problems/{problem_id}")
def delete_problem(
    problem_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    problem = db.query(models.Problem).filter(
        models.Problem.id == problem_id,
        models.Problem.user_id == current_user.id
    ).first()

    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    db.delete(problem)
    db.commit()

    return {"message": "Problem deleted"}


# Stats

@app.get("/stats")
def stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    total = db.query(models.Problem).filter(
        models.Problem.user_id == current_user.id
    ).count()

    easy = db.query(models.Problem).filter(
        models.Problem.user_id == current_user.id,
        models.Problem.difficulty == "Easy"
    ).count()

    medium = db.query(models.Problem).filter(
        models.Problem.user_id == current_user.id,
        models.Problem.difficulty == "Medium"
    ).count()

    hard = db.query(models.Problem).filter(
        models.Problem.user_id == current_user.id,
        models.Problem.difficulty == "Hard"
    ).count()

    return {
        "total": total,
        "easy": easy,
        "medium": medium,
        "hard": hard
    }


# Coding Streak

@app.get("/streak")
def get_streak(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    problems = db.query(models.Problem).filter(
        models.Problem.user_id == current_user.id
    ).order_by(models.Problem.date_solved.desc()).all()

    streak = 0
    last_day = None

    for p in problems:
        day = p.date_solved.date()

        if last_day is None:
            streak += 1
            last_day = day
        elif (last_day - day).days == 1:
            streak += 1
            last_day = day
        else:
            break

    return {"current_streak": streak}


# Platform Stats

@app.get("/platform-stats")
def platform_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    lc = db.query(models.Problem).filter(
        models.Problem.user_id == current_user.id,
        models.Problem.platform == "LeetCode"
    ).count()

    cf = db.query(models.Problem).filter(
        models.Problem.user_id == current_user.id,
        models.Problem.platform == "Codeforces"
    ).count()

    return {
        "leetcode": lc,
        "codeforces": cf
    }


# Daily Progress

@app.get("/daily-progress")
def daily_progress(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    problems = db.query(models.Problem).filter(
        models.Problem.user_id == current_user.id
    ).all()

    data = {}

    for p in problems:
        d = p.date_solved.date()
        data[d] = data.get(d, 0) + 1

    return data


# Profile

@app.get("/profile")
def get_profile(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    problems = db.query(models.Problem).filter(
        models.Problem.user_id == current_user.id
    ).all()

    easy = len([p for p in problems if p.difficulty == "Easy"])
    medium = len([p for p in problems if p.difficulty == "Medium"])
    hard = len([p for p in problems if p.difficulty == "Hard"])

    return {
        "user": {
            "id": current_user.id,
            "email": current_user.email
        },
        "stats": {
            "total": len(problems),
            "easy": easy,
            "medium": medium,
            "hard": hard
        }
    }