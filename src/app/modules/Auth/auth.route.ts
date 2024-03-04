import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { loginValidationSchema } from "./auth.validation";
import { loginUser } from "./auth.controller";

const router: Router = Router();

router.post("/signin", validateRequest(loginValidationSchema), loginUser);

export const AuthRoutes = router;
