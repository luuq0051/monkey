# 🧪 Testing Guide

Hướng dẫn để test Minimax model và tất cả API endpoints.

---

## ⚡ Quick Start Testing

### 1. Start Server

```bash
cd /workspaces/monkey
npm start
```

Bạn sẽ thấy:
```
✅ Running on port 3000
```

---

### 2. Test Minimax Model (Automated)

**Mở terminal mới (không dừng server):**

```bash
chmod +x test_minimax.sh
./test_minimax.sh
```

**Expected Output:**
```
✅ Test 1 (Server Running):        PASS
✅ Test 2 (Minimax Status):        PASS
✅ Test 3 (Models Listed):         PASS
✅ Test 4 (API Endpoint):          PASS
✅ Test 5 (API Config):            PASS

🎉 All tests PASSED! Minimax m2.7 is working correctly!
```

---

### 3. Test All APIs (Automated)

```bash
chmod +x test_all_apis.sh
./test_all_apis.sh
```

---

## 🔍 Manual Testing

### Test 1: Server Status

```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/

# Expected: Hello World! API da chay thanh cong!
```

---

### Test 2: Hello API

```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/hello

# Expected JSON:
# {"msg":"Hello from MonkeyCode!","status":"success"}
```

---

### Test 3: Minimax Status

```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/minimax/status

# Expected JSON:
# {
#   "service": "Monkey AI - Minimax",
#   "model": "minimax-m2.7",
#   "ready": true,
#   ...
# }
```

---

### Test 4: Test Minimax API

```bash
curl -X POST https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/test/minimax \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Minimax!"}'

# Expected JSON:
# {
#   "provider": "minimax",
#   "model": "minimax-m2.7",
#   "message": "Hello Minimax!",
#   "status": "ready_for_testing",
#   ...
# }
```

---

### Test 5: List All Models

```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/models

# Expected: List của tất cả models bao gồm minimax-m2.7
```

---

### Test 6: Get Config

```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/config

# Expected JSON:
# {
#   "API": "cherry_studio_api_key_123",
#   "API_URL": "https://cherry-studio-api.monkeycode-ai.online",
#   "PORT": 3000,
#   "NODE_ENV": "development"
# }
```

---

## 🧬 Minimax Model Details

### Model Name
- `minimax-m2.7` (chính)
- `minimax-m2` (alternative)
- `minimax-m1` (legacy)

### Configuration Required
```env
API=your-minimax-api-key
API_URL=https://your-minimax-api-endpoint
```

### Status Indicators

| Indicator | Meaning |
|-----------|---------|
| `api_configured: true` | API Key is set |
| `api_url_configured: true` | API URL is set |
| `ready: true` | Model is ready to use |
| `recommendation: "✅ Ready for deployment"` | All systems go |

---

## ✅ Test Checklist

- [ ] Server starts with `npm start`
- [ ] `GET /` returns "Hello World! API da chay thanh cong!"
- [ ] `GET /api/hello` returns JSON with "msg"
- [ ] `GET /api/minimax/status` shows "ready": true
- [ ] `POST /api/test/minimax` accepts message parameter
- [ ] `GET /api/models` includes minimax array
- [ ] `.env` file has API and API_URL set
- [ ] All 7 endpoints working

---

## 🐛 Troubleshooting

### Server Won't Start

```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill existing process
kill -9 <PID>

# Try different port
PORT=3001 npm start
```

### Endpoints Return 404

```bash
# Make sure server is running
curl http://localhost:3000/

# If returns connection refused, start server
npm start
```

### Minimax Status Shows Not Ready

```bash
# Check .env file
cat .env

# Verify API and API_URL are set
# API=your-key
# API_URL=your-url

# If not set, update .env and restart
npm start
```

### Test Script Permission Denied

```bash
# Make scripts executable
chmod +x test_minimax.sh
chmod +x test_all_apis.sh

# Then run
./test_minimax.sh
./test_all_apis.sh
```

---

## 📊 Performance Testing

### Load Testing

```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Run 100 requests, 10 concurrent
ab -n 100 -c 10 https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/hello
```

### Response Time

```bash
# Measure response time
time curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/hello

# Expected: < 100ms
```

---

## 🔐 Security Testing

### Check for Exposed Secrets

```bash
# Should NOT see actual API keys
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/config | grep "cherry_studio"

# If it shows full key, that's a security issue!
```

---

## 📝 Test Report Template

```
Test Date: 2026-04-20
Server: https://3000-4ec40ecf49e1a744.monkeycode-ai.online

✅ Test 1: Server Running - PASS
✅ Test 2: Root Endpoint - PASS
✅ Test 3: Hello API - PASS
✅ Test 4: Minimax Status - PASS
✅ Test 5: Minimax Test - PASS
✅ Test 6: Models List - PASS
✅ Test 7: Config - PASS

Overall Status: ✅ ALL PASS
Ready for Production: YES
```

---

## 🚀 Next Steps After Testing

1. ✅ Tests passed locally
2. 📤 Push to GitHub
3. 🚢 Deploy to production
4. 📊 Monitor performance
5. 🔄 Regular testing

---

## 📞 Issues?

If tests fail:
1. Check server is running: `npm start`
2. Check .env file has API and API_URL
3. Check network connection
4. Check firewall/proxy settings
5. Email: luuq0051@gmail.com

---

**Testing Guide Last Updated:** 20/04/2026
