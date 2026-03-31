// arquivo: server.js
const express = require('express');
const cors = require('cors'); // IMPORTANTE: Instale com npm install cors
const app = express();

// Configuração do CORS para aceitar qualquer origem e os cabeçalhos do ngrok
app.use(cors({
  origin: '*', // Permite que qualquer site acesse sua API
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));

app.use(express.json());

// Sua rota da API
app.get('/api/filter', (req, res) => {
  res.json({ 
    mensagem: "Dados filtrados com sucesso!", 
    status: "online",
    timestamp: new Date()
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
