const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/tool-calls", async (req, res) => {
  try {
    const userPrompt = req.body.prompt || "";
    const toolsInfo = req.body.tools || [];

    const toolsList = toolsInfo.map(tool => `Tool: ${tool.name}\nDescription: ${tool.description}`).join("\n\n");

    const messages = [
      {
        role: "system",
        content: `You are a backend processor for an AI agent. Here is a list of available tools:\n\n${toolsList}`,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: messages,
      temperature: 0,
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ message: reply });
  } catch (error) {
    console.error("Error handling tool-call:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`MCP LLM backend listening on port ${port}`);
});
