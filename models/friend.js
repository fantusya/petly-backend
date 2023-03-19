const { Schema, model } = require("mongoose");

const workDaysSchema = Schema({
  isOpen: {
    type: Boolean,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});

const friendSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    addressUrl: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    workDays: {
      type: [workDaysSchema],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Friend = model("friend", friendSchema);

module.exports = { Friend };
