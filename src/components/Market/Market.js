import { Link } from "react-router-dom";
import { useState } from 'react';
import './Market.css';

import listPrinters from "../../data/json/products.json";
import localProducts from "../../data/json/filter.json";
import ButtomWhatsapp from "../ButtomWhatsapp/ButtomWhatsapp";
import { fetchApi } from "../../services/requestProducts";

function Market() {
    const [dados, setDados] = useState(localProducts);

    const getApi = async () => {
        const data = await fetchApi()
        setDados(data)
    }
    getApi()

    return (
        <>
            <section id="produtos">
                <div className="container">

                    {Object.entries(listPrinters).map(([nomeDaCategoria, listaDeProdutos]) => (
                        <div key={nomeDaCategoria} className={nomeDaCategoria}>
                            <h1 className="text-xl font-bold uppercase">Impressoras</h1>

                            <div className="products">
                                {listaDeProdutos.map((product, index) => (
                                    <div className="product" id={index}>
                                        <h3 className="font-semibold">{product.nome}</h3>
                                        <div className="img"><img src={`/img/${product.imagemSrc}.jpg`} alt={product.nome} /></div>
                                        <p>{product.descricao}</p>
                                        <p><strong>R$ {product.preco},00</strong></p>

                                        <div className="buttons">
                                            <ButtomWhatsapp texto={"Comprar"} link={`Olá! Gostaria de saber mais sobre a impressora ${product.nome} que está anunciada no site!`} />
                                            <Link to={`/impressoras/${product.nome}`} state={{ id: index }}>
                                                <ButtomWhatsapp texto={"Ver detalhes"} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {dados && Object.entries(dados).map(([nomeDaCategoria]) => (
                        <div key={nomeDaCategoria} className={`${nomeDaCategoria} mb-4`}>
                            <h1 className="text-xl font-bold">{nomeDaCategoria}</h1>
                            <div className={`products ${nomeDaCategoria}`}>

                                {dados[nomeDaCategoria].map((product, index) => (
                                    <div className="product" id={product.codigo}>
                                        <h3 className="text-lg font-bold uppercase">{product.marca}</h3>
                                        <div className="img">
                                            <img src={`/img/products/${product.codigo}.webp`} alt={product.nome} />
                                        </div>
                                        <p className="descricao"><strong>Compativel: </strong>{product.descricao}</p>
                                        <p className="lines">___________________________________</p>
                                        <p>Quantidade disponivel: {product.estoque}</p>
                                        <p><strong>R$ {product.preco_venda},00</strong></p>
                                        <p>codigo: {product.codigo}</p>

                                        <div className="buttons">
                                            <ButtomWhatsapp texto={"Comprar"} link={`Olá! Gostaria de saber mais sobre o ${product.marca} que está anunciada no site!`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </>
    );
}

export default Market;
