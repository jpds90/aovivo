const express = require('express');
const fetch = require('node-fetch'); // Se necessário, instale com `npm install node-fetch`
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Permite que o frontend acesse a API
app.use(express.json());

const API_KEY = "d6db9473fe5b77e7f299cadd12f2c0bc"; // Substitua pela sua chave

// Endpoint para buscar jogos ao vivo
app.get('/api/jogos-ao-vivo', async (req, res) => {
    try {
        const response = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
            method: "GET",
            headers: {
                "x-apisports-key": API_KEY,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        res.json(data); // Envia os jogos ao frontend
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar jogos ao vivo." });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
