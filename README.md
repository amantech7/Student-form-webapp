# **Student Portal Web App**

A simple web application that allows registering students and viewing their details in a dashboard.

---

## **Features**

- Register new students with profile details
- Upload a student profile image (avatar)
- Shows total student count
- Displays all registered students in card-style UI
- Stores students in MySQL database
- Generates & shows student avatar
- Auto refresh after registration

---

## **Technology Used**

- **Frontend:** React + TailwindCSS
- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **Storage:** BLOB / Base64 Avatar
- **Avatar:** DiceBear Avatar API

---

## **How It Works**

1. User fills the student form
2. On submit:
   - Student data is saved in MySQL
   - Avatar is generated + stored as BLOB/Base64
3. Dashboard updates:
   - Total Student Count
   - Student List UI

---

## **Student Card Shows**

- Full Name
- Course
- Date of Birth
- Phone
- Avatar

---

## **Demo**

https://github.com/user-attachments/assets/e9fce412-48b3-45ea-b436-9f31a92fc7ca

---

## **How to Run This Project**

### **Clone the Repository**

```bash
git clone https://github.com/amantech7/Student-form-webapp.git
cd Student-form-webapp
```

### **Prerequisites**

- Node.js (v14 or higher)
- npm or yarn
- MySQL Server

### **Setup Instructions**

#### **1. Install Backend Dependencies**

```bash
cd backend
npm install
```

#### **2. Install Frontend Dependencies**

```bash
cd frontend
npm install
```

#### **3. Run the Project**

**Terminal 1 - Start Backend Server:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Start Frontend Development Server:**

```bash
cd frontend
npm run dev
```

### **Access the Application**

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---
