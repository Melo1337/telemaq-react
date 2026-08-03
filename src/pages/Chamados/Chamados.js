import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { fetchApi } from "../../services/requestApiDataBase";
import axios from "axios";

const Chamados = () => {
    const navigate = useNavigate();

    const [repositoryChamados, setRepositoryChamados] = useState([])
    const [repositoryClientes, setRepositoryClientes] = useState([])

    useEffect(() => {
        const inicializarComponente = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get("https://vicarly-undeprived-keira.ngrok-free.dev/api/validation", {
                    headers: { Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "true" }
                });

                console.log(`Acesso autorizado`);

                const dataChamados = await fetchApi('/chamados');
                setRepositoryChamados(dataChamados);

                const dataClientes = await fetchApi('/tables/clientes');
                setRepositoryClientes(dataClientes.SEM_GRUPO || dataClientes);

            } catch (error) {
                console.error("Status do Erro:", error.response?.status);
                console.error("Mensagem do Backend:", error.response?.data);
                alert("Acesso não autorizado");
                navigate("/login");
            }
        };

        inicializarComponente();
    }, [navigate]);

    const obterDadosCobranca = (codigoCliente) => {
        const listaClientes = repositoryClientes?.SEM_GRUPO || repositoryClientes;

        if (!listaClientes || !Array.isArray(listaClientes) || listaClientes.length === 0) {
            return <p className="text-gray-500">Carregando dados de endereço...</p>;
        }

        const cliente = listaClientes.find((c) => Number(c.codigo) === Number(codigoCliente));

        if (!cliente) {
            return <p className="text-red-500">Endereço não cadastrado</p>;
        }

        return (
            <div className="cobranca-container mt-2">
                <p><strong>Endereço: </strong>{cliente.endereco}, {cliente.bairro}, {cliente.cidade}, {cliente.uf} - {cliente.cep}</p>
            </div>
        );
    }

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
                                <p><strong>Cod. Cliente: </strong>{chamado.codigo_cliente}</p>
                                <p><strong>Cliente: </strong>{chamado.nome_cliente}</p>
                                <p><strong>solicitante: </strong>{chamado.solicitante}</p>
                                <p><strong>telefone: </strong>{chamado.telefone}</p>
                            </div>

                            {chamado.codigo_equipamento === 0 ? (
                                <div className="printerModel">
                                    <p><strong>Modelo equipamento: </strong>{chamado.nome_equipamento}</p>
                                </div>
                            ) : (
                                <div className="printerModel">
                                    <p><strong>Cod. equipamento: </strong>{chamado.codigo_equipamento}</p>
                                    <p><strong>Nome equipamento: </strong>{chamado.nome_equipamento}</p>
                                    <p><strong>Marca: </strong>{chamado.marca_equipamento}</p>
                                    <p><strong>Modelo equipamento: </strong>{chamado.modelo_equipamento}</p>
                                    <p><strong>n_serie_equipamento: </strong>{chamado.n_serie_equipamento}</p>
                                </div>
                            )}
                        </div>
                        <hr className="border-none h-[2px] bg-[#bdbdbd] my-5"></hr>
                        <p><strong>Diagnostico: </strong>{chamado.diagnostico}</p>

                        <hr className="border-none h-[2px] bg-[#bdbdbd] my-5"></hr>

                        {obterDadosCobranca(chamado.codigo_cliente)}
                    </div>
                ))}
            </section>
            <Footer />
        </>
    )
}

export default Chamados;
