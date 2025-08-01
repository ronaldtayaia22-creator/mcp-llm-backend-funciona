import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { OpenAI } from 'openai';

config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint principal
app.post('/', async (req, res) => {
  try {
    const userMessage = req.body.input;
    const tools = req.body.tools || [];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: [{ role: 'user', content: userMessage }],
      tools: tools,
      tool_choice: 'auto'
    });

    const responseMessage = completion.choices[0].message;
    res.json(responseMessage);
  } catch (error) {
    console.error('Error en /:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint requerido por ElevenLabs para leer tools
app.get('/tools', (req, res) => {
  res.json({
    tools: [
      {
        name: 'createEvent',
        description: 'Crea una nueva cita en Google Calendar.',
        input_schema: {
          type: 'object',
          properties: {
            nombre: { type: 'string' },
            email: { type: 'string' },
            telefono: { type: 'string' },
            servicio: { type: 'string' },
            start: { type: 'string' },
            end: { type: 'string' }
          },
          required: ['nombre', 'email', 'telefono', 'servicio', 'start', 'end']
        }
      }
    ]
  });
});

app.listen(port, () => {
  console.log(`Servidor MCP LLM activo en el puerto ${port}`);
});
