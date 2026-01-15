
export default function StudentCard({ student }) {
  const { firstName, middleName, lastName, dob, phone, course, avatar } = student;

  const img = avatar
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex items-center gap-4">
        <img
          src={img}
          alt={firstName}
          className="w-20 h-20 rounded-full border object-cover"
        />
        <div>
          <p className="font-semibold">
            {firstName} {middleName} {lastName}
          </p>
          <div className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded mt-1">
            {course}
          </div>
          <div className="mt-2 text-sm text-gray-500 space-y-1">
            <p>DOB: {dob}</p>
            <p>Phone: {phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
