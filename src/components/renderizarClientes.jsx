    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { fetchApi } from "../services/requestApiDataBase";

    function RenderizarClientes ({ search}) {

        const navigate = useNavigate();
        const [repositoryClientes, setRepositoryClientes] = useState([]);

        useEffect(() => {
            const carregarClientes = async () => {
            const dataClientes = await fetchApi('/tables/clientes');
            setRepositoryClientes(dataClientes.SEM_GRUPO || dataClientes);
            };

            carregarClientes();
        }, [navigate])

        const clientesFiltrados = (search && typeof search === 'string')
    ? repositoryClientes.filter((cliente) => {
        const termo = search.toLowerCase();
        return (
            cliente.nome?.toLowerCase().includes(termo) ||
            cliente.codigo?.toString().includes(termo) ||
            cliente.cnpj_cpf?.toString().includes(termo)
        );
        })
    : repositoryClientes;

        return clientesFiltrados.map((cliente) => (
            <div key={cliente.codigo} className="flex items-center space-evenly bg-gray-200 rounded-md p-4 mb-4 w-4/5 cursor-pointer" onClick={()=>navigate(`/cliente/${cliente.codigo}`)}>
                <p className="text-blue-500 font-bold">{cliente.codigo}.</p>
                <p className="ms-4"><strong>Nome: </strong>{cliente.nome}</p>
                {cliente.nome_fantasia !== null && (<p className="ms-4"><strong>Fantasia: </strong>{cliente.nome_fantasia}</p>)}
                <p className="ms-4"><strong>Doc: </strong>{cliente.cnpj_cpf}</p>
                <p className="ms-4"><strong>Tel: </strong>{cliente.telefone}</p>
            </div>
        ));
    };

    export default RenderizarClientes