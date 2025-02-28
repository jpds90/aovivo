const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir arquivos estáticos (HTML, CSS, JS)

// Rota para pegar jogos do banco
app.get('/jogos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jogos ORDER BY created_at DESC LIMIT 10');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
