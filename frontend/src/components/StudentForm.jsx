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
        body: formData
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Registration failed");
        return;
      }

      const s = data.data; // {id, first_name, ...}
      onRegister({
        firstName: s.first_name,
        middleName: s.middle_name,
        lastName: s.last_name,
        dob: s.dob,
        phone: s.phone,
        course: s.course,
        avatar: s.avatar_url
      });

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
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg border p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Student Signup Form
      </h2>

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

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register Student
        </button>
      </form>

      <p className="text-center font-semibold mt-4">
        Total Registered Students: {count}
      </p>
    </div>
  );
}
