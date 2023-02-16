const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let avg = 0;
  let totalWeight = 0;
  for (let i = 0; i < weights.assignmentWeights.length; i += 1) {
    const grade = weights.assignmentWeights[i].weight * weights.assignmentWeights[i].grade;
    avg += grade;
    totalWeight += weights.assignmentWeights[i].weight;
  }
  avg /= totalWeight;
  return avg;
}
function addStudent(newStudentData: NewStudentRequest): boolean {
  const { name, weights } = newStudentData;
  if (name in students) {
    return false;
  }
  const avg = calculateAverage(weights);
  const newStudent: Student = {
    name,
    weights,
    currentAverage: avg,
  };
  students[name] = newStudent;
  return true;
}
function getStudent(studentName: string): Student | undefined {
  if (!(studentName in students)) {
    return undefined;
  }
  return students[studentName];
}
function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  const requiredScore =
    (targetScore * 100 - (100 - finalExamWeight) * currentAverage) / finalExamWeight;
  return requiredScore;
}
function getLetterGrade(score: number): string {
  let letterGrade = '';
  if (score >= 90) {
    letterGrade = 'A';
  } else if (score >= 80) {
    letterGrade = 'B';
  } else if (score >= 70) {
    letterGrade = 'C';
  } else if (score >= 60) {
    letterGrade = 'D';
  } else {
    letterGrade = 'F';
  }
  return letterGrade;
}
function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  const student = getStudent(studentName);
  if (student === undefined) {
    return false;
  }
  const assignment = student.weights.assignmentWeights.find(
    (element) => element.name === assignmentName
  );
  if (assignment === undefined) {
    return false;
  }
  assignment.grade = newGrade;
  student.currentAverage = calculateAverage(student.weights);
  return true;
}

export {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
};
