# 📖 API Documentation

**Monkey AI API** - Comprehensive API Reference

---

## 🔑 Base URL

```
https://3000-4ec40ecf49e1a744.monkeycode-ai.online
```

---

## 📊 Response Format

Tất cả responses đều là JSON:

```json
{
  "data": {},
  "status": "success",
  "timestamp": "2026-04-20T10:30:00.000Z"
}
```

### Status Codes

| Code | Ý nghĩa |
|------|---------|
| 200 | OK - Request thành công |
| 400 | Bad Request - Request không hợp lệ |
| 404 | Not Found - Endpoint không tồn tại |
| 500 | Server Error - Lỗi server |

---

## 🔌 API Endpoints

### 1️⃣ Root Endpoint

```http
GET /
```

**Purpose:** Kiểm tra server có chạy không

**Response:**
```
Hello World! API da chay thanh cong!
```

**Curl:**
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/
```

---

### 2️⃣ Hello API

```http
GET /api/hello
```

**Purpose:** Test API đơn giản

**Response:**
```json
{
  "msg": "Hello from MonkeyCode!",
  "status": "success"
}
```

**Examples:**

**Bash/Curl:**
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/hello
```

**JavaScript:**
```javascript
fetch('https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/hello')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Python:**
```python
import requests
response = requests.get('https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/hello')
print(response.json())
```

---

### 3️⃣ Cherry Studio Config

```http
GET /api/cherry-studio
```

**Purpose:** Lấy thông tin cấu hình Cherry Studio

**Response:**
```json
{
  "name": "Cherry Studio Config",
  "API": "cherry_studio_api_key_123",
  "API_URL": "https://cherry-studio-api.monkeycode-ai.online",
  "status": "configured"
}
```

**Use Case:** Kiểm tra xem Cherry Studio API đã được cấu hình chưa

---

### 4️⃣ Get Configuration

```http
GET /api/config
```

**Purpose:** Lấy toàn bộ cấu hình server

**Response:**
```json
{
  "API": "cherry_studio_api_key_123",
  "API_URL": "https://cherry-studio-api.monkeycode-ai.online",
  "PORT": 3000,
  "NODE_ENV": "development"
}
```

**Use Case:** Debug, kiểm tra biến environment

---

### 5️⃣ List AI Models

```http
GET /api/models
```

**Purpose:** Lấy danh sách tất cả AI models được hỗ trợ

**Query Parameters:** Không

**Response:**
```json
{
  "availableProviders": [
    "openai",
    "anthropic",
    "google",
    "meta",
    "mistral",
    "cohere",
    "minimax",
    "local"
  ],
  "models": {
    "openai": [
      "gpt-4",
      "gpt-4-turbo",
      "gpt-3.5-turbo"
    ],
    "anthropic": [
      "claude-3-opus",
      "claude-3-sonnet",
      "claude-3-haiku"
    ],
    "google": [
      "gemini-pro",
      "gemini-pro-vision"
    ],
    "meta": [
      "llama-2-70b",
      "llama-2-13b"
    ],
    "mistral": [
      "mistral-large",
      "mistral-medium",
      "mistral-small"
    ],
    "cohere": [
      "command-r-plus",
      "command-r"
    ],
    "minimax": [
      "minimax-m2.7",
      "minimax-m2",
      "minimax-m1"
    ],
    "local": [
      "ollama",
      "llm-rs"
    ]
  },
  "totalModels": 21,
  "timestamp": "2026-04-20T10:30:00.000Z"
}
```

**Examples:**

**Curl:**
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/models
```

**JavaScript:**
```javascript
const response = await fetch('https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/models');
const data = await response.json();
console.log(data.models.minimax);
```

---

### 6️⃣ Test Minimax API

```http
POST /api/test/minimax
```

**Purpose:** Test Minimax m2.7 API với message

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
      "messages": [
        {
          "role": "user",
          "content": "Hello Minimax m2.7!"
        }
      ],
      "temperature": 0.7
    }
  }
}
```

**Examples:**

**Curl:**
```bash
curl -X POST https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/test/minimax \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Minimax?"}'
```

**JavaScript:**
```javascript
const response = await fetch('https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/test/minimax', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Explain quantum computing'
  })
});

const data = await response.json();
console.log(data);
```

**Python:**
```python
import requests

url = 'https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/test/minimax'
payload = {'message': 'Hello Minimax!'}

response = requests.post(url, json=payload)
print(response.json())
```

---

### 7️⃣ Minimax Status

```http
GET /api/minimax/status
```

**Purpose:** Kiểm tra trạng thái Minimax API

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

**Use Case:** Pre-flight check trước khi gọi Minimax API

**Examples:**

**Curl:**
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/minimax/status
```

---

## 🔐 Authentication

Hiện tại API không yêu cầu authentication, nhưng Minimax API cần:

```
Authorization: Bearer YOUR_API_KEY
```

Set trong `.env`:
```env
API=your-minimax-api-key
```

---

## 📝 Rate Limiting

Không có rate limiting hiện tại.

---

## 🆘 Error Handling

### Example Error Response

```json
{
  "error": "Invalid request",
  "message": "Missing required parameter: message",
  "status": 400
}
```

### Common Errors

| Error | Giải pháp |
|-------|----------|
| `Cannot GET /api/xyz` | Endpoint không tồn tại, kiểm tra URL |
| `Port 3000 already in use` | Kill process hoặc dùng port khác |
| `Cannot find module` | Chạy `npm install` |
| `API key not configured` | Set `API` trong `.env` |

---

## 📊 Rate Limiting (Kế hoạch)

```
- 100 requests/minute (authenticated)
- 10 requests/minute (unauthenticated)
```

---

## 🔄 Pagination (Kế hoạch)

```
GET /api/models?page=1&limit=10
```

---

## 🧪 Testing APIs

### Using Postman

1. Import collection
2. Set base URL: `https://3000-4ec40ecf49e1a744.monkeycode-ai.online`
3. Create requests

### Using Insomnia

```
Collection: Monkey AI
Base URL: https://3000-4ec40ecf49e1a744.monkeycode-ai.online
```

### Using HTTPie

```bash
http GET https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/models
```

---

## 📚 Webhook (Kế hoạch)

```
POST /webhooks/chat
```

---

## 📞 Support

- 📧 Email: luuq0051@gmail.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Last Updated:** 20/04/2026
