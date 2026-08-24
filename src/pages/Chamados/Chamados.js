import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { fetchApi } from "../../services/requestApiDataBase";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import RenderizarContador from '../../components/contador'

const Chamados = () => {
    const navigate = useNavigate();
    const [repositoryChamados, setRepositoryChamados] = useState([]);
    const [repositoryClientes, setRepositoryClientes] = useState([]);
    const [repositoryEquipamentos, setRepositoryEquipamentos] = useState([]);
    const [abaAtiva, setAbaAtiva] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const inicializarComponente = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get("https://vicarly-undeprived-keira.ngrok-free.dev/api/validation", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                console.log(`Acesso autorizado`, response);

                const dataChamados = await fetchApi('/chamados');
                setRepositoryChamados(dataChamados);

                const dataClientes = await fetchApi('/tables/clientes');
                setRepositoryClientes(dataClientes.SEM_GRUPO || dataClientes);

                const dataEquipamentos = await fetchApi('/tables/equipamentos');
                setRepositoryEquipamentos(dataEquipamentos.SEM_GRUPO || dataEquipamentos);

            } catch (error) {
                console.error("Status do Erro:", error.response?.status);
                console.error("Mensagem do Backend:", error.response?.data);
                alert("Acesso não autorizado");
                navigate("/login");
            }
        };
        inicializarComponente();
    }, [navigate]);

    const alternarAba = (nomeAba) => {
        if (abaAtiva === nomeAba) {
            setAbaAtiva(null);
        } else {
            setAbaAtiva(nomeAba);
        }
        setSearch("");
    };

    const obterDadosEndereco = (codigoCliente) => {
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

    const renderizarChamados = () => {
        return Object.entries(repositoryChamados).map(([chave, chamado]) => (
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
                {obterDadosEndereco(chamado.codigo_cliente)}
            </div>
        ));
    };

    const renderizarClientes = () => {
        const clientesFiltrados = search
            ? repositoryClientes.filter(cliente => {
                const termo = search.toLowerCase();
                return (
                    cliente.nome?.toLowerCase().includes(termo) ||
                    cliente.codigo?.toString().includes(termo) ||
                    cliente.cnpj_cpf?.toString().includes(termo)
                );
            })
            : repositoryClientes;

        return clientesFiltrados.map((cliente) => (
            <div key={cliente.codigo} className="flex items-center space-evenly bg-gray-200 rounded-md p-4 mb-4 w-4/5 ">
                <p className="text-blue-500 font-bold">{cliente.codigo}.</p>
                <p className="ms-4"><strong>Nome: </strong>{cliente.nome}</p>
                {cliente.nome_fantasia !== null && (<p className="ms-4"><strong>Fantasia: </strong>{cliente.nome_fantasia}</p>)}
                <p className="ms-4"><strong>Doc: </strong>{cliente.cnpj_cpf}</p>
                <p className="ms-4"><strong>Tel: </strong>{cliente.telefone}</p>
            </div>
        ));
    };

    const renderizarEquipamentos = () => {
        const equipFiltrados = search
            ? repositoryEquipamentos.filter(equip => {
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
            <div key={equip.codigo || equip.n_serie} className="flex items-center space-evenly bg-gray-200 rounded-md p-4 mb-4 w-4/5 ">
                <p className="text-blue-500 font-bold">{equip.codigo}.</p>
                <p className="ms-4"><strong>descrição: </strong>{equip.descricao}</p>
                <p className="ms-4"><strong>marca: </strong>{equip.marca}</p>
                <p className="ms-4"><strong>modelo: </strong>{equip.modelo}</p>
                <p className="ms-4"><strong>n_serie: </strong>{equip.n_serie}</p>
            </div>
        ));
    };

    const GerarRecibos = () => {
        const contentDocument = useRef();

        const dataHoje = new Date()
        const data = dataHoje.toLocaleDateString('pt-BR');

        const handlePrint = useReactToPrint({
            contentRef: contentDocument,
        });

        const [inputCodigo, setInputCodigo] = useState("");
        const [inputValor, setInputValor] = useState("");
        const [inputNumeroNota, setNumeroNota] = useState("");
        const [codigoCliente, setCodigoCliente] = useState("");

        const handleInserirCliente = (e) => {
            e.preventDefault();
            setCodigoCliente(inputCodigo);
        }

        const renderSelecterClient = () => {

            const listaClientes = repositoryClientes.SEM_GRUPO || repositoryClientes

            const cliente = listaClientes.find(c => Number(c.codigo) === Number(codigoCliente));

            if (!codigoCliente) {
                return (
                    <table className="table-fixed w-full border-2 border-gray-400 *:border-gray-400 *:border-2 *:font-bold">
                        <tr>_</tr>
                        <td>
                            <tr>Endereco:</tr>
                            <tr>municipio:</tr>
                            <tr>cnpj:</tr>
                        </td>
                        <td>
                            <tr>Bairro:</tr>
                            <tr>Estado:</tr>
                            <tr>Inscricao:</tr>
                        </td>
                    </table>
                )
            } else {
                return (
                    <table className="table-fixed w-full border-2 border-gray-400 *:border-gray-400 *:border-2">
                        <tr className="font-bold text-xl">{`__${cliente.nome}`}</tr>
                        <td>
                            <tr><strong>Endereco: </strong> {cliente.endereco}</tr>
                            <tr><strong>municipio: </strong> {cliente.cidade}</tr>
                            <tr><strong>cnpj: </strong> {cliente.cnpj_cpf}</tr>
                        </td>
                        <td>
                            <tr><strong>Bairro: </strong> {cliente.bairro}</tr>
                            <tr><strong>Estado: </strong> {cliente.uf}</tr>
                            <tr><strong>Inscricao: </strong> {cliente.inscr_ident}</tr>
                        </td>
                    </table>
                );
            }
        }

        return (
            <div>
                <div className="flex justify-center">
                    <button onClick={handlePrint} className="bg-blue-200 p-2 rounded-lg border-2 border-blue-400 bold font-bold text-slate-500">imprimir</button>
                </div>

                <form className="*: border-2 p-2 radious-">
                    <input placeholder="Digite o codigo do cliente" value={inputCodigo} onChange={(e) => setInputCodigo(e.target.value)}></input>
                    <input placeholder="Digite o valor" value={inputValor} onChange={(e) => setInputValor(e.target.value)}></input>
                    <input placeholder="Digite Numero da nota" value={inputNumeroNota} onChange={(e) => setNumeroNota(e.target.value)}></input>
                    <button type="submit" onClick={handleInserirCliente}>Inserir</button>
                </form>

                <div ref={contentDocument} className="w-[800px] p-8 border *:mb-4">
                    <h1 className="text-center font-black text-4xl text-blue-800 mb-2">TELEMAQ COPIADORAS</h1>
                    <div className="flex">
                        <div className="w-1/2">
                            <p className="text-xl font-bold">RECIBO DE SERVIÇO</p>
                            <p className="font-semibold">ALUGUEL DE IMPRESSORA E MULTIFUNCIONAL</p>
                            <p>Natureza da Operação: Prestação de Serviços</p>
                            <p className="">{"(32)98419-5001"} / {"(32)98801-5053"}</p>
                        </div>
                        <div className="w-1/2">
                            <p className="">RUA MARIANO PROCÓPIO 65, CENTRO - Cep. 36.045-010 - Juiz de Fora - Minas Gerais</p>
                            <p className="">CNPJ: 05.370.410/0001-48 - Insc. Estadual 367 220533 0013 - CMC 093 027/00-1</p>
                        </div>
                    </div>
                    <p className="font-semibold text-red-700 text-sm text-center">DISPENSADA DE EMISSÃO DE NOTA FISCAL DE SERVIÇO CONFORME LEI COMPLEMENTAR 116 DE 31/07/2003</p>
                    <p className="text-red-700 text-xl text-center font-bold">Recibo valido com comprovacao de pagamento</p>
                    <div className="flex justify-between *:font-bold *:text-xl">
                        <p>Emissão: {data}</p>
                        <p>Nº: {inputNumeroNota ? inputNumeroNota : "00000"}</p>
                    </div>
                    <div>
                        {renderSelecterClient()}
                    </div>
                    <div>
                        <table className="table-fixed w-full border-2 border-gray-400">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="w-20">Quant.</th>
                                    <th className="w-20">Unid.</th>
                                    <th className="w-[260px]">Descrição dos Serviços</th>
                                    <th>Preço Unitário</th>
                                    <th>Preço Total R$</th>
                                </tr>
                            </thead>

                            <tbody >
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Locação de impressora</td>
                                    <td></td>
                                    <td>{inputValor ? (`R$ ${inputValor},00`) : "R$ 0,00"}</td>
                                </tr>
                                {[...Array(5)].map((_, index) => (
                                    <tr className="*:p-5">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="float-right font-bold underline text-xl">Total deste recibo: {inputValor ? (`R$ ${inputValor},00`) : "R$ 0,00"}</p>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />
            <section className="flex flex-col items-center">
                <div className="tables flex *:flex *:flex-col *:items-center *:p-8 *:border-2 *:border-black-900 *:rounded-md *:m-8 *:cursor-pointer">
                    <div onClick={() => alternarAba('chamados')}>
                        <h1>Chamados</h1>
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                    </div>
                    <div onClick={() => alternarAba('clientes')}>
                        <h1>Clientes</h1>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div onClick={() => alternarAba('equipamentos')}>
                        <h1>Equipamentos</h1>
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                    </div>
                    <div onClick={() => alternarAba('recibos')}>
                        <h1>Recibos Locação</h1>
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                    </div>
                    <div onClick={() => alternarAba('contador')}>
                        <h1>Contadores</h1>
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                    </div>
                </div>

                <div className="flex flex-col items-center w-full">
                    {(abaAtiva === 'clientes' || abaAtiva === 'equipamentos') && (
                        <input
                            type="text"
                            placeholder={`Pesquisar em ${abaAtiva}...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-2 border-gray-400 p-2 rounded-md w-full max-w-md mb-4"
                        />
                    )}

                    {abaAtiva === 'chamados' && renderizarChamados()}
                    {abaAtiva === 'clientes' && renderizarClientes()}
                    {abaAtiva === 'equipamentos' && renderizarEquipamentos()}
                    {abaAtiva === 'recibos' && <GerarRecibos />}
                    {abaAtiva === 'contador' && <RenderizarContador />}
                </div>
            </section>
        </>
    );
};

export default Chamados;    