import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { DemoModel, IDemo } from "./demo.interface";

const demoSchema = new Schema<IDemo, DemoModel>(
  {
    demoData: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "demo"],
    },
  },
  {
    timestamps: true,
  },
);

demoSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const Demo = model<IDemo, DemoModel>("Demo", demoSchema);

export default Demo;
