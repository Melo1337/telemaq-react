import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { dadosImpressoras } from '../../data/json/impTutorialList'
import './Tutoriais.css'

const Tutoriais = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const marcaSelecionada = searchParams.get("marca") || "";
  const modeloSelecionado = searchParams.get("modelo") || "";
  const tutorialSelecionado = searchParams.get("tutorial") || "";

  const atualizarUrl = (chave, valor) => {
    setSearchParams(prev => {
      if (valor) {
        prev.set(chave, valor);
      } else {
        prev.delete(chave);
      }
      
      if (chave === "marca") {
        prev.delete("modelo");
        prev.delete("tutorial");
      }
      if (chave === "modelo") {
        prev.delete("tutorial");
      }
      
      return prev;
    }, { replace: true });
  };

  function gerarVideo() {
    if (modeloSelecionado && marcaSelecionada && tutorialSelecionado) {
      const linkVideo = dadosImpressoras[marcaSelecionada][modeloSelecionado][tutorialSelecionado];
      return <iframe width="560" height="315" src={`https://www.youtube.com/embed/${linkVideo}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
    }
    return <iframe width="560" height="315" title="YouTube video player" frameBorder="0"></iframe>
  }

  return (
    <>
      <Header />
      <section className='container-tutorial'>
        <div>
          <h2 className='title'>Selecione abaixo o modelo do seu equipamento e o tutorial desejado:</h2>
          <p>O vídeo será gerado quando preencher os campos abaixo</p>
        </div>
        <form>
          <div className='seletores'>
            <label htmlFor="marca">Marca da Impressora:</label>
            <select 
              id="marca" 
              value={marcaSelecionada} 
              onChange={(e) => atualizarUrl("marca", e.target.value)}
            >
              <option value="">Selecione uma marca</option>
              {Object.keys(dadosImpressoras).map((chave) => (
                <option key={chave} value={chave}>{chave}</option>
              ))}
            </select>
          </div>

          <div className='seletores'>
            <label htmlFor="modelo">Modelo da Impressora:</label>
            <select 
              id="modelo" 
              value={modeloSelecionado}
              onChange={(e) => atualizarUrl("modelo", e.target.value)} 
              disabled={!marcaSelecionada}
            >
              <option value="">Selecione um modelo</option>
              {marcaSelecionada && Object.keys(dadosImpressoras[marcaSelecionada]).map((modelo) => (
                <option key={modelo} value={modelo}>{modelo}</option>
              ))}
            </select>
          </div>

          <div className='seletores'>
            <label htmlFor="tutorial">Tutorial desejado:</label>
            <select 
              id="tutorial" 
              value={tutorialSelecionado}
              onChange={(e) => atualizarUrl("tutorial", e.target.value)} 
              disabled={!modeloSelecionado}
            >
              <option value="">Selecione um tutorial</option>
              {modeloSelecionado && marcaSelecionada && Object.keys(dadosImpressoras[marcaSelecionada][modeloSelecionado]).map((tutorial) => (
                <option key={tutorial} value={tutorial}>{tutorial}</option>
              ))}
            </select>
          </div>
        </form>
        
        <div className='container-video'> 
          <div className='video'>{gerarVideo()}</div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Tutoriais;