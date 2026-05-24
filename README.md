# AI Test Generator Platform

An experimental full-stack AI-powered platform designed to analyze repositories and generate contextual software test cases.

The project aims to explore:
- AI-assisted QA workflows
- repository-aware test generation
- developer tooling architecture
- semantic memory systems
- AI + full-stack orchestration

The long-term goal is to build a developer-focused testing workspace capable of understanding repositories and assisting with automated test generation.

---

# Project Scope

The platform architecture currently includes systems for:

- User authentication
- Project workspaces
- GitHub repository import
- ZIP repository upload
- Repository analysis
- AI-assisted test generation
- AI chat assistant
- Export pipelines
- Embedding-based memory workflows

The codebase follows a modular full-stack architecture using:
- React + Vite frontend
- Node.js + Express backend
- MongoDB + Mongoose
- Groq AI integration

---

# Current Verification Status

This section reflects what has ACTUALLY been tested and verified so far.

---

## Verified Working ✅

### Authentication System
Verified:
- user signup
- user login
- JWT authentication flow
- protected routes
- password hashing using bcrypt
- MongoDB persistence

### MongoDB Integration
Verified:
- MongoDB server connection
- database creation
- collection creation
- persistent user storage
- document inspection using MongoDB Compass

### Frontend + Backend Integration
Verified:
- React frontend communication with Express backend
- API request flow
- CORS configuration
- environment variable integration

### Project Workspace
Verified:
- project creation
- dashboard rendering
- workspace routing/navigation

---

## Partially Verified / Experimental ⚠️

These systems exist in the architecture and codebase, but are still under debugging or have only been partially tested.

### GitHub Repository Import
Partially verified:
- repository import flow exists
- backend repository service exists
- branch handling currently fragile
- validation issues still exist
- external repository ingestion still being tested

### Repository Analysis System
Partially verified:
- repository analysis architecture exists
- parsing pipeline exists
- framework detection not fully validated yet
- large-scale repo testing not completed yet

### AI Test Generation
Partially verified:
- AI generation workflow exists
- prompt-based generation architecture exists
- generation quality not deeply evaluated yet
- contextual accuracy still unverified

### Export Pipelines
Partially verified:
- Markdown/PDF/JSON export systems exist
- complete export validation not performed yet

---

## Not Yet Verified ❌

The following systems/features exist in the planned architecture or implementation, but have NOT yet been fully tested or validated.

- embedding retrieval quality
- semantic memory workflows
- AI chat assistant reliability
- repository-aware contextual generation accuracy
- scalability/performance under larger repositories
- edge-case repository parsing
- advanced framework detection
- production deployment readiness
- security hardening
- AI output reliability
- large-scale QA workflows

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- Tailwind CSS
- Zustand

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## AI Integration
- Groq API
- Context-aware prompting
- Repository parsing pipeline

---

# Local Development Setup

## 1. Clone Repository

```bash
git clone https://github.com/rhll07/ai_test_generator
cd ai-test-generator
```

---

## 2. Install Dependencies

```bash
npm install
npm install --prefix server
npm install --prefix client
```

---

## 3. Configure Environment Variables

Create a `.env` file inside `server/`

Example:

```env
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

MONGODB_URI=mongodb://127.0.0.1:27017/ai-test-generator
JWT_SECRET="REPLACE_WITH_YOUR_KEY"
JWT_EXPIRES_IN=7d

GROQ_API_KEY="REPLACE_WITH_YOUR_KEY"
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_MODEL=llama-3.3-70b-versatile

UPLOAD_DIR=uploads
MAX_UPLOAD_MB=25
```

---

## 4. Install and Start MongoDB

### Ubuntu Installation

Import MongoDB public key:

```bash
curl -fsSL https://pgp.mongodb.com/server-8.0.asc | \
sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
--dearmor
```

Create MongoDB source list:

```bash
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | \
sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
```

Update packages:

```bash
sudo apt update
```

Install MongoDB:

```bash
sudo apt install -y mongodb-org
```

---

### Start MongoDB Service

```bash
sudo systemctl start mongod
```

Enable MongoDB on boot:

```bash
sudo systemctl enable mongod
```

Verify MongoDB status:

```bash
sudo systemctl status mongod
```

---

### Optional: Install MongoDB Compass

Download:
https://downloads.mongodb.com/compass/mongodb-compass_1.49.7_amd64.deb

Install `.deb` package:

```bash
sudo dpkg -i mongodb-compass_1.49.7_amd64.deb
```

---

## 5. Start Development Servers

```bash
npm run dev
```

Frontend:
```txt
http://localhost:5173
```

Backend:
```txt
http://localhost:5000
```

---

# Current Development Focus

Current priorities include:
- stabilizing GitHub repository ingestion
- improving repository parsing
- validating AI-generated outputs
- improving architecture reliability
- debugging edge cases
- improving developer experience

---

# Contributing

Contributions, debugging help, testing, and architecture suggestions are welcome.

Especially interested in:
- repository parsing improvements
- AI test quality evaluation
- GitHub ingestion fixes
- frontend UX improvements
- export improvements
- architecture cleanup/refactoring

---

# Disclaimer

This is currently an experimental and actively evolving project.

AI-generated outputs should always be reviewed manually before production usage.

---

# Author

Built by [Rahul Krishna R](https://github.com/rhll07)
