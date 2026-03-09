# Coding Tracker

A full-stack web application that allows users to **track coding problems solved on platforms like LeetCode and Codeforces**.  
Users can register, log in, and maintain a personal dashboard showing solved problems, statistics, and progress.

This project demonstrates **full-stack development with authentication, REST APIs, database integration, and a React frontend**.

---

# Features

- User authentication (Register / Login using JWT)
- Add solved coding problems
- Track problems by:
  - Platform (LeetCode / Codeforces)
  - Difficulty (Easy / Medium / Hard)
  - Tags
- Dashboard with:
  - Difficulty statistics
  - Problem history
  - Daily progress
  - Platform statistics
- Delete solved problems
- Protected routes (login required)

---

# Tech Stack

## Backend
- Python
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication
- Uvicorn

## Frontend
- React
- Axios
- React Router
- CSS

## Tools
- Git
- GitHub

---

# Project Structure
# Coding Tracker

A full-stack web application that allows users to **track coding problems solved on platforms like LeetCode and Codeforces**.  
Users can register, log in, and maintain a personal dashboard showing solved problems, statistics, and progress.

This project demonstrates **full-stack development with authentication, REST APIs, database integration, and a React frontend**.

---

# Features

- User authentication (Register / Login using JWT)
- Add solved coding problems
- Track problems by:
  - Platform (LeetCode / Codeforces)
  - Difficulty (Easy / Medium / Hard)
  - Tags
- Dashboard with:
  - Difficulty statistics
  - Problem history
  - Daily progress
  - Platform statistics
- Delete solved problems
- Protected routes (login required)

---

# Tech Stack

## Backend
- Python
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication
- Uvicorn

## Frontend
- React
- Axios
- React Router
- CSS

## Tools
- Git
- GitHub

---

# Project Structure
coding_tracker
│
├── backend
│ ├── main.py
│ ├── models.py
│ ├── schemas.py
│ ├── database.py
│ ├── auth.py
│ ├── deps.py
│ ├── requirements.txt
│
├── frontend
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── api
│ │ ├── styles
│ │ └── App.js
│ │
│ ├── public
│ ├── package.json
│ └── package-lock.json
│
└── README.md

---

# Installation

## 1 Clone the Repository

```
bash
git clone https://github.com/yourusername/coding-tracker.git
cd coding-tracker
```

---

# Backend Setup

Go to backend folder in terminal

`cd backend`

Create virtual environment

`python -m venv venv`

Activate environment

Windows

`venv\Scripts\activate`

Install dependencies

`pip install -r requirements.txt`

Run the backend server

`uvicorn main:app --reload`

Backend will run at

`http://127.0.0.1:8000`

API documentation (Swagger)

`http`://127.0.0.1:8000/docs`