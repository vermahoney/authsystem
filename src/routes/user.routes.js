import { Router } from "express";

import auth from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";

import userController from "../controllers/user.controller.js";
import userValidation from "../validation/user.validation.js";

const router = Router();

router.get(
  "/",
  auth("getUsers"),
  validate(userValidation.getUsers),
  userController.getUsers
);

router.post(
  "/",
  auth("manageUsers"),
  validate(userValidation.createUser),
  userController.createUser
);

export default router;