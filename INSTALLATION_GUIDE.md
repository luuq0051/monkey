# 📦 Hướng dẫn Cài đặt Chi tiết

---

## 🖥️ Yêu cầu Hệ thống

### Minimum Requirements
- **Node.js:** v14.0.0+
- **npm:** v6.0.0+
- **RAM:** 512MB
- **Disk:** 100MB

### Recommended
- **Node.js:** v18.0.0+
- **npm:** v8.0.0+
- **RAM:** 1GB+
- **Disk:** 500MB+

---

## ✅ Kiểm tra phiên bản

```bash
# Check Node.js
node --version
# Expected: v14.0.0 or higher

# Check npm
npm --version
# Expected: v6.0.0 or higher

# Check git
git --version
# Expected: v2.0.0 or higher
```

---

## 📥 Installation Steps

### Step 1: Clone Repository

```bash
# Clone via HTTPS
git clone https://github.com/luuq0051/monkey.git

# OR Clone via SSH (nếu có SSH key)
git clone git@github.com:luuq0051/monkey.git

# Navigate to project
cd monkey
```

### Step 2: Install Dependencies

```bash
# Install npm packages
npm install

# Verify installation
npm list --depth=0
```

**Expected Output:**
```
monkey@1.0.0
├── express@4.18.2
└── dotenv@16.0.3
```

### Step 3: Create Environment File

```bash
# Create .env file
cat > .env << EOF
PORT=3000
API=cherry_studio_api_key_123
API_URL=https://cherry-studio-api.monkeycode-ai.online
NODE_ENV=development
EOF
```

**Hoặc tạo manual:**
1. Mở file `README.md`
2. Copy nội dung `.env` từ section Configuration
3. Lưu thành file `.env`

### Step 4: Verify Installation

```bash
# Check if .env exists
test -f .env && echo ".env file exists" || echo ".env file NOT found"

# Check if node_modules exists
test -d node_modules && echo "node_modules exists" || echo "node_modules NOT found"
```

### Step 5: Start Server

```bash
# Start server
npm start

# Expected output:
# ✅ Running on port 3000
```

### Step 6: Test Connection

**Mở terminal khác (không dừng server):**

```bash
# Test root endpoint
curl http://localhost:3000/

# Expected: Hello World! API da chay thanh cong!

# Test API endpoint
curl http://localhost:3000/api/hello

# Expected: {"msg":"Hello from MonkeyCode!","status":"success"}
```

---

## 🐛 Troubleshooting Installation

### ❌ Problem: "command not found: node"

**Solution:**
```bash
# Install Node.js (macOS)
brew install node

# Install Node.js (Ubuntu/Debian)
sudo apt-get install nodejs npm

# Install Node.js (Windows)
# Download from https://nodejs.org/
```

---

### ❌ Problem: "npm ERR! code ERESOLVE"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Problem: "EACCES: permission denied"

**Solution:**
```bash
# Fix npm permissions (macOS/Linux)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Or use sudo (not recommended)
sudo npm install -g
```

---

### ❌ Problem: ".env file not found"

**Solution:**
```bash
# Create .env file with default values
cat > .env << 'EOF'
PORT=3000
API=default_key
API_URL=https://api.example.com
NODE_ENV=development
EOF

# Verify
cat .env
```

---

### ❌ Problem: "Port 3000 already in use"

**Solution:**
```bash
# macOS/Linux - Find process on port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm start

# Or Windows - Find process
netstat -ano | findstr :3000
# Kill process
taskkill /PID <PID> /F
```

---

### ❌ Problem: "Cannot find module 'express'"

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Check if it's installed
npm list express
```

---

## 🔧 Configuration Options

### Environment Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `PORT` | Number | 3000 | Server port |
| `API` | String | - | API key |
| `API_URL` | String | - | API endpoint URL |
| `NODE_ENV` | String | development | Environment (development/production) |

### Example Configurations

**Development:**
```env
PORT=3000
API=dev_api_key_123
API_URL=http://localhost:5000
NODE_ENV=development
```

**Production:**
```env
PORT=8080
API=prod_api_key_xyz
API_URL=https://api.production.com
NODE_ENV=production
```

---

## 🚀 Development Mode

### Run with Auto-Reload

```bash
# Install nodemon
npm install --save-dev nodemon

# Run with auto-reload
npm run dev

# Or manual
npx nodemon server.js
```

### Debugging

```bash
# Run with debug mode
DEBUG=* npm start

# Or with Node inspector
node --inspect server.js

# Then open: chrome://inspect
```

---

## ✨ Verify Full Setup

**Checklist:**
- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Repository cloned
- [ ] Dependencies installed (`npm list`)
- [ ] `.env` file created
- [ ] Server starts (`npm start`)
- [ ] Endpoints working (`curl`)

---

## 📝 Post-Installation

### 1. Add to PATH (Optional)

```bash
# Add npm to PATH (macOS)
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
```

### 2. Configure IDE

**VS Code:**
- Install "REST Client" extension
- Create `test.http` file
- Test endpoints

**WebStorm:**
- Built-in REST client
- Alt + Insert → HTTP Request

### 3. Set up Git Hooks (Optional)

```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
npm run lint
EOF

chmod +x .git/hooks/pre-commit
```

---

## 🆘 Getting Help

1. **Check logs:** `npm start` output
2. **Review:** README.md
3. **Issues:** GitHub Issues
4. **Email:** luuq0051@gmail.com

---

## 🎯 Next Steps

1. ✅ Complete installation
2. 📖 Read [README.md](README.md)
3. 📚 Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
4. 🚀 Deploy to production

---

**Installation Last Updated:** 20/04/2026
