const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  ip: {
    type: String,
  },
  peoplePath: {
    type: String,
  },
  transportPath: {
    type: String,
  },
  popularPath: {
    type: String,
  },
  activitiesPath: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);