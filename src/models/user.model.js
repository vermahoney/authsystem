import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Username is required"],
//     unique: [true, "Username must be unique"]
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: [true, "Email must be unique"]
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"]
//   },
//   verified:{
//     type:Boolean,
//     default: false,
//   }
// });

// const Usermodel = mongoose.model("User", userSchema);
// export default Usermodel;