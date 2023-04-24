const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 12,
  },
  age: {
    type: Number,
    default: 18,
    min: 0,
    max: 80,
  },
  scholarship: {
    merit: {
      type: Number,
      min: 0,
      default: 0,
    },
    other: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
