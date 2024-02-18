import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createCourseValidationSchema,
  facultiesWithCourseValidationSchema,
  updateCourseValidationSchema,
} from "./course.validation";
import {
  assignFacultiesWithCourse,
  createCourse,
  deleteCourse,
  getAllCourses,
  getFacultiesWithCourse,
  getSingleCourse,
  removeFacultiesFromCourse,
  updateCourse,
} from "./course.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createCourseValidationSchema),
  createCourse,
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  getSingleCourse,
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateCourseValidationSchema),
  updateCourse,
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  deleteCourse,
);

router.put(
  "/:courseId/assign-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(facultiesWithCourseValidationSchema),
  assignFacultiesWithCourse,
);

router.get(
  "/:courseId/get-faculties",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  getFacultiesWithCourse,
);

router.delete(
  "/:courseId/remove-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(facultiesWithCourseValidationSchema),
  removeFacultiesFromCourse,
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  getAllCourses,
);

export const CourseRoutes = router;
