const { Schema, model } = require("mongoose");

const coffeeSchema = new Schema({
  name: { type: String, required: true },
  process: {
    type: String,
    enum: ["Natural", "Washed", "Honey", "Other"],
    default: "Other",
    required: true,
  },
  originCountry: { type: String, required: true },
  variety: { type: String, required: true },
  roastType: { type: String, enum: ["Filter", "Espresso"], required: true },
  flavor: { type: String, required: true },
  roaster: {
    type: Schema.Types.ObjectId,
    ref: "Roaster",
  },
});

const Coffee = model("Coffee", coffeeSchema);

module.exports = Coffee;
