import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
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
  unique: true,
  trim: true,
  lowercase: true,
  validate(value) {
    if (!validator.isEmail(value)) {
      throw new Error("Invalid email");
    }
  },
},


   password: {
  type: String,
  required: true,
  trim: true,
  minlength: 8,
  validate(value) {
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      throw new Error(
        "Password must contain at least one letter and one number"
      );
    }
  },
},

role: {
  type: String,
  default: "user",
},

isEmailVerified: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);

// 👇 Ye add karna hai
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });

  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;

  return bcrypt.compare(password, user.password);
};

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