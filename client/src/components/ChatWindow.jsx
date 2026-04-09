
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      
      {/* Mensajes */}
      {messages.map((msg, i) => (
        <MessageBubble key={i} {...msg} />
      ))}

      {/* Loader (IA escribiendo) */}
      {loading && (
        <MessageBubble role="assistant" content="Escribiendo..." />
      )}

      {/* Scroll automático */}
      <div ref={bottomRef} />
    </div>
  );
}