import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { AiChatPanel } from "./AiChatPanel";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f1117]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full p-6">{children}</div>
      </main>
      <AiChatPanel isOpen={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
    </div>
  );
}
