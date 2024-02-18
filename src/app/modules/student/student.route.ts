import express from "express";
import {
  deleteStudent,
  getAllStudents,
  getSingleStuden,
  updateStudent,
} from "./student.controller";
import { updateStudentValidationSchema } from "./student.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/", auth(USER_ROLE.superAdmin, USER_ROLE.admin), getAllStudents);

router.get(
  "/:studentId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  getSingleStuden,
);

router.patch(
  "/:studentId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateStudentValidationSchema),
  updateStudent,
);

// router.post('/create-student', createStudent);

router.delete(
  "/:studentId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  deleteStudent,
);

export const StudentRoutes = router;
