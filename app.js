import express from "express";
import userRoute from "./src/routes/user.routes.js";

const app = express();

app.use("/user", userRoute);

export default app;


