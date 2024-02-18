import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
} from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await createAcademicFacultyIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Academic faculty is created succesfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: "Academic faculties are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: "Academic faculty is retrieved succesfully",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await updateAcademicFacultyIntoDB(facultyId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty is updated succesfully",
    data: result,
  });
});

export {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
