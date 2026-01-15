import { useState } from "react";

export default function StudentForm({ onRegister, count }) {
  //  variables to hold form data
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);

  const validate = () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("First & Last Name Required");
      return false;
    }
    if (isNaN(phone) || phone.length !== 10) {
      alert("Enter 10-digit Phone Number");
      return false;
    }

    // DOB validation
    const birth = new Date(dob);
    if (birth > new Date()) {
      alert("Invalid DOB: Cannot be future");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("middle_name", middleName);
    formData.append("last_name", lastName);
    formData.append("dob", dob);
    formData.append("phone", phone);
    formData.append("course", course);
    if (file) formData.append("photo", file);

    try {
      const res = await fetch("http://localhost:5000/api/students/register", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Registration failed");
        return;
      }

      // Refresh list after successful registration
      onRegister?.();

      setFirstName("");
      setMiddleName("");
      setLastName("");
      setDob("");
      setPhone("");
      setCourse("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Could not connect to server");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-100 text-indigo-700 p-2 rounded-full">🎓</div>
        <div>
          <h2 className="text-xl font-semibold">Register New Student</h2>
          <p className="text-sm text-gray-500">
            Fill in the details to add a new student
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="font-medium">First Name*</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Enter your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Middle Name</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Enter your Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Last Name*</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Enter your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Date of Birth</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Phone Number</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Enter Phone Number"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Desired Course</label>
          <select
            className="w-full border p-2 rounded"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option>-- Select Course --</option>
            <option>Computer Science</option>
            <option>Commerce</option>
            <option>Medical</option>
            <option>Arts</option>
            <option>Diploma</option>
          </select>
        </div>

        {/* File upload section */}
        <div>
          <label className="font-medium">Upload Profile</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded hover:opacity-95">
          <span className="inline-block mr-2">➕</span> Register Student
        </button>
      </form>
    </div>
  );
}
