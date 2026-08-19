import User from "../models/user.model.js";

const getUsers = async (filter, options) => {
  return User.paginate(filter, options);
};

export default {
  getUsers,
};