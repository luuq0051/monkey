require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Centralized Configuration
const CONFIG = {
  API: process.env.API || 'not_set',
  API_URL: process.env.API_URL || 'not_set',
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

// Supported AI Models
const SUPPORTED_MODELS = {
  openai: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
  google: ['gemini-pro', 'gemini-pro-vision'],
  meta: ['llama-2-70b', 'llama-2-13b'],
  mistral: ['mistral-large', 'mistral-medium', 'mistral-small'],
  cohere: ['command-r-plus', 'command-r'],
  minimax: ['minimax-m2.7', 'minimax-m2', 'minimax-m1'],
  local: ['ollama', 'llm-rs']
};

// Root route
app.get('/', (req, res) => {
  res.send('Hello World! API da chay thanh cong!');
});

// API Documentation & Routes List
app.get('/api/routes', (req, res) => {
  res.json({
    service: 'Monkey AI API',
    version: '1.0.0',
    endpoints: [
      { method: 'GET', path: '/', description: 'Root endpoint - Check if server is running' },
      { method: 'GET', path: '/api/hello', description: 'Simple hello test endpoint' },
      { method: 'GET', path: '/api/routes', description: 'List all available routes' },
      { method: 'GET', path: '/api/config', description: 'Get current configuration' },
      { method: 'GET', path: '/api/cherry-studio', description: 'Get Cherry Studio configuration' },
      { method: 'GET', path: '/api/models', description: 'Get all supported AI models' },
      { method: 'GET', path: '/api/minimax/status', description: 'Check Minimax API status' },
      { method: 'POST', path: '/api/test/minimax', description: 'Test Minimax API with message' },
      { method: 'GET', path: '/api/health', description: 'Health check endpoint' }
    ],
    timestamp: new Date().toISOString()
  });
});

// API route
app.get('/api/hello', (req, res) => {
  res.json({ msg: 'Hello from MonkeyCode!', status: 'success' });
});

// Cherry Studio API route
app.get('/api/cherry-studio', (req, res) => {
  res.json({
    name: 'Cherry Studio Config',
    API: CONFIG.API !== 'not_set' ? CONFIG.API.substring(0, 10) + '...' : 'not_set',
    API_URL: CONFIG.API_URL,
    status: CONFIG.API !== 'not_set' && CONFIG.API_URL !== 'not_set' ? 'configured' : 'incomplete'
  });
});

// Config route
app.get('/api/config', (req, res) => {
  res.json({
    API: CONFIG.API !== 'not_set' ? CONFIG.API.substring(0, 10) + '...' : 'not_set',
    API_URL: CONFIG.API_URL,
    PORT: CONFIG.PORT,
    NODE_ENV: CONFIG.NODE_ENV,
    configured: CONFIG.API !== 'not_set' && CONFIG.API_URL !== 'not_set'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Monkey AI API',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// Supported AI Models
app.get('/api/models', (req, res) => {
  res.json({
    availableProviders: Object.keys(SUPPORTED_MODELS),
    models: SUPPORTED_MODELS,
    totalModels: Object.values(SUPPORTED_MODELS).flat().length,
    timestamp: new Date().toISOString()
  });
});

// Test Monkey AI - Minimax Model
app.post('/api/test/minimax', (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Request body must be a valid JSON object'
    });
  }

  const { message = 'Hello Minimax' } = req.body;

  if (typeof message !== 'string') {
    return res.status(400).json({
      error: 'Invalid input',
      message: 'Message must be a string'
    });
  }

  res.json({
    provider: 'minimax',
    model: 'minimax-m2.7',
    message: message,
    API_KEY: CONFIG.API !== 'not_set' ? '✅ Configured' : '❌ Not Set',
    API_URL: CONFIG.API_URL,
    status: 'ready_for_testing',
    timestamp: new Date().toISOString(),
    testPayload: {
      method: 'POST',
      url: CONFIG.API_URL + '/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${CONFIG.API}`,
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
  const apiConfigured = CONFIG.API !== 'not_set';
  const apiUrlConfigured = CONFIG.API_URL !== 'not_set';

  res.json({
    service: 'Monkey AI - Minimax',
    model: 'minimax-m2.7',
    api_configured: apiConfigured,
    api_url_configured: apiUrlConfigured,
    api_key_preview: apiConfigured ? CONFIG.API.substring(0, 10) + '...' : 'NOT_SET',
    api_url: CONFIG.API_URL,
    ready: apiConfigured && apiUrlConfigured,
    recommendation: apiConfigured && apiUrlConfigured ? '✅ Ready for deployment' : '❌ Please configure API and API_URL in .env'
  });
});

// 404 Handler - Must be last
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    availableRoutes: '/api/routes',
    timestamp: new Date().toISOString()
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔴 Error:', err);
  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Server listening
const PORT = CONFIG.PORT;
app.listen(PORT, () => console.log(`✅ Running on port ${PORT}`));
