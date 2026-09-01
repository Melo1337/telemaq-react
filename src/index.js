import './index.css'
import App from './pages/home/App.js';
import Printer from './pages/Printer/Printer.js';
import Tutoriais from './pages/Tutoriais/Tutoriais.js';
import Resultado from './pages/searchBar.jsx';
import Control from './pages/Control.jsx';
import Login from './pages/Login.jsx';
import Cliente from './pages/Cliente.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/impressoras/:id" element={<Printer />} />
      <Route path="/tutoriais" element={<Tutoriais />} />
      <Route path="/resultado" element={<Resultado />} />
      <Route path="/control" element={<Control />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cliente/:codigo" element={<Cliente />} />
    </Routes>
  </BrowserRouter>
);
