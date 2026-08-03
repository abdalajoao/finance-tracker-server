import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// ==========================
// Signup Controller
// ==========================
const signup = async (req, res) => {
  try {
    // Get user data from request body
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    // Hash user password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return user without password
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    res.status(201).json(userResponse);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

// ==========================
// Login Controller
// ==========================
const login = async (req, res) => {
  try {

    // Get login data
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};;

export { signup, login };