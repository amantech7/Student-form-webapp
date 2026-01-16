import { useNavigate, Link } from "react-router-dom";
import StudentForm from "../components/StudentForm";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Register Student</h1>
        <Link
          to="/"
          className="text-gray-500 hover:text-gray-800 text-2xl font-medium"
        >
          ×
        </Link>
      </div>

      {/* Form Card - same style as the table card in home */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 text-purple-700 w-10 h-10 rounded-full flex items-center justify-center text-xl">
                🎓
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Register New Student</h2>
                <p className="text-sm text-gray-500">
                  Fill in the details to add a new student
                </p>
              </div>
            </div>
          </div>

          <StudentForm onRegister={handleRegister} />
        </div>
      </div>
    </div>
  );
}