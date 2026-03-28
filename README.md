<div align="center">
  <img src="./client/public/assets/logo.png" alt="Smart Task Manager Logo" width="100"/>
  <h1>Smart Task Manager</h1>
  <p>A full-stack, highly scalable productivity application designed to organize workflows with a modern, glassmorphism-inspired UI.</p>

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
</div>

---

## 📖 Overview

**Smart Task Manager** is a production-ready, full-stack web application engineered to dramatically improve personal and professional productivity. Designed with a clean, modern aesthetic utilizing a custom UI system, it provides a seamless user experience for managing daily tasks and projects. 

This project was built from the ground up to demonstrate a solid understanding of **Clean Architecture**, **RESTful API design**, **Relational Database Modeling**, and **Modern UI/UX principles**.

---

## ✨ Key Features

- **Robust Authentication:** Secure JWT-based authentication system with encrypted passwords using bcryptjs, featuring customized login/registration experiences and secure logout confirmation modals.
- **Advanced Task Management:** Full CRUD operations for tasks with support for titles, descriptions, due dates, priorities (Low, Medium, High), and completion statuses.
- **Categorization System:** Organize tasks into custom categories/projects with a unified filtering sidebar. User specific isolation guarantees privacy.
- **Validation & Security:** Incoming API requests are strictly validated using `Zod` middleware, preventing malformed data and reinforcing security.
- **Database Architecture:** Optimized PostgreSQL relational schemas managed and queried beautifully through the Prisma ORM.
- **Responsive & Modern UI:** A fully responsive, handcrafted CSS design system leveraging variables, flexbox, grid, and subtle micro-animations (bypassing the need for heavy external component libraries).

---

## 🛠️ Technology Stack

### Frontend Architecture
- **Framework:** React 18+ (bootstrapped with Vite for instant server start & HMR)
- **Routing:** React Router DOM (v6) for seamless Single Page Application (SPA) navigation.
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
- **HTTP Client:** Axios (configured with interceptors for automatic JWT attachment).
- **Styling:** Vanilla CSS with custom design tokens, modern gradient schemes, and a mobile-first philosophy.

### Backend Architecture
- **Runtime Environment:** Node.js
- **Web Framework:** Express.js utilizing MVC (Model-View-Controller) structure for clean separation of concerns.
- **Database ORM:** Prisma Client - Ensuring type safety and simplified database migrations.
- **Database:** PostgreSQL (Cloud or Local).
- **Security & Utilities:** `jsonwebtoken` for stateless auth, `bcryptjs` for hashing passwords, `zod` for payload validation, `dotenv` for environment management, `cors` for cross-origin configuration.

---

## 📂 Project Structure

```text
smart-task-manager/
├── client/                 # Frontend React application (Vite)
│   ├── public/             # Static assets
│   └── src/                # Frontend source code
│       ├── api/            # API service calls (Axios)
│       ├── assets/         # Images and other stylistic assets
│       ├── components/     # Reusable React components
│       ├── pages/          # Main application pages
│       ├── App.jsx         # Main React component
│       └── main.jsx        # Frontend entry point
├── config/                 # Backend configuration files
├── controllers/            # Backend request handlers
├── middleware/             # Express middlewares (Auth, Error handling, etc.)
├── prisma/                 # Database schema and migrations
├── routes/                 # Express API routes
├── validators/             # Zod validation schemas
├── .env                    # Environment variables
├── package.json            # Backend dependencies and project scripts
└── server.js               # Backend Express application entry point
```

---

## 🗄️ Database Schema (Prisma)

The database strictly enforces relational constraints. Below is a high-level Entity Relationship overview:

- **`User`**: Core entity (Fields: `id`, `name`, `email`, `password`, `createdAt`). Has One-to-Many relationships with both Tasks and Categories.
- **`Category`**: Groupings for Tasks (Fields: `id`, `name`, `userId`). Cascades on User deletion.
- **`Task`**: The work items (Fields: `id`, `title`, `description`, `status` (Enum), `priority`, `dueDate`, `userId`, `categoryId`). Maps to specific users and categories.

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running safely.

### Prerequisites

- Node.js (v18.x or later)
- PostgreSQL (Installed locally or accessible via a cloud provider like Supabase/Neon)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shakir5665/smart-task-manager.git
   cd smart-task-manager
   ```

2. **Backend Setup:**
   ```bash
   # Install dependencies
   npm install

   # Setup Environment Variables
   # Create a `.env` file in the root directory and add the following:
   # DATABASE_URL="postgresql://user:password@localhost:5432/smart_tasks?schema=public"
   # JWT_SECRET="your_super_secret_jwt_key"
   # PORT=5000

   # Generate Prisma Client & Push Schema to Database
   npx prisma generate
   npx prisma db push

   # Start the Express server
   npm start
   ```

3. **Frontend Setup:**
   ```bash
   # Open a new terminal tab and navigate to the client folder
   cd client

   # Install frontend dependencies
   npm install

   # Start the Vite development server
   npm run dev
   ```

4. **View the Application:**
   Open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Endpoints

A brief overview of the REST API endpoints exposed by the Node.js server:

**Auth Endpoints**
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate and return JWT token

**Task Endpoints**
- `GET /api/tasks` - Retrieve all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update task details or status
- `DELETE /api/tasks/:id` - Delete a task

**Category Endpoints**
- `GET /api/categories` - Retrieve user's categories
- `POST /api/categories` - Create a new category
- `DELETE /api/categories/:id` - Remove a category

---

## 💡 What Makes This Project "Production-Ready"?

1. **Scalable Folder Structure:** Segregated logic into `controllers/`, `routes/`, `validators/`, and `middleware/` makes the backend extremely maintainable.
2. **Error Handling:** Centralized async wrappers and tailored HTTP error codes provide a robust fallback mechanism without crashing the Node instance.
3. **Data Integrity:** Leveraging Prisma's `@relation` attributes paired with `onDelete: Cascade` ensures no orphaned rows pollute the database.
4. **Optimized Front-End Rendering:** Thoughtful use of React's `useCallback` to prevent unnecessary re-renders of the TaskList and Filters as user interactions occur.
5. **Polished Micro-Interactions:** Custom modals, dynamic alerts, active states, and focus-rings demonstrate an eye for detail highly sought after in user-centric products.

---

<div align="center">
  <p><b>Designed & Developed by Shakir Tech Solutions</b></p>
  <p><i>If you are an employer reviewing this code, I'd love to discuss how my full-stack expertise can bring value to your engineering team! Contact details available on my GitHub profile.</i></p>
</div>
