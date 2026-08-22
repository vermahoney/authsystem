import User from "../models/user.model.js";

const getUsers = async (filter, options) => {
  return User.paginate(filter, options);
};

const createUser = async (userBody) => {
  return User.create(userBody);
};

const getUserById = async (userId) => {
  return User.findById(userId);
};

export default {
  getUsers,
  createUser,
  getUserById,
};