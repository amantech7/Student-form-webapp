import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { fetchStudents } from "./services/studentService";

export default function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Student Portal</h1>
        <p className="text-gray-500">Manage and track student registrations</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT FORM */}
        <div className="lg:col-span-1">
          <StudentForm count={students.length} onRegister={loadStudents} />
        </div>

        {/* RIGHT UI */}
        <div className="lg:col-span-2 space-y-6">
          {/* STATS CARD */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Students</p>
              <p className="text-4xl font-semibold">{students.length}</p>
              <p className="text-xs opacity-80 mt-1">All registered students</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">Student</div>
          </div>

          {/* LIST */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">All Students</h2>
            <StudentList students={students} onSelect={setSelectedStudent} />
          </div>
        </div>
      </div>

      {/* Modal for full student details */}
      {selectedStudent && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Student Details</h2>
            {selectedStudent.avatar ? (
              <img
                src={selectedStudent.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 text-gray-500">
                No Photo
              </div>
            )}
            <div className="space-y-2 text-gray-700">
              <p><strong>First Name:</strong> {selectedStudent.firstName || "Not Provided"}</p>
              <p><strong>Middle Name:</strong> {selectedStudent.middleName || "Not Provided"}</p>
              <p><strong>Last Name:</strong> {selectedStudent.lastName || "Not Provided"}</p>
              <p><strong>DOB:</strong> {selectedStudent.dob || "Not Provided"}</p>
              <p><strong>Phone:</strong> {selectedStudent.phone || "Not Provided"}</p>
              <p><strong>Course:</strong> {selectedStudent.course || "Not Assigned"}</p>
              <p><strong>Registered On:</strong> {selectedStudent.createdAt || "Unknown"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}