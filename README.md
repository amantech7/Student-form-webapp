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


## **ScreenShots:--**

## Student Portal

<img width="1231" height="939" alt="image" src="https://github.com/user-attachments/assets/a2a915d5-549c-4ed7-a024-1d9f44a6354d" />

## Student Details

<img width="1253" height="808" alt="image" src="https://github.com/user-attachments/assets/c3e7b912-29c4-45ce-8f3e-ae8b1cab26ca" />



## Register Student

<img width="1199" height="986" alt="image" src="https://github.com/user-attachments/assets/d60af9b1-45d2-4488-a196-03b2878cbc42" />

## DataBase 

<img width="818" height="546" alt="image" src="https://github.com/user-attachments/assets/2e0becd7-7f4f-4f26-accf-87bd79855d68" />

## **Demo**



https://github.com/user-attachments/assets/74caa4ad-a3db-426d-9579-ba9491f4fb2c



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
