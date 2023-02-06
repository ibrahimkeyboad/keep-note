const express = require('express');
const { protect } = require('../controllers/authController');
const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');

const router = express.Router();

router.route('/').get(protect, getAllNotes).post(protect, createNote);

router
  .route('/:id')
  .get(protect, getNote)
  .patch(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
