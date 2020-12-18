const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  username: {type: String, required: true},

  ubication: {type: String, required: true},
  devProfile: {type: String, required: true},
  cohort: {type: Int8Array, required: true},
  status: {type: Boolean, required: true},
  experience: {type: String, required: true},
  salaryExpectations: {type: String, required: true},

  miVacants: {
    interested: [
      {
        type: Schema.ObjectId,
        ref: 'vacants',
        required: true
      }
    ],
    process: [
      {
        type: Schema.ObjectId,
        ref: 'vacants',
        required: true
      }
    ],
    completed: [
      {
        type: Schema.ObjectId,
        ref: 'vacants',
        required: true
      }
    ],
    required: true
  },

  recommendations: [{
    type: Schema.ObjectId,
    ref: 'vacants'
  }]
});

const model = mongoose.model('user', userSchema)

module.exports = model;