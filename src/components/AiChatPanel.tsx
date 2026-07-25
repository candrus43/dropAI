import { MessageSquare, X, Send } from "lucide-react";
import { useState } from "react";
import type { ChatMessage } from "~/lib/types";
import { mockChatMessages } from "~/lib/mock-data";

interface AiChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AiChatPanel({ isOpen, onToggle }: AiChatPanelProps) {
  const [messages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState("");

  return (
    <>
      {/* Toggle button when closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg transition-transform hover:scale-105 hover:bg-indigo-400"
          aria-label="Open AI chat"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      )}

      {/* Chat panel */}
      <div
        className={`flex h-screen flex-col border-l border-white/[0.06] bg-[#0f1117] transition-all duration-300 ${
          isOpen ? "w-96" : "w-0 overflow-hidden border-l-0"
        }`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/[0.06] px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20">
              <MessageSquare className="h-4 w-4 text-indigo-400" />
            </div>
            <span className="font-medium text-white">AI Assistant</span>
          </div>
          <button
            onClick={onToggle}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-white/[0.04] hover:text-gray-300"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                  msg.role === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-[#1a1d27] text-gray-200"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, analytics..."
              className="flex-1 rounded-lg border border-white/[0.08] bg-[#1a1d27] px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-indigo-500/50"
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  setInput("");
                }
              }}
            />
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-white hover:bg-indigo-400"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
