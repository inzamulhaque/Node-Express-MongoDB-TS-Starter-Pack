import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createSemesterRegistrationValidationSchema,
  upadateSemesterRegistrationValidationSchema,
} from "./semesterRegistration.validation";
import {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
} from "./semesterRegistration.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router: Router = Router();

router.post(
  "/create-semester-registration",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createSemesterRegistrationValidationSchema),
  createSemesterRegistration,
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(upadateSemesterRegistrationValidationSchema),
  updateSemesterRegistration,
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  getSingleSemesterRegistration,
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  getAllSemesterRegistrations,
);

export const semesterRegistrationRoutes = router;
