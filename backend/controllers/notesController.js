const Note = require('../model/notesModel');
const User = require('../model/userModel');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json({
    status: 'success',
    results: notes.length,
    data: {
      notes,
    },
  });
});

exports.getNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      note,
    },
  });
});

exports.createNote = catchAsync(async (req, res, next) => {
  if (!req.body) {
    return next(new AppError('Please do not leave empty field'));
  }

  const note = await Note.create({
    user: req.user.id,
    title: req.body.title,
    message: req.body.message,
  });

  console.log(note);
  res.status(201).json({
    status: 'success',
    data: {
      note,
    },
  });
});

exports.updateNote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body);

  // check for current user
  if (!req.user) {
    return next(new AppError('user not foud', 401));
  }

  if (note.user.toString() !== req.user.id)
    if (!note) {
      return next(new AppError('Your have not such kind of note 😏', 404));
    }
  res.status(200).json({
    status: 'success',
    data: {
      goal,
    },
  });
});
exports.deleteNote = catchAsync(async (req, res, next) => {
  const note = await Note.deleteMany();

  if (!note) {
    return next(new AppError('Your have not such kinda of note 😏', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'You delete',
    data: {
      note,
    },
  });
});
