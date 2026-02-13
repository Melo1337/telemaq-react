import './Header.css';
import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';

function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="Header">
      <div className="container header-container">
        <Link to="/" onClick={closeMenu}>
          <div className="logo">
            <h1>TELEMAQ</h1>
          </div>
        </Link>
        <nav>
          <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
            {location.pathname === '/' ? (
              <>
                <li><a href="#home" onClick={closeMenu}>Início</a></li>
                <li><a href="#servicos" onClick={closeMenu}>Serviços</a></li>
                <li><a href="#sobre" onClick={closeMenu}>Sobre</a></li>
                <li><a href="#vantagens" onClick={closeMenu}>Vantagens</a></li>
                <li><a href="#produtos" onClick={closeMenu}>Produtos</a></li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={closeMenu}>Início</Link></li>
                <li><Link to="/" onClick={closeMenu}>Serviços</Link></li>
                <li><Link to="/" onClick={closeMenu}>Sobre</Link></li>
                <li><Link to="/" onClick={closeMenu}>Vantagens</Link></li>
                <li><Link to="/" onClick={closeMenu}>Produtos</Link></li>
              </>
            )}
          </ul>
          <div className="mobile-menu" onClick={toggleMenu}>
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
