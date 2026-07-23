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
                    <div key={chave} className="m-4 border-2 border-gray-300 rounded-md p-8 md:m-10">
                        <div className="flex justify-between">
                            <p><strong>O.S. Número </strong>{chamado.codigo}</p>
                            <p><strong>Data: </strong>{chamado.data_entrada?.split('T')[0].split('-').reverse().join('/')}</p>
                        </div>
                        <hr className="border-none h-[2px] bg-[#bdbdbd] my-5"></hr>
                        <div className="md:flex justify-between">
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
                        </div>
                        <hr className="border-none h-[2px] bg-[#bdbdbd] my-5"></hr>
                        <p><strong>Diagnostico: </strong>{chamado.diagnostico}</p>

                    </div>
                ))}
            </section>
            <Footer />
        </>
    )
}

export default Chamados;