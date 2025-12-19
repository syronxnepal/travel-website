# Travel CMS

A full-stack travel content management system with a modern frontend and backend.

## Project Structure

```
travel/
├── travel-client/      # Frontend (React + TypeScript + Vite)
└── travel-server/      # Backend (Node.js + Express + MongoDB)
```

## Getting Started

### Frontend (Client)

```bash
cd travel-client
npm install
npm run dev
```

Visit `http://localhost:5173`

### Backend (Server)

```bash
cd travel-server
npm install
```

Create a `.env` file:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-cms
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

Run the server:

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Features

### Frontend
- Modern React application with TypeScript
- CMS Dashboard with role-based access
- User authentication
- Content management for:
  - Treks & Tours
  - Blogs & Testimonials
  - Bookings & Contacts
  - Custom Pages
- Responsive design
- Toast notifications
- Protected routes

### Backend
- Express.js API
- MongoDB database
- JWT authentication
- Role-based authorization
- RESTful API endpoints
- Error handling
- Security middleware

## Technology Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router
- SCSS
- Font Awesome

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- TypeScript

## Development

Start both services:

**Terminal 1 - Frontend:**
```bash
cd travel-client
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd travel-server
npm run dev
```

## Production

Build frontend:
```bash
cd travel-client
npm run build
```

Build backend:
```bash
cd travel-server
npm run build
npm start
```

