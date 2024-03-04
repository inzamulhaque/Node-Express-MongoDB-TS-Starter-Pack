import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(20, { message: "Password must not exceed 20 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        },
      ),
  }),
});

export default userValidationSchema;
