import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
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
      const response = await axios.post('https://vicarly-undeprived-keira.ngrok-free.dev/api/login', {
        email: email,
        senha: senha
      })

      localStorage.setItem('token', response.data.token)
      navigate('/chamados')
    } 
    
    catch (error) {
      alert("Email ou Senha incorretos!")
      console.error(error)
    }
  };

  return (
    <>
      <Header />

      <div className='flex w-1/2 h-96'>
        <form className='flex-col items-center' onSubmit={handleSubmit}>
          <h2 className='text-center mb-4 font-semibold text-2xl'>Acessar sistema</h2>
          <label className='font-semibold w-96 text-xl flex justify-between'>email: <input className='bg-gray-200 rounded-lg border-2 border-gray-300 mb-8 w-4/5' type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input></label>
          <label className='font-semibold w-96 text-xl flex justify-between'>senha: <input className='bg-gray-200 rounded-lg border-2 border-gray-300 mb-8 w-4/5' type='password' value={senha} onChange={(e) => setSenha(e.target.value)}></input></label>
          <button className='font-semibold p-2 border-2 border-gray-400 rounded-lg' type="submit">Fazer login </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Login;
