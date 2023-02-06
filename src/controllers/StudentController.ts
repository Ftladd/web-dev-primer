import { Request, Response } from 'express';

function notImplemented(req: Request, res: Response): void {
  res.sendStatus(501); // 501 not Implemented
}
function createNewStudent(req: Request, res: Response): void {
  console.log('\nPOST /api/students');
  console.log(req.body);

  // echo
  res.json(req.body);
}
function getStudentData(req: Request, res: Response): void {
  res.sendStatus(501);
}

export { createNewStudent, getStudentData, notImplemented };
