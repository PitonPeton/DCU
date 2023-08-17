import { Router } from "express";
import studentsControllers from "../controllers/studentsControllers.controllers.js"

const router = Router()

router.get("/students", studentsControllers.students);
router.post("/students", studentsControllers.addStudent);
router.delete("/students/:id", studentsControllers.deleteStudent);

export default router;