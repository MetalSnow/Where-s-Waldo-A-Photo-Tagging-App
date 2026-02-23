import logo from '../../assets/icons/waldo-logo.png';
import styles from './Header.module.css';
import { CircleUserRound } from 'lucide-react';

const Header = ({ username }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <header className={styles.header}>
      <div>
        <img src={logo} alt="waldo-logo" />
        <h1>
          <span>WHERE'S</span> WALDO
        </h1>
      </div>
      <ul>
        <li>
          {' '}
          {user ? (
            <>
              <CircleUserRound /> {user.username}
            </>
          ) : username ? (
            <>
              <CircleUserRound /> {username}
            </>
          ) : (
            <button>Set Username</button>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
