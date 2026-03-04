import listPrinters from "../../data/json/products.json";
import ButtomWhatsapp from "../ButtomWhatsapp/ButtomWhatsapp";
import { Link } from "react-router-dom";
import './Market.css'

function Market() {
    return (
        <>
            {Object.entries(listPrinters).map(([nomeDaCategoria, listaDeProdutos]) => {
                return (
                    <div key={nomeDaCategoria} className={nomeDaCategoria}>
                        <h1>{nomeDaCategoria}</h1>

                        {listaDeProdutos.map((product, index) => (
                            <div className="printer" id={index}>
                                <h3>{product.nome}</h3>
                                <img src={`/img/${product.imagemSrc}.jpg`} alt={product.nome} />
                                <p>{product.descricao}</p>
                                <p><strong>R$ {product.preco},00</strong></p>

                                <div className="buttons">
                                    <ButtomWhatsapp texto={"Comprar"} link={`Olá! Gostaria de saber mais sobre a impressora ${product.nome} que está anunciada no site!`} />
                                    <Link to={`/PrinterDetails/${product.nome}`} state={{ id: index }}>
                                        <ButtomWhatsapp texto={"Ver detalhes"} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })}
        </>
    );
}

export default Market;
