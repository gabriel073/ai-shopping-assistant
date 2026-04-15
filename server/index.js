import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Mensaje requerido" });
    }

    const prompt = `
Sos un asistente de una tienda retro de coleccionables.

Productos:
- Vinilo Nirvana
- Figura Goku 1998
- Manga Dragon Ball

Historial:
${history.map(m => `${m.role}: ${m.content}`).join("\n")}

Usuario: ${message}

Reglas:
- Respuestas cortas
- Tono amigable
- Recomendar productos si aplica
- No inventar productos

Respuesta:
`;

    // ✅ Sintaxis correcta para @google/genai v1.x
    const result = await genAI.models.generateContent({
     model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply = result.text; // ✅ propiedad, no método

    res.json({ reply });

  } catch (error) {
    console.error("ERROR GEMINI:", error);
    res.status(500).json({ reply: "Error con IA 😢" });
  }
});

app.listen(3001, () => {
  console.log("Servidor en http://localhost:3001");
});