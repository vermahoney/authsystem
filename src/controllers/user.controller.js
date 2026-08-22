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

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).send({
    user,
  });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(
    req.params.userId
  );

  res.status(httpStatus.OK).send({
    user,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(
    req.params.userId,
    req.body
  );

  res.status(httpStatus.OK).send({
    user,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);

  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};