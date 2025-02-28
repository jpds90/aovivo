const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const axios = require('axios');  // Importando axios
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Importante para o Render
});

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir arquivos estáticos (HTML, CSS, JS)

// Configuração da API-Football
const API_KEY = 'd6db9473fe5b77e7f299cadd12f2c0bc'; // Sua chave de API
const API_URL = 'https://v3.football.api-sports.io/';

app.get('/jogos', async (req, res) => {
    try {
        // Requisição para a API-Football para obter os jogos ao vivo
        const response = await axios.get(`${API_URL}fixtures`, {
            headers: {
                'x-rapidapi-key': API_KEY,
            },
        });

        // Dados dos jogos
        const jogos = response.data.response;
        
        // Armazenando os jogos no banco de dados (opcional)
        jogos.forEach(async (jogo) => {
            await pool.query(`
                INSERT INTO jogos (fixture_id, timehome, timeaway, resultadohome, resultadoaway, tempo, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [
                jogo.fixture.id,
                jogo.teams.home.name,
                jogo.teams.away.name,
                jogo.goals.home,
                jogo.goals.away,
                jogo.status.elapsed,
                new Date()
            ]);
        });

        // Retorna os jogos para o frontend
        res.json(jogos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
