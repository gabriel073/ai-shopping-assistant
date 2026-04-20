import './App.css'
import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async (text) => {
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("https://ai-shopping-assistant-beta.vercel.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Error 😢" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">

      {/* Panel de Chat */}
      {isOpen && (
        <div className="chat-panel w-80 sm:w-96 h-[520px] flex flex-col rounded-2xl overflow-hidden border border-amber-500/30 bg-zinc-900 shadow-2xl shadow-black/50">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-zinc-800 border-b border-amber-500/20 shrink-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-zinc-900 font-bold text-xs select-none">
              🤖
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-zinc-800"></span>
            </div>
            <div className="flex flex-col">
              <p className="text-white font-semibold text-sm leading-none">RetroBot</p>
              <p className="text-green-400 text-xs font-mono mt-0.5">● en línea</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-zinc-400 hover:text-white transition-colors text-lg leading-none w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-700"
            >
              ✕
            </button>
          </div>

          <ChatWindow messages={messages} loading={loading} />
          <ChatInput sendMessage={sendMessage} />
        </div>
      )}

  
<button
  onClick={() => setIsOpen(!isOpen)}
  aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
  className="float-btn relative w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 flex items-center justify-center shadow-lg shadow-amber-500/30 transition-all duration-200 cursor-pointer"
>
 
  {!isOpen && <span className="pulse-ring absolute inset-0 rounded-full pointer-events-none" />}
  <span className="select-none pointer-events-none" role="img" aria-label="robot">
    {isOpen ? "✕" : "🤖"}
  </span>
</button>
    </div>
  );
}

export default App;
