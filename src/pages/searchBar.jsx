import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { fetchApi } from '../services/requestApiDataBase';
import ButtomWhatsapp from '../components/ButtomWhatsapp/ButtomWhatsapp';

function Resultado() {
  const [searchParams] = useSearchParams();
  const busca = searchParams.get('busca')?.toLowerCase() || "";

  const [dados, setDados] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const data = await fetchApi('filter');
      setDados(data);
    };
    getApi();
  }, []);

  if (!dados) return <p>Carregando...</p>;

  const todosProdutos = Object.values(dados).flat();

  const resultado = todosProdutos.filter(produto =>
    produto.descricao?.toLowerCase().includes(busca) ||
    produto.observacoes?.toLowerCase().includes(busca) ||
    produto.marca?.toLowerCase().includes(busca)
  );

  return (
    <>
      <Header />
      <h2 className='font-bold my-4'>Resultados para: {busca}</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-6">
        {resultado.length > 0 ? (
          resultado.map(product => (
            <div className="product" id={product.codigo}>
              <h3>{product.marca}</h3>
              <div className="img">
                <img src={`/img/products/${product.codigo}.webp`} alt={product.nome} />
              </div>
              <p className="descricao"><strong>Compativel: </strong>{product.descricao}</p>
              <p className="lines">___________________________________</p>
              <p>Quantidade disponivel: {product.estoque}</p>
              <p>codigo: {product.codigo}</p>

              <div className="buttons">
                <ButtomWhatsapp texto={"Comprar"} link={`Olá! Gostaria de saber mais sobre o ${product.marca} que está anunciada no site!`} />
              </div>
            </div>
          ))
        ) : (
          <p className='flex mb-52'>Nenhum produto encontrado.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Resultado;
