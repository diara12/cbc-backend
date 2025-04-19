import express from 'express';
import { getStudents, saveStudent } from '../controllers/studentController.js';

const studentRouter = express.Router()

studentRouter.get("/", getStudents);

studentRouter.post("/", saveStudent)

export default studentRouter; //only 1 default export in 1 file
