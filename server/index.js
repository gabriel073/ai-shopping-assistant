import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "ai-shopping-assistant-mq96.vercel.app",
      /\.vercel\.app$/  // ✅ acepta cualquier subdominio de vercel.app
  ]
}));
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

   
    const result = await genAI.models.generateContent({
     model: "gemini-2.5-flash",
      contents: prompt,
    });

  res.json({ reply: result.text });

  } catch (error) {
    console.error("ERROR GEMINI:", error);
    res.status(500).json({ reply: "Error con IA 😢" });
  }
});

// ✅ Exportar para Vercel (sin app.listen)
export default app;