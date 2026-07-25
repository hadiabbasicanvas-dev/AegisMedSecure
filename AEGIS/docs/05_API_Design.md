# 🔌 Enterprise REST API Design Specification
## Aegis Guardian AI: AI-Powered Autonomous Cyber Defense System

**Document Version:** 1.0  
**Classification:** Enterprise API Engineering Specification & Interface Contract  
**API Specification Standard:** OpenAPI 3.1.0 / RESTful Architecture  
**Base URL:** `https://api.aegis.qih.hospital/api/v1`  
**Client (Academic Demonstration):** Quaid-e-Azam International Hospital (QIH), Rawalpindi, Pakistan  
**Brand Identity Alignment:** Primary: Dark Blue (`#0B2545`), Accent: Cyan (`#00A8E8`), Secondary: White (`#FFFFFF`)  

---

> [!IMPORTANT]
> **ACADEMIC DEMONSTRATION & SIMULATION SAFEGUARD NOTICE:**  
> This REST API specification defines the external and internal HTTP/WebSocket interfaces for **Aegis Guardian AI**. All API requests, telemetry payloads, user accounts, asset identifiers, threat incidents, and response actions defined within this document operate against **100% synthetic and simulated** hospital environments. Aegis API endpoints operate in an isolated demonstration network and do not execute destructive commands against live clinical infrastructure at Quaid-e-Azam International Hospital.

---

## 1. Executive Summary & Design Philosophy

The Aegis Guardian AI REST API provides a type-safe, high-throughput, resource-oriented HTTP interface designed for integration with the React 19 SOC Dashboard, edge log collectors, and external compliance reporting engines.

### Core RESTful Design Principles
1. **Resource-Oriented URIs:** Nouns are used exclusively for URIs (e.g., `/api/v1/threats/alerts`), using plural forms to represent resource collections.
2. **Standard HTTP Verbs:** Explicit mapping of HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) to CRUD operations.
3. **Statelessness:** Every request contains all necessary credentials in the HTTP Authorization header or HttpOnly session cookies. No client session state is retained on the server.
4. **Strict ISO-8601 Timestamps:** All dates and timestamps are formatted in UTC using ISO-8601 string standards (`YYYY-MM-DDTHH:mm:ss.sssZ`).
5. **Uniform Response Wrappers:** Every HTTP response adheres to a predictable, standardized JSON envelope structure.

---

## 2. Global API Standards & Response Envelopes

### 2.1 Unified Success Response Schema
All successful API responses (HTTP `200 OK`, `201 Created`) return the following JSON structure:

```json
{
  "success": true,
  "data": {},
  "message": "Resource retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 150,
    "totalPages": 8
  },
  "timestamp": "2026-07-24T02:48:22.000Z"
}
```

### 2.2 Unified Error Response Schema
All error responses (HTTP `4xx`, `5xx`) return a consistent error envelope detailing error codes and validation fields:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested hospital asset with ID '550e8400-e29b-41d4-a716-446655440000' does not exist.",
    "details": [
      {
        "field": "assetId",
        "issue": "Invalid UUID format or asset non-existent"
      }
    ]
  },
  "timestamp": "2026-07-24T02:48:22.000Z"
}
```

### 2.3 Standard HTTP Status Codes

| Code | Status | Usage Description |
| :--- | :--- | :--- |
| `200` | **OK** | Request completed successfully. Standard for read/update operations. |
| `201` | **Created** | Resource successfully created (e.g., new user, new incident report). |
| `204` | **No Content** | Request succeeded; no body content returned (e.g., session logout). |
| `400` | **Bad Request** | Malformed JSON request body or missing required parameters. |
| `401` | **Unauthorized** | Missing, invalid, or expired JWT bearer token. |
| `403` | **Forbidden** | User lacks required RBAC permission for action. |
| `404` | **Not Found** | The specified target resource URI does not exist. |
| `409` | **Conflict** | Resource conflict (e.g., duplicate email address registration). |
| `422` | **Unprocessable Entity** | Schema validation failed (e.g., invalid email or out-of-range value). |
| `429` | **Too Many Requests** | Rate limit threshold exceeded. |
| `500` | **Internal Error** | Server-side unhandled exception. |
| `503` | **Service Unavailable** | Backend service or OpenAI API unavailable. |

---

## 3. Authentication & Security Specifications

```
Client App ──► POST /auth/login ──► Server Issue JWT ──► Store Bearer Token ──► API Request Header
```

### 3.1 JWT Bearer Token Authentication
* **Header Format:** `Authorization: Bearer <access_token>`
* **Access Token Expiration:** 15 Minutes (short-lived for Zero-Trust security).
* **Refresh Token Expiration:** 7 Days (stored in `HttpOnly`, `Secure`, `SameSite=Strict` cookie).

### 3.2 Rate Limiting Policies
* **General API Endpoints:** 100 requests per minute per IP.
* **Authentication Endpoints (`/auth/login`):** 5 requests per minute per IP (prevents brute-force attacks).
* **High-Throughput Telemetry Endpoint (`/telemetry/ingest`):** 5,000 requests per minute per authorized collector key.

---

## 4. Detailed API Endpoint Catalog

---

### MODULE 1: AUTHENTICATION & IDENTITY (`/api/v1/auth`)

#### 1.1 `POST /api/v1/auth/login`
* **Description:** Authenticates user credentials and returns short-lived JWT access token.
* **RBAC Required:** None (Public Endpoint).
* **Request Body:**
```json
{
  "email": "analyst@qih.hospital",
  "password": "Password123!",
  "mfaCode": "582019"
}
```
* **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "c1f8d420-990a-4c28-98e2-123456789abc",
      "email": "analyst@qih.hospital",
      "firstName": "Zain",
      "lastName": "Ahmed",
      "role": "SECURITY_ANALYST"
    }
  },
  "message": "Authentication successful",
  "timestamp": "2026-07-24T02:48:22.000Z"
}
```

#### 1.2 `POST /api/v1/auth/refresh`
* **Description:** Exchanges valid HttpOnly refresh cookie for a new JWT access token.
* **RBAC Required:** Valid Refresh Cookie.
* **Response (HTTP 200 OK):** Returns new `token` string.

#### 1.3 `POST /api/v1/auth/logout`
* **Description:** Revokes current refresh token session and clears auth cookies.
* **RBAC Required:** Authenticated User.
* **Response:** HTTP `204 No Content`.

---

### MODULE 2: HOSPITAL ASSETS & SUBNETS (`/api/v1/assets`)

#### 2.1 `GET /api/v1/assets`
* **Description:** Retrieves paginated list of registered QIH hospital assets and medical devices.
* **RBAC Required:** `assets:read` (All roles).
* **Query Parameters:** `page`, `limit`, `departmentId`, `status`, `search`.
* **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "e4a21900-5b12-4c2b-88a1-100000000001",
      "hostname": "qih-icu-vent-04",
      "ipAddress": "192.168.4.12",
      "macAddress": "00:1A:2B:3C:4D:5E",
      "department": { "name": "Adult ICU", "code": "ICU-ADULT" },
      "category": { "name": "IoMT_Device" },
      "status": "QUARANTINED",
      "criticalityWeight": 1.00,
      "vlanTag": 999
    }
  ],
  "meta": { "page": 1, "limit": 20, "totalItems": 45, "totalPages": 3 },
  "timestamp": "2026-07-24T02:48:22.000Z"
}
```

#### 2.2 `POST /api/v1/assets`
* **Description:** Registers a new physical or virtual asset in the hospital inventory.
* **RBAC Required:** `assets:write` (`SUPER_ADMIN`, `IT_ADMIN`).

#### 2.3 `PATCH /api/v1/assets/:id/status`
* **Description:** Manually updates operational health status or VLAN tag of an asset.
* **RBAC Required:** `assets:write` (`SUPER_ADMIN`, `SOC_MANAGER`, `IT_ADMIN`).

---

### MODULE 3: THREAT TELEMETRY & DETECTION (`/api/v1/threats`)

#### 3.1 `POST /api/v1/telemetry/ingest`
* **Description:** High-speed ingestion endpoint for raw simulated network logs.
* **RBAC Required:** System Collector Key.
* **Request Body:**
```json
{
  "collectorId": "qih-edge-collector-01",
  "telemetry": [
    {
      "sourceIp": "10.0.45.12",
      "destinationIp": "192.168.4.12",
      "rawPayload": "ALERT: Entropy burst detected on /emr/data/.locked",
      "assetHostname": "qih-icu-vent-04"
    }
  ]
}
```
* **Response (HTTP 200 OK):** `{"success": true, "message": "Ingested 1 events"}`.

#### 3.2 `GET /api/v1/threats/alerts`
* **Description:** Fetches active security alerts with risk scores and severity tags.
* **RBAC Required:** `threats:read` (`SUPER_ADMIN`, `SOC_MANAGER`, `SECURITY_ANALYST`).

---

### MODULE 4: INCIDENT MANAGEMENT & SOAR (`/api/v1/incidents`)

#### 4.1 `GET /api/v1/incidents`
* **Description:** Retrieves escalated security incidents.
* **RBAC Required:** `incidents:read`.

#### 4.2 `POST /api/v1/incidents/:id/soar`
* **Description:** Manually triggers or approves autonomous SOAR containment on an incident.
* **RBAC Required:** `soar:execute` (`SUPER_ADMIN`, `SOC_MANAGER`, `SECURITY_ANALYST`).
* **Request Body:**
```json
{
  "actionType": "MICRO_SEGMENT_VLAN",
  "targetVlan": 999,
  "reason": "Confirmed Ransomware encryption activity"
}
```
* **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "incidentId": "inc-2026-0481",
    "status": "CONTAINED",
    "executionTimeMs": 342,
    "auditHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  "message": "SOAR quarantine micro-segmentation successfully executed",
  "timestamp": "2026-07-24T02:48:22.000Z"
}
```

---

### MODULE 5: AI INTELLIGENCE & COPILOT (`/api/v1/ai`)

#### 5.1 `POST /api/v1/ai/analyze-incident`
* **Description:** Submits incident context to OpenAI GPT-4o for root cause analysis.
* **RBAC Required:** `ai:execute`.

#### 5.2 `POST /api/v1/ai/copilot/chat`
* **Description:** Conversational natural language endpoint for analyst Copilot queries.
* **RBAC Required:** `ai:chat`.
* **Request Body:** `{"prompt": "Summarize SQL injection attempts in the last 2 hours"}`.

---

### MODULE 6: REPORTING & AUDIT LOGS (`/api/v1/reports`, `/api/v1/audit-logs`)

#### 6.1 `POST /api/v1/reports/export`
* **Description:** Compiles and exports incident reports as downloadable PDF or Markdown files.
* **RBAC Required:** `reports:export` (`SUPER_ADMIN`, `SOC_MANAGER`, `COMPLIANCE_OFFICER`).

#### 6.2 `GET /api/v1/audit-logs`
* **Description:** Queries immutable append-only audit trail logs with SHA-256 integrity verification.
* **RBAC Required:** `audit:read` (`SUPER_ADMIN`, `SOC_MANAGER`, `COMPLIANCE_OFFICER`).

---

## 5. Real-Time WebSocket Event Pipeline (`Socket.io`)

### Connection Handshake & Authentication
Clients connect via Socket.io sending JWT token in handshake query:
```javascript
const socket = io("https://api.aegis.qih.hospital", {
  auth: { token: "eyJhbGciOiJIUzI1..." }
});
```

### Real-Time Event Catalog

| Event Name | Direction | Payload Example | Description |
| :--- | :--- | :--- | :--- |
| `alert:new` | Server -> Client | `{ alertId, severity: "CRITICAL", title: "Ransomware" }` | Emitted instantly when a high-severity alert is detected. |
| `soar:quarantine_executed` | Server -> Client | `{ incidentId, assetHostname, vlanTag: 999 }` | Emitted when automated SOAR micro-segmentation completes. |
| `health_score:updated` | Server -> Client | `{ score: 72, status: "WARNING" }` | Emitted when global network health score changes. |

---

> **Document Status:** APPROVED FOR IMPLEMENTATION  
> **Document Reference:** QIH-AEGIS-API-2026-V1.0  
> **Copyright:** © 2026 Quaid-e-Azam International Hospital / Aegis Guardian AI Team. All Rights Reserved.
