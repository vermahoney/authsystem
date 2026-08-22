import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import userService from "../services/user.service.js";

const getUsers = catchAsync(async (req, res) => {
  const filter = {};
  
  const options = {
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
  };

  const result = await userService.getUsers(
    filter,
    options
  );

  res.status(httpStatus.OK).send(result);
});

export default {
  getUsers,
};