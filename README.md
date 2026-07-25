# 🛡️ Aegis Guardian AI: AI-Powered Autonomous Cyber Defense System

**Client (Academic Demonstration):** Quaid-e-Azam International Hospital (QIH), Rawalpindi / Islamabad, Pakistan  
**Facility Scope:** 400 Inpatient Beds, Emergency Center, Operating Theatres, ICUs (Adult, NICU, PICU), PACS/RIS, EMR, LIS, Pharmacy  
**Status:** **Phase 10 Complete – Production Release Ready**  

---

## 📋 System Overview & Architecture

**Aegis Guardian AI** is an enterprise-grade, high-throughput autonomous Security Operations Center (SOC) and Security Orchestration, Automation, and Response (SOAR) platform engineered specifically for healthcare IT networks. The system continuously ingests network telemetry, detects zero-day ransomware and cyber threats using machine learning and Large Language Models (OpenAI GPT-4o RAG), and executes automated software-defined VLAN micro-segmentation to protect critical clinical operations.

```text
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │                      Quaid-e-Azam Int. Hospital Network                         │
 │ ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌───────────────────────┐ │
 │ │ Radiology   │   │ EMR Database│   │ Adult ICU   │   │ Connected IoMT        │ │
 │ │ PACS Subnet │   │ Core Vault  │   │ Ventilators │   │ Bedside Monitors      │ │
 │ └──────┬──────┘   └──────┬──────┘   └──────┬──────┘   └───────────┬───────────┘ │
 └────────┼─────────────────┼─────────────────┼──────────────────────┼─────────────┘
          │                 │                 │                      │
          ▼                 ▼                 ▼                      ▼
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │                    Aegis Autonomous SOC Ingestion Gateway                       │
 │  • Real-time Telemetry Processing (sub-500ms packet velocity)                   │
 │  • OpenAI GPT-4o RAG Vector Engine (QIH Network Context)                        │
 │  • Software-Defined Micro-Segmentation Engine (Palo Alto PAN-OS Driver)         │
 └─────────────────────────────────────────────────────────────────────────────────┘
          │                                                          │
          ▼                                                          ▼
 ┌──────────────────────────────┐              ┌───────────────────────────────────┐
 │  Protected SOC Workspace UI  │              │  REST API & PostgreSQL DB Engine  │
 │  (React 19 + Vite + Tailwind)│              │  (Node 20 + Express + Prisma ORM) │
 └──────────────────────────────┘              └───────────────────────────────────┘
```

---

## 🚀 Step-by-Step Quickstart (Docker Compose)

Launch the entire monorepo stack (PostgreSQL 16, Node.js Express API Engine, and Nginx React Frontend) in a single command:

```bash
# 1. Clone Monorepo Workspace
git clone https://github.com/qih-cybersecurity/aegis-guardian-ai.git
cd aegis-guardian-ai

# 2. Build & Launch Containers
docker-compose up --build -d

# 3. Access Portal
# Frontend: http://localhost:5173
# API Engine: http://localhost:5000/api/v1
```

---

## 🔑 Pre-Seeded Test Accounts for All 5 System Roles

Test the platform under any of the 5 role access tiers using the credentials below:

| Role Type | Email Address | Default Password | Assigned Department | Access Entitlements |
| :--- | :--- | :--- | :--- | :--- |
| `SUPER_ADMINISTRATOR` | `superadmin@qih.hospital` | `Password123!` | Executive Governance | Full Access + User Provisioning & AI Settings |
| `SOC_MANAGER` | `socmanager@qih.hospital` | `Password123!` | SOC Operations | Full SOC Access + Incident Close & Report Admin |
| `SECURITY_ANALYST` | `analyst@qih.hospital` | `Password123!` | Threat Monitoring | Monitoring, SOAR Isolation, Notes & Actions |
| `IT_ADMINISTRATOR` | `itadmin@qih.hospital` | `Password123!` | Hospital Infrastructure | Asset Inventory & Health Probes |
| `COMPLIANCE_OFFICER` | `compliance@qih.hospital` | `Password123!` | Regulatory Audit | Read-Only Audit Logs & HIPAA Report Exports |

---

## 🛠️ Complete 10-Phase Completion Roadmap

- [x] **Phase 1 – Enterprise Monorepo Foundation & Initial Setup:** Monorepo architecture (`frontend/`, `backend/`, `database/prisma/`, `docker/`), Vite, Tailwind CSS, TypeScript configs, Winston logger, and base layouts.
- [x] **Phase 2 – Enterprise Authentication & Authorization System:** JWT access/refresh rotation, BCrypt salt rounds (12), Zustand `useAuthStore`, RBAC `requireRole` middleware, and auth pages (`/login`, `/register`, `/forgot-password`, `/reset-password`, `/profile`).
- [x] **Phase 3 – Premium Enterprise Landing Website:** Public marketing portal (`/`, `/features`, `/solutions`, `/about`, `/contact`) with Framer Motion animations, responsive navbar, hero banner, and contact forms.
- [x] **Phase 4 – Enterprise Security Operations Center (SOC) Dashboard:** Executive workspace (`/dashboard`) with welcome banner, 6 KPI cards, live telemetry feed, recent alerts datatable, Recharts visualizers, and AI insights panel.
- [x] **Phase 5 – Enterprise Threat Monitoring Module:** End-to-end threat triage (`/dashboard/threats`) with pre-seeded dataset of 40 QIH hospital threat records, REST API, datatables, timeline visualizers, AI summaries, and export actions.
- [x] **Phase 6 – Enterprise AI Security Assistant:** GPT-4o RAG Copilot (`/dashboard/ai-assistant`) with streaming SSE, local vector context retriever, markdown renderer with copy code button, suggested prompts, and conversation history.
- [x] **Phase 7 – Enterprise Analytics & Reporting Module:** Multi-dimensional analytics (`/dashboard/analytics` & `/dashboard/reports`) with Recharts area/radar/pie/line visualizers, hospital ward risk grid, report templates, and downloadable PDF/CSV brief compiler.
- [x] **Phase 8 – Enterprise Incident Management Module:** 7-stage incident lifecycle command center (`/dashboard/incidents`) with pre-seeded dataset of 30 hospital incidents, interactive timeline, pinned analyst notes, PCAP/log evidence vault, and SOAR response action log.
- [x] **Phase 9 – Enterprise Administration & System Management Module:** Control panel (`/dashboard/admin`, `/dashboard/users`, `/dashboard/assets`, `/dashboard/audit-logs`, `/dashboard/settings`, `/dashboard/system-health`) with user IAM provisioning, hospital asset inventory, RBAC permission matrix, audit trail, and LLM temperature controls.
- [x] **Phase 10 – Production Readiness, Security Hardening, Performance Optimization & Final Release:** Rollup manual chunk splitting, React `lazy()` route splitting, Prisma database performance indexes, Helmet security headers, Docker multi-stage containers, `.env.example` files, and deployment guide.

---

## 🌐 Application Route Map

* **Public Marketing Portal:** `http://localhost:5173/`
* **SOC Operator Login:** `http://localhost:5173/login`
* **Executive SOC Dashboard:** `http://localhost:5173/dashboard`
* **Threat Monitoring Grid:** `http://localhost:5173/dashboard/threats`
* **AI Copilot Assistant:** `http://localhost:5173/dashboard/ai-assistant`
* **Security Analytics & Visualizers:** `http://localhost:5173/dashboard/analytics`
* **Report Builder & Library:** `http://localhost:5173/dashboard/reports`
* **Incident Command Center:** `http://localhost:5173/dashboard/incidents`
* **Administration Control Panel:** `http://localhost:5173/dashboard/admin`
* **User IAM Provisioning:** `http://localhost:5173/dashboard/users`
* **Hospital Asset Inventory:** `http://localhost:5173/dashboard/assets`
* **Security Audit Trail:** `http://localhost:5173/dashboard/audit-logs`
* **Security & AI Settings:** `http://localhost:5173/dashboard/settings`
* **System Health Operations:** `http://localhost:5173/dashboard/system-health`

---

## ⚠️ Academic Demonstration Notice

> *Aegis Guardian AI is an academic demonstration of an AI-powered cybersecurity platform developed for Quaid-e-Azam International Hospital. All telemetry, threats, alerts, patient records, and operational analytics are simulated for educational purposes.*
