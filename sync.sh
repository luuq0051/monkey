#!/bin/bash

echo "🔄 Starting git sync..."
echo ""

# Pull from remote
echo "📥 Pulling from remote (origin main)..."
git pull origin main

if [ $? -eq 0 ]; then
  echo "✅ Pull successful"
else
  echo "❌ Pull failed - there might be conflicts"
  echo "Please resolve conflicts manually and try again"
  exit 1
fi

echo ""

# Push to remote
echo "📤 Pushing to remote (origin main)..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo "✅ Push successful!"
  echo "🎉 Git sync completed!"
else
  echo "❌ Push failed"
  exit 1
fi
