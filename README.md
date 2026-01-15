# **Student Portal Web App**

A simple  web application that allows registering students and viewing their details in a dashboard.

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

## **Future Improvements**
- Search students
- Edit/Delete functionality
- Pagination
- Filters by course
- Real photo upload + cropping
