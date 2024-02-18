import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  changePasswordIntoDB,
  forgetPasswordService,
  loginUserService,
  refreshTokenService,
  resetPasswordService,
} from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

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
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await changePasswordIntoDB(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password is updated succesfully!",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await refreshTokenService(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await forgetPasswordService(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset link is generated succesfully!",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await resetPasswordService(req.body, token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset succesful!",
    data: result,
  });
});

export {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
