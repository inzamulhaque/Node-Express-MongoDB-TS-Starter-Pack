import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  deleteAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
} from "./admin.controller";
import { updateAdminValidationSchema } from "./admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/", auth(USER_ROLE.admin), getAllAdmins);

router.get("/:id", auth(USER_ROLE.admin), getSingleAdmin);

router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(updateAdminValidationSchema),
  updateAdmin,
);

router.delete("/:adminId", auth(USER_ROLE.admin), deleteAdmin);

export const AdminRoutes = router;
