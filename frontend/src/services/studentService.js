
const API = "http://localhost:5000/api/students";

export async function fetchStudents() {
  const res = await fetch(API);
  const data = await res.json();
  return data;
}
