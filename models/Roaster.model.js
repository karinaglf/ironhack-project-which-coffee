const { Schema, model } = require("mongoose");

const roasterSchema = new Schema({
  name: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  logo: { type: String, default: "../images/logo.png" },
  site: { type: String, required: true },
});

const Roaster = model("Roaster", roasterSchema);

module.exports = Roaster;
