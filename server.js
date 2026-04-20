require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello World! API da chay thanh cong!');
});

// API route
app.get('/api/hello', (req, res) => {
  res.json({ msg: 'Hello from MonkeyCode!', status: 'success' });
});

// Cherry Studio API route
app.get('/api/cherry-studio', (req, res) => {
  const API = process.env.API || 'default_api_key';
  const API_URL = process.env.API_URL || 'https://api.example.com';
  
  res.json({
    name: 'Cherry Studio Config',
    API: API,
    API_URL: API_URL,
    status: 'configured'
  });
});

// Config route
app.get('/api/config', (req, res) => {
  res.json({
    API: process.env.API || 'not_set',
    API_URL: process.env.API_URL || 'not_set',
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development'
  });
});

// Supported AI Models
app.get('/api/models', (req, res) => {
  const supportedModels = {
    openai: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    anthropic: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    google: ['gemini-pro', 'gemini-pro-vision'],
    meta: ['llama-2-70b', 'llama-2-13b'],
    mistral: ['mistral-large', 'mistral-medium', 'mistral-small'],
    cohere: ['command-r-plus', 'command-r'],
    minimax: ['minimax-m2.7', 'minimax-m2', 'minimax-m1'],
    local: ['ollama', 'llm-rs']
  };
  
  res.json({
    availableProviders: Object.keys(supportedModels),
    models: supportedModels,
    totalModels: Object.values(supportedModels).flat().length,
    timestamp: new Date().toISOString()
  });
});

// Test Monkey AI - Minimax Model
app.post('/api/test/minimax', (req, res) => {
  const { message = 'Hello Minimax' } = req.body;
  const API = process.env.API || 'default_api_key';
  const API_URL = process.env.API_URL || 'https://cherry-studio-api.monkeycode-ai.online';
  
  res.json({
    provider: 'minimax',
    model: 'minimax-m2.7',
    message: message,
    API_KEY: API ? '✅ Configured' : '❌ Not Set',
    API_URL: API_URL,
    status: 'ready_for_testing',
    timestamp: new Date().toISOString(),
    testPayload: {
      method: 'POST',
      url: API_URL + '/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${API}`,
        'Content-Type': 'application/json'
      },
      body: {
        model: 'minimax-m2.7',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7
      }
    }
  });
});

// Get Minimax Status
app.get('/api/minimax/status', (req, res) => {
  const API = process.env.API || '';
  const API_URL = process.env.API_URL || '';
  
  res.json({
    service: 'Monkey AI - Minimax',
    model: 'minimax-m2.7',
    api_configured: !!API,
    api_url_configured: !!API_URL,
    api_key_preview: API ? API.substring(0, 10) + '...' : 'NOT_SET',
    api_url: API_URL || 'NOT_SET',
    ready: !!(API && API_URL),
    recommendation: API && API_URL ? '✅ Ready for deployment' : '❌ Please configure API and API_URL in .env'
  });
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Running on port ${PORT}`));
