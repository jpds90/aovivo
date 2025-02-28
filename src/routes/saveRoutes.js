const express = require('express');
const pool = require('../db/database');
const router = express.Router();

router.post('/save', async (req, res) => {
  const { fixture_id, timehome, timeaway, resultadohome, resultadoaway, tempo } = req.body;

  try {
    const query = `
      INSERT INTO jogos (fixture_id, timehome, timeaway, resultadohome, resultadoaway, tempo) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    
    const values = [fixture_id, timehome, timeaway, resultadohome, resultadoaway, tempo];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao salvar jogo:', error);
    res.status(500).send('Erro ao salvar jogo');
  }
});

module.exports = router;
