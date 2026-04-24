# Smart Task Manager

A full-stack task management application with authentication, category-based organization, and a responsive dashboard UI.

## Overview

Smart Task Manager helps users:
- register and sign in securely
- create, edit, complete, and delete tasks
- organize tasks with custom categories
- manage tasks in a mobile-friendly and desktop-friendly interface

## Project Structure

```text
smart-task-manager/
├── client/          # React + Vite frontend
├── server/          # Express + Prisma backend
├── README.md
└── .gitignore
```

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, Prisma ORM, PostgreSQL
- Auth: JWT, bcryptjs

## Prerequisites

- Node.js 18+
- npm
- PostgreSQL database

## Getting Started

### 1) Clone and Install

```bash
git clone <your-repo-url>
cd "Smart Task Manager"
```

Install dependencies:

```bash
cd server && npm install
cd ../client && npm install
```

### 2) Configure Environment Variables

Create and configure environment files:

- `server/.env` (see `server/.env.example`)
- `client/.env` (see `client/.env.example`)

Typical values:

- `server/.env`
  - `PORT=5000`
  - `DATABASE_URL=postgresql://...`
  - `JWT_SECRET=your_secret`
  - `FRONTEND_URL=http://localhost:5173`
- `client/.env`
  - `VITE_API_URL=http://localhost:5000`

### 3) Run the App

Start backend:

```bash
cd server
npm run dev
```

Start frontend (new terminal):

```bash
cd client
npm run dev
```

Application URLs:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Database (Prisma)

From the `server` directory:

```bash
npx prisma generate
npx prisma migrate dev
```

Optional seed:

```bash
npm run seed
```

## Scripts

### Client
- `npm run dev` - start development server
- `npm run build` - production build
- `npm run preview` - preview production build

### Server
- `npm run dev` - start development server
- `npm start` - start production server
- `npm run seed` - run seed script

## API Summary

Base URL: `http://localhost:5000/api`

- Auth
  - `POST /auth/register`
  - `POST /auth/login`
- Tasks
  - `GET /tasks`
  - `POST /tasks`
  - `PUT /tasks/:id`
  - `DELETE /tasks/:id`
- Categories
  - `GET /categories`
  - `POST /categories`
  - `DELETE /categories/:id`

## Documentation

- [Client guide](./client/README.md)
- [Server guide](./server/README.md)
