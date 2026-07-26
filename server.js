import mongoose from "mongoose";
import app from "./app.js";
import config from "./src/config/config.js";

mongoose.connect(config.mongoose.url).then(() => {
  console.log("Connected to MongoDB");

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
})
 .catch((err) => {
    console.error("mongodb connection failed:", err);
     process.exit(1);
  });