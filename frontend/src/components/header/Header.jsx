import { Link } from 'react-router-dom';
import logo from '../../assets/icons/waldo-logo.png';
import styles from './Header.module.css';
import {
  CircleUserRound,
  ClipboardList,
  HouseHeart,
  SquarePen,
} from 'lucide-react';
import UpdateUser from '../user/UpdateUser';
import { useState } from 'react';

const Header = ({ username }) => {
  const [modal, setModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <UpdateUser modal={modal} setModal={setModal} />
      <header className={styles.header}>
        <div>
          <h1>
            <img src={logo} alt="waldo-logo" />
            <span>WHERE'S</span> WALDO
          </h1>
          <p>
            {' '}
            {user ? (
              <>
                <CircleUserRound size={23} /> {user.username}
              </>
            ) : username ? (
              <>
                <CircleUserRound size={23} /> {username}
              </>
            ) : (
              <button>Set Username</button>
            )}
            <button
              onClick={() => {
                setModal(true);
              }}
            >
              <SquarePen strokeWidth={3} />
            </button>
          </p>
        </div>
        <ul>
          <li>
            <Link to="/">
              <HouseHeart size={20} /> Lobby
            </Link>
          </li>
          <li>
            <Link to="/score-board">
              <ClipboardList size={20} /> Score Board
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
