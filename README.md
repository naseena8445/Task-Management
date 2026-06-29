<img width="1920" height="1080" alt="Screenshot (132)" src="https://github.com/user-attachments/assets/7bf54a72-1aa5-4754-a90a-d53e15181adc" />
<img width="1920" height="1080" alt="Screenshot (131)" src="https://github.com/user-attachments/assets/813423d0-3a37-4ee8-a933-c9999a9c1ed1" />
<img width="1920" height="1080" alt="Screenshot (130)" src="https://github.com/user-attachments/assets/29bc1b80-6002-468b-b8af-9970a38b46ac" />
<img width="1920" height="1080" alt="Screenshot (129)" src="https://github.com/user-attachments/assets/b8956c60-418c-4c8d-8168-b35067689eeb" />
# Task Manager App

This repository contains a full-stack Task Manager application built with React for the frontend and Node.js/Express with MongoDB for the backend.

## Features
- User registration and login with JWT authentication
- Add, edit, delete, and complete tasks
- Private tasks per user
- Filter tasks by All, Completed, Pending
- Due date and priority support
- Completion progress indicator
- Dark/light mode toggle

## Setup

### Backend
1. Open a terminal in `backend`
2. Copy `.env.example` to `.env`
3. Set `MONGO_URI` and `JWT_SECRET`
4. Run `npm install`
5. Start server: `npm run dev`

### Frontend
1. Open a terminal in `frontend`
2. Copy `.env.example` to `.env`
3. Set `VITE_API_BASE` (default is `http://localhost:5000/api`)
4. Run `npm install`
5. Start app: `npm run dev`

### Environment files
- `backend/.env` must contain:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `PORT` (optional)
- `frontend/.env` should contain:
  - `VITE_API_BASE=http://localhost:5000/api`

## Deployment
- Frontend: Vercel or Netlify can deploy the `frontend` folder.
- Backend: Render or Railway can deploy the `backend` folder.
- Set environment variables in deployment platforms:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `PORT` (optional)

## Backend API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Notes
Use a MongoDB Atlas URI or local MongoDB instance for `MONGO_URI`.

## Standard outputs and build
Follow these standard commands to run and build the app locally and for production bundles.

Run development servers (two terminals):
```powershell
cd c:\Users\DELL\Desktop\intern\backend
npm run dev

cd c:\Users\DELL\Desktop\intern\frontend
npm run dev
```

Build frontend for production:
```powershell
cd c:\Users\DELL\Desktop\intern\frontend
npm run build
```

Preview production frontend locally:
```powershell
cd c:\Users\DELL\Desktop\intern\frontend
npm run preview
```

Start backend in production mode (ensure `.env` is set):
```powershell
cd c:\Users\DELL\Desktop\intern\backend
npm start
```

Serve built frontend with a static server (example using `serve`):
```powershell
cd c:\Users\DELL\Desktop\intern\frontend\dist
npx serve -s . -l 3000
```

Common output locations:
- Frontend production bundle: `frontend/dist/`
- Backend logs: displayed in terminal where `npm start` runs

If you want a single command to run both dev servers, I can add a root `package.json` with `concurrently` and a `dev` script—tell me if you'd like that added.
