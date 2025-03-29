import Container from '../ui/Container/Container';
import IconLogo from '/src/assets/logo.svg?react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <IconLogo className='header__logo' aria-hidden={true} height={70} />
          <span className="header__text">Тестовое задание</span>
        </div>
      </Container>
    </header>
  )
}

export default Header;