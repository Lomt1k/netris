import Container from '../Container/Container';
import IconLogo from '/src/assets/logo.svg?react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <IconLogo aria-hidden={true} height={40} />
          <span className="header__text">Тестовое задание</span>
        </div>
      </Container>
    </header>
  )
}

export default Header;