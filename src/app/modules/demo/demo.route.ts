import { Router } from "express";
import auth from "../../middlewares/auth";
import { getAllDemo } from "./demo.controller";

const router: Router = Router();

router.get("/", auth("admin", "demo"), getAllDemo);

const demoRouter = router;
export default demoRouter;
