# 🍔 Food Delivery App (MERN)
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

A full-stack food delivery web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can browse food items, add them to the cart, and place orders securely with authentication.

---

## 📁 Project Structure

food-delivery-app/
├── backend/
│   ├── server.js
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   └── models/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── index.js
├── uploads/
├── README.md
└── LICENSE

---

## 🚀 Features

- 🍽️ Browse food items
- 🔍 Filter/search functionality
- 🛒 Add to cart / remove from cart
- 👤 User registration & login (JWT)
- 📦 Place orders and view order history
- 🖼️ Upload and serve food images
- 🔐 Protected API routes
- 🧾 Admin can manage food menu and orders

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- React Router
- Axios
- Context API or Redux (optional)
- TailwindCSS / Bootstrap (styling)

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Multer (for image upload)
- dotenv (for environment configs)

---

## 🌐 API Endpoints

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| GET    | `/api/food`          | Get all food items           |
| POST   | `/api/user/register` | Register new user            |
| POST   | `/api/user/login`    | Login user                   |
| GET    | `/api/cart`          | Get user cart                |
| POST   | `/api/cart`          | Add item to cart             |
| DELETE | `/api/cart/:id`      | Remove item from cart        |
| POST   | `/api/order`         | Place an order               |
| GET    | `/api/order`         | Get all user orders          |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/food-delivery-app.git
cd food-delivery-app

📸 Screenshots

Add some screenshots here to showcase the UI and features.

📦 Deployment

You can deploy this project using:
	•	Frontend: Vercel / Netlify
	•	Backend: Render / Railway / Cyclic
	•	Database: MongoDB Atlas


👨‍💻 Author
	•	Sudarshan Yadav