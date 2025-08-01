import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Este es el endpoint que ElevenLabs necesita
app.get('/tools', (req, res) => {
  res.json({
    tools: [
      {
        name: "createEvent",
        description: "Crear una cita en Google Calendar",
        input_schema: {
          type: "object",
          properties: {
            start: { type: "string" },
            end: { type: "string" },
            email: { type: "string" },
            nombre: { type: "string" },
            telefono: { type: "string" },
            servicio: { type: "string" }
          },
          required: ["start", "end", "email", "nombre", "telefono", "servicio"]
        }
      }
    ]
  });
});

// Opcional para debugging
app.get('/', (req, res) => {
  res.send('Backend MCP Ingrid funcionando');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
