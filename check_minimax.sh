#!/bin/bash

# Quick Minimax Model Check
# Simple script to verify Minimax m2.7 is working

BASE_URL="https://3000-4ec40ecf49e1a744.monkeycode-ai.online"

echo "🔍 Quick Minimax Model Check"
echo "=============================="
echo ""

# Test 1: Server Status
echo "1️⃣ Checking server..."
if curl -s "$BASE_URL/" > /dev/null; then
  echo "   ✅ Server is running"
else
  echo "   ❌ Server is NOT running. Start with: npm start"
  exit 1
fi

echo ""

# Test 2: Minimax Status
echo "2️⃣ Checking Minimax status..."
STATUS=$(curl -s "$BASE_URL/api/minimax/status")
READY=$(echo "$STATUS" | grep -o '"ready":[^,]*')

if echo "$STATUS" | grep -q '"ready":true'; then
  echo "   ✅ Minimax is READY"
  echo "   Model: minimax-m2.7"
else
  echo "   ⚠️ Minimax NOT ready"
  echo "   Status: $READY"
fi

echo ""

# Test 3: Quick API Test
echo "3️⃣ Testing Minimax API..."
RESPONSE=$(curl -s -X POST "$BASE_URL/api/test/minimax" \
  -H "Content-Type: application/json" \
  -d '{"message":"Quick test"}')

if echo "$RESPONSE" | grep -q "minimax-m2.7"; then
  echo "   ✅ API test SUCCESS"
else
  echo "   ❌ API test FAILED"
fi

echo ""
echo "=============================="
echo "Done! Model status checked."
