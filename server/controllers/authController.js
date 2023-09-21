const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    res.send('Register route');
}

const login = async (req, res) => {
    res.send('Login route');
}

module.exports = { login, register };