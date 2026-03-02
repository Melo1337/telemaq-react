import React, { useState } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Tutoriais.css'

const Tutoriais = () => {

  function tutorial1212() {
    return {
      "Reset de cilindro": "x3R-t4_XNIk?si=IJY9w0_5Tukq0gko",
    }
  }

  function tutorial1617() {
    return {
      "Reset do Toner":"xjr-k1qrDfg?si=uGfcfphporeRG8LD",
      "Troca de suprimentos":"XLO32Hbwtlc?si=AIgETtpt6M637ZA7",
    }
  }

  function tutorial2540() {
    return {
      "Imprimir configuração de rede": "mVowccKhGMU?si=xPstGU8-uSBJHlaC",
      "Contador de páginas": "yy-Ffu0yDps?si=aUn4d93waCAlryie",
      "Número de série": "Z8YWI9urIyk?si=G8YNz2Si4I5qQbT6",
      "Como conectar na rede wifi ": "q4_XiqbiCiw?si=8ZLgwhcJQDTi0ya5",
      "Reset de cilindro": "NlppUmYf9wA?si=LOv0hRW4yhNKcuj8",
      "Erro de cilindro": "NlppUmYf9wA?si=LOv0hRW4yhNKcuj8",
      "Trocar de suprimentos (Toner e Cilindro)":"OUZPBRv8gVw?si=YZv5Q_hwWmgD-bN7"
    }
  }

  function tutorial5652() {
    return {
      "Resetar o cilindro":"6GkvMVpgjDg?si=p0Erohf90HeqBUJK",
      "Erro de cilindro":"6GkvMVpgjDg?si=p0Erohf90HeqBUJK",
      "Resetar o Toner":"Zwleny5Fh2k?si=C6lG--L7U643Z2r3",
    }
  }

  function tutorial7065() {
    return {
      "Troca de cartucho de toner": "wf884_XWfqo?si=OBELXfxci9ktJTiI",
      "Reset de cilindro": "7LU_7OcF_IQ?si=XR2W8fH927fV1zM0"
    }
  }

  function tutorial8157() {
    return {
      "Erro de cilindro": "fYDQFff76zw?si=U9x10DxX6XV6_LBh",
      "Reset de cilindro": "fYDQFff76zw?si=U9x10DxX6XV6_LBh",
    }
  }

  const dadosImpressoras = {
    Brother: {
      "DCP-1202": tutorial1212(),
      "DCP-1212": tutorial1212(),
      "DCP-1222": tutorial1212(),

      "DCP-1617": tutorial1617(),
      
      "DCP-L2540": tutorial2540(),
      "DCP-L2520": tutorial2540(),
      "MFC-L2700": tutorial2540(),
      
      "DCP-L5652": tutorial5652(),
      "DCP-L5602": tutorial5652(),
      
      "DCP-7065": tutorial7065(),
      
      "DCP-8157": tutorial8157(),
      "DCP-8112": tutorial8157(),
      "DCP-8912": tutorial8157(),
    },
  };

  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [tutorialSelecionado, setTutorialSelecionado] = useState("");

  function gerarVideo() {

    if (modeloSelecionado && marcaSelecionada && tutorialSelecionado) {
      const linkVideo = dadosImpressoras[marcaSelecionada][modeloSelecionado][tutorialSelecionado];
      return <iframe width="560" height="315" src={`https://www.youtube.com/embed/${linkVideo}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    } else {
      return <iframe width="560" height="315" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    }
  }

  return (
    <>
      <Header />
      <section className='container-tutorial'>
        <h2 className='title'>Selecione abaixo o modelo do seu equipamento e o tutorial desejado:</h2>
        <form>

          <div className='seletores'>
            <label htmlFor="marca">Marca da Impressora:</label>
            <select id="marca" onChange={(e) => setMarcaSelecionada(e.target.value)}>
              <option value="">Selecione uma marca</option>
              {Object.entries(dadosImpressoras).map(([chave]) => {
                return <option key={chave} value={chave}>{chave}</option>;
              })}
            </select>
          </div>

          <div className='seletores'>
            <label htmlFor="modelo">Modelo da Impressora:</label>
            <select id="modelo" onChange={(e) => setModeloSelecionado(e.target.value)} disabled={!marcaSelecionada}>
              <option value="">Selecione um modelo</option>
              {marcaSelecionada && Object.keys(dadosImpressoras[marcaSelecionada]).map((modelo) => {
                return <option key={modelo} value={modelo}>{modelo}</option>;
              })}
            </select>
          </div>

          <div className='seletores'>
            <label htmlFor="tutorial">Tutorial desejado:</label>
            <select id="tutorial" onChange={(e) => setTutorialSelecionado(e.target.value)} disabled={!modeloSelecionado}>
              <option value="">Selecione um tutorial</option>
              {modeloSelecionado && marcaSelecionada && Object.keys(dadosImpressoras[marcaSelecionada][modeloSelecionado]).map((tutorial) => {
                return <option key={tutorial} value={tutorial}>{tutorial}</option>;
              })}
            </select>
          </div>
        </form>
        
        <div className='container-video'>
          <div className='video'>
            {gerarVideo()}
          </div>
          <div className='tutorial-escrito'>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Tutoriais;