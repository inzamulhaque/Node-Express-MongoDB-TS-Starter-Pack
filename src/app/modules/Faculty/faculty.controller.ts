import httpStatus from "http-status";
import {
  deleteFacultyFromDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
} from "./faculty.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is retrieved succesfully",
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties are retrieved succesfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await updateFacultyIntoDB(id, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is updated succesfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is deleted succesfully",
    data: result,
  });
});

export { getAllFaculties, getSingleFaculty, deleteFaculty, updateFaculty };
