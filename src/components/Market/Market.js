import listPrinters from "../../data/json/products.json";
import productsList from "../../data/json/filter.json";
import ButtomWhatsapp from "../ButtomWhatsapp/ButtomWhatsapp";
import { Link } from "react-router-dom";
import './Market.css'

function Market() {

    return (
        <>
            {Object.entries(listPrinters).map(([nomeDaCategoria, listaDeProdutos]) => (
                <div key={nomeDaCategoria} className={nomeDaCategoria}>
                    <h1>Impressoras a venda</h1>

                    <div className="products">
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

                    {Object.entries(productsList).map(([nomeDaCategoria]) => (
                        <><h1>{nomeDaCategoria}</h1>
                            <div className={`products ${nomeDaCategoria}`}>

                                {productsList[nomeDaCategoria].map((product, index) => (
                                    <div className="printer" id={product.codigo}>
                                    <h3>{product.descricao}</h3>
                                    <img src={`/img/products/${product.codigo}.jpeg`} alt={product.nome} />
                                    <p>Quantidade disponivel: {product.estoque}</p>
                                    <p><strong>R$ {product.preco_venda},00</strong></p>
                                    <p>codigo: {product.codigo}</p>

                                    <div className="buttons">
                                        <ButtomWhatsapp texto={"Comprar"} link={`Olá! Gostaria de saber mais sobre a impressora ${product.nome} que está anunciada no site!`} />
                                    </div>
                                </div>
                                ))}
                            </div></>
                    ))}
                </div>
            ))}
        </>
    );
}

export default Market;
