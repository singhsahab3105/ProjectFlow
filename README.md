# ProjectFlow - Project Management Application

A full-stack project management application built with React (frontend) and Flask (backend). This professional application showcases modern design principles and interactive features.

## Features

- User authentication (login/register)
- Interactive dashboard with data visualization
- Project and task management with CRUD operations
- Team collaboration features
- Real-time notifications
- Responsive design for all devices

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Framer Motion for animations
- Recharts for data visualization
- Lucide React for icons
- React Router for navigation

### Backend
- Flask (Python)
- JWT for authentication
- RESTful API design

## Getting Started

### Prerequisites
- Node.js
- Python 3.7+

### Installation

1. Clone the repository
```
git clone <repository-url>
cd project-management-app
```

2. Install frontend dependencies
```
npm install
```

3. Install backend dependencies
```
cd api
pip install -r requirements.txt
cd ..
```

### Running the Application

1. Start the backend server
```
npm run start-api
```

2. In a new terminal, start the frontend development server
```
npm run dev
```

3. Open your browser and navigate to the local server URL provided in the terminal

## Demo Credentials

- Email: demo@example.com
- Password: password

## Project Structure

- `/src` - Frontend React application
  - `/components` - Reusable UI components
  - `/contexts` - React context providers
  - `/hooks` - Custom React hooks
  - `/pages` - Application pages
  - `/services` - API service layer
- `/api` - Backend Flask application

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/user` - Get current user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Tasks
- `GET /api/projects/:id/tasks` - Get tasks for a project
- `POST /api/projects/:id/tasks` - Create a task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task# ProjectFlow
