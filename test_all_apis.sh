#!/bin/bash

# Complete API Test Suite for Monkey AI
# Tests all endpoints and functionality

set -e

BASE_URL="https://3000-4ec40ecf49e1a744.monkeycode-ai.online"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Monkey AI - Complete API Test Suite${NC}"
echo "========================================"
echo ""

PASSED=0
FAILED=0

# Helper function to test endpoint
test_endpoint() {
  local test_name="$1"
  local method="$2"
  local endpoint="$3"
  local data="$4"
  local expected_text="$5"
  
  echo -e "${BLUE}📍 Testing: $test_name${NC}"
  
  if [ "$method" = "GET" ]; then
    RESPONSE=$(curl -s "$BASE_URL$endpoint")
  else
    RESPONSE=$(curl -s -X POST "$BASE_URL$endpoint" \
      -H "Content-Type: application/json" \
      -d "$data")
  fi
  
  if echo "$RESPONSE" | grep -q "$expected_text"; then
    echo -e "${GREEN}✅ PASS${NC}"
    ((PASSED++))
  else
    echo -e "${RED}❌ FAIL${NC}"
    echo "Response: ${RESPONSE:0:100}..."
    ((FAILED++))
  fi
  echo ""
}

# Test 1: Root endpoint
test_endpoint "Root Endpoint" "GET" "/" "" "Hello World"

# Test 2: Hello API
test_endpoint "Hello API" "GET" "/api/hello" "" "Hello from MonkeyCode"

# Test 3: Cherry Studio Config
test_endpoint "Cherry Studio Config" "GET" "/api/cherry-studio" "" "Cherry Studio Config"

# Test 4: API Config
test_endpoint "API Config" "GET" "/api/config" "" "PORT"

# Test 5: Models List
test_endpoint "Models List" "GET" "/api/models" "" "minimax"

# Test 6: Minimax Status
test_endpoint "Minimax Status" "GET" "/api/minimax/status" "" "minimax-m2.7"

# Test 7: Minimax API Test
test_endpoint "Minimax API Test" "POST" "/api/test/minimax" '{"message":"Test"}' "minimax-m2.7"

echo ""
echo "========================================"
echo -e "${BLUE}📊 Test Results${NC}"
echo "========================================"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
TOTAL=$((PASSED + FAILED))
echo "Total: $TOTAL"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}🎉 All tests PASSED!${NC}"
  exit 0
else
  echo -e "${RED}⚠️ Some tests FAILED${NC}"
  exit 1
fi
