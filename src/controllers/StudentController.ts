import { Request, Response } from 'express';
import { students, addStudent, getStudent } from '../models/StudentModel';

function notImplemented(req: Request, res: Response): void {
  res.sendStatus(501); // 501 not Implemented
}
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
  res.sendStatus(201); // 209 created
}
function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params;
  const student = getStudent(studentName);
  if (getStudent === undefined) {
    res.sendStatus(404); // Not found
    return;
  }
  res.json(student);
}

export { getAllStudents, createNewStudent, getStudentByName, notImplemented };
