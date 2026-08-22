import httpStatus from "http-status";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import tokenService from "./token.service.js";

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

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Incorrect email or password"
    );
  }

  const tokens = await tokenService.generateAuthTokens(user);

  return {
    user,
    tokens,
  };
};
const refreshAuth = async (refreshToken) => {
  const tokens = await tokenService.refreshAuth(refreshToken);

  return tokens;
};

const logout = async (refreshToken) => {
  await tokenService.revokeToken(refreshToken);
};

const logoutAll = async (userId) => {
  await tokenService.revokeTokens(userId);
};

export default {
  createUser,
  loginUserWithEmailAndPassword,
  refreshAuth,
  logout,
  logoutAll,
};