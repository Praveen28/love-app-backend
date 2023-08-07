const ObjectId = require("mongoose").Types.ObjectId;
const Income = require("../models/incomeModel");

exports.getIncomeData = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = await Income.find({ user_id: new ObjectId(userId) });
    if (userData.length > 0) {
      res
        .status(200)
        .json({ message: "Fetched user details...!!", userData, status: 1 });
    } else {
      res.status(200).json({
        message: "No records found for this user",
        userData,
        status: 0,
      });
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.postBankName = async (req, res, next) => {
  try {
    const userIncomeData = await Income.find({
      user_id: new ObjectId(req.body.id),
    });
    if (userIncomeData.length === 0) {
      const bankName = new Income({
        user_id: new ObjectId(req.body.id),
        bank_names: req.body.bankNames,
      });
      bankName.save();
    } else {
      const updateBankName = await Income.findOneAndUpdate(
        { user_id: new ObjectId(req.body.id) },
        { bank_names: req.body.bankNames }
      );
      if (updateBankName) {
        res.status(200).json({ message: "Bank names updated...!!", status: 1 });
      } else {
        res
          .status(500)
          .json({ message: "Failed to update bank names...!!", status: 0 });
      }
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.postIncomeData = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const incomeData = req.body.bankNames;
    incomeData._id = new ObjectId();
    const userData = await Income.findOne({
      user_id: new ObjectId(userId),
    });
    if (userData) {
      userData.account_data.push(incomeData);
      userData.save();

      res.status(200).json({
        message: "Income saved sucessfully...",
        incomeData: userData.account_data,
        status: 1,
      });
    } else {
      res
        .status(204)
        .json({ message: "No user available for this id...", status: 0 });
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.postDeleteIncomeData = async (req, res, next) => {
  try {
    await Income.updateOne(
      { user_id: req.body.userId },
      {
        $pull: {
          account_data: {
            _id: new ObjectId(req.body._id),
          },
        },
      }
    )
      .then(async (succ) => {
        if (succ.modifiedCount > 0) {
          const incomeData = await Income.findOne({ user_id: req.body.userId });
          res.status(200).json({
            message: "Item removed successfully....!!",
            status: 1,
            incomeData: incomeData.account_data,
          });
        } else {
          res.status(500).json({ message: "Failed to remove ", status: 0 });
        }
      })
      .catch((err) => console.log(err));
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
