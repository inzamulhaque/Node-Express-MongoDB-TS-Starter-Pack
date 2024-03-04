import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    email: {
      type: String,
      required: [true, "Please provide email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      select: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  // hashing password and save into DB
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExistByEmail = async function (email: string) {
  const user = await User.findOne({ email }).select("+password");
  return user;
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
