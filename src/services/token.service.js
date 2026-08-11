import jwt from "jsonwebtoken";
import config from "../config/config.js";
import Token from "../models/token.model.js";
import tokenTypes from "../config/tokens.js";

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

export default {
  generateToken,
  generateAuthTokens,
   verifyToken,
   findToken,
};