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
Anime & Manga:

Manga One Piece - Arco de Enies Loka (Vol. 1-20)
Manga Dragon Ball Z - Colección Saiyan Prime (Vol. 1-5)
Mangas Sailor Moon - Edición Completa de los 90
Anime Series - Pokémon Journeys Manga Collection
Manga Street Fighter - Historia Completa
Guía Manga - Mega Tokyo Comics (Recopilación de arte)
Álbum de Arte - Akira (Obra original de Katsuhiro Otomo)
Manga Berserk - Edición de lujo (Tomo 1)
Manga My Hero Academia - Primeros Volúmenes
Revista de Arte de Evangelion (Edición 1995)
Figuras y Estatuas (Figures): 11. Figura Articulada - Goku Super Saiyan (Modelo 1998) 12. Figura de PVC - Pikachu (Serie de juguetes Pokémon) 13. Estatuilla Premium - Master Chief (Halo: Master Collector) 14. Figura de PVC - Sailor Moon (Pose de batalla, años 90) 15. Figura Retro - Optimus Prime (G1 - Acción articulada) 16. Figuras de Lucha - Ryu y Ken (Serie Shotaro) 17. Miniatura - Pikachu de goma (Estilo Funko Pop) 18. Set de Figuras - Equipo 7 (Dragon Ball) 19. Figura de Manga - Link (The Legend of Zelda, versión Sheik) 20. Figura de Anime - Nendoroid de Sailor Moon

Merchandising de Anime: 21. Poster Oficial - Pokémon (Cartel del Centro Pokémon, 1998) 22. Pin Badge - Emblemas de Sailor Scout 23. Taza Temática - Café para Fullmetal Jacket 24. Keychain - Llavero del Logo de One Piece 25. Cepillo de Limpieza - Estilo Ghost in the Shell
Cartuchos y Juegos (Game Cartridges): 26. Cartucho NES - Super Mario Bros. (Caja Sellada, 1985) 27. Cartucho SNES - Super Metroid (Caja y Manual Completo) 28. Cartucho Genesis/Mega Drive - Sonic the Hedgehog 2 29. Cartucho NES - The Legend of Zelda (Caja y Manual) 30. Cartucho SNES - Super Mario World (Versión Japonesa) 31. Cartucho Game Boy - Pokémon Red/Blue 32. Cartucho N64 - Super Mario 64 33. Cartucho NES - Mega Man 2 34. Cartucho Game Boy Color - Pokémon Emerald 35. Cartucho PS1 - Metal Gear Solid (Versión Original)

Hardware y Accesorios: 36. Controlador N64 - Modelo Clásico (Verde) 37. Revista de Videojuegos - Nintendo Power (Edición 1990) 38. Caja de Juego - Atari 2600 (The Legend of Space) 39. Cartucho de Arcade - Pac-Man (Token Pack) 40. Manual de Usuario - NES Master System 41. Cable HDMI - Adaptador Retro (SNES a HDMI) 42. Joystick - Modelo Joystick de PC Gamers (Años 90) 43. Caja de Palancas de Arcade - Modelo Clásico 44. Juguete - Control de Nintendo GameCube (Modelo antiguo) 45. Libro de Datos - Guía definitiva de videojuegos retro (1980-2000)

Juegos y Set de Colección: 46. Set de Cartuchos - Los 5 primeros títulos de Mega Man 47. Libro - Historia de los RPGs en SNES 48. Tarjetas de Juego - Pokémon Set 1 (Cartas de expansión) 49. Set de Tokens - Arcades de la época (Star Wars, Pac-Man) 50. Manual de Juego - Game Freak (Historia de Pokémon)

Aquí entran los VHS, Blu-rays, vinilos y los recuerdos del cine.

Vinilos y Música: 51. Vinilo - Nirvana - Nevermind (Edición Limita, 1991) 52. Vinilo - Queen - A Night at the Opera (Caja de vinilo) 53. Vinilo - Pink Floyd - The Dark Side of the Moon 54. Vinilo - Disco Hits de los 80 (Compilación) 55. Álbum de Música - Michael Jackson (Thriller, Vinyl) 56. Vinilo - Banda Sonora de Star Wars (Original) 57. Vinilo - Punk Rock de los 70s (Compilación) 58. Compact Cassette - Hits Pop de los 80s (Grabación coleccionable) 59. Tapa de Vinilo - Band Poster (Diseño artístico) 60. Libro de Letras - Box Set de Soda Stereo

Cine y Vídeo: 61. VHS - Los Cazadores del Arca Perdida (Edición VHS original) 62. VHS - Terminator 2 (Original Release) 63. Blu-ray - Pulp Fiction (Edición Coleccionista) 64. Caja de Películas - Back to the Future Trilogy (3 cajas) 65. LaserDisc - Star Trek: The Next Generation (Obsoleto/Coleccionista) 66. Álbum de Fotos - Premios del Cine de los 90s 67. Revista de Cine - Hollywood Monthly (Edición Vintage) 68. Tarjetas de Acceso - Cine Retro (Ej. Universal City) 69. Lentes de Sol - Estilo 'Miami Vice' (Accesorios de película) 70. Set de Películas - Los Goonies (Película completa)
Artículos que llevan el sabor retro al día a día.

Ropa y Accesorios: 71. Camiseta - Logo de Nintendo 8 Bit (Estilo pixel art) 72. Hoodie - Gráfico de Cyberpunk Tokyo (Estilo Akira) 73. Gorra - Logo de los 80s (Neon y neón) 74. Calcetines - Patrón Pokémon (Estilo divertido) 75. Mochila - Ilustración de los años 90s (Grunge/Cartoon) 76. Llavero - Estrella de la Muerte (Star Wars) 77. Collar - Estilo Cyber-Punk (Detalles metálicos) 78. Caja de Comics - Estuche de almacenamiento para cómics 79. Diario de Cuero - Estilo Mágico/Vampiro (Edición vintage) 80. Póster - Mapa de Ciudad Neo-Tokyo (Estilo anime)

Juguetes y Modelismo: 81. Kit de Modelismo - Starship Millennium Falcon (Juego de armar) 82. Robot Articulado - Transformers (Modelo Combiner G1) 83. Dinosaurio Juguete - T-Rex (Colección "Dinosaurios de la Prehistoria") 84. Títere - Personaje de un sketch de comedia de los 90s 85. Set de Dados - Dado de 20 caras (D&D estilo retro) 86. Miniatura - Bandidos del Oeste (Set de figuras pequeñas) 87. Bloque de Notas - Estilo VHS/Memo Block 88. Caja de Crayones - Colores Primarios (Estilo escolar 80s) 89. Tablero de Juego - Trivial Pursuit (Versión vintage) 90. Set de Piedras de Arte - Creaciones de la era prehistórica
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

export default app;