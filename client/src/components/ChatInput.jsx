import { useState } from "react";

export default function ChatInput({ sendMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="shrink-0 px-3 py-3 bg-zinc-800 border-t border-zinc-700/60 flex gap-2">
      <input
        className="flex-1 bg-zinc-900 text-white text-sm px-3 py-2 rounded-xl border border-zinc-700 focus:outline-none focus:border-amber-500 font-mono placeholder-zinc-600 transition-colors"
        placeholder="// escribí tu pregunta..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        autoFocus
      />
      <button
        onClick={handleSend}
        disabled={!input.trim()}
        className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-900 font-bold px-3 py-2 rounded-xl transition-colors text-base leading-none active:scale-95"
        aria-label="Enviar mensaje"
      >
        ↑
      </button>
    </div>
  );
}
