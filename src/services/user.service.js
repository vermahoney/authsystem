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


const updateUserById = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(
    userId,
    updateBody,
    {
      new: true,
      runValidators: true,
    }
  );

  return user;
};
const deleteUserById = async (userId) => {
  return User.findByIdAndDelete(userId);
};


export default {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};

