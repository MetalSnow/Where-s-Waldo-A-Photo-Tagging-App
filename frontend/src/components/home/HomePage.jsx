import { useState } from 'react';
import Header from '../header/Header';
import Scenarios from '../scenarios/Scenarios';
import UserLogin from '../user/UserLogin';
// import styles from './HomePage.module.css';

const HomePage = () => {
  const [username, setUsername] = useState(null);
  return (
    <>
      <UserLogin setUsername={setUsername} />
      <Header username={username} />
      <Scenarios />
    </>
  );
};

export default HomePage;
