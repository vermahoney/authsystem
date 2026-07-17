import {Router} from "express";
import * as authController from "../controllers/auth.controller.js";


const authRouter = Router();

/**
 * post /api/auth/register
 */
authRouter.post("/register" , authController.register);

/**GET /api/auth/get-me */
authRouter.get("/get-me", authController.getMe);

/**
 * GET/api/auth/refresh-token
 * 
 */


authRouter.get("/refresh-token", authcontroller.refreshToken)

/**
 * GET/api/auth/logout
 * 
 */
authRouter.get("/logout",authController.logout)
export default authRouter;