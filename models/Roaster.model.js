const { Schema, model } = require('mongoose');

const roasterSchema = new Schema({
  name: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  logo: { type: String, default: '/images/img-logo-placeholder.jpeg' },
  website: { type: String, required: true },
  coffees: [{ type: Schema.Types.ObjectId, ref: 'Coffee' }],
});

const Roaster = model('Roaster', roasterSchema);

module.exports = Roaster;
