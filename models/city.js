const { Schema, model } = require("mongoose");

const citySchema = Schema(
  {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    county: {
      type: String,
    },
    useCounty: {
      type: String,
    },
    type: {
      type: String,
    },
    stateEn: {
      type: String,
    },
    cityEn: {
      type: String,
    },
    countyEn: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const City = model("city", citySchema);

module.exports = { City };
