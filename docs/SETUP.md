# คู่มือการติดตั้ง KnowCall

## สารบัญ

- [ความต้องการระบบ](#ความต้องการระบบ)
- [การติดตั้ง Backend](#การติดตั้ง-backend)
- [การติดตั้ง Mobile App](#การติดตั้ง-mobile-app)
- [การตั้งค่าฐานข้อมูล](#การตั้งค่าฐานข้อมูล)
- [การรัน Development Server](#การรัน-development-server)
- [การแก้ไขปัญหา](#การแก้ไขปัญหา)

## ความต้องการระบบ

### สำหรับ Backend
- Node.js 18.x หรือสูงกว่า
- PostgreSQL 14.x หรือสูงกว่า
- Redis 6.x หรือสูงกว่า
- npm หรือ yarn

### สำหรับ Mobile App
- Node.js 18.x หรือสูงกว่า
- Expo CLI
- Android Studio (สำหรับ Android)
- Xcode (สำหรับ iOS - เฉพาะ macOS)
- มือถือจริงหรือ emulator/simulator

## การติดตั้ง Backend

### 1. Clone Repository

```bash
git clone https://github.com/Nontawatt/knowcall.git
cd knowcall
```

### 2. ติดตั้ง Dependencies

```bash
# ติดตั้ง dependencies สำหรับ root
npm install

# ติดตั้ง dependencies สำหรับ backend
cd backend
npm install
```

### 3. ตั้งค่า Environment Variables

```bash
# คัดลอกไฟล์ .env.example
cp ../.env.example .env

# แก้ไขไฟล์ .env ตามการตั้งค่าของคุณ
nano .env
```

ตัวอย่างการตั้งค่า `.env`:

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=knowcall
DB_USER=postgres
DB_PASSWORD=yourpassword

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=your_secret_key_here
```

### 4. ตั้งค่าฐานข้อมูล

```bash
# สร้างฐานข้อมูล
psql -U postgres -c "CREATE DATABASE knowcall;"

# รัน migrations
npm run migrate
```

### 5. รัน Backend Server

```bash
npm run dev
```

Backend API จะรันที่ `http://localhost:3000`

## การติดตั้ง Mobile App

### 1. ติดตั้ง Expo CLI

```bash
npm install -g expo-cli
```

### 2. ติดตั้ง Dependencies

```bash
cd mobile
npm install
```

### 3. ติดตั้ง Expo Go App

- **Android**: ดาวน์โหลด Expo Go จาก Google Play Store
- **iOS**: ดาวน์โหลด Expo Go จาก App Store

### 4. รัน Mobile App

```bash
npm start
```

หรือ

```bash
# สำหรับ Android
npm run android

# สำหรับ iOS (เฉพาะ macOS)
npm run ios
```

### 5. เชื่อมต่อกับ Backend

แก้ไขไฟล์ `shared/constants/index.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://YOUR_LOCAL_IP:3000', // เปลี่ยนเป็น IP ของคอมพิวเตอร์
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};
```

**หมายเหตุ**: ห้ามใช้ `localhost` สำหรับ mobile app เพราะจะชี้ไปที่ตัวเครื่องมือถือ

## การตั้งค่าฐานข้อมูล

### ติดตั้ง PostgreSQL

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### macOS (ใช้ Homebrew)

```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Windows

ดาวน์โหลดและติดตั้งจาก [postgresql.org](https://www.postgresql.org/download/windows/)

### สร้าง Database และ User

```bash
# เข้าสู่ PostgreSQL
sudo -u postgres psql

# สร้าง user
CREATE USER knowcall WITH PASSWORD 'yourpassword';

# สร้าง database
CREATE DATABASE knowcall OWNER knowcall;

# ให้สิทธิ์
GRANT ALL PRIVILEGES ON DATABASE knowcall TO knowcall;

# ออกจาก psql
\q
```

### ติดตั้ง Redis

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

#### macOS (ใช้ Homebrew)

```bash
brew install redis
brew services start redis
```

#### Windows

ดาวน์โหลดจาก [redis.io](https://redis.io/download) หรือใช้ [Memurai](https://www.memurai.com/)

## การรัน Development Server

### รัน Backend และ Mobile พร้อมกัน

```bash
# จาก root directory
npm run dev
```

### รันแยกกัน

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```

**Terminal 2 - Mobile**:
```bash
cd mobile
npm start
```

## การทดสอบ

### ทดสอบ Backend API

```bash
cd backend
npm test
```

### ทดสอบ Mobile App

```bash
cd mobile
npm test
```

## การแก้ไขปัญหา

### Backend ไม่สามารถเชื่อมต่อฐานข้อมูล

1. ตรวจสอบว่า PostgreSQL กำลังรันอยู่
   ```bash
   sudo systemctl status postgresql
   ```

2. ตรวจสอบการตั้งค่าใน `.env`
3. ตรวจสอบว่าสร้าง database แล้ว
   ```bash
   psql -U postgres -l
   ```

### Mobile App ไม่สามารถเชื่อมต่อ Backend

1. ตรวจสอบว่า Backend กำลังรันอยู่
2. ตรวจสอบว่าใช้ IP address ที่ถูกต้อง (ไม่ใช่ localhost)
3. ตรวจสอบ firewall settings
4. ทดสอบการเชื่อมต่อด้วย:
   ```bash
   curl http://YOUR_IP:3000/health
   ```

### Expo ไม่สามารถเริ่มต้นได้

1. ล้าง cache:
   ```bash
   cd mobile
   expo start -c
   ```

2. ลบ node_modules และติดตั้งใหม่:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run build

# ตรวจสอบ TypeScript errors
tsc --noEmit
```

## API Endpoints สำหรับทดสอบ

### Health Check
```bash
GET http://localhost:3000/health
```

### Verify Phone Number
```bash
POST http://localhost:3000/api/phones/verify
Content-Type: application/json

{
  "phoneNumber": "+66812345678"
}
```

### Get Blocked Numbers
```bash
GET http://localhost:3000/api/phones/blocked
```

## เครื่องมือที่แนะนำ

- **Postman** หรือ **Insomnia** - สำหรับทดสอบ API
- **pgAdmin** - GUI สำหรับจัดการ PostgreSQL
- **RedisInsight** - GUI สำหรับจัดการ Redis
- **React Native Debugger** - สำหรับ debug React Native app

## คำแนะนำเพิ่มเติม

1. ใช้ TypeScript strict mode เพื่อ type safety
2. ติดตั้ง ESLint และ Prettier สำหรับ code formatting
3. ใช้ Git hooks เพื่อตรวจสอบ code ก่อน commit
4. อ่าน [API Documentation](./API.md) สำหรับรายละเอียด endpoints
5. ดู [Architecture Guide](./ARCHITECTURE.md) เพื่อเข้าใจโครงสร้างโปรเจค

## การขอความช่วยเหลือ

หากพบปัญหา:
1. ตรวจสอบ [Issues](https://github.com/Nontawatt/knowcall/issues) ใน GitHub
2. เปิด issue ใหม่พร้อมรายละเอียดปัญหา
3. ติดต่อผ่าน email หรือ social media
