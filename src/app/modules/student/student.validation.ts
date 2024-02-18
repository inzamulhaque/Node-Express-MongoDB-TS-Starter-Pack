import { z } from "zod";

const GuardianValidationSchema = z
  .object({
    fatherName: z.string().nonempty().min(1).max(255).optional(),
    fatherOccupation: z.string().nonempty().min(1).max(255).optional(),
    fatherContactNo: z.string().nonempty().min(1).max(255).optional(),
    motherName: z.string().nonempty().min(1).max(255).optional(),
    motherOccupation: z.string().nonempty().min(1).max(255).optional(),
    motherContactNo: z.string().nonempty().min(1).max(255).optional(),
  })
  .nonstrict();

const LocalGuardianValidationSchema = z
  .object({
    name: z.string().nonempty().min(1).max(255).optional(),
    occupation: z.string().nonempty().min(1).max(255).optional(),
    contactNo: z.string().nonempty().min(1).max(255).optional(),
    address: z.string().nonempty().min(1).max(255).optional(),
  })
  .nonstrict();

const UserNameValidationSchema = z
  .object({
    firstName: z
      .string()
      .nonempty()
      .min(1)
      .max(20)
      .regex(/^[A-Z][a-z]*$/, { message: "First name should be capitalized" })
      .optional(),
    middleName: z.string().nonempty().min(1).max(255).optional(),
    lastName: z
      .string()
      .nonempty()
      .min(1)
      .max(255)
      .regex(/^[A-Za-z]+$/, {
        message: "Last name is not valid",
      }),
  })
  .nonstrict();

export const CreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(20).optional(),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloogGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: GuardianValidationSchema,
      localGuardian: LocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

export const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

export const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});
