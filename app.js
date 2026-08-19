import express from "express";

import passport from "passport";
import jwtStrategy from "./src/config/passport.js";

import routes from "./src/routes/index.js";

import {
  errorConverter,
  errorHandler,
} from "./src/middlewares/error.js";

const app = express();

app.use(express.json());

// Passport
passport.use("jwt", jwtStrategy);
app.use(passport.initialize());

// Routes
app.use("/v1", routes);

// Error Middlewares
app.use(errorConverter);
app.use(errorHandler);

export default app;