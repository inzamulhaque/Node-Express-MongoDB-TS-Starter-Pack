import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  getMyOfferedCoursesFromDB,
} from "./OfferedCourse.service";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await createOfferedCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course is created successfully !",
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllOfferedCoursesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OfferedCourses retrieved successfully !",
    data: result,
  });
});

const getMyOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await getMyOfferedCoursesFromDB(userId, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OfferedCourses retrieved successfully !",
    data: result,
  });
});

const getSingleOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleOfferedCourseFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OfferedCourse fetched successfully",
      data: result,
    });
  },
);

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await updateOfferedCourseIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OfferedCourse updated successfully",
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OfferedCourse deleted successfully",
    data: result,
  });
});

export {
  createOfferedCourse,
  getAllOfferedCourses,
  getMyOfferedCourses,
  getSingleOfferedCourses,
  updateOfferedCourse,
  deleteOfferedCourse,
};
