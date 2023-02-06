import React from 'react';

function NoteItem(note) {
  const date = new Date(note?.createdAt).toLocaleString('en-US');
  return (
    <div className='goal'>
      <div>{date}</div>
      <h2>{note?.title}</h2>
      <p>{note?.message}</p>
      <button className='close'>X</button>
    </div>
  );
}

export default NoteItem;
