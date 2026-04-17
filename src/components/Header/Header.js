import './Header.css';
import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';

function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const [busca, setBusca] = useState('')

  return (
    <header className="Header">
      <div className="container header-container">
        <Link to="/" onClick={closeMenu}>
          <div className="logo">
            <h1>TELEMAQ</h1>
          </div>
        </Link>

        <form>
          <input type='text' placeholder='Pesquisar produtos...' onChange={(e)=>setBusca(e.target.value)}></input>
          <Link to={`/resultado?busca=${busca}`}>
            <button type="submit">Pesquisar</button>
          </Link>
        </form>

        <nav>
          <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
            {location.pathname === '/' ? (
              <>
                <li><a href="#home" onClick={closeMenu}>Início</a></li>
                <li><a href="/Tutoriais" onClick={closeMenu}>Tutoriais</a></li>
                <li><a href="#sobre" onClick={closeMenu}>Sobre</a></li>
                <li><a href="#vantagens" onClick={closeMenu}>Vantagens</a></li>
                <li><a href="#produtos" onClick={closeMenu}>Produtos</a></li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={closeMenu}>Início</Link></li>
                <li><Link to="/Tutoriais" onClick={closeMenu}>Tutoriais</Link></li>
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
