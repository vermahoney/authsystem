import express from "express";
import userRoute from "./src/routes/user.routes.js";
import passport from "passport";
import jwtStrategy from "./src/config/passport.js";
import {
  errorConverter,
  errorHandler,
} from "./src/middlewares/error.js";
import routes from "./src/routes/index.js";

const app = express();
app.use(express.json());
passport.use("jwt", jwtStrategy);

app.use(passport.initialize());
app.use(errorConverter);
app.use(errorHandler);

app.use("/v1", routes);

app.use("/user", userRoute);

// Error Middlewares
app.use(errorConverter);
app.use(errorHandler);

export default app;

