const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imageType: {
    type: String,
    enum: ['people', 'transport', 'popular', 'activities']
  },
  pageX: {
    type: Number,
  },
  pageY: {
    type: Number,
  },
});

module.exports = mongoose.model('Image', ImageSchema);