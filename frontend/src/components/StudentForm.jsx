import { useState } from "react";

export default function StudentForm({ onRegister }) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);

  const validate = () => {
    // name validation regex
    const nameRegex = /^[a-zA-Z\s\-']+$/;

    
    if (!firstName.trim() || firstName.trim().length < 2 || firstName.trim().length > 50 || !nameRegex.test(firstName)) {
      alert("First Name is required, must be 2-50 characters, and contain only letters, spaces, hyphens, or apostrophes");
      return false;
    }

    
    if (middleName && (middleName.length < 1 || middleName.length > 50 || !nameRegex.test(middleName))) {
      alert("Middle Name, if provided, must be 1-50 characters and contain only letters, spaces, hyphens, or apostrophes");
      return false;
    }

    // Last Name: required, 2-50 chars, valid chars
    if (!lastName.trim() || lastName.trim().length < 2 || lastName.trim().length > 50 || !nameRegex.test(lastName)) {
      alert("Last Name is required, must be 2-50 characters, and contain only letters, spaces, hyphens, or apostrophes");
      return false;
    }

    // DOB validation
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      if (isNaN(birthDate.getTime())) {
        alert("Invalid Date of Birth");
        return false;
      }
      if (birthDate > today) {
        alert("Date of Birth cannot be in the future");
        return false;
      }
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 5) {
        alert("Student must be at least 5 years old");
        return false;
      }
    }

    //phone no validation
    if (phone) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        alert("Phone Number, if provided, must be exactly 10 digits and start with 6-9");
        return false;
      }
    }

    // Course: required
    if (!course) {
      alert("Please select a Desired Course");
      return false;
    }

    // File validation
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        alert("Profile photo must be JPEG, PNG, GIF, or WebP format");
        return false;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Profile photo must be less than 2MB");
        return false;
      }
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
      onRegister?.();
      // Reset form
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name*
        </label>
        <input
          type="text"
          placeholder="Enter your First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        />
      </div>

      {/* Middle Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Middle Name
        </label>
        <input
          type="text"
          placeholder="Enter your Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Name*
        </label>
        <input
          type="text"
          placeholder="Enter your Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        />
      </div>

      {/* DOB */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="Enter Phone Number"
          maxLength={10}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Course */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Desired Course
        </label>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
        >
          <option value="">-- Select Course --</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Commerce">Commerce</option>
          <option value="Medical">Medical</option>
          <option value="Arts">Arts</option>
          <option value="Diploma">Diploma</option>
        </select>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Profile
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-medium hover:opacity-95 transition flex items-center justify-center gap-2 shadow-sm"
      >
        <span>➕</span> Register Student
      </button>
    </form>
  );
}