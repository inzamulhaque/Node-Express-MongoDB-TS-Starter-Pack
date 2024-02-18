import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicDepartmemt,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDeartment,
} from "./academicDepartment.controller";
import {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from "./academicDepartment.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-department",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createAcademicDepartmentValidationSchema),
  createAcademicDepartmemt,
);

router.get("/:departmentId", getSingleAcademicDepartment);

router.patch(
  "/:departmentId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(updateAcademicDepartmentValidationSchema),
  updateAcademicDeartment,
);

router.get("/", getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;
