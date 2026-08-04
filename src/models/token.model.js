import mongoose from "mongoose";
import { tokenTypes } from "../config/tokens.js";

const tokenSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);