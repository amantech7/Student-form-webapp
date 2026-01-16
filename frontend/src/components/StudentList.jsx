import StudentCard from "./StudentCard";

export default function StudentList({ students, onSelect }) {
  return (
    <>
      {students.length === 0 ? (
        <p>No students yet.</p>
      ) : (
        students.map(s => <StudentCard key={s.id} student={s} onClick={() => onSelect(s)} />)
      )}
    </>
  );
}