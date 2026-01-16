export default function StudentCard({ student, onClick }) {
  const {
    firstName,
    middleName,
    lastName,
    dob,
    phone,
    course,
    avatar,
  } = student;

  const fullName = `${firstName || ""} ${middleName || ""} ${lastName || ""}`.trim();

  // Handle avatar (base64 or normal URL)
  const avatarURL = avatar ? avatar : null;

  return (
    <div 
      className="bg-white rounded-lg p-4 shadow flex gap-3 cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      
      {/* Avatar */}
      {avatarURL ? (
        <img
          src={avatarURL}
          alt="Student Avatar"
          className="w-20 h-20 rounded-full border object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full border bg-gray-200 flex items-center justify-center text-gray-500">
          No Photo
        </div>
      )}

     
      <div>
        <p className="font-semibold">{fullName || "Unknown"}</p>

        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded mt-1">
          {course || "Not Assigned"}
        </span>

        <div className="mt-2 text-sm text-gray-600 space-y-1">
          <p>DOB: {dob || "Not Provided"}</p>
          <p>Phone: {phone || "Not Provided"}</p>
        </div>
      </div>
    </div>
  );
}