# 🚀 ApplyFlow — Job Application Tracker

> A full-stack web application to help job seekers **organize, track, and manage** their job applications in one place.

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?logo=next.js)](https://nextjs.org)
[![Express](https://img.shields.io/badge/Backend-Express.js%205-green?logo=express)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)](https://postgresql.org)
[![Redux](https://img.shields.io/badge/State-Redux%20Toolkit-purple?logo=redux)](https://redux-toolkit.js.org)
[![Live Demo](https://img.shields.io/badge/Live-Demo-orange?logo=vercel)](https://apply-flow-nine-green.vercel.app)

---

## 📖 About the Project

**ApplyFlow** is a productivity tool built for modern job seekers. The job hunt can quickly become overwhelming — dozens of applications across different companies, various statuses, deadlines, and follow-ups to track. ApplyFlow solves this by providing a clean, centralized dashboard where users can log every application, monitor progress through a visual pipeline, and organize jobs into custom collections.

### Key Highlights

- 🔐 **Secure Authentication** — OTP-based email verification on signup, JWT-protected sessions via HTTP-only cookies
- 📋 **Job Application Management** — Add, edit, delete, and view detailed job entries with rich metadata
- 📊 **Analytics Dashboard** — At-a-glance pipeline view showing application statuses (Applied, Interview, Offered, Rejected) and recent activity
- 📁 **Collections** — Group related job applications into custom folders/collections for better organization
- 🔄 **Status Tracking** — Quickly update application status with real-time UI updates
- 👤 **Profile Management** — Auto-generated avatar, change password, and delete account functionality
- ☁️ **Deployed** — Frontend on Vercel, backend on a cloud server

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router & SSR |
| **React 19** | UI component library |
| **Redux Toolkit** | Global state management (auth, jobs, collections) |
| **Tailwind CSS v4** | Utility-first styling |
| **Axios** | HTTP client for API calls |
| **React Hook Form** | Performant form management |
| **React Hot Toast** | Toast notifications |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Express.js 5** | REST API server |
| **PostgreSQL** | Relational database |
| **node-pg-migrate** | Database schema migration |
| **bcryptjs** | Password hashing |
| **jsonwebtoken** | JWT-based authentication |
| **Nodemailer** | Email service for OTP delivery |
| **otp-generator** | Secure OTP generation |
| **cookie-parser** | HTTP-only cookie management |

---

## 🗄️ Database Schema

```
users           — User accounts (id, name, email, password, profile_image)
otp             — OTP records with expiry for email verification
jobs            — Job applications (company, title, status, priority, salary, etc.)
collections     — User-created groupings of jobs
collection_jobs — Many-to-many join table linking jobs to collections
```

### Job Fields
Each job application stores: company_name, job_title, description, job_url, job_type (Onsite/Remote/Hybrid), location, salary, status (Applied/Interview/Offered/Rejected), priority (Normal/High/Low), note, applied_date

---

## 📁 Project Structure

```
ApplyFlow/
├── package.json              # Root — runs client & server concurrently
├── client/                   # Next.js 16 Frontend
│   ├── app/
│   │   ├── (auth)/           # Login, Signup, Verify-OTP pages
│   │   └── dashboard/        # Dashboard, [view], collections
│   ├── components/           # auth/, common/, dashboard/, shared components
│   ├── redux/                # authSlice, jobsSlice, collectionsSlice
│   ├── services/             # API call utilities
│   └── lib/                  # Utility helpers
└── server/                   # Express.js Backend
    ├── index.js              # App entry point
    ├── config/db.js          # PostgreSQL pool config
    ├── routes/               # auth, jobs, collections routes
    ├── controllers/          # auth, job, collections controllers
    ├── middleware/auth.js    # JWT verification middleware
    ├── migrations/           # node-pg-migrate SQL migrations
    └── utils/mailSender.js   # Nodemailer utility
```

---

## 🔌 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register user (requires OTP) |
| POST | `/login` | Login and receive JWT cookie |
| POST | `/sendotp` | Send OTP to email for verification |
| POST | `/changepassword` | Change account password (protected) |
| DELETE | `/deleteaccount` | Delete user account (protected) |

### Jobs — `/api/jobs` *(protected)*
| Method | Endpoint | Description |
|---|---|---|
| POST | `/create` | Add a new job application |
| GET | `/` | Get all jobs for logged-in user |
| POST | `/get` | Get single job by ID |
| PUT | `/update` | Update job details |
| PUT | `/updatestatus` | Update only the job status |
| DELETE | `/delete` | Delete a job |
| GET | `/dashboard` | Get dashboard analytics |

### Collections — `/api/collections` *(protected)*
| Method | Endpoint | Description |
|---|---|---|
| POST | `/create` | Create a new collection |
| GET | `/` | Get all collections |
| POST | `/get` | Get single collection with its jobs |
| PUT | `/update` | Rename collection |
| DELETE | `/delete` | Delete a collection |
| POST | `/addjob` | Add job to collection |
| DELETE | `/removejob` | Remove job from collection |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- PostgreSQL v14+
- A Gmail account (for OTP emails)

### 1. Clone the Repository

```bash
git clone https://github.com/Ayushsotiya/ApplyFlow.git
cd ApplyFlow
```

### 2. Set Up the Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/applyflow
JWT_SECRET=your_super_secret_jwt_key
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password
```

> **Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

Run database migrations:

```bash
npm run migrate
```

### 3. Set Up the Client

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run the Application

**Option A — Run Both Together (recommended):**

```bash
cd ..
npm install
npm run dev
```

**Option B — Run Separately:**

```bash
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Client
cd client && npm run dev
```

### 5. Open in Browser

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |

---

## 🌐 Live Demo

**Frontend:** https://apply-flow-nine-green.vercel.app

---

## 📜 Available Scripts

### Root
| Script | Description |
|---|---|
| `npm run dev` | Start both client and server concurrently |
| `npm run client` | Start only the Next.js client |
| `npm run server` | Start only the Express server |

### Server (`cd server`)
| Script | Description |
|---|---|
| `npm run dev` | Start with nodemon (hot-reload) |
| `npm start` | Production mode |
| `npm run migrate` | Run pending migrations |
| `npm run migrate:down` | Roll back last migration |

### Client (`cd client`)
| Script | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Production server |

---

## 👤 Author

**Ayush Sotiya**
- GitHub: [@Ayushsotiya](https://github.com/Ayushsotiya)
- Project: https://github.com/Ayushsotiya/ApplyFlow

---

