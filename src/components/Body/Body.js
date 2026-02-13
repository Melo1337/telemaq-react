import './Body.css';
import whatsappImg from '../../img/whatsapp.png';
import servicesImg1 from '../../img/colocando-papel.jpg';
import servicesImg2 from '../../img/imp-tinta.jpg';
import servicesImg3 from '../../img/entregando-papel.jpg';
import aboutImg from '../../img/sobre-nos.jpg';
import Market from '../Market/market'

function Body() {
    return (
        <div className="Body">
            <section id="home" className="hero">
                <div className="container">
                    <h2>Soluções em Locação de Impressoras e Multifuncionais</h2>
                    <p>Oferecemos as melhores soluções em equipamentos de impressão para sua empresa com planos flexíveis e suporte especializado.</p>
                    <a href="https://wa.me/5532984195001?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20or%C3%A7amento%20de%20loca%C3%A7%C3%A3o!">
                        <div className="btn whatsapp">
                            <img src={whatsappImg} alt="whatsapp-icon" srcSet="" />
                            <h4>Solicitar Orçamento</h4>
                        </div>
                    </a>
                </div>
            </section>

            <section id="servicos" className="services">
                <div className="container">
                    <h2 className="section-title">Nossos Serviços</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <img src={servicesImg1} alt="Locação de Impressoras" />
                            <div className="service-content">
                                <h3>Locação de Impressoras</h3>
                                <p>Equipamentos de alta performance para todos os volumes de impressão, desde pequenas empresas até grandes corporações.</p>
                            </div>
                        </div>
                        <div className="service-card">
                            <img src={servicesImg2} alt="Locação de Multifuncionais" />
                            <div className="service-content">
                                <h3>Locação de Multifuncionais</h3>
                                <p>Equipamentos completos que imprimem, digitalizam, copiam e enviam fax, otimizando seu espaço e produtividade.</p>
                            </div>
                        </div>
                        <div className="service-card">
                            <img src={servicesImg3} alt="Suporte Técnico" />
                            <div className="service-content">
                                <h3>Suporte Técnico</h3>
                                <p>Assistência técnica especializada e preventiva para garantir o perfeito funcionamento dos equipamentos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="sobre" className="about-section">
                <div className="container about">
                    <div className="about-img">
                        <img src={aboutImg} alt="Sobre a Telemaq Copiadoras" />
                    </div>
                    <div className="about-content">
                        <h2>Sobre Nós</h2>
                        <p>A Telemaq Copiadoras está no mercado há mais de <strong>20 anos</strong>, oferecendo soluções completas em locação de equipamentos de impressão. Nossa missão é proporcionar aos nossos clientes tecnologia de ponta com custo acessível e suporte especializado.</p>
                        <p>Contamos com uma equipe de profissionais qualificados e uma ampla variedade de equipamentos das melhores marcas do mercado para atender desde pequenos escritórios até grandes corporações.</p>
                    </div>
                </div>
            </section>

            <section id="vantagens" className="benefits">
                <div className="container">
                    <h2 className="section-title">Vantagens de Alugar com a Telemaq</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <i className="fas fa-sync-alt"></i>
                            <h3>Atualização Constante</h3>
                            <p>Troca periódica dos equipamentos por modelos mais modernos sem custo adicional.</p>
                        </div>
                        <div className="benefit-card">
                            <i className="fas fa-headset"></i>
                            <h3>Suporte a Distancia</h3>
                            <p>Assistência técnica especializada disponível quando você precisar.</p>
                        </div>
                        <div className="benefit-card">
                            <i className="fas fa-chart-line"></i>
                            <h3>Custo Variável</h3>
                            <p>Pague apenas pelo que usar, sem investimento inicial em equipamentos.</p>
                        </div>
                        <div className="benefit-card">
                            <i className="fas fa-truck"></i>
                            <h3>Entrega e Instalação</h3>
                            <p>Entregamos, instalamos e configuramos os equipamentos no seu local.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="market">
                <div className="container">
                    <h2 className="section-title">Impressoras a venda</h2>
                    <div className="printers">
                        <Market />
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Body;
