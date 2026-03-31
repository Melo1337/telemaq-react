export const buscarDadosDaApi = async () => {
  try {
    const response = await fetch('http://192.168.2.254:3001/api/filter');
    
    if (!response.ok) {
      throw new Error('Erro na rede ou servidor');
    }

    const json = await response.json();
    return console.log(json); // Retorna o JSON purinho
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
};