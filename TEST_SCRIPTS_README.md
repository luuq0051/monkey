# 🧪 Test Scripts Guide

3 test scripts để kiểm tra Minimax model và API.

---

## 📦 Available Test Scripts

### 1. **check_minimax.sh** - Quick Check
**Kiểm tra nhanh trạng thái Minimax**

```bash
chmod +x check_minimax.sh
./check_minimax.sh
```

**Output:**
```
🔍 Quick Minimax Model Check
==============================

1️⃣ Checking server...
   ✅ Server is running

2️⃣ Checking Minimax status...
   ✅ Minimax is READY
   Model: minimax-m2.7

3️⃣ Testing Minimax API...
   ✅ API test SUCCESS

==============================
Done! Model status checked.
```

**Thời gian:** ~5 giây
**Use case:** Quick verification

---

### 2. **test_minimax.sh** - Detailed Minimax Test
**Kiểm tra chi tiết Minimax integration**

```bash
chmod +x test_minimax.sh
./test_minimax.sh
```

**Tests:**
- ✅ Server running
- ✅ Minimax status endpoint
- ✅ Models list (includes minimax)
- ✅ Minimax API endpoint
- ✅ API configuration

**Output:**
```
📊 Test Summary
==========================================
Test 1 (Server Running):        PASS
Test 2 (Minimax Status):        PASS
Test 3 (Models Listed):         PASS
Test 4 (API Endpoint):          PASS
Test 5 (API Config):            PASS

🎉 All tests PASSED! Minimax m2.7 is working correctly!
```

**Thời gian:** ~15 giây
**Use case:** Full validation

---

### 3. **test_all_apis.sh** - Complete API Suite
**Kiểm tra tất cả 7 API endpoints**

```bash
chmod +x test_all_apis.sh
./test_all_apis.sh
```

**Tests:**
- ✅ Root endpoint `/`
- ✅ Hello API `/api/hello`
- ✅ Cherry Studio config `/api/cherry-studio`
- ✅ API config `/api/config`
- ✅ Models list `/api/models`
- ✅ Minimax status `/api/minimax/status`
- ✅ Minimax test `/api/test/minimax`

**Output:**
```
🚀 Monkey AI - Complete API Test Suite
========================================

📍 Testing: Root Endpoint
✅ PASS

📍 Testing: Hello API
✅ PASS

... (5 more tests)

📊 Test Results
========================================
Passed: 7
Failed: 0
Total: 7

🎉 All tests PASSED!
```

**Thời gian:** ~30 giây
**Use case:** Full system validation

---

## 🚀 Quick Test Workflow

### Step 1: Start Server
```bash
npm start
# Output: ✅ Running on port 3000
```

### Step 2: Test Minimax (New Terminal)
```bash
./check_minimax.sh
# Quick status check: ~5s
```

### Step 3: Full Minimax Test
```bash
./test_minimax.sh
# Detailed validation: ~15s
```

### Step 4: Full API Test
```bash
./test_all_apis.sh
# All endpoints: ~30s
```

---

## 📋 Which Test Script to Use?

| Scenario | Script | Time |
|----------|--------|------|
| "Is Minimax working?" | `check_minimax.sh` | 5s |
| "Minimax fully working?" | `test_minimax.sh` | 15s |
| "All APIs working?" | `test_all_apis.sh` | 30s |
| "Before deployment?" | `test_all_apis.sh` | 30s |
| "Quick health check?" | `check_minimax.sh` | 5s |

---

## 🔍 Manual Testing

### Test Minimax Status
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/minimax/status
```

### Test Minimax API
```bash
curl -X POST https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/test/minimax \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### Test All Models
```bash
curl https://3000-4ec40ecf49e1a744.monkeycode-ai.online/api/models
```

---

## ✅ Success Indicators

### Minimax Ready ✅
```json
{
  "ready": true,
  "api_configured": true,
  "api_url_configured": true,
  "recommendation": "✅ Ready for deployment"
}
```

### Minimax NOT Ready ❌
```json
{
  "ready": false,
  "api_configured": false,
  "recommendation": "❌ Please configure API and API_URL"
}
```

---

## 🐛 Troubleshooting

### "Server is NOT running"
```bash
npm start
# Then run test again
```

### "Minimax NOT ready"
```bash
# Check .env file
cat .env

# Make sure API and API_URL are set
API=your-key
API_URL=your-url

# Restart server
npm start
```

### "Permission denied"
```bash
chmod +x *.sh
./check_minimax.sh
```

---

## 📊 Test Report Example

```
Date: 2026-04-20
Time: 10:30 AM

Quick Check (check_minimax.sh):
✅ PASS - Server running
✅ PASS - Minimax ready
✅ PASS - API responsive

Status: ✅ READY FOR PRODUCTION
```

---

## 🔄 Automated Testing (Cron Job)

```bash
# Check every hour
0 * * * * cd /workspaces/monkey && ./check_minimax.sh >> minimax_checks.log 2>&1

# Full test daily at 2 AM
0 2 * * * cd /workspaces/monkey && ./test_all_apis.sh >> api_tests.log 2>&1
```

---

## 📚 Related Documentation

- [README.md](README.md) - Project overview
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Full testing guide
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference

---

**Test Scripts Last Updated:** 20/04/2026
