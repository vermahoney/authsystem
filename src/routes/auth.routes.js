import express from "express";
import validate from "../middlewares/validate.js";
import authValidation from "../validation/auth.validation.js";
import authController from "../controllers/auth.controller.js";


const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

router.post(
  "/login",
  validate(authValidation.login),
  authController.login
);



export default router;
// import {Router} from "express";
// import * as authController from "../controllers/auth.controller.js";


// const authRouter = Router();

// /**
//  * post /api/auth/register
//  */
// authRouter.post("/register" , authController.register);

// /**
//  * post/api/auth/login
//  */
// authRouter.post("/login", authcontrollleer.login)

// /**GET /api/auth/get-me */
// authRouter.get("/get-me", authController.getMe);

// /**
//  * GET/api/auth/refresh-token
//  * 
//  */


// authRouter.get("/refresh-token", authcontroller.refreshToken)

// /**
//  * GET/api/auth/logout
//  * 
//  */
// authRouter.get("/logout",authController.logout)

// /**
//  * GET/api/auth/logout-all
//  * 
//  */

// authRouter.get("/logout-all", authcontroller.logoutAll)
// export default authRouter;