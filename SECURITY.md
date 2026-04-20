# 🔒 Security Guidelines

Hướng dẫn bảo mật cho dự án Monkey AI.

---

## 🚨 Reporting Security Issues

**⚠️ Không đăng lên GitHub Issues**

Nếu phát hiện lỗ hổng bảo mật:

1. Email: **security@example.com** (hoặc luuq0051@gmail.com)
2. Mô tả chi tiết lỗ hổng
3. Kèm theo PoC (proof of concept) nếu có thể
4. Chờ response trong 48 giờ

---

## 🔐 Best Practices

### 1. Environment Variables

✅ **Do:**
```bash
# Use .env for secrets
API_KEY=secret_key_here
API_URL=https://api.example.com

# Add .gitignore
echo ".env" >> .gitignore
echo "node_modules/" >> .gitignore
```

❌ **Don't:**
```javascript
// Never hardcode secrets
const API_KEY = "secret_key_here";

// Never commit .env
git add .env  // ❌ Bad!
```

### 2. Dependency Management

✅ **Do:**
```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Update regularly
npm update

# Check for outdated packages
npm outdated
```

❌ **Don't:**
```bash
# Never use insecure versions
npm install old-package@1.0.0
```

### 3. Code Security

✅ **Do:**
```javascript
// Validate input
const validateInput = (data) => {
  if (!data || typeof data !== 'string') {
    throw new Error('Invalid input');
  }
  return data;
};

// Use HTTPS
const https = require('https');

// Set security headers
app.use(helmet());

// Sanitize output
const sanitized = JSON.stringify(data);
```

❌ **Don't:**
```javascript
// Never use eval()
eval(userInput);  // ❌ Dangerous!

// Never trust user input
app.get('/:id', (req, res) => {
  query(`SELECT * FROM users WHERE id = ${req.params.id}`);
  // ❌ SQL Injection!
});

// Never log sensitive data
console.log(API_KEY);  // ❌ Exposed!
```

### 4. API Security

✅ **Do:**
```javascript
// Use CORS carefully
app.use(cors({
  origin: ['https://trusted-domain.com'],
  credentials: true
}));

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Validate requests
app.use(express.json({ limit: '1mb' }));

// Add security headers
app.use(helmet());
```

❌ **Don't:**
```javascript
// Never allow all origins
app.use(cors());  // ❌ Open to CSRF!

// Never skip authentication
app.get('/admin', (req, res) => {
  // No auth check!
});

// Never expose internal errors
app.get('/api/data', (req, res) => {
  try {
    // ...
  } catch (e) {
    res.send(e.message);  // ❌ Exposes details!
  }
});
```

### 5. Data Protection

✅ **Do:**
```javascript
// Hash passwords
const bcrypt = require('bcrypt');
const hashedPassword = bcrypt.hashSync(password, 10);

// Use HTTPS
// Set secure cookies
res.cookie('session', token, {
  secure: true,
  httpOnly: true,
  sameSite: 'strict'
});

// Encrypt sensitive data
const crypto = require('crypto');
const encrypted = crypto.createCipher('aes-256-cbc', key).update(data);
```

❌ **Don't:**
```javascript
// Never store plain passwords
user.password = plainPassword;  // ❌ Bad!

// Never use HTTP in production
// HTTP connections are unencrypted

// Never trust client-side validation
// Always validate on server
```

---

## 📋 Security Checklist

- [ ] `.env` file in `.gitignore`
- [ ] No secrets in code
- [ ] Dependencies audited (`npm audit`)
- [ ] HTTPS enabled
- [ ] Input validation added
- [ ] Error handling proper (no stack traces to client)
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] Security headers set (helmet.js)
- [ ] Logging doesn't expose secrets
- [ ] Database queries parameterized
- [ ] Sessions secure (httpOnly, secure flags)
- [ ] Passwords hashed (bcrypt)
- [ ] API authentication required
- [ ] Regular security updates

---

## 🔍 Security Testing

### 1. Dependency Audit

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Fix specific package
npm audit fix --package-name=express
```

### 2. Code Review

```bash
# Check for potential issues
npm install -g snyk
snyk test

# OWASP scanning
npm install -g retire
retire --js
```

### 3. Manual Testing

```bash
# Test HTTPS
curl -I https://your-app.com

# Test CORS
curl -H "Origin: http://other.com" https://your-app.com/api

# Test rate limiting
for i in {1..150}; do
  curl https://your-app.com/api/hello
done
```

---

## 🛡️ Headers Security

### Recommended Headers

```javascript
const helmet = require('helmet');
app.use(helmet());

// Or manually set
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://trusted.com');
  
  // CSP
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  
  next();
});
```

---

## 📊 Security Monitoring

### Logs to Track

```javascript
// Track failed auth attempts
logger.warn(`Failed login attempt: ${email}`);

// Track API errors
logger.error(`API Error: ${errorMessage}`);

// Track rate limit violations
logger.warn(`Rate limit exceeded: ${ip}`);

// Track suspicious activity
logger.alert(`Potential attack: ${suspiciousData}`);
```

### What NOT to Log

```javascript
// ❌ Never log
logger.info(API_KEY);          // Secrets
logger.info(userPassword);      // Passwords
logger.info(creditCard);        // PII
logger.info(request.headers);   // Sensitive headers
```

---

## 🔑 API Key Rotation

1. Generate new key
2. Add to `.env`
3. Test with new key
4. Update production
5. Revoke old key
6. Document change

---

## 🚨 Incident Response

1. **Detect** - Monitor for anomalies
2. **Contain** - Stop the attack
3. **Investigate** - Understand what happened
4. **Eradicate** - Remove the threat
5. **Recover** - Restore normal operations
6. **Learn** - Document lessons learned

---

## 📚 Resources

- [OWASP Top 10](https://owasp.org/Top10/)
- [Node.js Security](https://nodejs.org/en/docs/guides/security/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [npm Security](https://docs.npmjs.com/about-npm-security)

---

## 📞 Security Contacts

- **Email:** security@example.com
- **GitHub:** [Report Security Issue](https://github.com/luuq0051/monkey/security)
- **Response Time:** 48 hours

---

**Security Guidelines Last Updated:** 20/04/2026
