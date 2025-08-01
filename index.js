const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.get("/", (req, res) => {
  res.send({ status: "ok" });
});

app.post("/process", async (req, res) => {
  try {
    const { messages } = req.body;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0125",
      messages,
    });
    res.json({ response: completion.data.choices[0].message });
  } catch (error) {
    console.error("Error al procesar solicitud:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor MCP escuchando en puerto ${port}`);
});