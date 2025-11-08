# การมีส่วนร่วม (Contributing to KnowCall)

ขอบคุณที่สนใจมีส่วนร่วมในโปรเจค KnowCall! 🎉

## วิธีการมีส่วนร่วม

### 1. Fork และ Clone

```bash
# Fork repository บน GitHub
# Clone repository ของคุณ
git clone https://github.com/YOUR_USERNAME/knowcall.git
cd knowcall

# เพิ่ม upstream remote
git remote add upstream https://github.com/Nontawatt/knowcall.git
```

### 2. สร้าง Branch ใหม่

```bash
# ดึงข้อมูลล่าสุดจาก upstream
git fetch upstream
git checkout main
git merge upstream/main

# สร้าง branch ใหม่
git checkout -b feature/your-feature-name
```

### 3. พัฒนา Feature

- เขียนโค้ดตาม coding style ของโปรเจค
- เพิ่ม tests สำหรับ features ใหม่
- อัปเดต documentation ถ้าจำเป็น
- ทดสอบให้แน่ใจว่าทุกอย่างทำงานได้

### 4. Commit Changes

```bash
# เพิ่มไฟล์ที่เปลี่ยนแปลง
git add .

# Commit พร้อม commit message ที่ชัดเจน
git commit -m "Add: feature description"
```

#### Commit Message Format

ใช้ format ดังนี้:

```
Type: Short description

Detailed description (optional)

Closes #issue_number (if applicable)
```

**Types:**
- `Add` - เพิ่ม feature ใหม่
- `Fix` - แก้ไข bug
- `Update` - อัปเดต feature ที่มีอยู่
- `Remove` - ลบ feature
- `Refactor` - ปรับปรุงโค้ด
- `Docs` - อัปเดต documentation
- `Test` - เพิ่มหรือแก้ไข tests
- `Style` - เปลี่ยนแปลง formatting

**ตัวอย่าง:**

```
Add: Phone number verification feature

- Implement verification service
- Add API endpoint
- Update UI components

Closes #123
```

### 5. Push และ Create Pull Request

```bash
# Push branch ไปยัง repository ของคุณ
git push origin feature/your-feature-name
```

จากนั้นเปิด Pull Request บน GitHub

## Coding Style

### TypeScript

- ใช้ TypeScript strict mode
- ใส่ type annotations ให้ชัดเจน
- ใช้ interfaces แทน types เมื่อเป็นไปได้
- ตั้งชื่อ variables/functions ให้สื่อความหมาย

**ตัวอย่าง:**

```typescript
// ❌ Bad
const verifyNum = async (num: any) => {
  // ...
};

// ✅ Good
const verifyPhoneNumber = async (phoneNumber: string): Promise<VerificationResult> => {
  // ...
};
```

### React/React Native

- ใช้ functional components
- ใช้ hooks อย่างถูกต้อง
- แยก components ให้เล็กและ reusable
- ตั้งชื่อ components ด้วย PascalCase

**ตัวอย่าง:**

```tsx
// ✅ Good
interface PhoneVerificationProps {
  phoneNumber: string;
  onVerify: (result: VerificationResult) => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  phoneNumber,
  onVerify,
}) => {
  // Component code
};
```

### Backend

- ใช้ async/await แทน callbacks
- Handle errors อย่างถูกต้อง
- เขียน controller logic แยกจาก business logic
- ใช้ middleware สำหรับ common tasks

**ตัวอย่าง:**

```typescript
// ✅ Good
export const verifyPhone = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    const result = await verificationService.verify(phoneNumber);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
```

## Testing

### เขียน Tests สำหรับ

1. Services และ business logic
2. API endpoints
3. Utility functions
4. React components (critical ones)

### รัน Tests

```bash
# Backend tests
cd backend
npm test

# Mobile tests
cd mobile
npm test

# All tests
npm test
```

## Documentation

### อัปเดต Documentation เมื่อ

1. เพิ่ม API endpoint ใหม่
2. เปลี่ยน behavior ของ feature
3. เพิ่ม configuration options
4. เพิ่ม dependencies ใหม่

### Documentation Files

- `README.md` - ภาพรวมโปรเจค
- `docs/API.md` - API documentation
- `docs/SETUP.md` - Setup instructions
- `docs/ARCHITECTURE.md` - Architecture overview

## Pull Request Guidelines

### ก่อน Submit PR

- [ ] โค้ดทำงานได้และผ่าน tests ทั้งหมด
- [ ] ไม่มี linting errors
- [ ] เพิ่ม/อัปเดต tests ถ้าจำเป็น
- [ ] อัปเดต documentation ถ้าจำเป็น
- [ ] Commit messages มีความหมายชัดเจน
- [ ] Branch อยู่บน latest main branch

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## Issues

### Reporting Bugs

เมื่อรายงาน bug กรุณาระบุ:

1. **Environment**: OS, Node version, etc.
2. **Steps to reproduce**: ขั้นตอนการทำให้เกิด bug
3. **Expected behavior**: สิ่งที่คาดว่าจะเกิด
4. **Actual behavior**: สิ่งที่เกิดขึ้นจริง
5. **Screenshots**: ถ้ามี
6. **Logs**: Error logs ที่เกี่ยวข้อง

### Feature Requests

เมื่อขอ feature ใหม่ กรุณาระบุ:

1. **Problem**: ปัญหาที่ต้องการแก้
2. **Solution**: วิธีการแก้ที่เสนอ
3. **Alternatives**: ทางเลือกอื่นที่พิจารณาไว้
4. **Additional context**: ข้อมูลเพิ่มเติม

## Code Review Process

1. PR จะถูก review โดย maintainers
2. อาจมี feedback หรือขอให้แก้ไข
3. ต้องได้รับ approval อย่างน้อย 1 คน
4. Tests ต้องผ่านทั้งหมด
5. ไม่มี merge conflicts

## Community Guidelines

### Do's ✅

- เคารพผู้อื่น
- ให้ feedback ที่สร้างสรรค์
- ช่วยเหลือผู้อื่น
- เรียนรู้และแบ่งปันความรู้

### Don'ts ❌

- ใช้ภาษาที่ไม่เหมาะสม
- Spam
- โจมตีผู้อื่น
- Share ข้อมูลส่วนตัวของผู้อื่น

## Development Setup

ดูรายละเอียดใน [SETUP.md](docs/SETUP.md)

## Questions?

หากมีคำถาม:

1. ตรวจสอบ [documentation](docs/)
2. ค้นหาใน [existing issues](https://github.com/Nontawatt/knowcall/issues)
3. เปิด [new issue](https://github.com/Nontawatt/knowcall/issues/new)

## License

โดยการมีส่วนร่วมในโปรเจคนี้ คุณยอมรับให้ contribution ของคุณอยู่ภายใต้ [MIT License](LICENSE)

---

ขอบคุณสำหรับการมีส่วนร่วม! 🙏
