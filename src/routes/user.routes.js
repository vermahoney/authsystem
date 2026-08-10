import { Router } from "express";
import User from "../models/user.model.js";

const router = Router();

// Basic test route
router.get("/", (req, res) => {
  res.send("User Route");
});

// Temporary pagination test route
router.get("/paginate-test", async (req, res, next) => {
  try {
    const result = await User.paginate(
      {},
      {
        page: req.query.page,
        limit: req.query.limit,
        sortBy: req.query.sortBy,
      }
    );

    res.send(result);
  } catch (error) {
    next(error);
  }
});

export default router;