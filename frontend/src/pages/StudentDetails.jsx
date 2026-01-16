import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchStudentById } from "../services/studentService";

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, [id]);

  async function loadStudent() {
    try {
      const data = await fetchStudentById(id);
      setStudent(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading student details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Details</h1>
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-800 text-2xl font-medium"
          >
            ×
          </Link>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={`${student.firstName} ${student.lastName}`}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-100 shadow-md"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto bg-gray-100 flex items-center justify-center text-gray-500 text-2xl font-bold shadow-md">
                {student.firstName?.charAt(0) || "?"}
              </div>
            )}
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {student.firstName} {student.middleName || ""} {student.lastName}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Student ID: {student.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-500">First Name</p>
              <p className="mt-1 text-base">{student.firstName || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Middle Name</p>
              <p className="mt-1 text-base">{student.middleName || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Name</p>
              <p className="mt-1 text-base">{student.lastName || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">DOB</p>
              <p className="mt-1 text-base">{student.dob || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="mt-1 text-base">{student.phone || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Course</p>
              <p className="mt-1 text-base">{student.course || "—"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Registered On</p>
              <p className="mt-1 text-base">
                {student.createdAt
                  ? new Date(student.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "—"}
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium shadow-sm transition"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}