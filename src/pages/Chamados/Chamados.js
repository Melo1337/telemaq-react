import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { fetchApi } from "../../services/requestProducts";


const Chamados = () => {

    const [repositoryChamados, setRepositoryChamados] = useState([])

    useEffect(() => {
        const getApiChamados = async () => {
            const data = await fetchApi('chamados')
            setRepositoryChamados(data)
        }
        getApiChamados()
    }, [])

    return (
        <>
            <Header />
            <section className="">
                {Object.entries(repositoryChamados).map(([chave, chamado]) => (
                    <div key={chave} className="my-10 border-2 border-gray-300 rounded-md p-8">
                        <div>
                            <p><strong>O.S. Número </strong>{chamado.codigo}</p>
                            <p><strong>Data: </strong>{chamado.data_entrada}</p>
                        </div>

                        <div>
                            <p><strong>Cliente: </strong>{chamado.nome_cliente}</p>
                            <p><strong>solicitante: </strong>{chamado.solicitante}</p>
                            <p><strong>telefone: </strong>{chamado.telefone}</p>

                        </div>

                        <div className="printerModel">
                            <p><strong>Cod. equipamento: </strong>{chamado.codigo_equipamento}</p>
                            <p><strong>Modelo equipamento: </strong>{chamado.nome_equipamento}</p>
                            <p><strong>Marca: </strong>{chamado.marca_equipamento}</p>
                            <p><strong>Modelo equipamento: </strong>{chamado.modelo_equipamento}</p>
                            <p><strong>n_serie_equipamento: </strong>{chamado.n_serie_equipamento}</p>
                        </div>

                        <div>
                            <p><strong>Modelo equipamento: </strong>{chamado.modelo_equipamento}</p>
                            <p><strong>n_serie_equipamento: </strong>{chamado.n_serie_equipamento}</p>
                        </div>
                    </div>
                ))}
            </section>
            <Footer />
        </>
    )
}

export default Chamados;