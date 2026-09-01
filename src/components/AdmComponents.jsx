import { useEffect, useState, useRef } from "react";
import { fetchApi } from "../services/requestApiDataBase";
import ObterDadosEndereco from './../components/enderecoCliente'
import { useReactToPrint } from 'react-to-print';

const RenderizarChamados = () => {
    const [repositoryChamados, setRepositoryChamados] = useState([]);

    useEffect(() => {
        const inicializarComponente = async () => {
            try {
                const dataChamados = await fetchApi('/chamados');
                setRepositoryChamados(dataChamados);
            } catch (error) {
                alert(error)
            }
        }
        inicializarComponente();

    }, [])

    return Object.entries(repositoryChamados).map(([chave, chamado]) => (
        <div key={chave} className="m-4 border-2 border-gray-300 rounded-md p-4 md:m-10 w-10/12">
            <div className="flex justify-between">
                <p><strong>O.S. Número </strong>{chamado.codigo}</p>
                <p><strong>Data: </strong>{chamado.data_entrada?.split('T')[0].split('-').reverse().join('/')}</p>
            </div>
            <hr className="border-none h-[2px] bg-[#bdbdbd] my-5"></hr>
            <div className="md:flex justify-between">
                <div className="p-3">
                    <p><strong>Cod. Cliente: </strong>{chamado.codigo_cliente}</p>
                    <p><strong>Cliente: </strong>{chamado.nome_cliente}</p>
                    <p><strong>solicitante: </strong>{chamado.solicitante}</p>
                    <p><strong>telefone: </strong>{chamado.telefone}</p>
                </div>
                {chamado.codigo_equipamento === 0 ? (
                        <p><strong>Modelo equipamento: </strong>{chamado.nome_equipamento}</p>
                ) : (
                    <div className="printerModel p-3">
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
            <ObterDadosEndereco codigoCliente={chamado.codigo_cliente} />
        </div>
    ));
};

const RenderizarEquipamentos = ({ search }) => {
    const [repositoryEquipamentos, setRepositoryEquipamentos] = useState([]);

    useEffect(() => {
        const inicializarComponente = async () => {
            try {
                const dataEquipamentos = await fetchApi('/tables/equipamentos');
                setRepositoryEquipamentos(dataEquipamentos.SEM_GRUPO || dataEquipamentos);
            } catch (error) {
                alert(error)
            }
        }
        inicializarComponente();
    }, [])

    const equipFiltrados = search ? repositoryEquipamentos.filter(equip => {
        const termo = search.toLowerCase().replace(/\s+/g, '');
        const normalizar = (valor) => valor ? valor.toString().toLowerCase().replace(/\s+/g, '') : '';
        return (
            normalizar(equip.codigo).includes(termo) ||
            normalizar(equip.descricao).includes(termo) ||
            normalizar(equip.modelo).includes(termo) ||
            normalizar(equip.n_serie).includes(termo)
        );
    })
        : repositoryEquipamentos;

    if (equipFiltrados.length === 0) {
        return <p>Nenhum equipamento encontrado</p>;
    }

    return equipFiltrados.map((equip) => (
        <div key={equip.codigo || equip.n_serie} className="flex bg-gray-200 rounded-md p-4 mb-4 w-4/5 *:ms-4">
            <p className="text-blue-500 font-bold">{equip.codigo}.</p>
            <p className="w-96"><strong>Descrição: </strong>{equip.descricao}</p>
            <p><strong>Marca: </strong>{equip.marca}</p>
            <p><strong>Modelo: </strong>{equip.modelo}</p>
            <p><strong>N° serie: </strong>{equip.n_serie}</p>
        </div>
    ));
};

const GerarRecibos = () => {
    const [repositoryClientes, setRepositoryClientes] = useState([]);
    const [inputCodigo, setInputCodigo] = useState("");
    const [inputValor, setInputValor] = useState("");
    const [inputNumeroNota, setNumeroNota] = useState("");
    const [codigoCliente, setCodigoCliente] = useState("");
    const [nomeCliente, setNomeCliente] = useState("");

    const dataHoje = new Date();
    const data = dataHoje.toLocaleDateString('pt-BR');
    const diaAtual = dataHoje.getDate();
    const mesAtual = dataHoje.getMonth() + 1;
    const anoAtual = dataHoje.getFullYear();

    useEffect(() => {
        const inicializarComponente = async () => {
            try {
                const dataClientes = await fetchApi('/tables/clientes');
                setRepositoryClientes(dataClientes.SEM_GRUPO || dataClientes);
            } catch (error) {
                alert(error);
            }
        };
        inicializarComponente();
    }, []);

    useEffect(() => {
        if (!codigoCliente) {
            setNomeCliente("");
            return;
        }

        const listaClientes = repositoryClientes.SEM_GRUPO || repositoryClientes;
        if (listaClientes && listaClientes.length > 0) {
            const cliente = listaClientes.find(c => Number(c.codigo) === Number(codigoCliente));
            if (cliente) {
                setNomeCliente(cliente.nome);
            } else {
                setNomeCliente("Cliente Invalido");
            }
        }
    }, [codigoCliente, repositoryClientes]);

    const contentDocument = useRef();

    const handlePrint = useReactToPrint({
        contentRef: contentDocument,
        documentTitle: codigoCliente && nomeCliente ? `${nomeCliente}` : "sem nome",
    });

    const handleInserirCliente = (e) => {
        e.preventDefault();
        setCodigoCliente(inputCodigo);
    };

    const verificarCliente = () => {
        if (codigoCliente === "94") return <td colSpan="2">{nomeCliente} - <input></input></td>

        return  <td colSpan="2">{nomeCliente}</td>
    }

    const renderSelecterClient = () => {
        const listaClientes = repositoryClientes.SEM_GRUPO || repositoryClientes;
        const cliente = listaClientes.find(c => Number(c.codigo) === Number(codigoCliente));

        if (!codigoCliente) {
            return (
                <table className="table-fixed w-full border-2 border-gray-400 *:border-gray-400 *:border-2 *:font-bold">
                    <tbody>
                        <tr>
                            <td>
                                <div>Endereço:</div>
                                <div>Município:</div>
                                <div>CNPJ/CPF:</div>
                            </td>
                            <td>
                                <div>Bairro:</div>
                                <div>Estado:</div>
                                <div>Inscrição:</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        } else {
            if (!cliente) {
                return <h1 className="text-red-600 font-bold text-4xl">CODIGO DO CLIENTE INVALIDO!!!</h1>;
            } else {
                return (
                    <table className="table-fixed w-full border-2 border-gray-400 *:border-gray-400 *:border-2">
                        <tbody>
                            <tr className="font-bold text-xl border-2 border-gray-400">
                                {verificarCliente()}
                            </tr>
                            <tr>
                                <td>
                                    <div><strong>Endereço: </strong> {cliente.endereco}</div>
                                    <div><strong>Município: </strong> {cliente.cidade}</div>
                                    <div><strong>CNPJ/CPF: </strong> {cliente.cnpj_cpf}</div>
                                </td>
                                <td>
                                    <div><strong>Bairro: </strong> {cliente.bairro}</div>
                                    <div><strong>Estado: </strong> {cliente.uf}</div>
                                    <div><strong>Inscrição: </strong> {cliente.inscr_ident}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                );  
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleInserirCliente} className="*:p-2 *:radious- *:border *:border-gray-500">
                <input className="w-48 mr-2" placeholder="Codigo do cliente" value={inputCodigo} onChange={(e) => setInputCodigo(e.target.value)} />
                <input className="w-48 mr-2" placeholder="Valor da nota" value={inputValor} onChange={(e) => setInputValor(e.target.value)} />
                <input className="w-48 mr-2" placeholder="Numero da nota" value={inputNumeroNota} onChange={(e) => setNumeroNota(e.target.value)} />
                <button type="submit">Inserir</button>
            </form>

            <div ref={contentDocument} className="w-[800px] p-8 border *:mb-4 bg-white">
                <h1 className="text-center font-black text-4xl text-blue-800 mb-2">TELEMAQ COPIADORAS</h1>
                <div className="flex">
                    <div className="w-1/2">
                        <p className="text-xl font-bold">RECIBO DE LOCAÇÃO</p>
                        <p className="font-semibold">ALUGUEL DE IMPRESSORA E MULTIFUNCIONAL</p>
                        <p>Natureza da Operação: Locação</p>
                        <p>{"(32)98419-5001"} / {"(32)98801-5053"}</p>
                    </div>
                    <div className="w-1/2">
                        <p>RUA MARIANO PROCÓPIO 65, CENTRO</p>
                        <p>Cep. 36.045-010 - Juiz de Fora - Minas Gerais</p>
                        <p>CNPJ: 05.370.410/0001-48</p>
                        <p className="text-sm">Insc. Estadual 3672205330013 - CMC 093 027/00-1</p>
                    </div>
                </div>
                <p className="font-semibold text-red-700 text-sm text-center">DISPENSADA DE EMISSÃO DE NOTA FISCAL DE SERVIÇO CONFORME LEI COMPLEMENTAR 116 DE 31/07/2003</p>
                <p className="text-red-700 text-xl text-center font-bold">Recibo válido com comprovação de pagamento</p>
                <div className="flex justify-between *:font-bold *:text-xl">
                    <p>Emissão: {(Number(diaAtual) > 25) ? `${"1"}/${mesAtual + 1}/${anoAtual}` : data}</p>
                    <p>Nº: {inputNumeroNota ? inputNumeroNota : "00000"}</p>
                </div>
                <div>
                    {renderSelecterClient()}
                </div>
                <div>
                    <table className="table-fixed w-full border-2 border-gray-400">
                        <thead>
                            <tr className="bg-gray-200">
                                <th>Descriminação</th>
                                <th>Preço Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2">Locação de impressora</td>
                                <td className="p-2">{inputValor ? (`R$ ${inputValor}`) : "R$ 0,00"}</td>
                            </tr>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="*:p-5 even:bg-[#eeeeee]">
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="float-right font-bold underline text-xl">Total deste recibo: {inputValor ? (`R$ ${inputValor}`) : "R$ 0,00"}</p>
            </div>
            <div>
                <button onClick={handlePrint} className="bg-blue-200 p-2 rounded-lg border-2 border-blue-400 bold font-bold text-slate-500 m-8 w-56">imprimir</button>
            </div>
        </div>
    );
};

export { GerarRecibos , RenderizarEquipamentos, RenderizarChamados};