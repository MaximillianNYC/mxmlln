require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { streamText } = require('ai');
const { openai } = require('@ai-sdk/openai');

// Support both OPENAI_API_KEY and OPEN_AI_KEY for compatibility
// AI SDK uses OPENAI_API_KEY by default, so set it if OPEN_AI_KEY exists
if (process.env.OPEN_AI_KEY && !process.env.OPENAI_API_KEY) {
  process.env.OPENAI_API_KEY = process.env.OPEN_AI_KEY;
}

// Check if API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('WARNING: OPENAI_API_KEY is not set! Chat will not work.');
} else {
  console.log('OpenAI API key is configured (length:', process.env.OPENAI_API_KEY.length, ')');
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Handle OPTIONS requests for CORS
app.options('/api/chat', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

// Chat endpoint similar to exp/012
app.post('/api/chat', async (req, res) => {
  try {
    console.log('Received chat request');
    const { messages } = req.body;
    console.log('Messages:', JSON.stringify(messages, null, 2));

    console.log('Calling streamText...');
    console.log('API Key check:', process.env.OPENAI_API_KEY ? 'Set (length: ' + process.env.OPENAI_API_KEY.length + ')' : 'NOT SET');
    
    const result = streamText({
      model: openai('gpt-4o-mini-2024-07-18'),
      system: `
        You are an assistant who speaks like Truman Capote.    
    
        Tone of Voice Guidelines:
        **Pillars**  
        1. **Intuitive**: Simplify complexity into clean, concise steps to eliminate the superfluous.  
        2. **Lucid**: Deliver high-density information direct and succinctly to avoid verbosity.  
        3. **Elegant**: Speak with refined, but never stodgy, diction to build trust.  
        4. **Warm**: Offer genuine empathy and reassurance to be welcoming and present.  
        5. **Optimistic**: Champion a future where technology amplifies human capabilities to enrich our lives.

        **Grammar & Style**  
        - Limit responses to only a few sentences.
        - Use first-person perspective (\`I\`, \`me\`) in short, active sentences.  
        - Limit to one exclamation mark per JSON value.  
        - Use em-dashes sparingly — and surround them with spaces.  
        - Employ ellipses (…) only for gentle, atmospheric pauses.
        `,
      messages,
    });

    // Convert the AI SDK stream to Express response
    console.log('Converting to data stream response...');
    const aiResponse = result.toDataStreamResponse();
    console.log('AI Response headers:', [...aiResponse.headers.entries()]);
    
    // Copy headers from AI SDK response (headers is a Headers object)
    for (const [key, value] of aiResponse.headers.entries()) {
      res.setHeader(key, value);
    }
    
    // Set CORS headers (override if needed)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Pipe the stream to Express response
    const reader = aiResponse.body.getReader();
    const decoder = new TextDecoder();

    const pump = async () => {
      try {
        let chunkCount = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log('Stream finished. Total chunks sent:', chunkCount);
            res.end();
            break;
          }
          chunkCount++;
          const chunk = decoder.decode(value, { stream: true });
          console.log(`Sending chunk ${chunkCount}, length: ${chunk.length}, preview: ${chunk.substring(0, 100)}`);
          res.write(chunk);
        }
      } catch (error) {
        console.error('Streaming error:', error);
        console.error('Streaming error stack:', error.stack);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Streaming error', details: error.message });
        } else {
          res.end();
        }
      }
    };

    console.log('Starting to pump stream...');
    pump();
  } catch (error) {
    console.error('Chat endpoint error:', error);
    console.error('Error stack:', error.stack);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || 'Internal server error', details: error.toString() });
    } else {
      res.end();
    }
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

