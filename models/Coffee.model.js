const { Schema, model } = require("mongoose");

const coffeeSchema = new Schema({
  name: { type: String, required: true },
  process: {
    type: String,
    enum: ["natural", "washed", "honeY", "other"],
    default: "other",
    required: true,
  },
  originCountry: { type: String, required: true },
  variety: { type: String, required: true },
  roastType: [{ type: String, enum: ["filter", "espresso"], required: true }],
  flavor: { type: String, required: true },
  roaster: { type: Schema.Types.ObjectId, ref: "Roaster" },
});

const Coffee = model("Coffee", coffeeSchema);

module.exports = Coffee;
