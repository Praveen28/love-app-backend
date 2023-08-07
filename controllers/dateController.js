const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/userModel");
const Date = require("../models/dateModel");

exports.getDates = async (req, res, next) => {
  try {
    const user_data = await Date.findOne({
      user_id: new ObjectId(req.params.id),
    });
    if (!user_data) {
      return res.status(201).json({ message: "No data found", status: 0 });
    }
    res.status(201).json({
      message: "Fetched data successfully...",
      userData: user_data,
      status: 1,
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.postDates = async (req, res, next) => {
  try {
    const _id = new ObjectId();
    const dates = {
      _id,
      on_date: req.body.dates.on_date,
      next_date: req.body.dates.next_date,
    };
    const user = await User.findOne({
      _id: new ObjectId(req.body.prithi_id),
    });
    if (!user) {
      res.status(201).json({ message: "No user found", status: 0 });
    } else {
      let user_exist;
      user_exist = await Date.findOne({
        user_id: new ObjectId(req.body.prithi_id),
      });
      if (user_exist) {
        user_exist.period_dates.push(dates);
        user_exist.save();
      } else {
        user_exist = new Date({
          user_id: new ObjectId(req.body.prithi_id),
          period_dates: [dates],
        });
        new_user.save();
      }
      res.status(201).json({
        message: "Dates loaded successfully....",
        status: 1,
        userData: user_exist,
      });
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.postDeleteData = async (req, res, next) => {
  try {
    const user = await Date.findOne({ user_id: req.body.prithi_id });
    user.period_dates = user.period_dates.filter((item) => {
      return item._id.toString() !== req.body.id.toString();
    });
    await user.save();
    res.status(201).json({
      message: "Record has been deleted successfully",
      status: 1,
      dates: user.period_dates,
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
