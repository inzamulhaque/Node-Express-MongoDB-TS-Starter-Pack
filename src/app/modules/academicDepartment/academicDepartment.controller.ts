import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
} from "./academicDepartment.service";

const createAcademicDepartmemt = catchAsync(async (req, res) => {
  const result = await createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Academic department is created succesfully",
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: "Academic departments are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await getSingleAcademicDepartmentFromDB(departmentId);

  sendResponse(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: "Academic department is retrieved succesfully",
    data: result,
  });
});

const updateAcademicDeartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await updateAcademicDepartmentIntoDB(departmentId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department is updated succesfully",
    data: result,
  });
});

export {
  createAcademicDepartmemt,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDeartment,
};
