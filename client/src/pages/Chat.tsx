import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ChatSidebar from "@/components/ChatSidebar";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import type { Message } from "@shared/schema";

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar isOpen={sidebarOpen} messages={messages} />
      
      <main className="flex-1 flex flex-col">
        <header className="h-14 flex items-center px-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
          </Button>
          <Separator orientation="vertical" className="mx-4 h-8" />
          <h1 className="font-semibold flex-1">Chat</h1>
          <ThemeToggle />
        </header>

        <ScrollArea className="flex-1 p-4">
          {isLoading ? (
            <div className="flex justify-center">Loading messages...</div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </motion.div>
          )}
        </ScrollArea>

        <ChatInput />
      </main>
    </div>
  );
}
