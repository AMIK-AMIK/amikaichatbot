import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Message } from "@shared/schema";

interface ChatSidebarProps {
  isOpen: boolean;
  messages: Message[];
}

export default function ChatSidebar({ isOpen, messages }: ChatSidebarProps) {
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/messages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
    },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-r bg-muted/30 backdrop-blur-sm"
        >
          <div className="p-4 border-b">
            <h2 className="font-semibold">Chat History</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-60px)]">
            <div className="p-2 space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="p-3 rounded-md bg-background/80 hover:bg-background/90 transition-colors"
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-sm truncate flex-1">{message.content}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => deleteMutation.mutate(message.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <time className="text-xs text-muted-foreground">
                    {format(new Date(message.timestamp), "MMM d, h:mm a")}
                  </time>
                </div>
              ))}
            </div>
          </ScrollArea>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
