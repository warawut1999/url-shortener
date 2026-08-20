# URL Shortener

Full-stack URL Shortener application สำหรับสร้าง จัดการ และติดตาม Short URL พร้อมรองรับ URL สำหรับ iOS และ Android

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Lucide React
- pnpm

### Backend
- ASP.NET Core Web API
- .NET
- Entity Framework Core
- SQLite
- FluentValidation
- Swagger / OpenAPI

### ChatGPT Log
- https://chatgpt.com/share/6a86f9ca-e500-83ec-a81e-6b4e9b59f0cb
- https://chatgpt.com/share/6a86f970-60fc-83ec-a38f-495a237fdf50
---

## Project Structure

```text
urlShortener/
├── backend/
│   └── UrlShortener.Api/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       │   ├── Requests/
│       │   └── Responses/
│       ├── Entities/
│       ├── Interfaces/
│       ├── Middleware/
│       ├── Repositories/
│       ├── Services/
│       ├── Validators/
│       ├── Program.cs
│       └── UrlShortener.Api.csproj
│
├── frontend/
│   └── urlShortener/
│       ├── src/
│       │   ├── api/
│       │   ├── components/
│       │   ├── layouts/
│       │   ├── pages/
│       │   └── types/
│       ├── public/
│       ├── package.json
│       ├── vite.config.ts
│       └── pnpm-lock.yaml
│
├── .gitignore
└── README.md
```

### Backend Flow

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
SQLite
```

### Frontend Flow

```text
Dashboard
    ↓
API / Axios
    ↓
ASP.NET Core API
```

---

# Requirements

ติดตั้งโปรแกรมต่อไปนี้ก่อน

- .NET SDK
- Node.js
- pnpm

ตรวจสอบ:

```bash
dotnet --version
node --version
pnpm --version
```

สำหรับ Backend ที่ใช้ EF Core หากยังไม่มี `dotnet-ef`:

```bash
dotnet tool install --global dotnet-ef
```

---

# 1. Run Backend

เปิด Terminal แล้วเข้า Backend:

```bash
cd backend/UrlShortener.Api
```

ติดตั้ง/Restore dependencies:

```bash
dotnet restore
```

ถ้าเป็นการ setup ครั้งแรก ให้สร้างหรือ update database:

```bash
dotnet ef database update
```

จากนั้น Run:

```bash
dotnet run
```

Backend จะทำงานที่:

```text
http://localhost:5033
```

Swagger:

```text
http://localhost:5033/swagger
```

---

# 2. Run Frontend

เปิด Terminal อีกหน้าต่างหนึ่ง:

```bash
cd frontend/urlShortener
```

ติดตั้ง dependencies:

```bash
pnpm install
```

สร้างไฟล์:

```text
.env
```

และใส่:

```env
VITE_API_URL=http://localhost:5033
```

จากนั้น Run:

```bash
pnpm dev
```

Frontend จะทำงานที่:

```text
http://localhost:5173
```

เปิด URL นี้ใน Browser

---

# Quick Start

ต้องเปิด Backend และ Frontend พร้อมกัน

### Terminal 1 - Backend

```bash
cd backend/UrlShortener.Api
dotnet ef database update
dotnet run
```

### Terminal 2 - Frontend

```bash
cd frontend/urlShortener
pnpm install
pnpm dev
```

จากนั้นเปิด:

```text
http://localhost:5173
```

---

# Main API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/Links` | Get all links |
| POST | `/api/Links` | Create link |
| PATCH | `/api/Links/{shortCode}/enable` | Enable link |
| PATCH | `/api/Links/{shortCode}/disable` | Disable link |
| DELETE | `/api/Links/{shortCode}` | Delete link |

## Create Link

```http
POST /api/Links
```

Request:

```json
{
  "url": "https://google.com",
  "customAlias": "google",
  "androidUrl": "https://play.google.com",
  "iosUrl": "https://apps.apple.com"
}
```

---

# Short URL

ตัวอย่าง Short URL:

```text
http://localhost:5033/ef-test
```

รองรับ Platform:

```text
http://localhost:5033/ef-test?platform=ios
```

```text
http://localhost:5033/ef-test?platform=android
```

Backend จะตรวจสอบ `platform` และ redirect ไปยัง URL ของ iOS หรือ Android ตามที่กำหนดไว้

---

# Dashboard Features

Dashboard รองรับ:

- Create Short Link
- Custom Alias
- Enable / Disable Link
- Delete Link
- Copy Short URL
- Open Short URL
- Open iOS URL
- Open Android URL
- Click Statistics
- Last Accessed Time
- Platform Flags (`isIOS`, `isAndroid`)

---

# Environment Variables

Frontend ใช้:

```env
VITE_API_URL=http://localhost:5033
```

ไม่ควร commit ไฟล์ `.env` ที่มีข้อมูลสำคัญขึ้น GitHub

แนะนำให้เพิ่มใน `.gitignore`:

```gitignore
.env
.env.local
.env.*.local
```

---

# Database

โปรเจกต์ใช้ SQLite และ Entity Framework Core

Update database:

```bash
dotnet ef database update
```

สร้าง migration ใหม่:

```bash
dotnet ef migrations add MigrationName
```

ไม่ควร commit database file ที่เป็น local development data หากไม่จำเป็น

---

# Build

## Backend

```bash
cd backend/UrlShortener.Api
dotnet build
```

## Frontend

```bash
cd frontend/urlShortener
pnpm build
```

---

# Troubleshooting

## Frontend ต่อ Backend ไม่ได้

ตรวจสอบว่า Backend ทำงานอยู่ที่:

```text
http://localhost:5033
```

และ `.env` เป็น:

```env
VITE_API_URL=http://localhost:5033
```

หลังแก้ `.env` ให้ restart Vite:

```bash
pnpm dev
```

## Database Error

ลอง:

```bash
dotnet ef database update
```

## Dependencies มีปัญหา

Frontend:

```bash
pnpm install
```

Backend:

```bash
dotnet restore
```

---

# Git

ตรวจสอบไฟล์ก่อน commit:

```bash
git status
```

ไม่ควรมีไฟล์เหล่านี้:

```text
node_modules/
bin/
obj/
dist/
.env
*.db
```

Commit:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

---

# Summary

```text
React + TypeScript + Vite
          │
          │ Axios / REST API
          ▼
ASP.NET Core Web API
          │
          │ Entity Framework Core
          ▼
       SQLite
```

สำหรับการใช้งานแบบ Development:

```text
Backend  → http://localhost:5033
Swagger  → http://localhost:5033/swagger
Frontend → http://localhost:5173
```
