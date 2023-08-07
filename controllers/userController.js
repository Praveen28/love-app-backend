const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

exports.login = async (req, res, next) => {
  try {
    const uname = req.body.uname;
    const pwd = req.body.pwd;
    const data = await User.find({ username: uname });
    if (data.length === 0) {
      res
        .status(401)
        .json({ message: "No user found for this username", status: 0 });
    } else {
      bcrypt.compare(pwd, data[0].password, (err, isMatch) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error occured in the server..!!", status: 0 });
        } else if (isMatch) {
          req.user = { id: data[0]._id, username: data[0].username };
          res.status(200).json({ message: "User logged in..!!", status: 1 });
        } else {
          res
            .status(401)
            .json({ message: "Passwords do not match", status: 0 });
        }
      });
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    res
      .status(200)
      .json({ message: "Fetched users list...", users, status: 1 });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
