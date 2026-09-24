import localProducts from "../data/json/filter.json";

export const fetchApi = async (value) => {

    const token = localStorage.getItem("token");

    try {
        const resp = await fetch(`http://18.231.153.58:3001${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (resp.status === 200) {
            console.log("Dados da API carregados com sucesso!");
            return await resp.json();
        }
        
        throw new Error("Resposta diferente de 200");
    } catch (err) {
        console.error(`Api indisponivel: ${err}`);
        return localProducts;
    }
};

export const repositoryClientes = async () => {
    try {
        const resp = await fetch(`http://18.231.153.58:3001/tables/clientes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        });

        if (resp.status === 200) {
            console.log("Dados da API carregados com sucesso!");
            return await resp.json();
        }
        
        throw new Error("Resposta diferente de 200");
    } catch (err) {
        console.error(`Api indisponivel: ${err}`);
    }
}

export const repositoryEquipamentos = async () => {
    try {
        const resp = await fetch(`http://18.231.153.58:3001/tables/equipamentos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        });

        if (resp.status === 200) {
            console.log("Dados da API carregados com sucesso!");
            return await resp.json();
        }
        
        throw new Error("Resposta diferente de 200");
    } catch (err) {
        console.error(`Api indisponivel: ${err}`);
    }
}