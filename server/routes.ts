import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";


import { aiService } from "./services/aiService";


export async function registerRoutes(app: Express) {
  app.get("/api/messages", async (_req, res) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });

  app.post("/api/messages", async (req, res) => {
    const result = insertMessageSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: "Invalid message data" });
      return;
    }
    const message = await storage.addMessage(result.data);
    res.json(message);
  });

  app.delete("/api/messages/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid message ID" });
      return;
    }


  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
      }
      const response = await aiService.generateText(message, 'openai');
      res.json({ response: response.choices[0].message.content });
    } catch (error) {
      console.error("AI Service Error:", error);
      res.status(500).json({ error: "Failed to process chat message. Check if API key is set in Secrets." });
    }
  });


    await storage.deleteMessage(id);
    res.status(204).send();
  });

  return createServer(app);
}
