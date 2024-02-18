import { Router } from "express";
import demoRouter from "../app/modules/demo/demo.route";

const router = Router();

const moduleRouters = [
  {
    path: "/demo",
    route: demoRouter,
  },

  //  other routes
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
