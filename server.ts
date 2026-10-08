import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared Google GenAI client (User-Agent header required by AI Studio guidelines)
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

/* -------------------------------------------------------------
 * 1. MULTI-TURN GEMINI CHATBOT API
 * Models: gemini-3.1-pro-preview (complex), gemini-3.5-flash (general), gemini-3.1-flash-lite (fast)
 * ------------------------------------------------------------- */
app.post('/api/chat', async (req, res) => {
  try {
    const { 
      messages, 
      model = 'gemini-3.5-flash', 
      systemInstruction, 
      enableSearch = false 
    } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const ai = getAiClient();

    // Map conversation history
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const config: any = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }
    if (enableSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    let response;
    let actualModel = model;

    try {
      response = await ai.models.generateContent({
        model,
        contents,
        config,
      });
    } catch (primaryErr: any) {
      console.warn(`Primary model ${model} request failed, attempting graceful fallback:`, primaryErr?.message);
      
      // Fallback 1: Try gemini-3.8-flash (with tools if enabled)
      try {
        actualModel = 'gemini-3.8-flash';
        response = await ai.models.generateContent({
          model: actualModel,
          contents,
          config,
        });
      } catch (fallbackErr: any) {
        // Fallback 2: Try gemini-3.1-flash-lite without tools
        console.warn('Fallback 1 failed, attempting gemini-3.1-flash-lite without tools:', fallbackErr?.message);
        actualModel = 'gemini-3.1-flash-lite';
        const cleanConfig = { ...config };
        delete cleanConfig.tools;
        response = await ai.models.generateContent({
          model: actualModel,
          contents,
          config: cleanConfig,
        });
      }
    }

    const text = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return res.json({
      text,
      groundingChunks,
      modelUsed: actualModel,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate chat response',
    });
  }
});

/* -------------------------------------------------------------
 * 2. GOOGLE SEARCH GROUNDING API
 * Model: gemini-3.5-flash with googleSearch tool
 * ------------------------------------------------------------- */
app.post('/api/search-grounding', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'query string is required' });
    }

    const ai = getAiClient();
    let response;
    let modelUsed = 'gemini-3.5-flash';

    const promptText = `Provide accurate, up-to-date laboratory safety, SDS chemical hazard information, or regulatory compliance standards for this query: "${query}". Include specific chemical safety considerations, OSHA/ACS/NIOSH rules, and practical apparatus protocols.`;
    const sysInstruction = 'You are an authoritative chemical safety specialist and regulatory compliance auditor. Provide accurate, real-world verified laboratory data with specific citations.';

    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: promptText,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: sysInstruction,
        },
      });
    } catch (primaryErr: any) {
      console.warn('Search grounding with gemini-3.5-flash failed, trying gemini-3.8-flash:', primaryErr?.message);
      try {
        modelUsed = 'gemini-3.8-flash';
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            tools: [{ googleSearch: {} }],
            systemInstruction: sysInstruction,
          },
        });
      } catch (secondErr: any) {
        console.warn('Search grounding tool failed, falling back to gemini-3.1-flash-lite without tool:', secondErr?.message);
        modelUsed = 'gemini-3.1-flash-lite';
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: promptText,
          config: {
            systemInstruction: sysInstruction,
          },
        });
      }
    }

    const text = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

    return res.json({
      text,
      groundingChunks,
      webSearchQueries,
      modelUsed,
    });
  } catch (error: any) {
    console.error('Search grounding error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to query search-grounded information',
    });
  }
});

/* -------------------------------------------------------------
 * 3. VEO VIDEO GENERATION (Text-to-Video & Image-to-Video Animation)
 * Model: veo-3.1-fast-generate-preview
 * Aspect Ratio: 16:9 or 9:16
 * ------------------------------------------------------------- */
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt, imageBase64, mimeType = 'image/png', aspectRatio = '16:9' } = req.body;

    if (!prompt && !imageBase64) {
      return res.status(400).json({ error: 'Either prompt or image is required' });
    }

    const ai = getAiClient();
    const ratio = aspectRatio === '9:16' ? '9:16' : '16:9';

    const videoParams: any = {
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'Cinematic footage of laboratory apparatus operation in a chemistry facility',
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: ratio,
      },
    };

    // If an image is provided (animate image into video)
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
      videoParams.image = {
        imageBytes: cleanBase64,
        mimeType: mimeType || 'image/png',
      };
    }

    const operation = await ai.models.generateVideos(videoParams);

    return res.json({
      operationName: operation.name,
      modelUsed: 'veo-3.1-fast-generate-preview',
      aspectRatio: ratio,
    });
  } catch (error: any) {
    console.error('Video generation start error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to start video generation',
    });
  }
});

/* -------------------------------------------------------------
 * 4. VEO VIDEO STATUS POLLING
 * ------------------------------------------------------------- */
app.post('/api/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const ai = getAiClient();
    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });

    return res.json({
      done: Boolean(updated.done),
      error: updated.error || null,
      hasVideo: Boolean(updated.response?.generatedVideos?.[0]?.video?.uri),
    });
  } catch (error: any) {
    console.error('Video status error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to check video status',
    });
  }
});

/* -------------------------------------------------------------
 * 5. VEO VIDEO DOWNLOAD / STREAMING
 * ------------------------------------------------------------- */
app.all('/api/video-download', async (req, res) => {
  try {
    const operationName = req.query.operationName || req.body?.operationName;
    if (!operationName || typeof operationName !== 'string') {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    }

    const ai = getAiClient();
    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: 'Video URI not found or video not ready yet' });
    }

    const videoRes = await fetch(uri, {
      headers: {
        'x-goog-api-key': apiKey,
      },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({ error: 'Failed to download video stream from Google' });
    }

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'inline; filename="lab-video.mp4"');

    const arrayBuffer = await videoRes.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (error: any) {
    console.error('Video download error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to download generated video',
    });
  }
});

/* -------------------------------------------------------------
 * STATIC SERVING & VITE MIDDLEWARES
 * ------------------------------------------------------------- */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
