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

  const fullName = `${student.firstName || ''} ${student.middleName || ''} ${student.lastName || ''}`.trim() || 'Unknown Student';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md p-4 max-w-lg w-full">
    
        <div className="flex items-start gap-4">
      
          <div className="flex flex-col items-center">
            {/* Avatar */}
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={fullName}
                className="w-24 h-24 rounded-full object-cover bg-gray-300"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-bold">
                {student.firstName?.charAt(0) || '?'}
              </div>
            )}

            <div className="flex gap-2 mt-2 text-2xl text-gray-500">
              <span>🏅</span>
              <span>🚀</span>
              <span>🎯</span>
            </div>
          </div>

          {/* Right side info */}
          <div className="space-y-1 flex-grow">
            <h2 className="text-3xl font-bold text-gray-900">
              {fullName}
            </h2>

            <div className="flex items-center gap-2 text-blue-600 text-sm">
              <span>🏢</span>
              <span>{student.companyName || 'Not Assigned'}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-600">📞</span>
              <span className="text-gray-700">{student.phone || 'Not Provided'}</span>
             
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-600">📧</span>
              <span className="text-gray-700">{student.email || 'Not Provided'}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-600">📅</span>
              <span className="text-gray-700">{student.dob || 'Not Provided'}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-600">⏰</span>
              <span className="text-gray-700">
                {student.createdAt 
                  ? new Date(student.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })
                  : 'Unknown'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-right">
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}