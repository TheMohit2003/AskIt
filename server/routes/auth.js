// const router = require('express').Router();
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { register, login } = require("../controllers/authController");
// const auth = require('../middleware/auth');

// @route   POST /register
// @desc    Register new user
// @access  Public
router.route("/register").post(register);

// @route   POST /login
// @desc    Login user
// @access  Public
router.route("/login").post(login);

module.exports = router;
