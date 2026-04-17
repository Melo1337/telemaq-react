import localProducts from "../data/json/filter.json";

export const fetchApi = async () => {
    try {
        const resp = await fetch('https://vicarly-undeprived-keira.ngrok-free.dev/api/filter', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
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
