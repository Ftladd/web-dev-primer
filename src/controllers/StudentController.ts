import { Request, Response } from 'express';

function createNewStudent(req: Request, res: Response): void {
  res.sendStatus(501); // 501 not Implemented
}
function getStudentName(req: Request, res: Response): void {
  res.sendStatus(501); // 501 not Implemented
}

export { createNewStudent, getStudentName };
