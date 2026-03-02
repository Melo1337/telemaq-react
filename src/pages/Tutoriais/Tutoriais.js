import React, { useState } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { dadosImpressoras } from '../../data/json/impTutorialList'
import './Tutoriais.css'

const Tutoriais = () => {

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
        <div>
          <h2 className='title'>Selecione abaixo o modelo do seu equipamento e o tutorial desejado:</h2>
          <p>OBS: O video será gerado quando todos campos forem selecionados!</p>
        </div>
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