import { z } from "zod";

export const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic department must be string",
      required_error: "Department name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic faculty must be string",
      required_error: "Faculty is required",
    }),
  }),
});

export const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic department must be string",
        required_error: "Department name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic faculty must be string",
        required_error: "Faculty is required",
      })
      .optional(),
  }),
});
