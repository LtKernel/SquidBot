const { Schema, model } = require('mongoose');
const creatureSchema = new Schema({
  _id: Schema.Types.ObjectId,
  health: Number,
});

module.exports = model('Creature', creatureSchema, 'creatures');