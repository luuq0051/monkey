#!/bin/bash

# Monkey AI - Deploy Script
# Auto-start server with proper configuration

set -e

echo "🚀 Monkey AI Deploy Script"
echo "==========================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

# Check dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "⚙️ Creating .env file..."
    cp .env.example .env
    echo "⚠️ Please configure .env file with your API credentials"
fi

# Get port from env or use default
PORT=${PORT:-3000}

# Kill existing process on port
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️ Port $PORT is in use, killing existing process..."
    lsof -Pi :$PORT -sTCP:LISTEN -t | xargs kill -9 2>/dev/null || true
    sleep 1
fi

# Start server
echo "✅ Starting server on port $PORT..."
npm run dev

echo ""
echo "🌐 Server is running at http://localhost:$PORT"
echo "📖 API Documentation: http://localhost:$PORT/api/routes"
