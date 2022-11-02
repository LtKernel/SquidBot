const { Schema, model } = require('mongoose');
const creatureSchema = new Schema({
  _id: Schema.Types.ObjectId,
  creature: String,
  name: String,
  map: String,
  owner: String,
  sex: String,
  health: Number,
  stamina: Number,
  oxygen: Number,
  food: Number,
  weight: Number,
  melee: Number,
  speed: Number,
});

module.exports = model('Creature', creatureSchema, 'creatures');