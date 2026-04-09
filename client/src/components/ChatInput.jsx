
import { useState } from "react";

export default function ChatInput({ sendMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="p-4 flex gap-2">
      <input
        className="flex-1 p-2 rounded-xl text-black border-2 border-solid border-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend} className="bg-yellow-500 px-4 rounded">
        Enviar
      </button>
    </div>
  );
}