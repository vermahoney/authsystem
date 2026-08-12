import express from "express";
import userRoute from "./src/routes/user.routes.js";
import {
  errorConverter,
  errorHandler,
} from "./src/middlewares/error.js";
import routes from "./src/routes/index.js";

const app = express();
app.use(express.json());

app.use("/v1", routes);

app.use("/user", userRoute);

// Error Middlewares
app.use(errorConverter);
app.use(errorHandler);

export default app;

