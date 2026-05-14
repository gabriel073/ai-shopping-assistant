# 🤖 AI Shopping Assistant — Tienda Retro

Asistente de ventas con inteligencia artificial para una tienda retro de coleccionables. El bot responde preguntas sobre productos, recomienda artículos y mantiene el historial de conversación, todo con una UI flotante estilo retro-futurista.

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| IA | Google Gemini 2.0 Flash (`@google/genai`) |
| Deploy Frontend | Vercel |
| Deploy Backend | Vercel (Serverless Functions) |
| Package Manager | pnpm |

---

## 📁 Estructura del proyecto

```
ai-shopping-assistant/
├── client/                  # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInput.jsx      # Input con soporte Enter y click
│   │   │   ├── ChatWindow.jsx     # Ventana de mensajes con scroll
│   │   │   └── MessageBubble.jsx  # Burbujas de chat usuario/bot
│   │   ├── App.jsx               # Estado global + botón flotante
│   │   └── App.css               # Animaciones (pulse, slide-up)
│   ├── index.html
│   └── package.json
│
└── server/                  # Backend Express
    ├── index.js             # Servidor + endpoint /chat
    ├── vercel.json          # Configuración serverless
    ├── .env                 # Variables de entorno (no commitear)
    └── package.json
```

---

## ⚙️ Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [pnpm](https://pnpm.io/) instalado globalmente:
  ```bash
  npm install -g pnpm
  ```
- API Key de [Google AI Studio](https://aistudio.google.com/)

---

## 🚀 Levantar en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ai-shopping-assistant.git
cd ai-shopping-assistant
```

### 2. Configurar el Backend

```bash
cd server
pnpm install
```

Crear el archivo `.env` en la carpeta `/server`:

```env
GEMINI_API_KEY=tu_api_key_de_google_ai_studio
```

> Obtené tu API key gratis en [aistudio.google.com](https://aistudio.google.com/) → **Get API Key**

Iniciar el servidor:

```bash
pnpm run dev
```

El backend queda disponible en `http://localhost:3001`

Verificá que funcione abriendo en el navegador:
```
http://localhost:3001/
```
Deberías ver: `Backend funcionando 🚀`

### 3. Configurar el Frontend

```bash
cd ../client
pnpm install
```

Verificá que en `App.jsx` la URL del fetch apunte a local:

```js
const res = await fetch("http://localhost:3001/chat", {
```

Iniciar el cliente:

```bash
pnpm run dev
```

El frontend queda disponible en `http://localhost:5173`

---

## 🌐 Deploy en producción

### Backend → Vercel

1. Asegurate de que `index.js` exporte `app` sin `app.listen()`:
   ```js
   export default app;
   ```
2. Verificá que existe `vercel.json` en `/server`:
   ```json
   {
     "version": 2,
     "builds": [{ "src": "index.js", "use": "@vercel/node" }],
     "routes": [{ "src": "/(.*)", "dest": "index.js" }]
   }
   ```
3. En Vercel → **New Project** → importar repo → Root Directory: `server`
4. Agregar variable de entorno: `GEMINI_API_KEY`
5. Deploy ✅

### Frontend → Vercel

1. Actualizar la URL en `App.jsx`:
   ```js
   const res = await fetch("https://tu-backend.vercel.app/chat", {
   ```
2. Actualizar CORS en `server/index.js`:
   ```js
   app.use(cors({
     origin: [
       "http://localhost:5173",
       "https://tu-frontend.vercel.app"
     ]
   }));
   ```
3. En Vercel → **New Project** → importar repo → Root Directory: `client`
4. Deploy ✅

---

## ✨ Funcionalidades

### 💬 Chat con IA
- Conversación en lenguaje natural con el asistente de la tienda
- Respuestas generadas por **Google Gemini 2.0 Flash**
- Historial de conversación incluido en cada request para mantener contexto
- Respuestas cortas y con tono amigable

### 🛍️ Catálogo de productos
El bot conoce y puede recomendar los siguientes productos:

| Producto | Descripción |
|----------|------------|
| 🎵 Vinilo Nirvana | Disco de vinilo original |
| 🐉 Figura Goku 1998 | Figura de colección edición japonesa |
| 📚 Manga Dragon Ball | Colección en excelente estado |

puede extenderse todo lo que se quiera.-

### 🤖 Botón flotante con animación
- Ícono 🤖 fijo en la esquina inferior derecha
- Efecto de anillo pulsante en ámbar mientras está cerrado
- Al hacer click se despliega el panel con animación **slide-up**
- Al hacer click nuevamente, el panel se cierra

### 🎨 UI Retro-Futurista
- Mensajes del bot en tipografía **monospace** para efecto tech
- Avatar "AI" en cada burbuja del asistente
- Estado vacío con ícono 🎸 y mensaje de bienvenida
- Scrollbar personalizada en color ámbar

### ⌨️ Envío de mensajes
- Botón **↑** para enviar con click
- Tecla **Enter** para enviar desde el teclado
- Botón deshabilitado si el input está vacío o solo tiene espacios
- Input con autofocus al abrir el panel

### ⏳ Estado de carga
- Indicador **"Escribiendo..."** mientras la IA procesa la respuesta
- Se oculta correctamente tanto en respuesta exitosa como en error (bloque `finally`)

### 📜 Scroll automático
- El chat hace scroll automático al último mensaje cada vez que llega una respuesta nueva

---

## 🔒 Variables de entorno

| Variable | Descripción | Requerida |
|----------|------------|-----------|
| `GEMINI_API_KEY` | API Key de Google AI Studio | ✅ Sí |
| `PORT` | Puerto del servidor (Vercel/Render lo inyectan automáticamente) | ❌ Opcional |

> ⚠️ **Nunca commitees el archivo `.env`** — está incluido en `.gitignore`

---

## 📡 API Endpoints

### `GET /`
Verificación de estado del servidor.

**Response:**
```
Backend funcionando 🚀
```

### `POST /chat`
Envía un mensaje al asistente y recibe una respuesta de la IA.

**Request body:**
```json
{
  "message": "¿Tienen el vinilo de Nirvana?",
  "history": [
    { "role": "user", "content": "Hola" },
    { "role": "assistant", "content": "¡Hola! ¿En qué puedo ayudarte?" }
  ]
}
```

**Response exitosa:**
```json
{
  "reply": "¡Sí! Tenemos el vinilo de Nirvana en perfecto estado 🎵"
}
```

**Response de error:**
```json
{
  "reply": "Error con IA 😢"
}
```

---

## 🐛 Problemas conocidos y soluciones

| Problema | Causa | Solución |
|----------|-------|----------|
| `404` en el chat | URL del fetch incorrecta | Verificar que termina en `/chat` |
| Loading infinito | `setLoading(false)` faltaba en el happy path | Usar bloque `finally` |
| Modelo no encontrado | `gemini-1.5-flash` deprecado | Usar `gemini-2.0-flash` |
| CORS error en producción | Origen del frontend no permitido | Agregar URL de Vercel al array de `cors` |

---

## 📄 Licencia

MIT — libre para usar y modificar.