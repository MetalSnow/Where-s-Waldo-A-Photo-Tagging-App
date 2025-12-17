import logo from '../../assets/waldo-logo.png';

const Header = () => {
  return (
    <div>
      <img src={logo} alt="waldo-logo" />
      <h1>
        <span>WHERE'S</span> WALDO
      </h1>
    </div>
  );
};

export default Header;
