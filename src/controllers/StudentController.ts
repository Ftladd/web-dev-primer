import { Request, Response } from 'express';
import {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
} from '../models/StudentModel';

/* function notImplemented(req: Request, res: Response): void {
  res.sendStatus(501); // 501 not Implemented
} */

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}
function createNewStudent(req: Request, res: Response): void {
  const studentData: NewStudentRequest = req.body;
  const didAddStudent = addStudent(studentData);
  if (didAddStudent === false) {
    res.sendStatus(409); // 409 conflict
    return;
  }
  res.sendStatus(201); // 201 created
}
function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params;
  const student = getStudent(studentName);
  if (student === undefined) {
    res.sendStatus(404); // Not found
    return;
  }
  res.json(student);
}
function getFinalExamScores(req: Request, res: Response): void {
  const { studentName } = req.params;
  const student = getStudent(studentName);
  if (student === undefined) {
    res.sendStatus(404); // Not found
    return;
  }
  const scores: FinalExamScores = {
    neededForA: calculateFinalExamScore(
      student.currentAverage,
      student.weights.finalExamWeight,
      90
    ),
    neededForB: calculateFinalExamScore(
      student.currentAverage,
      student.weights.finalExamWeight,
      80
    ),
    neededForC: calculateFinalExamScore(
      student.currentAverage,
      student.weights.finalExamWeight,
      70
    ),
    neededForD: calculateFinalExamScore(
      student.currentAverage,
      student.weights.finalExamWeight,
      60
    ),
  };
  res.json(scores);
}
function calcFinalScore(req: Request, res: Response): void {
  const { studentName } = req.params;
  const student = getStudent(studentName);
  if (student === undefined) {
    res.sendStatus(404); // Not found
    return;
  }
  const gradeData: AssignmentGrade = req.body;
  const overallScore: number =
    (gradeData.grade * student.weights.finalExamWeight +
      (100 - student.weights.finalExamWeight) * student.currentAverage) /
    100;
  const letterGrade = getLetterGrade(overallScore);
  res.json({ overallScore, letterGrade });
}
function updateGrade(req: Request, res: Response): void {
  const { studentName, assignmentName } = req.params;
  const { grade } = req.body;
  const update: boolean = updateStudentGrade(studentName, assignmentName, grade);
  if (!update) {
    res.sendStatus(404); // Not Found
    return;
  }
  res.sendStatus(200); // Okay!
}

export {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
