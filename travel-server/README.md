# Travel CMS Server (Backend)

A modern Node.js backend server for the Travel CMS application.

## Project Structure

```
travel-server/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & error handling
│   ├── models/          # TypeORM entities
│   ├── routes/          # API routes
│   └── index.ts         # Entry point
├── dist/                # Compiled JavaScript
└── package.json
```

## Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT
- **Security**: Helmet, bcrypt, CORS

## Getting Started

### Installation

```bash
cd travel-server
npm install
```

### Setup Environment

Create a `.env` file:



### Run Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user (protected)

### Treks
- `GET /api/treks` - Get all treks
- `GET /api/treks/:id` - Get single trek
- `POST /api/treks` - Create trek (protected)
- `PUT /api/treks/:id` - Update trek (protected)
- `DELETE /api/treks/:id` - Delete trek (protected)

### Other Resources
- Tours, Blogs, Testimonials, Bookings, Contacts, Pages

## Client Application

The frontend React application is located in the `travel-client` folder.
