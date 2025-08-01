import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend MCP Ingrid funcionando");
});

app.get("/tools", (req, res) => {
  res.json([
    {
      name: "createEvent",
      description: "Crea una cita en Google Calendar.",
      input_schema: {
        type: "object",
        properties: {
          nombre: { type: "string" },
          email: { type: "string" },
          telefono: { type: "string" },
          servicio: { type: "string" },
          start: { type: "string", format: "date-time" },
          end: { type: "string", format: "date-time" }
        },
        required: ["nombre", "email", "telefono", "servicio", "start", "end"]
      }
    }
  ]);
});

app.post("/tools/createEvent", (req, res) => {
  console.log("Datos recibidos en createEvent:", req.body);
  res.status(200).json({ mensaje: "Evento procesado con éxito." });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
