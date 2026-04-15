export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? "justify-end" : "justify-start"}`}>

      {/* Avatar del bot */}
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-zinc-900 text-[9px] font-bold shrink-0 mb-0.5">
          AI
        </div>
      )}

      {/* Burbuja */}
      <div
        className={`max-w-[78%] px-3 py-2 text-sm leading-relaxed break-words
          ${isUser
            ? "bg-amber-500 text-zinc-900 font-medium rounded-2xl rounded-br-sm"
            : "bg-zinc-800 text-zinc-100 font-mono text-xs border border-zinc-700/70 rounded-2xl rounded-bl-sm"
          }`}
      >
        {content}
      </div>

    </div>
  );
}
