const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let avg = 0;
  for (let i = 0; i < weights.assignmentWeights.length; i += 1) {
    const grade = weights.assignmentWeights[i].weight * weights.assignmentWeights[i].grade;
    avg = grade + avg;
  }
  return avg;
}
function addStudent(newStudentData: NewStudentRequest): boolean {
  const { name, weights } = newStudentData;
  if (name in students) {
    return false;
  }
  const avg = calculateAverage(weights);
  const newStudent: Student = {
    name: `${name}`,
    weights,
    currentAverage: avg,
  };
  students[name] = newStudent;
  return true;
}
