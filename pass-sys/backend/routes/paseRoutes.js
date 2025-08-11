// backend/routes/paseRoutes.js
const express = require('express');
const router = express.Router();

const ESP32 = process.env.ESP32_BASE_URL || 'http://192.168.68.104';

router.get('/status', async (_req, res) => {
  try {
    const r = await fetch(`${ESP32}/status`, { cache: 'no-store' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = await r.json();
    res.set('Cache-Control', 'no-store');
    return res.json(data);
  } catch (e) {
    console.error('[/api/pase/status] Error:', e.message, '→ usando', ESP32);
    return res.status(502).json({ error: 'ESP32 no accesible' });
  }
});

router.post('/open', async (_req, res) => {
  try {
    const r = await fetch(`${ESP32}/open`, { method: 'POST' });
    return res.json(await r.json());
  } catch (e) {
    console.error('[/api/pase/open] Error:', e.message);
    return res.status(502).json({ error: 'No se pudo abrir' });
  }
});

router.post('/close', async (_req, res) => {
  try {
    const r = await fetch(`${ESP32}/close`, { method: 'POST' });
    return res.json(await r.json());
  } catch (e) {
    console.error('[/api/pase/close] Error:', e.message);
    return res.status(502).json({ error: 'No se pudo cerrar' });
  }
});

module.exports = router;
