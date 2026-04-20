const express = require('express');
const app = express();
const port = 3000; // Port mặc định

// Tạo một API đơn giản
app.get('/', (req, res) => {
  res.send('Hello World! API da chay thanh cong!');
});

// Tạo một API mẫu cho bên thứ 3
app.get('/api/data', (req, res) => {
  res.json({ message: 'Day la du lieu API', status: 'success' });
});

app.listen(port, () => {
  console.log(`App dang chay tai port ${port}`);
});
