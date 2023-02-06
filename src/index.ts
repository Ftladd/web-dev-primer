import express, { Express } from 'express';
import ip from 'ip';
import {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  notImplemented,
} from './controllers/StudentController';

const app: Express = express();
const PORT = 9080;
app.use(express.json());

app.get('/api/students', getAllStudents);
app.post('/api/students', createNewStudent);
app.get('/api/students/:studentName', getStudentByName);
app.get('/api/students/:studentName/finalExam', notImplemented);
app.post('/api/students/:studentName/finalExam', notImplemented);
app.post('/api/students/:studentName/grades/:assignmentName', notImplemented);

app.listen(PORT, () => {
  console.log(`App is listening on port http://${ip.address()}:${PORT}`);
});
