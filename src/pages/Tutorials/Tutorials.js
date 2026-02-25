import React, { useState } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const Tutorials = () => {

  function gerarTutorial2540() {
    return {
        "Imprimir configuração de rede": "https://www.youtube.com/embed/mVowccKhGMU?si=xPstGU8-uSBJHlaC",
        "Contador de páginas": "https://www.youtube.com/embed/yy-Ffu0yDps?si=aUn4d93waCAlryie",
        "Número de série": "https://www.youtube.com/embed/Z8YWI9urIyk?si=G8YNz2Si4I5qQbT6",
        "Como conectar na rede wifi ": "https://www.youtube.com/embed/q4_XiqbiCiw?si=8ZLgwhcJQDTi0ya5",
        "Reset de cilindro": "https://www.youtube.com/embed/NlppUmYf9wA?si=LOv0hRW4yhNKcuj8",
        "Erro de cilindro": "https://www.youtube.com/embed/NlppUmYf9wA?si=LOv0hRW4yhNKcuj8",}
  }

  const dadosImpressoras = {
    Brother: {
      "DCP-L2540DW": gerarTutorial2540(),
      "DCP-L2740DW": gerarTutorial2540(),
    },
  };

  function gerarVideo(feature) {
    if (modeloSelecionado && marcaSelecionada && tutorialSelecionado) {
      const linkVideo = dadosImpressoras[marcaSelecionada][modeloSelecionado][tutorialSelecionado];
      return <iframe width="560" height="315" src={linkVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    }
  }

  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [tutorialSelecionado, setTutorialSelecionado] = useState("");

  return (
    <>
    <Header/>
      <form>

        <label htmlFor="marca">Marca da Impressora:</label>
        <select id="marca" onChange={(e)=>setMarcaSelecionada(e.target.value)}>
          <option value="">Selecione uma marca</option>
          {Object.entries(dadosImpressoras).map(([chave]) => {
            return <option key={chave} value={chave}>{chave}</option>;
          })}
        </select>

        <label htmlFor="modelo">Modelo da Impressora:</label>
        <select id="modelo" onChange={(e)=>setModeloSelecionado(e.target.value)} disabled={!marcaSelecionada}> 
          <option value="">Selecione um modelo</option>
          {marcaSelecionada && Object.keys(dadosImpressoras[marcaSelecionada]).map((modelo) => {
            return <option key={modelo} value={modelo}>{modelo}</option>;
          })}
        </select>

        <label htmlFor="tutorial">Tutorial desejado:</label>
        <select id="tutorial" onChange={(e)=>setTutorialSelecionado(e.target.value)} disabled={!marcaSelecionada}> 
          <option value="">Selecione um tutorial</option>
          {modeloSelecionado && marcaSelecionada && Object.keys(dadosImpressoras[marcaSelecionada][modeloSelecionado]).map((tutorial)=>{
            return <option key={tutorial} value={tutorial}>{tutorial}</option>;
          })}
        </select>

      </form>
      <div className='container-video'>
          {gerarVideo(tutorialSelecionado)}
      </div>
    <Footer/>
    </>
  );
};

export default Tutorials;