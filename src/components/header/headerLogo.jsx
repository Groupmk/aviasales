import Style from './header.module.scss';
import logoAir from './../../assets/img/logoAir.svg';

const Header = () => {
  const { logo } = Style;
  return <img src={logoAir} className={logo} alt="logo" />;
};

export default Header;
