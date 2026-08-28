# 💰 AI-Powered Personal Finance System

A full-stack personal finance management application that allows users to track expenses, analyze financial behavior, and manage data efficiently with advanced features like bulk operations and analytics.

---

## 🚀 Features

### 🔐 Authentication & Security

* JWT-based login & registration
* Password hashing & secure authentication
* Middleware-based route protection
* Protected APIs and frontend routes

---

### 💳 Expense Management

* Add, update, delete expenses (CRUD)
* Real-time UI updates using Redux
* Categorized transactions (credit/debit)

---

### 📊 Dashboard & Analytics

* Pie chart (category-wise distribution)
* Bar chart (credit vs debit comparison)
* Summary cards:

  * 💰 Total Credit
  * 💸 Total Debit
  * 💾 Balance

---

### 📁 Bulk Operations

* Upload expenses via CSV file
* Bulk delete using checkbox selection
* Select multiple rows / select all

---

### 🔍 Filtering

* Filter by month
* Filter by transaction type (credit/debit)

---

### 🔔 User Experience

* Toast notifications (success/error)
* Confirmation modal for delete
* Responsive UI

---

## 🧠 Upcoming Feature

* AI-based financial analyzer:

  * Analyze spending patterns
  * Suggest investment strategies
  * Provide smart financial insights

---

## 🛠 Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📸 Screenshots

> Add screenshots here

* Dashboard
* Charts
* Bulk upload
* Table view

---

## 📂 Project Structure

```text id="p7l3fx"
project-root/
 ├── frontend/
 │    ├── src/
 │    ├── components/
 │    ├── pages/
 │    └── store/
 │
 ├── backend/
 │    ├── controllers/
 │    ├── routes/
 │    ├── models/
 │    └── middleware/
```

---

## ⚙️ Setup Instructions

---

### 1️⃣ Clone Repository

```bash id="7q1u4n"
git clone https://github.com/ayushmimani/Expense_tacker_front
cd Expense_tacker_front
```

---

### 2️⃣ Setup Backend

```bash id="hny3vh"
cd backend
npm install
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash id="q3f3f4"
cd frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables

### Backend (.env)

```env id="knk7de"
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

### Frontend (.env)

```env id="5rrs7b"
VITE_API_URL=http://localhost:3000/api/
```

---

## 📡 API Endpoints

### Auth

```text id="w0s9eh"
POST /api/auth/register
POST /api/auth/login
```

### Expense

```text id="2x6pn7"
GET    /api/expense
POST   /api/expense
PUT    /api/expense/:id
DELETE /api/expense/:id
```

### Bulk

```text id="b8qptn"
POST   /api/expense/bulk
DELETE /api/expense/bulk
```

---

## 💡 Highlights

* Full-stack architecture (frontend + backend integration)
* Efficient state management using Redux
* File handling (CSV upload & parsing)
* Complex UI logic (bulk selection, filtering)
* Scalable REST API design

---

## 📈 Future Enhancements

* AI-powered financial insights
* Net worth tracking (accounts + investments)
* Budget alerts & spending limits
* Deployment (Vercel + Render)

---

## 👨‍💻 Author

Ayush Mimani

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub


# Live URL
- https://expense-tracker-backend-4d4s.onrender.com/
