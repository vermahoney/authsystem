import { Router } from "express";
import User from "../models/user.model.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", auth("getUsers"), (req, res) => {
  res.send({
    message: "User Route",
    user: req.user,
  });
});

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