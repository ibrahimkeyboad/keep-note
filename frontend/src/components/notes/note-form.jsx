import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../app/notes/notesSlice';

function NoteForm() {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
  });
  const { title, message } = formData;

  const dispatch = useDispatch();

  function changeHandler(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function addNoteHandler(e) {
    e.preventDefault();
    const note = {
      title,
      message,
    };
    dispatch(createNote(note));
  }

  return (
    <div className='form'>
      <form onSubmit={addNoteHandler}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='form-control'
            name='title'
            id='title'
            value={title}
            onChange={changeHandler}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Message</label>
          <textarea
            name='message'
            id='message'
            cols='30'
            rows='10'
            value={message}
            onChange={changeHandler}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block'>Add Note</button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
