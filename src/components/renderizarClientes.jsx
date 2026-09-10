import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../services/requestApiDataBase";

function RenderizarClientes({ search }) {

    const navigate = useNavigate();
    const [repositoryClientes, setRepositoryClientes] = useState([]);

    useEffect(() => {
        const carregarClientes = async () => {
            const dataClientes = await fetchApi('/tables/clientes');
            setRepositoryClientes(dataClientes.SEM_GRUPO || dataClientes);
        };

        carregarClientes();
    }, [navigate])

    const clientesFiltrados = (search && typeof search === 'string') ? repositoryClientes.filter((cliente) => {
        const termo = search.toLowerCase();
        return (
            cliente.nome?.toLowerCase().includes(termo) ||
            cliente.codigo?.toString().includes(termo) ||
            cliente.cnpj_cpf?.toString().includes(termo)
        );
    })
        : repositoryClientes;

    return clientesFiltrados.map((cliente) => (
        <div className="md:flex md:w-2/3 w-full gap-4 bg-gray-200 rounded-md p-4 mb-4 md:*:w-1/4" onClick={() => navigate(`/cliente/${cliente.codigo}`)}>
            <p><strong className="text-blue-500 mr-2">{cliente.codigo}.</strong>{cliente.nome}</p>
            {cliente.nome_fantasia !== null && (<p><strong className="mr-2">Fantasia:</strong>{cliente.nome_fantasia}</p>)}
            <p><strong className="mr-2">Doc:</strong>{cliente.cnpj_cpf}</p>
            <p><strong className="mr-2">Tel:</strong>{cliente.telefone}</p>
        </div>
    ));
};

export default RenderizarClientes