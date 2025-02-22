import { ApiProvider, apiConfigs } from '../config/apiConfig';

class AIService {
  async generateImage(prompt: string, provider: ApiProvider = 'openai') {
    const config = apiConfigs[provider];
    if (!config.apiKey) throw new Error(`API key not configured for ${provider}`);

    switch (provider) {
      case 'openai':
        return this.openaiImageGeneration(prompt, config.apiKey);
      case 'stability':
        return this.stabilityImageGeneration(prompt, config.apiKey);
      case 'huggingface':
        return this.huggingfaceImageGeneration(prompt, config.apiKey);
      default:
        throw new Error(`Unsupported provider for image generation: ${provider}`);
    }
  }

  async generateText(prompt: string, provider: ApiProvider = 'openai') {
    const config = apiConfigs[provider];
    if (!config.apiKey) throw new Error(`API key not configured for ${provider}`);

    switch (provider) {
      case 'openai':
        return this.openaiChatCompletion(prompt, config.apiKey);
      case 'anthropic':
        return this.anthropicChatCompletion(prompt, config.apiKey);
      case 'qwen':
        return this.qwenChatCompletion(prompt, config.apiKey);
      case 'deepseek':
        return this.deepseekChatCompletion(prompt, config.apiKey);
      case 'dolphin':
        return this.dolphinChatCompletion(prompt, config.apiKey);
      default:
        throw new Error(`Unsupported provider for text generation: ${provider}`);
    }
  }

  private async openaiImageGeneration(prompt: string, apiKey: string) {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: '1024x1024',
      }),
    });
    return response.json();
  }

  private async openaiChatCompletion(prompt: string, apiKey: string) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    return response.json();
  }

  private async stabilityImageGeneration(prompt: string, apiKey: string) {
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        steps: 30,
      }),
    });
    return response.json();
  }

  private async anthropicChatCompletion(prompt: string, apiKey: string) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    return response.json();
  }

  private async qwenChatCompletion(prompt: string, apiKey: string) {
    const response = await fetch('https://api.ollama.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: apiConfigs.qwen.model,
        messages: [{ role: 'user', content: prompt }],
        stream: false
      }),
    });
    return response.json();
  }

  private async deepseekChatCompletion(prompt: string, _apiKey: string) {
    const config = apiConfigs.deepseek;
    const response = await fetch(`${config.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [{ role: 'user', content: prompt }],
        stream: false
      }),
    });
    return response.json();
  }

  private async dolphinChatCompletion(prompt: string, apiKey: string) {
    const response = await fetch('https://api.ollama.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: apiConfigs.dolphin.model,
        messages: [{ role: 'user', content: prompt }],
        stream: false
      }),
    });
    return response.json();
  }

  private async huggingfaceImageGeneration(prompt: string, apiKey: string) {
    const response = await fetch(`${apiConfigs.huggingface.baseUrl}/runwayml/stable-diffusion-v1-5`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: true
        }
      }),
    });
    return response.json();
  }
}

export const aiService = new AIService();