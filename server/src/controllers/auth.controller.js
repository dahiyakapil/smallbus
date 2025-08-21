import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { validateSignupData } from "../utils/validation.js";
import validator from "validator";

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


export const login = async (req, res) => {
    try {

        const { email, password } = req.body;



        if (!email || !password || !validator.isEmail(email)) {
            return res.status(401).json({ message: "Invalid email or password" });
        }


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = await user.getJWT();

        return res.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const getProfile = async (req, res) => {
    try {
        const user = req.user;
        console.log(user)

        return res.json({
            name: user.name,
            email: user.email
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};


export const updateUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findById(req.user._id); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) {
      user.name = name;
    }

    
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      user.password = passwordHash;
    }

    await user.save();

    return res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id; 

    await User.findByIdAndDelete(userId);

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};

