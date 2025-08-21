import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { validateSignupData } from "../utils/validation.js";

export const signup = async (req, res) => {
  try {
   
    validateSignupData(req);

    const { name, email, password } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }


    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: passwordHash });
    const savedUser = await user.save();

    
    const token = await savedUser.getJWT();

    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Error in creating the user: " + error.message });
  }
};
