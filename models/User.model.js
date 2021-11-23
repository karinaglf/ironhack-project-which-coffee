const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileType: {
      type: String,
      enum: ['roaster', 'coffeeLover'],
      required: true,
    },
    roaster: { type: Schema.Types.ObjectId, ref: 'Roaster' },
    favoriteCoffees: [{ type: Schema.Types.ObjectId, ref: 'Coffee' }],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
