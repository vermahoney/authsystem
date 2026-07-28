import express from "express";
import userRoute from "./src/routes/user.routes.js";
import {
  errorConverter,
  errorHandler,
} from "./src/middlewares/error.js";

const app = express();

app.use("/user", userRoute);

// Error Middlewares
app.use(errorConverter);
app.use(errorHandler);

export default app;

