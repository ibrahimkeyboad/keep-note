import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getNotes, reset } from '../app/notes/notesSlice';
import NoteForm from '../components/notes/note-form';
import NoteItem from '../components/notes/note-items';
import Spinner from '../components/spinner/loading';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notes, isLoading, isError, message, success } = useSelector(
    (state) => state.notes
  );
  const [addNote, setAddNote] = useState(false);

  const data = notes?.data?.notes;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate('/login');
    }

    if (success) {
      dispatch(reset());
    }

    dispatch(getNotes());
  }, [user, navigate, isError, success, message, dispatch]);

  function showAddHandler() {
    setAddNote((prevState) => !prevState);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Notes</p>
        <button onClick={showAddHandler} className='btn btn-block small'>
          +
        </button>
      </section>

      {addNote && <NoteForm />}
      {data?.length > 0 ? (
        <div className='content'>
          <div className='goals'>
            {data.map((note) => (
              <NoteItem key={note._id} {...note}></NoteItem>
            ))}
          </div>
        </div>
      ) : (
        <h3>no content</h3>
      )}
    </>
  );
}

export default Dashboard;
