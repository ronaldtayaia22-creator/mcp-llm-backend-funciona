import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const { query, tools } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-0125',
        messages: [
          { role: 'system', content: 'Eres un agente que decide si debe ejecutar una herramienta o responder directamente.' },
          { role: 'user', content: query }
        ],
        tools,
        tool_choice: "auto"
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error en el MCP');
  }
});

app.listen(port, () => {
  console.log(`Servidor MCP escuchando en el puerto ${port}`);
});