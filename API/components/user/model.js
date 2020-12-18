const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  Fname: {type: String, required: true},
  Lname: {type: String, required: true},
  username: {type: String, required: true},

  location: {type: String, required: true},
  devProfile: {type: String, required: true},
  cohort: {type: Number, required: true},
  status: {type: Boolean, required: true},
  experience: {type: String, required: true},
  salaryExpectations: {type: String, required: true},

  myVacants: {
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
  },

  recommendations: [{
    type: Schema.ObjectId,
    ref: 'vacants'
  }]
});

const model = mongoose.model('user', userSchema);

module.exports = model;