import {
  deleteStudentFromDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
} from "./student.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student are retrieved successfully",
    data: result,
  });
});

const getSingleStuden = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await getSingleStudentFromDB(studentId);
  // res.status(200).json({
  //   success: true,
  //   message: "Student is retrieved successfully",
  //   data: result,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrieved successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is updated succesfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

export { getAllStudents, getSingleStuden, deleteStudent, updateStudent };
