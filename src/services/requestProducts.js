export const buscarDadosDaApi = async () => {
  try {
    // Corrigido: O parêntese do fetch deve fechar APÓS o objeto de configurações
    const response = await fetch('https://vicarly-undeprived-keira.ngrok-free.dev/api/filter', {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true" // Pula a tela de aviso do ngrok
      }
    });

    if (!response.ok) {
      throw new Error('Erro na rede ou servidor');
    }

    const json = await response.json();
    console.log(json); // Exibe no console para conferir
    return json;       // Retorna o JSON para quem chamou a função
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
};
