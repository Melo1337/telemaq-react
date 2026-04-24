import './index.css'
import App from './pages/home/App';
import Printer from './pages/Printer/Printer';
import Tutoriais from './pages/Tutoriais/Tutoriais';
import Resultado from './pages/Resultado/Resultado.js';
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
    </Routes>
  </BrowserRouter>
);
