import { motion } from "framer-motion";
import { format } from "date-fns";
import { type Message } from "@shared/schema";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        } rounded-lg p-4 shadow-sm backdrop-blur-sm`}
      >
        <p className="text-sm">{message.content}</p>
        <time className="text-xs opacity-70 mt-1 block">
          {format(new Date(message.timestamp), "h:mm a")}
        </time>
      </div>
    </motion.div>
  );
}
