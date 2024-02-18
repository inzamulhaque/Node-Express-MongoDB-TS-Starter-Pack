import express, { NextFunction, Request, Response } from "express";
import {
  changeStatus,
  createAdmin,
  createFaculty,
  createStudent,
  getMe,
} from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CreateStudentValidationSchema } from "../student/student.validation";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { changeStatusValidationSchema } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("profileImg"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(CreateStudentValidationSchema),
  createStudent,
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  createFaculty,
);

router.post(
  "/create-admin",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  createAdmin,
);

router.patch(
  "/change-status/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(changeStatusValidationSchema),
  changeStatus,
);

router.get(
  "/me",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  getMe,
);

export const UserRoutes = router;
