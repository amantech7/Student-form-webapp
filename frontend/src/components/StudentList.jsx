
import StudentCard from "./StudentCard";

export default function StudentList({ students }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {students.length === 0 ? (
        <p className="text-gray-500">No students yet. Register one using the form.</p>
      ) : (
        students.map((s) => <StudentCard key={s.id} student={s} />)
      )}
    </div>
  );
}
