const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please inter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please inter your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please inter valid email'],
    },
    password: {
      type: String,
      required: [true, 'please inter your password'],
      minlength: [8, 'Too short password'],
    },
    // passwordConfirm: {
    //   type: String,
    //   required: [true, 'Please confirm your password'],
    //   validate: {
    //     validator(el) {
    //       return el === this.password;
    //     },
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
