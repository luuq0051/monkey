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

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Running on port ${PORT}`));
