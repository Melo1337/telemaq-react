import './Footer.css';

function Footer() {
    return (
        <footer className="Footer">
            <div className="container">
                <div className="footer-container">
                    <div className="footer-about">
                        <p>Soluções completas em locação de impressoras e multifuncionais para sua empresa.</p>
                        <div className="social-links">
                            <a href="https://wa.me/5532984195001"><i className="fab fa-whatsapp"></i></a>
                            <a href="https://www.instagram.com/telemaqcopiadoras/"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.youtube.com/@telemaq3693"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                    <div className="footer-links">
                        <h3>Links Rápidos</h3>
                        <ul>
                            <li><a href="#home">Início</a></li>
                            <li><a href="#servicos">Serviços</a></li>
                            <li><a href="#sobre">Sobre</a></li>
                            <li><a href="#vantagens">Vantagens</a></li>
                            <li><a href="#contato">Contato</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h3>Serviços</h3>
                        <ul>
                            <li><a href="#">Locação de Impressoras</a></li>
                            <li><a href="#">Locação de Multifuncionais</a></li>
                            <li><a href="#">Manutenção Preventiva</a></li>
                            <li><a href="#">Assistência Técnica</a></li>
                            <li><a href="#">Consumíveis</a></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h3>Contato</h3>
                        <ul>
                            <li><i className="fas fa-map-marker-alt"></i>R. Mariano Procópio, 65 - Centro, Juiz de Fora - MG</li>
                            <li><i className="fas fa-phone"></i>(32) 98419-5001<br/>(32) 98801-5053</li>
                            <li><i className="fas fa-envelope"></i> telemaqcopiadoras@gmail.com</li>
                            <li><i className="fas fa-clock"></i> Seg-Sex: 8h às 18h</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Telemaq Copiadoras. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
