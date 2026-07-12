# Multi Store Stock Management - Backend

Backend API for a multi-store inventory management system.

This backend provides authentication, product management, store management, stock management, and stock transfer functionality.

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-based Authentication
- bcrypt Password Hashing

---

# Features

## Authentication

- User registration
- User login
- User logout
- JWT-based authentication
- Role-based authorization

### User Roles

- Admin
- Shopper


---

# Admin Features

## Product Management

- Create products
- View products
- Update products


## Store Management

- Create stores
- View stores
- Update stores


## Stock Management

- Add stock to stores
- View stock levels
- Adjust stock quantity
- Transfer stock between stores


---

# Shopper Features

- Login
- View products
- View stock availability by store
- Read-only access


---

# Getting Started

---

## 1. Clone Repository

Clone  repository:

```bash
git clone https://github.com/ramya45r/Multistore.git

Add the following variables:

```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/multistore
JWT_SECRET=SecretKey12345
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=Admin@123

