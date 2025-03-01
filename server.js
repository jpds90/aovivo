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
                "x-apisports-key": "d6db9473fe5b77e7f299cadd12f2c0bc",
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar jogos ao vivo:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

// Rota para buscar estatísticas de um jogo ao vivo
app.get('/api/estatisticas', async (req, res) => {
    const { teamId, fixtureId } = req.query; // Pega os parâmetros teamId e fixtureId da query

    try {
        const response = await fetch(`https://v3.football.api-sports.io/fixtures/statistics?team=${teamId}&fixture=${fixtureId}`, {
            method: "GET",
            headers: {
                "x-apisports-key": "d6db9473fe5b77e7f299cadd12f2c0bc",
                "Content-Type": "application/json"
            }
        });

        const stats = await response.json();
        res.json(stats);
    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        res.status(500).json({ error: "Erro interno ao buscar estatísticas" });
    }
});

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
