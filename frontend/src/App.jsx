import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { fetchStudents } from "./services/studentService";

export default function App() {
  const [students, setStudents] = useState([]);

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
          <StudentForm
            count={students.length}
            onRegister={loadStudents} 
          />
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
            <div className="bg-white/20 p-3 rounded-full">🎓</div>
          </div>

          {/* LIST */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">All Students</h2>
            <StudentList students={students} />
          </div>
        </div>
      </div>
    </div>
  );
}
