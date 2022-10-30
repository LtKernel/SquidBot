const { Schema, model } = require('mongoose');
const librarySchema = new Schema({
  _id: Schema.Types.ObjectId,
  library: { type: String, required: true },
});

module.exports = model('Library', librarySchema, 'libraries');