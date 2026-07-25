# 🚀 Aegis Guardian AI: Production Deployment & DevOps Guide

**Client (Academic Demonstration):** Quaid-e-Azam International Hospital (QIH), Rawalpindi / Islamabad, Pakistan  
**Document Version:** 1.0.0 (Production Release)  

---

## 📋 Overview

This document provides step-by-step instructions for deploying **Aegis Guardian AI** into production environments using Docker Compose, cloud container platforms (Railway / Render), cloud serverless frontend hosts (Vercel / Netlify), and managed PostgreSQL databases.

---

## 🐳 Option 1: Docker Compose Local / On-Premise Deployment

The platform includes a containerized Docker orchestration setup linking PostgreSQL 16, Node.js API Gateway, and Nginx React SPA.

### Prerequisites
* Docker Engine v24+ & Docker Compose v2.20+
* Git

### Step-by-Step Instructions
```bash
# 1. Clone Repository
git clone https://github.com/qih-cybersecurity/aegis-guardian-ai.git
cd aegis-guardian-ai

# 2. Build & Launch Container Cluster
docker-compose up --build -d

# 3. Verify Container Status
docker-compose ps
```

### Port Mappings
* **Frontend SPA:** `http://localhost:5173` (Served by Nginx Alpine)
* **Backend REST API:** `http://localhost:5000/api/v1` (Served by Node 20)
* **PostgreSQL DB:** `localhost:5432`

---

## ☁️ Option 2: Cloud Production Deployment (Vercel + Railway + Supabase)

### 1. Database (Supabase / Neon PostgreSQL)
1. Provision a managed PostgreSQL instance on Supabase or Neon.
2. Retrieve the transaction pooler Connection String (`DATABASE_URL`).
3. Execute Prisma migrations:
   ```bash
   cd backend
   npx prisma db push
   ```

### 2. Backend REST API Gateway (Railway / Render)
1. Deploy the `backend/` directory to Railway or Render as a Node.js Web Service.
2. Set Environment Variables:
   * `PORT`: `5000`
   * `NODE_ENV`: `production`
   * `DATABASE_URL`: `<YOUR_SUPABASE_POSTGRES_URL>`
   * `JWT_SECRET`: `<STRONG_RANDOM_SECRET_KEY>`
   * `JWT_REFRESH_SECRET`: `<STRONG_RANDOM_REFRESH_KEY>`
   * `CLIENT_URL`: `https://aegis-guardian.vercel.app`
   * `OPENAI_API_KEY`: `<YOUR_OPENAI_GPT4O_API_KEY>`

### 3. Frontend Web Application (Vercel)
1. Import the `frontend/` directory into Vercel.
2. Set Build Settings:
   * **Framework Preset:** Vite
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
3. Environment Variables:
   * `VITE_API_BASE_URL`: `https://aegis-backend-production.up.railway.app/api/v1`

---

## 🔒 Production Security Checklists

- [x] **SSL / TLS Certificate:** Enforce HTTPS (`Strict-Transport-Security`).
- [x] **Environment Key Masking:** Zero hardcoded API keys or JWT secrets in source.
- [x] **RBAC Authorization:** Strict `requireRole` middleware on administrative endpoints.
- [x] **Rate Limiting:** IP rate-limiting enforced on `/api/v1/auth` and `/api/v1/ai`.
- [x] **HttpOnly Cookies:** Secure cookie flags for JWT refresh tokens.
