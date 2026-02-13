import './Header.css';

function Header() {
  return (
    <header className="Header">
      <div className="container header-container">
        <div className="logo">
          <h1>TELEMAQ</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Início</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#vantagens">Vantagens</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
          <div className="mobile-menu">
            <i className="fas fa-bars"></i>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
