import express from "express";
import {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
} from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcdemicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from "./academicSemester.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-semester",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createAcdemicSemesterValidationSchema),
  createAcademicSemester,
);

router.get(
  "/:semesterId",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  getSingleAcademicSemester,
);

router.patch(
  "/:semesterId",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(updateAcademicSemesterValidationSchema),
  updateAcademicSemester,
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  getAllAcademicSemesters,
);

export const AcademicSemesterRoutes = router;
