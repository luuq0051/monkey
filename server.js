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

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Running on port ${PORT}`));
