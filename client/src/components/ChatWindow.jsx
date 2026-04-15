import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-zinc-900 chat-scroll">

      {/* Estado vacío */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-2 text-center select-none">
          <span className="text-4xl mb-1">🎸</span>
          <p className="text-amber-500 font-mono text-xs font-semibold tracking-widest uppercase">
            Tienda Retro AI
          </p>
          <p className="text-zinc-500 font-mono text-xs leading-relaxed">
            Preguntame sobre vinilos,<br />figuras o mangas
          </p>
        </div>
      )}

      {/* Mensajes */}
      {messages.map((msg, i) => (
        <MessageBubble key={i} {...msg} />
      ))}

      {/* Loader */}
      {loading && (
        <MessageBubble role="assistant" content="Escribiendo..." />
      )}

      {/* Scroll target */}
      <div ref={bottomRef} />
    </div>
  );
}
