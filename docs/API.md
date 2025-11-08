# KnowCall API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

ปัจจุบัน API ยังไม่ต้องการ authentication (Prototype stage)

ในอนาคตจะใช้ JWT token:
```
Authorization: Bearer <token>
```

## Endpoints

### Phone Number Verification

#### Verify Phone Number

ตรวจสอบหมายเลขโทรศัพท์ว่าเป็นสแปมหรือมิจฉาชีพหรือไม่

**Endpoint:** `POST /phones/verify`

**Request Body:**
```json
{
  "phoneNumber": "+66812345678"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "phoneNumber": "+66812345678",
    "isSpam": true,
    "isFraud": false,
    "riskLevel": "high",
    "reportCount": 15,
    "sources": [
      {
        "name": "UnknownPhone",
        "result": "spam",
        "confidence": 0.85,
        "reportCount": 10
      },
      {
        "name": "Tellows",
        "result": "spam",
        "confidence": 0.75
      },
      {
        "name": "Community",
        "result": "spam",
        "confidence": 0.90,
        "reportCount": 15
      }
    ],
    "lastReported": "2025-11-07T10:30:00Z"
  }
}
```

#### Get Blocked Numbers

ดึงรายการหมายเลขที่ถูกบล็อก

**Endpoint:** `GET /phones/blocked`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "number": "+66812345678",
      "countryCode": "TH",
      "isInternational": false,
      "reason": "spam",
      "source": "community",
      "reportCount": 15,
      "riskLevel": "high",
      "createdAt": "2025-11-01T00:00:00Z",
      "updatedAt": "2025-11-08T00:00:00Z"
    }
  ]
}
```

#### Check If Phone Is Blocked

ตรวจสอบว่าหมายเลขถูกบล็อกหรือไม่

**Endpoint:** `GET /phones/check/:phoneNumber`

**Parameters:**
- `phoneNumber` (string, required) - หมายเลขโทรศัพท์

**Example:** `GET /phones/check/+66812345678`

**Response:**
```json
{
  "success": true,
  "data": {
    "phoneNumber": "+66812345678",
    "isBlocked": true,
    "riskLevel": "high",
    "reason": "spam"
  }
}
```

### User Settings

#### Get User Settings

ดึงการตั้งค่าของผู้ใช้

**Endpoint:** `GET /users/settings`

**Response:**
```json
{
  "success": true,
  "data": {
    "blockHiddenNumbers": true,
    "blockInternational": false,
    "blockUnknown": true,
    "autoMuteSpam": true,
    "enableNotifications": true,
    "language": "th"
  }
}
```

#### Update User Settings

อัปเดตการตั้งค่าของผู้ใช้

**Endpoint:** `PUT /users/settings`

**Request Body:**
```json
{
  "blockHiddenNumbers": true,
  "blockInternational": true,
  "blockUnknown": true,
  "autoMuteSpam": true,
  "enableNotifications": true,
  "language": "th"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "blockHiddenNumbers": true,
    "blockInternational": true,
    "blockUnknown": true,
    "autoMuteSpam": true,
    "enableNotifications": true,
    "language": "th"
  },
  "message": "Settings updated successfully"
}
```

### Whitelist Management

#### Get Whitelist

ดึงรายการขาว

**Endpoint:** `GET /users/whitelist`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "userId": "user123",
      "phoneNumber": "+66987654321",
      "name": "ธนาคารไทยพาณิชย์",
      "createdAt": "2025-11-01T00:00:00Z"
    }
  ]
}
```

#### Add to Whitelist

เพิ่มหมายเลขเข้ารายการขาว

**Endpoint:** `POST /users/whitelist`

**Request Body:**
```json
{
  "phoneNumber": "+66987654321",
  "name": "ธนาคารไทยพาณิชย์"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "userId": "user123",
    "phoneNumber": "+66987654321",
    "name": "ธนาคารไทยพาณิชย์",
    "createdAt": "2025-11-08T12:00:00Z"
  },
  "message": "Added to whitelist successfully"
}
```

#### Remove from Whitelist

ลบหมายเลขออกจากรายการขาว

**Endpoint:** `DELETE /users/whitelist/:id`

**Parameters:**
- `id` (string, required) - Whitelist entry ID

**Response:**
```json
{
  "success": true,
  "message": "Removed from whitelist successfully"
}
```

### Blacklist Management

#### Get Blacklist

ดึงรายการดำ

**Endpoint:** `GET /users/blacklist`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "userId": "user123",
      "phoneNumber": "+66812345678",
      "reason": "Spam calls",
      "createdAt": "2025-11-01T00:00:00Z"
    }
  ]
}
```

#### Add to Blacklist

เพิ่มหมายเลขเข้ารายการดำ

**Endpoint:** `POST /users/blacklist`

**Request Body:**
```json
{
  "phoneNumber": "+66812345678",
  "reason": "Spam calls"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "userId": "user123",
    "phoneNumber": "+66812345678",
    "reason": "Spam calls",
    "createdAt": "2025-11-08T12:00:00Z"
  },
  "message": "Added to blacklist successfully"
}
```

#### Remove from Blacklist

ลบหมายเลขออกจากรายการดำ

**Endpoint:** `DELETE /users/blacklist/:id`

**Parameters:**
- `id` (string, required) - Blacklist entry ID

**Response:**
```json
{
  "success": true,
  "message": "Removed from blacklist successfully"
}
```

### Report Management

#### Create Report

รายงานหมายเลขที่ต้องสงสัย

**Endpoint:** `POST /reports`

**Rate Limit:** 10 requests per 15 minutes

**Request Body:**
```json
{
  "phoneNumber": "+66812345678",
  "reason": "spam",
  "description": "โทรขายสินค้าบ่อยมาก"
}
```

**Reason values:**
- `spam` - สแปม
- `fraud` - มิจฉาชีพ
- `telemarketing` - โทรขายของ
- `unknown` - ไม่ทราบ

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "userId": "user123",
    "phoneNumber": "+66812345678",
    "reason": "spam",
    "description": "โทรขายสินค้าบ่อยมาก",
    "createdAt": "2025-11-08T12:00:00Z"
  },
  "message": "Report submitted successfully"
}
```

#### Get Reports for Phone Number

ดึงรายงานสำหรับหมายเลขโทรศัพท์

**Endpoint:** `GET /reports/:phoneNumber`

**Parameters:**
- `phoneNumber` (string, required) - หมายเลขโทรศัพท์

**Example:** `GET /reports/+66812345678`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "userId": "user456",
      "phoneNumber": "+66812345678",
      "reason": "spam",
      "description": "โทรขายสินค้าบ่อยมาก",
      "createdAt": "2025-11-07T10:00:00Z"
    },
    {
      "id": "2",
      "userId": "user789",
      "phoneNumber": "+66812345678",
      "reason": "fraud",
      "description": "แอบอ้างเป็นเจ้าหน้าที่ธนาคาร",
      "createdAt": "2025-11-06T14:30:00Z"
    }
  ]
}
```

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": "Phone number is required"
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": "Phone number not found"
}
```

### 429 Too Many Requests

```json
{
  "success": false,
  "error": "Too many requests, please try again later"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Data Types

### RiskLevel

```typescript
enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}
```

### BlockReason

```typescript
enum BlockReason {
  SPAM = 'spam',
  FRAUD = 'fraud',
  TELEMARKETING = 'telemarketing',
  UNKNOWN = 'unknown',
  USER_BLOCKED = 'user_blocked',
}
```

### CallType

```typescript
enum CallType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
  MISSED = 'missed',
  BLOCKED = 'blocked',
}
```

## Rate Limiting

- **Report API**: 10 requests per 15 minutes
- **Verify API**: 30 requests per minute
- **Other APIs**: 100 requests per 15 minutes

## Caching

- Number verification results: cached for 1 hour
- User settings: cached for 30 minutes
- Blocked numbers: cached for 2 hours

## Examples

### cURL Examples

**Verify Phone Number:**
```bash
curl -X POST http://localhost:3000/api/phones/verify \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+66812345678"}'
```

**Report Phone Number:**
```bash
curl -X POST http://localhost:3000/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+66812345678",
    "reason": "spam",
    "description": "โทรขายสินค้าบ่อยมาก"
  }'
```

### JavaScript/TypeScript Examples

```typescript
import axios from 'axios';

// Verify phone number
const verifyPhone = async (phoneNumber: string) => {
  const response = await axios.post('http://localhost:3000/api/phones/verify', {
    phoneNumber,
  });
  return response.data;
};

// Report phone number
const reportPhone = async (phoneNumber: string, reason: string, description: string) => {
  const response = await axios.post('http://localhost:3000/api/reports', {
    phoneNumber,
    reason,
    description,
  });
  return response.data;
};
```
