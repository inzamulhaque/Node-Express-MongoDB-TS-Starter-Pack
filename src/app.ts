import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./routes";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());

// applications routes
app.use("/api/v1", router);

app.get("/", (req, res) =>
  res.status(httpStatus.OK).json({ message: "Node Express TS Starter Pack" }),
);

// api not found
app.all("*", notFound);

app.use(globalErrorHandler);
export default app;
