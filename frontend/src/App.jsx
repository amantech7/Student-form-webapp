import { useState } from "react";
import StudentForm from "./components/StudentForm";

export default function App() {
  const [students, setStudents] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Student Registration Form */}
      <StudentForm
        count={students.length}
        onRegister={(s) => setStudents([...students, s])}
      />
    

      {/* Registered Students List */}
      {students.length > 0 && (
        <div className="max-w-xl mx-auto mt-6 space-y-2">
          {students.map((s, i) => (
            <div key={i} className="flex items-center gap-3 bg-white shadow border rounded p-3">
              <img src={s.avatar} className="w-14 h-14 rounded-full border" />
              <div>
                <p><strong>{s.firstName} {s.middleName} {s.lastName}</strong></p>
                <p>DOB: {s.dob}</p>
                <p>Phone: {s.phone}</p>
                <p>Course: {s.course}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
