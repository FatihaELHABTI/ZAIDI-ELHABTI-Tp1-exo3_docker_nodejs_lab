const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`<h1>Bienvenue sur node-app</h1>
            <p>Routes disponibles: /api/health, /api/info, /api/time</p>`);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/info', (req, res) => {
  res.json({
    node_env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    hostname: os.hostname(),
    platform: process.platform,
    uptime_s: process.uptime()
  });
});

app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
