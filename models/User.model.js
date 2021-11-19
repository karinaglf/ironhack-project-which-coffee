const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["Customer", "Roaster", "Admin"],
      required: true,
      default: "Customer",
    },
    favoriteCoffees: [{ type: Schema.Types.ObjectId, ref: "Coffee" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
