# Smart Task Manager - Backend API

Node.js + Express + Prisma + PostgreSQL REST API

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Update `.env` with your database URL and JWT secret.

### 3. Database Setup

```bash
# Run migrations
npm run migrate

# (Optional) Seed the database
npm run seed
```

### 4. Development

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PATCH /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Deployment on Render

### Prerequisites

- PostgreSQL database (Render or external)
- GitHub repository connected

### Steps

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
4. Set build command: `npm install && npm run migrate`
5. Set start command: `npm start`

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT + bcryptjs
- **Validation:** Zod
