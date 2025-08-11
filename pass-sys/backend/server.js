const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Carga .env (PORT, MONGO_URI, ESP32_BASE_URL, etc.)

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Rutas existentes ---
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const paseRoutes = require('./routes/paseRoutes'); // si ya lo tienes creado
app.use('/api/pase', paseRoutes);

// --- Nueva ruta: proxy simple al ESP32 para HU4 ---
const ESP32 = process.env.ESP32_BASE_URL || 'http://192.168.68.104';

// Ej: GET http://localhost:5000/status-sensor  ->  proxy a  http://<IP-ESP32>/status
app.get('/status-sensor', async (req, res) => {
  try {
    const r = await fetch(`${ESP32}/status`);
    // si el ESP32 no responde JSON válido, usa .text() para depurar:
    // const txt = await r.text(); return res.status(r.ok ? 200 : 502).send(txt);
    const data = await r.json();
    return res.json(data);
  } catch (err) {
    console.error('Error al conectar con ESP32:', err?.message || err);
    return res.status(500).json({ error: 'No se pudo conectar con el ESP32' });
  }
});

// (Opcional) Healthcheck del backend
app.get('/health', (_req, res) => res.json({ ok: true }));

// --- Inicio de servidor tras conectar Mongo ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado a MongoDB');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Servidor backend en http://localhost:${port}`);
      console.log(`🔌 Proxy ESP32 activo en /status-sensor → ${ESP32}/status`);
    });
  })
  .catch(err => console.error('🔴 Error conectando a MongoDB:', err));
