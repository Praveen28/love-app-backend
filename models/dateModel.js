const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const Schema = mongoose.Schema;

const dateSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  period_dates: {
    type: Array,
  },
});

module.exports = mongoose.model("Date", dateSchema);
