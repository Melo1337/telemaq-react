import listPrinters from "../../data/json/products.json";
import products from "../../data/json/filter.json";
import ButtomWhatsapp from "../ButtomWhatsapp/ButtomWhatsapp";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './Market.css'

const express = require('express');
const cors = require('cors'); // 1. Importe o CORS


function Market() {

useEffect(() => {
  fetch('https://vicarly-undeprived-keira.ngrok-free.dev/api/filter', {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true' // ADICIONE ISSO
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error('Erro na resposta do servidor');
      return resp.json();
    })
    .then((data) => {
      setDados(data);
    })
    .catch((err) => {
      console.log(`Api indisponivel, carregando arquivo local... ${err}`);
      setDados(products); // Carrega local se a API falhar
    });
}, []);

    return (
        <>
            <section id="produtos">
                <div className="container">

{Object.entries(listPrinters).map(([nomeDaCategoria, listaDeProdutos]) => (
                        <div key={nomeDaCategoria} className={nomeDaCategoria}>
                            <h1>Impressoras</h1>

                            <div className="products">
                                {listaDeProdutos.map((product, index) => (
                                    <div className="product" id={index}>
                                        <h3>{product.nome}</h3>
                                        <div className="img"><img src={`/img/${product.imagemSrc}.jpg`} alt={product.nome} /></div>
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
                        </div>
                    ))}

                    {dados && Object.entries(dados).map(([nomeDaCategoria]) => (
                        <div key={nomeDaCategoria} className={nomeDaCategoria}>
                            <h1>{nomeDaCategoria}</h1>
                            <div className={`products ${nomeDaCategoria}`}>

                                {dados[nomeDaCategoria].map((product, index) => (
                                    <div className="product" id={product.codigo}>
                                        <h3>{product.marca}</h3>
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
