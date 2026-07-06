# E-Shop - E-Commerce Application

Full-stack e-commerce app with React frontend and Node.js/Express backend.

## Features

- User authentication (Login / Signup)
- Dashboard
- Product listing with search, category & price filters
- Product details page
- Shopping cart (add, update quantity, remove, total price)

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Axios, React Router, React Icons

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Add your MongoDB URI and JWT secret in .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API Endpoints

- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get profile
- `GET /api/products` - List products (with filters)
- `GET /api/products/:id` - Product details
- `GET /api/cart/:sessionId` - Get cart
- `POST /api/cart/:sessionId/items` - Add to cart

## Note

- MongoDB database name cannot contain `.` — use `ecommerce` not `E-commerce`
- Whitelist your IP in MongoDB Atlas Network Access
