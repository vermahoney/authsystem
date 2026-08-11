import mongoose from "mongoose";
import tokenTypes from "../config/tokens.js";

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(tokenTypes),
      required: true,
    },

  expires: {
  type: Date,
  required: true,
  index: { expires: 0 },
},

    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;