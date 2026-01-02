import logo from '../../assets/icons/waldo-logo.png';
import styles from './Header.module.css';
import { CircleUserRound } from 'lucide-react';

const Header = () => {
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
          <CircleUserRound /> User
        </li>
      </ul>
    </header>
  );
};

export default Header;
