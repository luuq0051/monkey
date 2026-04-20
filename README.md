# 🐵 Monkey AI - Express API Server

**Monkey AI** là một Express.js server cung cấp API cho Cherry Studio với hỗ trợ nhiều mô hình AI, đặc biệt là **Minimax m2.7**.

## 📋 Mục lục
- [Tính năng](#-tính-năng)
- [Yêu cầu](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Cấu hình](#-cấu-hình)
- [API Endpoints](#-api-endpoints)
- [Sử dụng](#-sử-dụng)
- [AI Models Hỗ trợ](#-ai-models-hỗ-trợ)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)

---

## ✨ Tính năng

✅ **Express.js Server** - Lightweight web framework  
✅ **Cherry Studio Integration** - API key + URL configuration  
✅ **Multi-AI Support** - 8 AI providers, 21+ models  
✅ **Minimax m2.7** - Advanced AI model support  
✅ **Environment Configuration** - dotenv support  
✅ **RESTful API** - Standard REST endpoints  
✅ **JSON Response** - Structured API responses  

---

## 🔧 Yêu cầu hệ thống

- **Node.js** v14+ 
- **npm** v6+ hoặc **yarn**
- **Git** (cho development)

---

## 📦 Cài đặt

### 1. Clone repository
```bash
git clone https://github.com/luuq0051/monkey.git
cd monkey
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Tạo file .env
```bash
cp .env.example .env
# Hoặc tạo file .env với nội dung:
PORT=3000
API=your-api-key-here
API_URL=https://your-api-endpoint.com
NODE_ENV=development
```

### 4. Chạy server
```bash
npm start
```

**Kết quả:**
```
✅ Running on port 3000
```

---

## ⚙️ Cấu hình

### File `.env`

```env
# Server port
PORT=3000

# Cherry Studio / Minimax API credentials
API=cherry_studio_api_key_123
API_URL=https://cherry-studio-api.monkeycode-ai.online

# Environment
NODE_ENV=development
```

### Biến Environment quan trọng

| Biến | Mô tả | Mặc định | Bắt buộc |
|------|-------|---------|---------|
| `PORT` | Cổng server | 3000 | ❌ |
| `API` | API Key cho Minimax/Cherry Studio | - | ✅ |
| `API_URL` | URL endpoint API | - | ✅ |
| `NODE_ENV` | Môi trường (development/production) | development | ❌ |

---

## 🔌 API Endpoints

### 1. Root Endpoint
```
GET /
```
**Response:**
```
Hello World! API da chay thanh cong!
```

---

### 2. Simple API Test
```
GET /api/hello
```
**Response:**
```json
{
  "msg": "Hello from MonkeyCode!",
  "status": "success"
}
```

---

### 3. Cherry Studio Config
```
GET /api/cherry-studio
```
**Response:**
```json
{
  "name": "Cherry Studio Config",
  "API": "cherry_studio_api_key_123",
  "API_URL": "https://cherry-studio-api.monkeycode-ai.online",
  "status": "configured"
}
```

---

### 4. Configuration Status
```
GET /api/config
```
**Response:**
```json
{
  "API": "cherry_studio_api_key_123",
  "API_URL": "https://cherry-studio-api.monkeycode-ai.online",
  "PORT": 3000,
  "NODE_ENV": "development"
}
```

---

### 5. Danh sách AI Models
```
GET /api/models
```
**Response:**
```json
{
  "availableProviders": ["openai", "anthropic", "google", "meta", "mistral", "cohere", "minimax", "local"],
  "models": {
    "openai": ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
    "anthropic": ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
    "minimax": ["minimax-m2.7", "minimax-m2", "minimax-m1"],
    ...
  },
  "totalModels": 21,
  "timestamp": "2026-04-20T10:30:00.000Z"
}
```

---

### 6. Test Minimax API
```
POST /api/test/minimax
```
**Request Body:**
```json
{
  "message": "Hello Minimax m2.7!"
}
```
**Response:**
```json
{
  "provider": "minimax",
  "model": "minimax-m2.7",
  "message": "Hello Minimax m2.7!",
  "API_KEY": "✅ Configured",
  "API_URL": "https://cherry-studio-api.monkeycode-ai.online",
  "status": "ready_for_testing",
  "timestamp": "2026-04-20T10:30:00.000Z",
  "testPayload": {
    "method": "POST",
    "url": "https://cherry-studio-api.monkeycode-ai.online/v1/chat/completions",
    "headers": {
      "Authorization": "Bearer cherry_studio_api_key_123",
      "Content-Type": "application/json"
    },
    "body": {
      "model": "minimax-m2.7",
      "messages": [{"role": "user", "content": "Hello Minimax m2.7!"}],
      "temperature": 0.7
    }
  }
}
```

---

### 7. Kiểm tra Minimax Status
```
GET /api/minimax/status
```
**Response:**
```json
{
  "service": "Monkey AI - Minimax",
  "model": "minimax-m2.7",
  "api_configured": true,
  "api_url_configured": true,
  "api_key_preview": "cherry_stu...",
  "api_url": "https://cherry-studio-api.monkeycode-ai.online",
  "ready": true,
  "recommendation": "✅ Ready for deployment"
}
```

---

## 💻 Sử dụng

### CURL Examples

#### Test root endpoint
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/
```

#### Test simple API
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/hello
```

#### Lấy config
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/config
```

#### Xem danh sách models
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/models
```

#### Test Minimax API
```bash
curl -X POST https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/test/minimax \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Minimax!"}'
```

#### Check Minimax Status
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/minimax/status
```

### JavaScript/Node.js Example

```javascript
const axios = require('axios');

const BASE_URL = 'https://3000-4ec40ecf49e1a744.monkeycode-ai.online';

// Get models
async function getModels() {
  const response = await axios.get(`${BASE_URL}/api/models`);
  console.log(response.data);
}

// Test Minimax
async function testMinimax(message) {
  const response = await axios.post(`${BASE_URL}/api/test/minimax`, {
    message: message
  });
  console.log(response.data);
}

getModels();
testMinimax('Hello Minimax!');
```

### Python Example

```python
import requests

BASE_URL = 'https://3000-4ec40ecf49e1a744.monkeycode-ai.online'

# Get models
response = requests.get(f'{BASE_URL}/api/models')
print(response.json())

# Test Minimax
response = requests.post(
    f'{BASE_URL}/api/test/minimax',
    json={'message': 'Hello Minimax!'}
)
print(response.json())
```

---

## 🤖 AI Models Hỗ trợ

### OpenAI
- `gpt-4`
- `gpt-4-turbo`
- `gpt-3.5-turbo`

### Anthropic (Claude)
- `claude-3-opus` - Mạnh nhất
- `claude-3-sonnet` - Cân bằng
- `claude-3-haiku` - Nhanh nhất

### Google Gemini
- `gemini-pro`
- `gemini-pro-vision`

### Meta Llama
- `llama-2-70b`
- `llama-2-13b`

### Mistral
- `mistral-large`
- `mistral-medium`
- `mistral-small`

### Cohere
- `command-r-plus`
- `command-r`

### Minimax ⭐
- `minimax-m2.7` - **Được hỗ trợ chính**
- `minimax-m2`
- `minimax-m1`

### Local Models
- `ollama`
- `llm-rs`

---

## 🐛 Troubleshooting

### ❌ "Cannot GET /api/hello"
**Nguyên nhân:** Server chưa chạy hoặc route không tồn tại

**Giải pháp:**
```bash
# Kiểm tra server có chạy không
curl http://localhost:3000/

# Nếu lỗi, khởi động server
npm start
```

---

### ❌ "Port 3000 already in use"
**Nguyên nhân:** Port 3000 đã bị sử dụng

**Giải pháp:**
```bash
# Tìm process dùng port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Hoặc dùng port khác
PORT=3001 npm start
```

---

### ❌ "API key not configured"
**Nguyên nhân:** Biến `API` chưa được set

**Giải pháp:**
```bash
# Kiểm tra .env
cat .env

# Hoặc set trực tiếp
export API=your-key-here
npm start
```

---

### ❌ "Cannot find module 'dotenv'"
**Nguyên nhân:** Dependencies chưa cài

**Giải pháp:**
```bash
npm install
npm start
```

---

## 🚀 Deployment

### Deploy lên Heroku

```bash
# 1. Login Heroku
heroku login

# 2. Create app
heroku create monkey-ai

# 3. Set environment variables
heroku config:set API=your-api-key
heroku config:set API_URL=your-api-url

# 4. Deploy
git push heroku main
```

### Deploy lên Railway

```bash
# 1. Connect repository
# (Trực tiếp từ GitHub)

# 2. Set environment variables trong Railway dashboard

# 3. Deploy otomatis
```

### Deploy lên Vercel

```bash
# 1. Export handler
vercel --prod

# 2. Set environment variables
```

---

## 📝 Mô tả tệp

| File | Mô tả |
|------|-------|
| `server.js` | Express server chính |
| `.env` | Environment variables |
| `package.json` | Dependencies và scripts |
| `sync.sh` | Git sync script |
| `README.md` | Tài liệu này |

---

## 📜 License

MIT

---

## 👨‍💻 Author

**luuq0051** - Monkey AI Project

---

## 🔗 Links

- **GitHub:** https://github.com/luuq0051/monkey
- **Live Server:** https://3000-4ec40ecf49e1a744.monkeycode-ai.online
- **Minimax API:** https://cherry-studio-api.monkeycode-ai.online

---

## ❓ Câu hỏi / Hỗ trợ

Nếu bạn gặp vấn đề, vui lòng:
1. Kiểm tra phần [Troubleshooting](#-troubleshooting)
2. Tạo issue trên GitHub
3. Kiểm tra logs: `npm start`

---

**Được cập nhật:** 20/04/2026