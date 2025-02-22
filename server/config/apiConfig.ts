import { z } from 'zod';

export const ApiProviderSchema = z.enum([
  'openai',
  'anthropic',
  'stability',
  'midjourney',
  'google',
  'replicate',
  'qwen',
  'deepseek',
  'dolphin',
  'huggingface'
]);

export const ApiConfigSchema = z.object({
  apiKey: z.string(),
  baseUrl: z.string().optional(),
  version: z.string().optional(),
  model: z.string().optional(),
});

export type ApiProvider = z.infer<typeof ApiProviderSchema>;
export type ApiConfig = z.infer<typeof ApiConfigSchema>;

// Initialize with empty configs - to be populated from environment variables
export const apiConfigs: Record<ApiProvider, ApiConfig> = {
  openai: { apiKey: process.env.OPENAI_API_KEY || '' },
  anthropic: { apiKey: process.env.ANTHROPIC_API_KEY || '' },
  stability: { apiKey: process.env.STABILITY_API_KEY || '' },
  midjourney: { apiKey: process.env.MIDJOURNEY_API_KEY || '' },
  google: { apiKey: process.env.GOOGLE_API_KEY || '' },
  replicate: { apiKey: process.env.REPLICATE_API_KEY || '' },
  qwen: { 
    apiKey: process.env.QWEN_API_KEY || '',
    model: 'qwen'
  },
  deepseek: { 
    apiKey: 'not-needed',
    model: 'deepseek-1.5b',
    baseUrl: 'http://0.0.0.0:11434'
  },
  dolphin: { 
    apiKey: process.env.DOLPHIN_API_KEY || '',
    model: 'dolphin-mixtral'
  },
  huggingface: { 
    apiKey: process.env.HUGGINGFACE_API_KEY || '',
    baseUrl: 'https://api-inference.huggingface.co/models'
  }
};