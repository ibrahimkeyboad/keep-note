import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../app/auth/auth';

export default function Header() {
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(logout());
    navigate('/login');
  }

  console.log(message);

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Keep notes</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={logoutHandler}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to='/login'>
                <FaSignInAlt />
              </NavLink>
            </li>
            <li>
              <NavLink to='/register'>
                <FaUser />
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
