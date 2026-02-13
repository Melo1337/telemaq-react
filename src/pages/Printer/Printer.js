import './PrinterDetails.css';
import { useLocation, Link} from "react-router-dom";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import listaProdutos from '../../data/json/products.json'
import ButtomWhatsapp from '../../components/ButtomWhatsapp/ButtomWhatsapp';

function Printer() {

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const location = useLocation();
    const IndexClick = location.state || {};

    const itemDetails = listaProdutos[IndexClick.id]

    function loadHeadFeatures(headFeatures) {
        return headFeatures.map(item => <li>{item}</li>)
    }

    function loadTable(detalhe) {
        const detalheHTML = Object.entries(detalhe).map(([titulo, valor]) => {
            return <tr>
                      <th>{titulo}</th>
                      <td>{valor}</td>
                    </tr>
        });
        return detalheHTML
    }

    function loadFeatures() {
        const featuresHTML = Object.entries(itemDetails.feature).map(([tituloFeature, detalhe]) => {
            return <div className="feature">
                <div className="btn-features">
                    <p>{tituloFeature}</p>
                </div>
                <table>
                    <tbody>
                        {loadTable(detalhe)}
                    </tbody>
                </table>
            </div>
        });

        return featuresHTML
    }

    return (
        <>
            <Header />
            <div className="container-printer">
                <Link to={`/`} className='return'>
                    <i class="fa-solid fa-arrow-left">
                        <p>{"Voltar"}</p>
                    </i>
                </Link>
                <div className="container-head">
                    <img src={`/img/${itemDetails.imagemSrc}.jpg`} alt="" />
                    <div className="head-details">
                        <h1>{itemDetails.nome}</h1>
                        <ul>
                            {loadHeadFeatures(itemDetails.headFeatures)}
                        </ul>
                        <h2>Valor: R$ {itemDetails.preco},00</h2>
                        <ButtomWhatsapp link={`Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20impressora%20${itemDetails.nome}!`} texto={"Comprar agora"} />
                    </div>
                </div>

                <div className="container-main">
                    {loadFeatures()}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Printer;
