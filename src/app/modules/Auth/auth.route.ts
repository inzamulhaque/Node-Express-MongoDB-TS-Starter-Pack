import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
  resetPasswordValidationSchema,
} from "./auth.validation";
import {
  changePassword,
  forgetPassword,
  loginUser,
  refreshToken,
  resetPassword,
} from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router: Router = Router();

router.post("/login", validateRequest(loginValidationSchema), loginUser);

router.post(
  "/change-password",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  validateRequest(changePasswordValidationSchema),
  changePassword,
);

router.post(
  "/refresh-token",
  validateRequest(refreshTokenValidationSchema),
  refreshToken,
);

router.post(
  "/forget-password",
  validateRequest(forgetPasswordValidationSchema),
  forgetPassword,
);

router.post(
  "/reset-password",
  validateRequest(resetPasswordValidationSchema),
  resetPassword,
);

export const AuthRoutes = router;
