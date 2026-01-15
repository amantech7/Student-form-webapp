export async function fetchStudents() {
  const res = await fetch("http://localhost:5000/api/students");
  const json = await res.json();

  if (!res.ok || json?.success === false) {
    throw new Error(json?.message || "Failed to fetch students");
  }

  const rows = Array.isArray(json?.data) ? json.data : [];
  return rows.map((s) => ({
    id: s.id ?? s.student_id,
    firstName: s.first_name,
    middleName: s.middle_name,
    lastName: s.last_name,
    dob: s.dob,
    phone: s.phone,
    course: s.course,
    avatar: s.avatar_url ?? null,
  }));
}
