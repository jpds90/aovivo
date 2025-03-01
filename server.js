const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota para buscar jogos ao vivo da API-Football
app.get('/api/jogos-ao-vivo', async (req, res) => {
    try {
        const response = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
            method: "GET",
            headers: {
                "x-apisports-key": "d6db9473fe5b77e7f299cadd12f2c0bc", // Use sua chave API
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log(data);  // Para ver a resposta da API no console
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar jogos ao vivo:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
