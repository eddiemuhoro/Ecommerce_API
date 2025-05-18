# Usella Ecommerce API

**Usella** is a RESTful API for a second-hand goods marketplace, built with **Node.js**, **Express**, **TypeScript**, and **Prisma ORM**. It supports user authentication, product management, order processing, reviews, and **Mpesa** payment integration.

---

## 🚀 Features

- **User Management**: Register, login, profile update, password reset, followers/following.
- **Product Management**: CRUD operations, categories, favourites, and cart.
- **Order Management**: Place, confirm, reject, deliver, and complete orders.
- **Reviews**: Product and platform reviews.
- **Mpesa Payments**: Initiate and confirm payments via Mpesa.
- **Swagger API Docs**: Interactive documentation at `/docs`.

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express, TypeScript  
- **ORM**: Prisma  
- **Database**: PostgreSQL  
- **Authentication**: JWT  
- **Validation**: express-validator  
- **Email**: Nodemailer (Gmail)  
- **Payments**: Mpesa API  

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (or npm)
- PostgreSQL database

### Environment Variables

Create a `.env` file in the root directory with necessary variables:

```
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
```

### Installation

```bash
pnpm install
```

### Database Migration

```bash
npx prisma migrate dev
```

### Build

```bash
pnpm build
```

### Run

```bash
pnpm dev
```

---

## 📘 API Documentation

Interactive Swagger docs available at:

```
/docs (e.g., http://localhost:4200/docs)
```

---

## 📁 Project Structure

- `src/controllers` – API logic
- `src/routes` – Express route definitions
- `src/services` – Business logic
- `src/prisma` – Prisma client and schema
- `src/middleware` – Auth, error handling, validators

---

## 🔑 Key Endpoints

### Auth
- `POST /register`
- `POST /login`

### Users
- `GET /users`
- `PUT /users/update/:id`
- `DELETE /users/delete/:id`
- `GET /users/verify/:email/:code`

### Products
- `POST /product/send`
- `GET /product/:id`
- `GET /product/category/:category`
- `POST /product/add/favourite`

### Orders
- `POST /order/create`
- `PATCH /order/confirm/:id/:seller`
- `POST /order/pay/:amount/:id`
- `POST /order/complete/:id`

### Reviews
- `POST /review/send`
- `GET /review/user/:id`
- `POST /review/usella/send`

### Mpesa
- `POST /mpesa/pay`
- `GET /mpesa/token`

---

## 🧑‍💻 Development

- **Linting/Formatting**: Prettier config included.
- **Docker**: See `Dockerfile` for containerization.

---

## 📄 License

MIT
