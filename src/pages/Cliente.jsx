import Header from "../components/Header/Header"
import { useParams } from 'react-router-dom';
import { fetchApi } from '../services/requestApiDataBase'
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

    const equipamentosReduce = equipamentos.reduce((acumulador, itemAtual) => {
        const chave = itemAtual.descricao;

        if (!acumulador[chave]) {
            acumulador[chave] = [];
        }

        acumulador[chave].push(itemAtual);

        return acumulador;
    }, []);

    console.log(equipamentosReduce)


    return (
        <>
            <Header />
            <div className="w-[1200px] flex flex-col items-center">
                <button className="w-full" onClick={() => navigate(-1)}>Voltar</button>
                {cliente ? (
                    <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-md my-10 shadow-xl">
                        <div className="*:mb-5 w-full">
                            <div className="*:text-2xl flex content-center *:font-bold">
                                <p className="mr-3 text-blue-500">{cliente.codigo}.</p>
                                <p>{cliente.nome}</p>
                            </div>
                            <div className="flex w-full ">
                                <div>
                                    <p><strong>Telefone:</strong> {cliente.telefone}</p>
                                    <p><strong>CNPJ/CPF:</strong> {cliente.cnpj_cpf}</p>
                                    <p><strong>Inscrição/Identidade:</strong> {cliente.inscr_ident}</p>
                                </div>
                                <div>
                                    <p><strong>Data de cadastro:</strong> {cliente.data_cadastro}</p>
                                    <p><strong>Filiação:</strong> {(cliente.filiacao === null ? "Sem filiação" : cliente.filiacao)}</p>
                                    <p><strong>Email:</strong> {cliente.e_mail1}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex *:mr-3">
                            <p>Rua: {cliente.endereco} </p>
                            <p>bairro: {cliente.bairro} </p>
                            <p>cidade: {cliente.cidade} </p>
                            <p>uf: {cliente.uf} </p>
                            <p>cep: {cliente.cep} </p>
                        </div>
                    </div>
                ) : (
                    <p>User not found</p>
                )}

                {equipamentosReduce ? (
                    <div className="w-full">
                        {equipamentosReduce && (Object.entries(equipamentosReduce).map(([setor, arraySetor]) => (
                            <div className="mb-12">
                                <p className="font-bold">{setor}</p>
                                {arraySetor.map((equip) => (
                                    <div key={equip.codigo || equip.n_serie} className="flex bg-gray-200 rounded-md p-4 mb-4 w-1/2 *:ms-4">
                                        <p className="text-blue-500 font-bold">{equip.codigo}.</p>
                                        <p>{equip.marca}</p>
                                        <p>{equip.modelo}</p>
                                        <p><strong>N° serie: </strong>{equip.n_serie}</p>
                                    </div>
                                ))}
                            </div>
                        )))}
                    </div>
                ) : <p>Nao foi encontrado impressoras!</p>}
            </div>
        </>
    )
}

export default Cliente 