
import { Router } from 'express';
import { aiService } from '../services/aiService';
import { ApiProviderSchema } from '../config/apiConfig';

const router = Router();

router.post('/generate/image', async (req, res) => {
  try {
    const { prompt, provider } = req.body;
    const validProvider = ApiProviderSchema.parse(provider);
    const result = await aiService.generateImage(prompt, validProvider);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/generate/text', async (req, res) => {
  try {
    const { prompt, provider } = req.body;
    const validProvider = ApiProviderSchema.parse(provider);
    const result = await aiService.generateText(prompt, validProvider);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
