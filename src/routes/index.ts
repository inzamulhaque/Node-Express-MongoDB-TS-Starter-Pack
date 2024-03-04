import { Router } from "express";
import { UserRoutes } from "../app/modules/user/user.route";
import { AuthRoutes } from "../app/modules/Auth/auth.route";

const router = Router();

const moduleRouters = [
  {
    path: "/auth",
    route: AuthRoutes,
  },

  {
    path: "/users",
    route: UserRoutes,
  },

  //  other routes
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
