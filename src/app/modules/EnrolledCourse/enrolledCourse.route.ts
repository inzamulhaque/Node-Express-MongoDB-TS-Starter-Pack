import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createEnrolledCourseValidationZodSchema,
  updateEnrolledCourseMarksValidationZodSchema,
} from "./enrolledCourse.validaton";
import {
  createEnrolledCourse,
  getMyEnrolledCourses,
  updateEnrolledCourseMarks,
} from "./enrolledCourse.controller";
import { USER_ROLE } from "../user/user.constant";

const router: Router = Router();

router.post(
  "/create-enrolled-course",
  auth(USER_ROLE.student),
  validateRequest(createEnrolledCourseValidationZodSchema),
  createEnrolledCourse,
);

router.get(
  "/my-enrolled-course",
  auth(USER_ROLE.student),
  getMyEnrolledCourses,
);

router.patch(
  "/update-enrolled-course-marks",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(updateEnrolledCourseMarksValidationZodSchema),
  updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
