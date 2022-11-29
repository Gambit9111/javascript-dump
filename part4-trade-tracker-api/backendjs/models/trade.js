const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  asset: {
    type: String,
    required: true,
  },
  // type can only be long or short
  type: {
    type: String,
    required: true,
    enum: ["long", "short"],
  },
  pos_size_usd: {
    type: Number,
    required: true,
  },
  leverage: {
    type: Number,
    required: true,
  },
  entry_price: {
    type: Number,
    required: true,
  },
  entry_time: {
    type: Date,
    required: true,
  },
  // exit price can be null
  exit_price: {
    type: Number,
    required: false,
  },
  // exit time can be null
  exit_time: {
    type: Date,
    required: false,
  },
  // pnl can be null
  pnl_usd: {
    type: Number,
    required: false,
  },
  // pnl can be null
  pnl_percent: {
    type: Number,
    required: false,
  },
  // status can be only open or closed
  status: {
    type: String,
    required: true,
    enum: ["open", "closed"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

tradeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Trade", tradeSchema);