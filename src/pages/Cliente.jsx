import Header from "../components/Header/Header"
import { useParams } from 'react-router-dom';
import {fetchApi} from '../services/requestApiDataBase'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cliente() {
    const navigate = useNavigate();
    const { codigo } = useParams();
    const [repositoryClientes, setRepositoryClientes] = useState([]);
    const [repositoryEquipamentos, setRepositoryEquipamentos] = useState([]);

    useEffect(() => {
        const inicializar = async () => {
            const dataClientes = await fetchApi('/tables/clientes');
            setRepositoryClientes(dataClientes.SEM_GRUPO || dataClientes);

            const dataEquipamentos = await fetchApi('/tables/equipamentos')
            setRepositoryEquipamentos(dataEquipamentos.SEM_GRUPO || dataEquipamentos)
        }

        inicializar()
    }, [navigate])

    const cliente = repositoryClientes.find(cliente => cliente.codigo === Number(codigo));

    const normalizar = (texto) => texto ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : '';

    const equipamentos = repositoryEquipamentos.filter(equipamento => normalizar(equipamento.descricao).includes(normalizar(cliente.nome))) 

    const nomeSetores = equipamentos.map(equipamento => equipamento.descricao);

    console.log(nomeSetores);
    

    return (
        <>
            <Header />
            <div className="w-3/4 flex justify-center">
                {cliente ? (
                    <div className="w-3/4 flex justify-center">
                        <div>
                            <p>Codigo: {cliente.codigo}</p>
                            <p>Nome: {cliente.nome}</p>   
                            <p>telefone: {cliente.telefone}</p>
                            <p>telef_contato: {cliente.telef_contato}</p>
                            <p>contato: {cliente.contato}</p>
                            <p>cnpj_cpf: {cliente.cnpj_cpf}</p>
                            <p>inscr_ident: {cliente.inscr_ident}</p>
                            <p>data_cadastro: {cliente.data_cadastro}</p>
                            <p>filiacao: {cliente.filiacao}</p>
                            <p>e_mail1: {cliente.e_mail1}</p>
                            <p>e_mail2: {cliente.e_mail2}</p></div>
                        <div>
                            <p>Rua: {cliente.endereco}</p>
                            <p>bairro: {cliente.bairro}</p>
                            <p>cidade: {cliente.cidade}</p>
                            <p>uf: {cliente.uf}</p>
                            <p>cep: {cliente.cep}</p>
                        </div>
                    </div>
                ) : (
                    <p>User not found</p>
                )}

                
            </div>
        </>
    )
}

export default Cliente 