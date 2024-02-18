import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import {
  assignFacultiesWithCourseIntoDB,
  createCourseIntoDB,
  deleteCourseFromDB,
  getAllCoursesFromDB,
  getFacultiesWithCourseFromDB,
  getSingleCourseFromDB,
  removeFacultiesFromCourseFromDB,
  updateCourseIntoDB,
} from "./course.service";
import sendResponse from "../../utils/sendResponse";

const createCourse = catchAsync(async (req, res) => {
  const result = await createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Course is created succesfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrieved succesfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course is updated succesfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is deleted succesfully",
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await assignFacultiesWithCourseIntoDB(courseId, faculties);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties assigned successfully",
    data: result,
  });
});

const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await getFacultiesWithCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties retrieved successfully",
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await removeFacultiesFromCourseFromDB(courseId, faculties);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties removed  succesfully",
    data: result,
  });
});

export {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  getFacultiesWithCourse,
  removeFacultiesFromCourse,
};
