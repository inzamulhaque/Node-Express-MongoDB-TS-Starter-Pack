import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { getAllDemoFromDB } from "./demo.service";

export const getAllDemo = catchAsync(async (req, res) => {
  const result = await getAllDemoFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get All Demo Successfully",
    data: result,
  });
});