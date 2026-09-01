import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header/Header";
import axios from "axios";
import {RenderizarChamados, RenderizarEquipamentos, GerarRecibos} from '../components/AdmComponents'
import RenderizarClientes from '../components/renderizarClientes'

const Chamados = () => {
    const navigate = useNavigate();
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
                    {/*<div onClick={() => alternarAba('contador')}>
                        <h1>Contadores</h1>
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                    </div>*/}
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

                    {abaAtiva === 'chamados' && <RenderizarChamados />}
                    {abaAtiva === 'clientes' && <RenderizarClientes search={search} />}
                    {abaAtiva === 'equipamentos' && <RenderizarEquipamentos search={search}/>}
                    {abaAtiva === 'recibos' && <GerarRecibos />}
                    {/*{abaAtiva === 'contador' && <RenderizarContador />}*/}
                </div>
            </section>
        </>
    );
};

export default Chamados;    