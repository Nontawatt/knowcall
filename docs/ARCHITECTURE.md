# KnowCall Architecture

## ภาพรวม (Overview)

KnowCall เป็นแอปพลิเคชันแบบ client-server ที่ประกอบด้วย:
- **Mobile App** (React Native) - Frontend สำหรับผู้ใช้
- **Backend API** (Node.js + Express) - RESTful API server
- **Database** (PostgreSQL) - เก็บข้อมูลถาวร
- **Cache** (Redis) - Cache layer สำหรับประสิทธิภาพ

## โครงสร้างโปรเจค (Project Structure)

```
knowcall/
├── mobile/                 # React Native mobile app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── screens/       # Screen components
│   │   ├── navigation/    # Navigation configuration
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store and slices
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   ├── assets/            # Images, fonts, etc.
│   ├── App.tsx           # Root component
│   └── package.json
│
├── backend/               # Node.js backend API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── middlewares/  # Express middlewares
│   │   ├── config/       # Configuration files
│   │   └── utils/        # Utility functions
│   ├── tests/            # Test files
│   └── package.json
│
├── shared/               # Shared code between mobile and backend
│   ├── types/           # Shared TypeScript types
│   ├── utils/           # Shared utility functions
│   └── constants/       # Shared constants
│
├── docs/                # Documentation
│   ├── API.md          # API documentation
│   ├── SETUP.md        # Setup guide
│   └── ARCHITECTURE.md # This file
│
└── README.md           # Project overview
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Mobile App                            │
│                    (React Native)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Home    │  │  Call    │  │  Block   │  │ Settings │   │
│  │  Screen  │  │  Logs    │  │  List    │  │  Screen  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │             │          │
│       └─────────────┴──────────────┴─────────────┘          │
│                     │                                        │
│            ┌────────▼────────┐                              │
│            │   Redux Store   │                              │
│            └────────┬────────┘                              │
│                     │                                        │
│            ┌────────▼────────┐                              │
│            │   API Service   │                              │
│            └────────┬────────┘                              │
└─────────────────────┼─────────────────────────────────────┘
                      │
                      │ HTTPS/REST
                      │
┌─────────────────────▼─────────────────────────────────────┐
│                   Backend API                              │
│                (Node.js + Express)                         │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              API Routes                               │ │
│  │  /phones  /users  /reports  /settings                │ │
│  └────┬─────────┬─────────┬──────────┬──────────────────┘ │
│       │         │         │          │                     │
│  ┌────▼─────────▼─────────▼──────────▼──────────────────┐ │
│  │              Controllers                              │ │
│  └────┬─────────┬─────────┬──────────┬──────────────────┘ │
│       │         │         │          │                     │
│  ┌────▼─────────▼─────────▼──────────▼──────────────────┐ │
│  │              Services                                 │ │
│  │  - Number Verification                                │ │
│  │  - Block Management                                   │ │
│  │  - Report Processing                                  │ │
│  └────┬─────────┬─────────┬──────────┬──────────────────┘ │
│       │         │         │          │                     │
│  ┌────▼─────────▼─────────▼──────────▼──────────────────┐ │
│  │              Data Layer                               │ │
│  └────┬──────────────────────────────┬──────────────────┘ │
└───────┼──────────────────────────────┼────────────────────┘
        │                              │
   ┌────▼────┐                    ┌────▼────┐
   │  Redis  │                    │   PostgreSQL  │
   │  Cache  │                    │   Database    │
   └─────────┘                    └───────────┘
```

## Data Flow

### 1. Phone Number Verification Flow

```
User Input → Mobile App → API Service → Backend API
                                           ↓
                                     Check Cache
                                           ↓
                                   Cache Hit? ─Yes→ Return Result
                                           ↓
                                          No
                                           ↓
                              ┌────────────┴────────────┐
                              │                         │
                     External APIs              Community DB
                     (UnknownPhone,              (PostgreSQL)
                      Tellows)                         │
                              │                         │
                              └────────────┬────────────┘
                                           ↓
                                    Aggregate Results
                                           ↓
                                      Cache Result
                                           ↓
                                    Return to Mobile
```

### 2. Call Blocking Flow

```
Incoming Call → System Detection → Mobile App
                                      ↓
                              Verify Number (API)
                                      ↓
                           ┌──────────┴──────────┐
                           │                     │
                    Check Blacklist      Check Risk Level
                           │                     │
                           └──────────┬──────────┘
                                      ↓
                              Block Decision?
                                   ↓     ↓
                                 Yes    No
                                   ↓     ↓
                             Block Call  Allow Call
                                   ↓     ↓
                             Log Event   Log Event
```

### 3. Report Submission Flow

```
User Report → Mobile App → API Service → Backend API
                                            ↓
                                   Validate Input
                                            ↓
                                   Rate Limit Check
                                            ↓
                                   Save to Database
                                            ↓
                              Update Number Statistics
                                            ↓
                              Invalidate Cache
                                            ↓
                              Return Success
```

## Technology Stack

### Mobile App

- **Framework**: React Native 0.73
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **UI Library**: React Native Paper
- **HTTP Client**: Axios
- **Icons**: React Native Vector Icons

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 14+
- **Cache**: Redis 6+
- **ORM**: Native pg driver (no ORM for now)
- **Validation**: Joi
- **Logging**: Winston
- **Security**: Helmet, CORS

### Infrastructure

- **Development**: Docker Compose (future)
- **Production**: TBD
- **CI/CD**: GitHub Actions (future)

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255),
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Blocked Numbers Table

```sql
CREATE TABLE blocked_numbers (
    id UUID PRIMARY KEY,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    country_code VARCHAR(2),
    is_international BOOLEAN DEFAULT false,
    reason VARCHAR(50),
    source VARCHAR(50),
    report_count INTEGER DEFAULT 0,
    risk_level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Reports Table

```sql
CREATE TABLE user_reports (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    phone_number VARCHAR(20) NOT NULL,
    reason VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Call Logs Table

```sql
CREATE TABLE call_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    phone_number VARCHAR(20) NOT NULL,
    call_type VARCHAR(20) NOT NULL,
    duration INTEGER DEFAULT 0,
    was_blocked BOOLEAN DEFAULT false,
    risk_level VARCHAR(20),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Design

### RESTful Principles

- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Resource-based URLs
- Stateless authentication (JWT tokens - future)
- Proper HTTP status codes
- JSON request/response format

### Error Handling

```typescript
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Success Response

```typescript
{
  "success": true,
  "data": { /* response data */ },
  "message": "Success message"
}
```

## Security Considerations

### Current Implementation

- Helmet for security headers
- CORS configuration
- Rate limiting on sensitive endpoints
- Input validation with Joi
- SQL injection prevention (parameterized queries)

### Future Enhancements

- JWT authentication
- API key for external services
- HTTPS only in production
- Request signing
- Encryption at rest
- Regular security audits

## Performance Optimization

### Caching Strategy

- Redis for frequently accessed data
- TTL-based cache invalidation
- Cache warming for popular numbers

### Database Optimization

- Indexes on frequently queried columns
- Connection pooling
- Query optimization

### Mobile App Optimization

- Lazy loading
- Image optimization
- Code splitting
- Minimal re-renders with Redux

## Scalability Considerations

### Horizontal Scaling

- Stateless API design
- Load balancing ready
- Database replication support

### Vertical Scaling

- Connection pool configuration
- Redis memory optimization
- Efficient database queries

## Testing Strategy

### Unit Tests

- Service layer logic
- Utility functions
- Redux reducers/actions

### Integration Tests

- API endpoints
- Database operations
- External API mocking

### E2E Tests

- Critical user flows
- Mobile app screens
- API integration

## Monitoring and Logging

### Logging

- Winston for structured logging
- Different log levels (error, warn, info, debug)
- Log rotation and retention

### Monitoring (Future)

- Application metrics
- Error tracking
- Performance monitoring
- User analytics

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                         │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
   ┌────▼────┐  ┌───▼─────┐  ┌──▼──────┐
   │ API     │  │ API     │  │ API     │
   │ Server 1│  │ Server 2│  │ Server 3│
   └────┬────┘  └────┬────┘  └────┬────┘
        │            │            │
        └────────────┼────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
   ┌────▼────┐  ┌───▼─────┐  ┌──▼──────┐
   │ Redis   │  │PostgreSQL│  │ External│
   │ Cluster │  │ Primary  │  │ APIs    │
   └─────────┘  └────┬─────┘  └─────────┘
                     │
                ┌────▼─────┐
                │PostgreSQL│
                │ Replica  │
                └──────────┘
```

## Future Enhancements

1. **Machine Learning**
   - Spam detection model
   - Pattern recognition
   - Automatic classification

2. **Real-time Features**
   - WebSocket for live updates
   - Push notifications
   - Real-time statistics

3. **Advanced Features**
   - Call recording analysis
   - Voice recognition
   - Multi-language support

4. **Integration**
   - Social media integration
   - Banking APIs for verification
   - Government databases

## Contributing

ดู [CONTRIBUTING.md](../CONTRIBUTING.md) สำหรับคำแนะนำในการพัฒนา
