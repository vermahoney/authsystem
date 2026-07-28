import httpStatus from "http-status";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const createUser = async (userBody) => {
  const isEmailTaken = await User.isEmailTaken(userBody.email);

  if (isEmailTaken) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Email already taken"
    );
  }

  return User.create(userBody);
};

export default {
  createUser,
};