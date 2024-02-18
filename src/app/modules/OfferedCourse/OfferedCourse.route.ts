import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
} from "./OfferedCourse.validation";
import {
  createOfferedCourse,
  deleteOfferedCourse,
  getAllOfferedCourses,
  getMyOfferedCourses,
  getSingleOfferedCourses,
  updateOfferedCourse,
} from "./OfferedCourse.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router: Router = Router();

router.post(
  "/create-offered-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createOfferedCourseValidationSchema),
  createOfferedCourse,
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  getAllOfferedCourses,
);

router.get(
  "/my-offered-courses",
  auth(USER_ROLE.student),
  getMyOfferedCourses,
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  getSingleOfferedCourses,
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateOfferedCourseValidationSchema),
  updateOfferedCourse,
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  deleteOfferedCourse,
);

export const offeredCourseRoutes = router;
