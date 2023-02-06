const mongoose = require('mongoose');

const notesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Note must have a title'],
      unique: true,
    },
    message: {
      type: String,
      required: [true, 'Please add your note'],
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;
