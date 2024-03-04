import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import userValidationSchema from "./user.validation";
import { createUser } from "./user.controller";

const router = express.Router();

router.post("/", validateRequest(userValidationSchema), createUser);

export const UserRoutes = router;
