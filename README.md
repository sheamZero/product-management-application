# 🛒 WeeroTask - Product Management Application

WeeroTask is a full-stack Product Management System built with the MERN stack.  
Users can browse all products without login, but **authentication is required for creating, updating, and deleting products**.

---

## 🌐 Live Link
- 🔗 Frontend: https://your-live-link.com  

---

## 📌 Project Overview

This application allows users to:
- View all available products publicly
- Securely login using authentication
- Perform CRUD operations on products (protected)

Only authenticated users can modify product data to ensure security and data integrity.

---

## ✨ Features

### 👀 Public Features
- View all products
- Responsive UI design
- Product details display

### 🔐 Authentication Features
- JWT-based login system
- Protected routes
- Secure cookie-based session handling

### 🛠️ CRUD Features (Protected)
- ➕ Add product (Login required)
- ✏️ Edit product (Login required)
- ❌ Delete product (Login required)

---

## 🧰 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- React Hook Form
- React Query (@tanstack/react-query)
- Axios
- SweetAlert2
- React Hot Toast
- Firebase Authentication
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Native Driver)
- JWT Authentication
- Cookie Parser
- CORS
- Dotenv

---

## 🔐 Authentication Flow

1. User logs in via Firebase / Auth system  
2. Backend generates JWT token  
3. Token stored in secure cookie  
4. Protected routes validate token before allowing CRUD operations  


---

## ⚙️ API Endpoints

### Public
- `GET /products` → Get all products

### Protected (Require Login)
- `POST /products` → Add product
- `PUT /products/:id` → Update product
- `DELETE /products/:id` → Delete product

---

# Product Management Application

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/sheamZero/product-management-application.git
```

---

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### Environment Variables (`.env.local`)

Create a `.env.local` file inside the `frontend` root directory:

```env
VITE_API_BASE_URL=http://localhost:9000
VITE_IMGBB_API_KEY=your_imgbb_api_key
```


### . Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` root directory:

```env
PORT=5000
DB_USER=your_mongo_username
DB_PASS=your_mongo_password
ACCESS_TOKEN_SECRET=your_jwt_secret
```

> **Note:** Replace all placeholder values with your actual credentials.



