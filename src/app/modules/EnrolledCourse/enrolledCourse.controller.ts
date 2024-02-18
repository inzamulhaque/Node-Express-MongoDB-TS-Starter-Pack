import httpStatus from "http-status";
import {
  createEnrolledCourseIntoDB,
  getMyenrolledCourseFromDB,
  updateEnrolledCourseMarksIntoDB,
} from "./enrolledCourse.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await createEnrolledCourseIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is enrolled succesfully",
    data: result,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await getMyenrolledCourseFromDB(userId, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrolled courses are retrivied succesfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await updateEnrolledCourseMarksIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Marks is updated succesfully",
    data: result,
  });
});

export {
  createEnrolledCourse,
  getMyEnrolledCourses,
  updateEnrolledCourseMarks,
};
