import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchStudents } from "../services/studentService";

export default function Home() {
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
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Portal</h1>
        <p className="text-gray-600">Manage and track student registrations</p>
      </div>

      {/* Table Card */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">All Students</h2>
            <Link
              to="/register"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
            >
              + New Student
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-blue-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">First Name</th>
                  <th className="px-4 py-3 text-left">Middle Name</th>
                  <th className="px-4 py-3 text-left">Last Name</th>
                  <th className="px-4 py-3 text-left">DOB</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Course</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      No students yet.
                    </td>
                  </tr>
                ) : (
                  students.map((s) => (
                    <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">{s.firstName || '-'}</td>
                      <td className="px-4 py-3 text-gray-600">{s.middleName || '-'}</td>
                      <td className="px-4 py-3 text-gray-600">{s.lastName || '-'}</td>
                      <td className="px-4 py-3 text-gray-600">{s.dob || '-'}</td>
                      <td className="px-4 py-3 text-gray-600">{s.phone || '-'}</td>
                      <td className="px-4 py-3 text-gray-600">{s.course || '-'}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: '2-digit' }) : '-'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link to={`/student/${s.id}`} className="text-purple-600 hover:underline">
                          Open
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Students Card */}
        <div className="mt-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Total Registered Students</p>
            <p className="text-4xl font-bold">{students.length}</p>
          </div>
          <div className="text-sm opacity-80">
            Updated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}