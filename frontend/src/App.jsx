import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";

export default function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await fetch("http://localhost:5000/api/students");
        const result = await response.json();

        if (result.success) {
          // convert DB columns → frontend names
          const formatted = result.data.map((student) => ({
            id: student.id,
            firstName: student.first_name,
            middleName: student.middle_name,
            lastName: student.last_name,
            dob: student.dob,
            phone: student.phone,
            course: student.course,
            avatar: student.avatar_url,
          }));

          setStudents(formatted);
        }
      } catch (error) {
        console.error("Failed to load students:", error);
      }
    }

    loadStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <StudentForm 
        count={students.length}
        onRegister={(newStudent) => setStudents([newStudent, ...students])}
      />

      {students.length > 0 && (
        <div className="max-w-xl mx-auto mt-6 space-y-3">
          {students.map((st) => (
            <div key={st.id} className="flex items-center gap-3 bg-white p-3 rounded shadow">
              <img src={st.avatar} alt="" className="w-14 h-14 rounded-full border" />
              <div>
                <p className="font-bold">
                  {st.firstName} {st.middleName} {st.lastName}
                </p>
                <p>DOB: {st.dob}</p>
                <p>Phone: {st.phone}</p>
                <p>Course: {st.course}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
