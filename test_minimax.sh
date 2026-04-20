#!/bin/bash

# Test Minimax Model Integration
# This script tests if Minimax m2.7 is working with the API

set -e

BASE_URL="https://3000-4ec40ecf49e1a744.monkeycode-ai.online"
TEST_RESULTS_FILE="test_results.json"

echo "🧪 Testing Minimax m2.7 Model Integration"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check server is running
echo "📍 Test 1: Checking if server is running..."
if curl -s "$BASE_URL/" > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Server is running${NC}"
  TEST_1="PASS"
else
  echo -e "${RED}❌ Server is NOT running${NC}"
  echo "Start server with: npm start"
  exit 1
fi

echo ""

# Test 2: Get Minimax Status
echo "📍 Test 2: Checking Minimax Status..."
MINIMAX_STATUS=$(curl -s "$BASE_URL/api/minimax/status")

if echo "$MINIMAX_STATUS" | grep -q "minimax-m2.7"; then
  echo -e "${GREEN}✅ Minimax model detected${NC}"
  echo "Response: $MINIMAX_STATUS" | head -c 100
  echo "..."
  TEST_2="PASS"
else
  echo -e "${RED}❌ Minimax model NOT found${NC}"
  echo "Response: $MINIMAX_STATUS"
  TEST_2="FAIL"
fi

echo ""
echo ""

# Test 3: List all models including Minimax
echo "📍 Test 3: Listing all AI Models..."
MODELS=$(curl -s "$BASE_URL/api/models")

if echo "$MODELS" | grep -q "minimax"; then
  MINIMAX_MODELS=$(echo "$MODELS" | grep -o '"minimax":\[[^]]*\]')
  echo -e "${GREEN}✅ Minimax models available${NC}"
  echo "Minimax models: $MINIMAX_MODELS"
  TEST_3="PASS"
else
  echo -e "${RED}❌ Minimax NOT in models list${NC}"
  TEST_3="FAIL"
fi

echo ""
echo ""

# Test 4: Test Minimax API endpoint
echo "📍 Test 4: Testing Minimax API endpoint..."
MINIMAX_TEST=$(curl -s -X POST "$BASE_URL/api/test/minimax" \
  -H "Content-Type: application/json" \
  -d '{"message": "Test message for Minimax m2.7"}')

if echo "$MINIMAX_TEST" | grep -q "minimax-m2.7"; then
  echo -e "${GREEN}✅ Minimax API endpoint working${NC}"
  echo "Response includes minimax-m2.7"
  TEST_4="PASS"
else
  echo -e "${RED}❌ Minimax API endpoint NOT working${NC}"
  echo "Response: $MINIMAX_TEST"
  TEST_4="FAIL"
fi

echo ""
echo ""

# Test 5: Verify API Configuration
echo "📍 Test 5: Verifying API Configuration..."
CONFIG=$(curl -s "$BASE_URL/api/config")

if echo "$CONFIG" | grep -q '"API":'; then
  echo -e "${GREEN}✅ API Configuration is set${NC}"
  echo "API Key: $(echo "$CONFIG" | grep -o '"API":"[^"]*"')"
  TEST_5="PASS"
else
  echo -e "${RED}❌ API Configuration NOT found${NC}"
  TEST_5="FAIL"
fi

echo ""
echo ""

# Summary
echo "=========================================="
echo "📊 Test Summary"
echo "=========================================="
echo -e "Test 1 (Server Running):        ${GREEN}$TEST_1${NC}"
echo -e "Test 2 (Minimax Status):        ${GREEN}$TEST_2${NC}"
echo -e "Test 3 (Models Listed):         ${GREEN}$TEST_3${NC}"
echo -e "Test 4 (API Endpoint):          ${GREEN}$TEST_4${NC}"
echo -e "Test 5 (API Config):            ${GREEN}$TEST_5${NC}"
echo ""

# Determine overall result
if [ "$TEST_1" = "PASS" ] && [ "$TEST_2" = "PASS" ] && [ "$TEST_3" = "PASS" ] && [ "$TEST_4" = "PASS" ] && [ "$TEST_5" = "PASS" ]; then
  echo -e "${GREEN}🎉 All tests PASSED! Minimax m2.7 is working correctly!${NC}"
  exit 0
else
  echo -e "${YELLOW}⚠️ Some tests failed. Check the details above.${NC}"
  exit 1
fi
