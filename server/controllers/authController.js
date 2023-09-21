const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const handleError = require("../utils/errorHandler");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser) {
      return handleError(res, 400, "Email already exists");
    }

    const newUser = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    handleError(res, 500, "Something went wrong. Please try again later.");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return handleError(res, 400, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) {
      return handleError(res, 400, "Invalid credentials");
    }

    const token = jwt.sign(
      { userId: findUser._id, email: findUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    handleError(res, 500, "Something went wrong. Please try again later.");
  }
};

module.exports = {
  register,
  login,
};
