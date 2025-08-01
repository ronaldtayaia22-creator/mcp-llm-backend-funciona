import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Ruta raíz para ver si está vivo
app.get("/", (req, res) => {
  res.send("Backend MCP Ingrid funcionando");
});

// Ruta que ElevenLabs usa para leer los tools
app.get("/tools", (req, res) => {
  res.json([
    {
      name: "createEvent",
      description: "Crea una cita en Google Calendar",
      input_schema: {
        type: "object",
        properties: {
          nombre: { type: "string" },
          email: { type: "string" },
          telefono: { type: "string" },
          servicio: { type: "string" },
          start: { type: "string" },
          end: { type: "string" }
        },
        required: ["nombre", "email", "telefono", "servicio", "start", "end"]
      }
    }
  ]);
});

// Para recibir llamadas reales a createEvent
app.post("/tools/createEvent", (req, res) => {
  console.log("Llamada a createEvent:", req.body);
  res.status(200).json({ message: "Evento recibido correctamente" });
});

app.listen(port, () => {
  console.log(`Servidor MCP escuchando en el puerto ${port}`);
});
