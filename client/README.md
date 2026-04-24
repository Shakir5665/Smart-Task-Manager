# Smart Task Manager - Frontend

React + Vite frontend application for Smart Task Manager.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Update `.env` with your backend API URL:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Development

```bash
npm run dev
```

Application will run on `http://localhost:5173`

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── api/
│   └── axiosSetup.js      # Axios instance configuration
├── components/            # Reusable React components
│   ├── CategoryFilter.jsx
│   ├── TaskForm.jsx
│   ├── TaskItem.jsx
│   └── TaskList.jsx
├── pages/                # Page components
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── assets/               # Images, icons, etc.
├── App.jsx              # Main app component
├── main.jsx             # Entry point
├── App.css
└── index.css
```

## Deployment on Vercel

### Prerequisites

- GitHub repository connected
- Backend API deployed and running

### Steps

1. Create new project on Vercel
2. Connect GitHub repository
3. Set **Root Directory** to `client`
4. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-render-backend-url`
5. Deploy

### After Deployment

- Update backend `FRONTEND_URL` environment variable with your Vercel URL
- Update `vercel.json` `env.VITE_API_URL` with your Render backend URL

## Tech Stack

- **React** 19 - UI library
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **ESLint** - Code linting

## API Configuration

The API is configured via `src/api/axiosSetup.js`. Base URL is set from `VITE_API_URL` environment variable.

## Build

```bash
npm run build
```

Production-ready files will be in the `dist/` directory.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
