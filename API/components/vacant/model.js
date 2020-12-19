const mongoose = require('mongoose');

const { Schema } = mongoose;

const vacantSchema = new Schema({
  modality: { type: String, required: true },
  location: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  salary: { type: Number, required: false },
  experienceYear: Number, //{ type: Number, required: true },
  requirements: { type: String, required: true },
  url: { type: String, required: true },
  origin: String, //{ type: String, required: true },
  profile: { type: String, required: true },

  // usersId: [
  //   {
  //     type: Schema.ObjectId,
  //     ref: 'user',
  //     required: true,
  //   },
  // ],
});

const model = mongoose.model('vacants', vacantSchema);

module.exports = model;
