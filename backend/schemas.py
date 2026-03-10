from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class ProblemCreate(BaseModel):
    title: str
    platform: str
    difficulty: str
    tags: str
