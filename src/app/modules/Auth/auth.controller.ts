import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { loginUserService } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 360,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: {
      accessToken,
    },
  });
});

export { loginUser };
