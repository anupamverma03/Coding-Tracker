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
```text
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
```

---

# Installation

## 1. Clone the Repository

```
bash
git clone https://github.com/yourusername/coding-tracker.git
cd coding-tracker
```

---

## 2. Backend Setup

Go to backend folder in terminal

```
cd backend
```

Create virtual environment

```
python -m venv venv
```

Activate environment

Windows

```
venv\Scripts\activate
```

Install dependencies

```
pip install -r requirements.txt
```

Run the backend server

```
uvicorn main:app --reload
```

Backend will run at

```
http://127.0.0.1:8000
```

API documentation (Swagger)

```
http`://127.0.0.1:8000/docs
```

## 3. Frontend Setup

Go to frontend folder

```
cd frontend
```

Install dependencies

```
npm install
```

Run React development server

```
npm start
```

Frontend will run at

```
http://localhost:3000
```

### API Endpoints
- Authentication
```POST /register
POST /login
GET /profile
```
- Problem Management
```POST /add-problem
GET /problems
DELETE /problems/{id}
```
- Statistics
```GET /stats
GET /platform-stats
GET /daily-progress
GET /streak
```

# Example Workflow

- Register a new user

- Login to receive JWT token

- Add solved coding problems

- View dashboard statistics

- Track progress over time

# Future Improvements

- Integration with LeetCode API

- Integration with Codeforces API

- Graph visualizations for progress

- Problem search and filtering

- Deployment using Docker or AWS

- Leaderboard for users

# Author

Anupam Verma

GitHub:
https://github.com/anupamverma03/

# License

This project is open source and available under the MIT License.