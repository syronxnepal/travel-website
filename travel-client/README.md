# Travel CMS Client (Frontend)

A modern travel content management system built with React, TypeScript, and Vite.

## Project Structure

This is the frontend React application for the Travel CMS.

```
travel-client/
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── context/         # Context providers
│   ├── hooks/           # Custom hooks
│   └── styles/          # Global styles
├── public/              # Static assets
└── dist/                # Build output
```

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: SCSS
- **UI Components**: Custom components with Font Awesome icons

## Getting Started

### Installation

```bash
cd travel-client
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Production Build

```bash
npm run build
```

## Features

- **Frontend UI**: Homepage, About, Contact, Tours, Treks, Blog pages
- **CMS Dashboard**: Full content management system
- **Authentication**: Login and protected routes
- **User Management**: Role-based access (Admin, Editor, Viewer)
- **Content Management**: 
  - Treks & Tours management
  - Blog & Testimonials
  - Bookings & Contacts
  - Pages management
- **Modern UI**: Clean, responsive design

## Backend Server

The backend server is located in the `travel-server` folder.
