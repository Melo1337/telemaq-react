import Header from '../components/Header/Header';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://18.231.153.58:3001/login', {
        email: email,
        senha: senha
      });

      localStorage.setItem('token', response.data.token);
      navigate('/control');

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 400 || error.response.status === 403) {
          alert('Usuário ou Senha incorretos!');
        } else {
          alert(`Erro no servidor: Código ${error.response.status}`);
        }
      } else if (error.request) {
        console.error('Falha de rede indisponível:', error.request);
        alert('Servidor fora do ar ou inacessível. Verifique sua conexão!');
      } else {
        alert('Erro interno na aplicação.');
      }
    }
  };

  return (
    <>
      <Header />
      <section className='w-4/5'>
          <h2 className='text-center mb-4 font-semibold text-2xl'>Acessar sistema</h2>
          <form className='flex flex-col items-center *:bg-gray-200 *:rounded-lg *:border-2 *:border-gray-300 *:p-2' onSubmit={handleSubmit}>
            <input placeholder='EMAIL' type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input placeholder='SENHA' type='password' value={senha} onChange={(e) => setSenha(e.target.value)}></input>
            <button className='font-semibold p-2 border-2 border-gray-400 rounded-lg' type="submit">Fazer login </button>
          </form>
      </section>
    </>
  );
}

export default Login;
