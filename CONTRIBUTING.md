# 🤝 Hướng dẫn đóng góp

Cảm ơn bạn quan tâm đến **Monkey AI** project!

## 📋 Quy trình đóng góp

### 1. Fork repository
```bash
# Trên GitHub, click "Fork"
```

### 2. Clone repo của bạn
```bash
git clone https://github.com/YOUR_USERNAME/monkey.git
cd monkey
```

### 3. Tạo branch mới
```bash
# Cho feature
git checkout -b feature/your-feature-name

# Cho bugfix
git checkout -b bugfix/your-bug-fix
```

### 4. Cài đặt dependencies
```bash
npm install
```

### 5. Thực hiện thay đổi
```bash
# Chỉnh sửa code
# Test thay đổi
npm start
```

### 6. Commit thay đổi
```bash
git add .
git commit -m "feat: add new feature"
# hoặc
git commit -m "fix: resolve issue #123"
```

**Commit message format:**
- `feat:` - Tính năng mới
- `fix:` - Bug fix
- `docs:` - Tài liệu
- `style:` - Formatting, không ảnh hưởng code logic
- `refactor:` - Refactor code
- `test:` - Thêm/sửa tests
- `chore:` - Build, dependencies

### 7. Push branch
```bash
git push origin feature/your-feature-name
```

### 8. Tạo Pull Request
- Trên GitHub, click "Compare & pull request"
- Mô tả thay đổi chi tiết
- Chờ review

---

## ✅ Checklist trước khi submit PR

- [ ] Code theo style project
- [ ] Không có console.log debug
- [ ] Tested locally (`npm start`)
- [ ] Updated README nếu cần
- [ ] Commit message rõ ràng
- [ ] Không breaking change

---

## 🧪 Testing

```bash
# Run server locally
npm start

# Test endpoints
curl http://localhost:3000/api/models
```

---

## 📚 Quy tắc code

### Naming
```javascript
// ✅ Good
const getUserData = () => {}
const apiKey = 'xxx'

// ❌ Bad
const get_user_data = () => {}
const APIKEY = 'xxx'
```

### Structure
```javascript
// ✅ Good - Arrow functions
const handler = (req, res) => {
  res.json({ success: true });
};

// ❌ Bad - Callback style
function handler(req, res) {
  res.json({ success: true });
}
```

---

## 🐛 Báo cáo Bug

1. Kiểm tra issue đã tồn tại chưa
2. Tạo issue mới với:
   - **Title:** Mô tả ngắn
   - **Description:** Mô tả chi tiết
   - **Steps to reproduce:** Cách tái hiện
   - **Expected behavior:** Kỳ vọng
   - **Actual behavior:** Thực tế
   - **Environment:** Node version, OS

---

## 💡 Yêu cầu Features

1. Mô tả use case
2. Lợi ích mang lại
3. Possible implementation

---

## 📞 Liên hệ

- **Issues:** GitHub Issues
- **Email:** luuq0051@gmail.com

---

**Cảm ơn vì đã đóng góp! 🎉**
