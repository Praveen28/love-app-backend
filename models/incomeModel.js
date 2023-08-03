const ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    user_id: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    bank_names: {
      type: Array,
    },
    account_data: {
      type: [
        {
          type: Object,
          _id: new ObjectId(),
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
