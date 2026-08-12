import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import tokenService from "../services/token.service.js";
import User from "../models/user.model.js";
import tokenTypes from "../config/tokens.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Please authenticate"
      );
    }

    const token = authHeader.split(" ")[1];

    const payload = await tokenService.verifyToken(
      token,
      tokenTypes.ACCESS
    );

    const user = await User.findById(payload.sub);

    if (!user) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "User not found"
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;