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

// Rota para buscar estatísticas dos jogos ao vivo
app.get('/api/jogo-estatisticas/:fixture_id', async (req, res) => {
    const { fixture_id } = req.params;
    const { team_id } = req.query; // Parâmetro opcional para buscar estatísticas de um time específico

    let url = `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixture_id}`;
    if (team_id) {
        url += `&team=${team_id}`;
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-apisports-key": "d6db9473fe5b77e7f299cadd12f2c0bc",
                "x-rapidapi-host": "v3.football.api-sports.io",
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
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

