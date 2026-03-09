from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class ProblemCreate(BaseModel):
    title: str
    platform: str
    difficulty: str
    tags: str