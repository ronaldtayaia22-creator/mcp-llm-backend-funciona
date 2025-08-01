import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(bodyParser.json());

// Este endpoint define los tools disponibles
app.get("/tools", (req, res) => {
  res.json({
    tools: [
      {
        name: "createEvent",
        description: "Crea una cita en Google Calendar.",
        parameters: {
          type: "object",
          properties: {
            nombre: { type: "string" },
            email: { type: "string" },
            telefono: { type: "string" },
            servicio: { type: "string" },
            start: { type: "string" },
            end: { type: "string" },
          },
          required: ["nombre", "email", "telefono", "servicio", "start", "end"],
        },
      },
    ],
  });
});

// Este endpoint ejecuta un tool
app.post("/tools/:tool", async (req, res) => {
  const tool = req.params.tool;
  const input = req.body.input;

  if (tool === "createEvent") {
    console.log("Ejecutando createEvent con:", input);
    res.json({ result: "Evento creado (simulado)" });
  } else {
    res.status(404).json({ error: "Tool no encontrado" });
  }
});

app.listen(port, () => {
  console.log(`Servidor MCP iniciado en puerto ${port}`);
});
