import {
  changeStatusIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
  createStudentIntoDB,
  getMeFromDB,
} from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await createStudentIntoDB(req.file, password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created succesfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;

  const result = await getMeFromDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved succesfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await changeStatusIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status is updated succesfully",
    data: result,
  });
});

export { createStudent, createFaculty, createAdmin, getMe, changeStatus };
