import listPrinters from "../../data/json/products.json";
import ButtomWhatsapp from "../ButtomWhatsapp/ButtomWhatsapp";
import { Link } from "react-router-dom";
import './Market.css'

function Market() {
    return (
        <div className="printers">
            {listPrinters.map((product, index) => {
                const precoFormatado = product.preco.toLocaleString("pt-BR", { 
                    style: "currency", 
                    currency: "BRL", 
                });

                return (
                    <div className="printer" id={index}>
                        <h3>{product.nome}</h3>
                        <img src={`/img/${product.imagemSrc}.jpg`} alt={product.nome} />
                        <p>{product.descricao}</p>
                        <p><strong>{precoFormatado}</strong></p>
                        
                        <div className="buttons">
                            <ButtomWhatsapp texto={"Comprar"} link={`Olá! Gostaria de saber mais sobre a impressora ${product.nome} que está anunciada no site!`} />
                            <Link to={`/PrinterDetails`} state={{ id: index }}>
                                <ButtomWhatsapp texto={"Ver detalhes"} />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Market;
