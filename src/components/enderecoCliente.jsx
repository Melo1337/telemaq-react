import { useEffect, useState } from "react";
import {fetchApi} from './../services/requestApiDataBase'

const ObterDadosEndereco = ({codigoCliente}) => {

    const [repositoryClientes, setRepositoryClientes] = useState({})

    useEffect(()=>{
        const initComponent = async () =>{
            try {
                const dataClientes = await fetchApi('/tables/clientes')
                setRepositoryClientes(dataClientes)
            } catch (error) {
                alert(error)
            }
        }
        initComponent()
    },[])

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
};

export default ObterDadosEndereco