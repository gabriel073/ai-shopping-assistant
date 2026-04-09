
export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      
      {/* Burbuja */}
      <div
        className={`
          max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm
          ${isUser 
            ? "bg-yellow-500 text-black rounded-br-none" 
            : "bg-gray-700 text-white rounded-bl-none"}
        `}
      >
        {content}
      </div>

    </div>
  );
}