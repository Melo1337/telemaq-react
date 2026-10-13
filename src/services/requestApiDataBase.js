import localProducts from "../data/json/filter.json";

export const fetchApi = async (value, options = {}) => {

    const token = localStorage.getItem("token");

    try {
        const resp = await fetch(
            `https://vicarly-undeprived-keira.ngrok-free.dev/api${value}`,
            {
                method: options.method || 'GET',

                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'Authorization': token
                        ? `Bearer ${token}`
                        : ''
                },

                ...options
            }
        );

        if (!resp.ok) {
            const errorText = await resp.text();

            console.error("Erro da API:", resp.status, errorText);

            throw new Error(
                `API retornou status ${resp.status}`
            );
        }

        if (resp.status === 204) {
            return null;
        }

        return await resp.json();

    } catch (err) {

        console.error(`Api indisponivel:`, err);

        throw err;
    }
};

export const fetApiClient = async () => {
        try {
        const resp = await fetch(`https://vicarly-undeprived-keira.ngrok-free.dev/api/tables/clientes`, {
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
        return localProducts;
    }
}