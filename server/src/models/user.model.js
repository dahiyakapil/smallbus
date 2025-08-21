import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "First name is required"],
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, "Email is required"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email address: " + value);
      }
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    validate: {
      validator: function (value) {
        return (
          value.length >= 8 &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /[0-9]/.test(value) &&
          /[!@#$%^&*]/.test(value)
        );
      },
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    },
  },


}, { timestamps: true });

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {

    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;

}

export default mongoose.model("User", userSchema);