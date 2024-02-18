import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
} from "./academicFaculty.controller";
import {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
} from "./academicFaculty.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createAcademicFacultyValidationSchema),
  createAcademicFaculty,
);

router.get("/:facultyId", getSingleAcademicFaculty);

router.patch(
  "/:facultyId",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(updateAcademicFacultyValidationSchema),
  updateAcademicFaculty,
);

router.get("/", getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
