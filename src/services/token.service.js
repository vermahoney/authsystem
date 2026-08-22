import jwt from "jsonwebtoken";
import config from "../config/config.js";
import Token from "../models/token.model.js";
import User from "../models/user.model.js";
import tokenTypes from "../config/tokens.js";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

const generateToken = (
  userId,
  expires,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    type,
  };

  return jwt.sign(payload, secret, {
    expiresIn: expires,
  });
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = config.jwt.accessExpirationMinutes + "m";

  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires =
    config.jwt.refreshExpirationDays + "d";

  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  await Token.create({
    token: refreshToken,
    user: user.id,
    type: tokenTypes.REFRESH,
    expires: new Date(
      Date.now() +
        config.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000
    ),
  });

  return {
    access: {
      token: accessToken,
      expires: new Date(
        Date.now() +
          config.jwt.accessExpirationMinutes * 60 * 1000
      ),
    },
    refresh: {
      token: refreshToken,
      expires: new Date(
        Date.now() +
          config.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000
      ),
    },
  };
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);

  if (payload.type !== type) {
    throw new Error("Invalid token type");
  }

  return payload;
};
const findToken = async (token, type) => {
  const tokenDoc = await Token.findOne({
    token,
    type,
    blacklisted: false,
  });

  return tokenDoc;
};
const refreshAuth = async (refreshToken) => {
  const payload = await verifyToken(
    refreshToken,
    tokenTypes.REFRESH
  );

  const tokenDoc = await findToken(
    refreshToken,
    tokenTypes.REFRESH
  );

  if (!tokenDoc) {
    throw new Error("Refresh token not found");
  }

  const user = await User.findById(tokenDoc.user);

  if (!user) {
    throw new Error("User not found");
  }

  await Token.findByIdAndUpdate(tokenDoc._id, {
    blacklisted: true,
  });

  const tokens = await generateAuthTokens(user);

  return tokens;
};

const revokeToken = async (refreshToken) => {
  const tokenDoc = await findToken(
    refreshToken,
    tokenTypes.REFRESH
  );

  if (!tokenDoc) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Refresh token not found"
    );
  }

  tokenDoc.blacklisted = true;

  await tokenDoc.save();

  return tokenDoc;
};

const revokeTokens = async (userId) => {
  await Token.updateMany(
    {
      user: userId,
      type: tokenTypes.REFRESH,
      blacklisted: false,
    },
    {
      $set: {
        blacklisted: true,
      },
    }
  );
};

export default {
  generateToken,
  generateAuthTokens,
   verifyToken,
   findToken,
   refreshAuth,
   revokeToken,
    revokeTokens,
};