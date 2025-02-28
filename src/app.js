const express = require('express');
const cors = require('cors');
const liveRoutes = require('./routes/liveRoutes');
const saveRoutes = require('./routes/saveRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api', liveRoutes);
app.use('/api', saveRoutes);

module.exports = app;
