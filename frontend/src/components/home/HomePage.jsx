import Header from '../header/Header';
import Scenarios from '../scenarios/Scenarios';
import UserLogin from '../user/UserLogin';
// import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <UserLogin />
      <Header />
      <Scenarios />
    </>
  );
};

export default HomePage;
