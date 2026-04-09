
import './App.css'  
import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
//import axios from "axios";


// Estado Global
function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);


  //prueba mock -------------------------
const generateFakeAI = (input) => {
  const text = input.toLowerCase();

  if (text.includes("hola")) return "Hola! 👋 ¿En qué puedo ayudarte?";
  if (text.includes("envio")) return "Hacemos envíos a todo el país 🚚";
  if (text.includes("precio")) return "Los precios varían según el producto 💰";
  if (text.includes("vinilo")) return "Te recomiendo el vinilo de Nirvana 🔥";
  if (text.includes("figura")) return "Tenemos figuras retro en excelente estado 👌";

  return "Puedo ayudarte con productos, envíos o recomendaciones 😊";
};

// ---------------------------------------------


  /*const sendMessage = async (text) => {
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/chat", {
        message: text,
        history: newMessages,
      });
      
      setLoading(false);
      setMessages([...newMessages, { role: "assistant", content: res.data.reply }]);
    } catch {
        setLoading(false);
      setMessages([...newMessages, { role: "assistant", content: "Error 😢" }]);
    }
  };*/

// Pruebaaaa ---------------------------
const sendMessage = async (text) => {
  const newMessages = [...messages, { role: "user", content: text }];
  setMessages(newMessages);
  setLoading(true);

  setTimeout(() => {
    const fakeReply = generateFakeAI(text);

    setMessages([
      ...newMessages,
      { role: "assistant", content: fakeReply }
    ]);
    setLoading(false);
  }, 1200);
};

// ------------------------


  return (
    <div className="h-screen flex flex-col bg-gray-600 text-white w-1/2 m-auto rounded-xl">
      <ChatWindow messages={messages} loading={loading} />
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

export default App;
  

