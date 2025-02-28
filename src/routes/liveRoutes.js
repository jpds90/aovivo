require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/live', async (req, res) => {
  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures?live=all', {
      headers: { 'x-apisports-key': process.env.API_KEY },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar dados ao vivo:', error);
    res.status(500).send('Erro ao buscar dados ao vivo');
  }
});

module.exports = router;
