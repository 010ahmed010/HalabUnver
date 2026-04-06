# HalabUnver — منصة طلاب جامعة حلب

## نظرة عامة
منصة MERN Stack أكاديمية وتجارية متكاملة لطلاب جامعة حلب. تعتمد على **Description Mirror Method (DMM)** — كل ملف `.desc` في مجلد `HalabUnver_DescriptionMirrorMethod/` هو المخطط الدقيق للصفحة المقابلة.

## التقنيات المستخدمة
- **Frontend:** React 19 + Vite 8 + React Router DOM — يعمل على port 5000
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) — استخدم `@import "tailwindcss"` + `@theme {}` (ليس v3 directives)
- **Backend:** Node.js 20 + Express 5 + Mongoose 8 — يعمل على port 8000
- **Database (dev):** mongodb-memory-server (in-memory, resets on restart)
- **Database (prod):** MongoDB Atlas — يُعيَّن عبر `MONGODB_URI` secret
- **Auth:** JWT (`jsonwebtoken`) — secret في `JWT_SECRET` env var
- **Docker:** Dockerfile + docker-compose.yml في `server/` للنشر على VPS
- **الخط:** IBM Plex Sans Arabic + Cairo (Google Fonts)

## أنواع الحسابات (Three Account Types)
| النوع | accountType | تفاصيل |
|-------|-------------|---------|
| طالب | `student` | isVerified, isFreelancer, xp, level |
| أعمال | `business` | businessType: vendor/advertiser/freelancer |
| مشرف | `admin` | وصول كامل لجميع الأدوات |

- AuthContext في `context/AuthContext.jsx` — مع 6 حسابات تجريبية mock
- Route Guards: `StudentRoute`, `BusinessRoute`, `AdminRoute` في `components/guards/`
- لوحة الأعمال: `/business` — tabs تتغير بحسب businessType
- الهيدر account-aware: Guest / Student / Business / Admin لكل منهم واجهة مختلفة

---

## هيكل Backend (server/)

```
server/
├── server.js                  — Entry point (loads env, connects DB, starts server)
├── src/
│   ├── app.js                 — Express app (CORS, Helmet, Morgan, routes, error handler)
│   ├── config/
│   │   └── db.js              — MongoDB Atlas connection + in-memory fallback + seed
│   ├── middleware/
│   │   ├── auth.js            — JWT verify → req.user
│   │   └── roleGuard.js       — requireAdmin / requireStudent / requireBusiness
│   ├── models/                — 16 Mongoose models
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Lesson.js
│   │   ├── Enrollment.js
│   │   ├── LibraryDocument.js
│   │   ├── Bookmark.js
│   │   ├── FreelancerProfile.js
│   │   ├── FreelancerService.js
│   │   ├── ServiceContract.js  — escrow pattern (clientApproved + adminApproved)
│   │   ├── Product.js          — ProductCode auto-generated with "HS-" prefix
│   │   ├── Order.js            — pickupCode: random 4-digit on creation
│   │   ├── Transaction.js      — ShamCash receipt upload + admin verify
│   │   ├── Notification.js
│   │   ├── AdCampaign.js
│   │   ├── SystemConfig.js
│   │   └── ActivityLog.js
│   ├── utils/
│   │   └── xp.js              — Level = Floor(√(XP/100))
│   └── routes/                — 11 route files, each with paired controller
│       ├── auth.routes.js      + auth.controller.js
│       ├── user.routes.js      + user.controller.js
│       ├── course.routes.js    + course.controller.js
│       ├── library.routes.js   + library.controller.js
│       ├── freelance.routes.js + freelance.controller.js
│       ├── store.routes.js     + store.controller.js
│       ├── transaction.routes.js + transaction.controller.js
│       ├── notification.routes.js + notification.controller.js
│       ├── ads.routes.js       + ads.controller.js
│       ├── admin.routes.js     + admin.controller.js
│       └── config.routes.js   + config.controller.js
├── Dockerfile                 — Node 20 Alpine, multi-stage
├── docker-compose.yml         — port 8000, .env passthrough, health check
└── .env.example               — template for all required env vars
```

## متغيرات البيئة المطلوبة
| المتغير | النوع | الوصف |
|---------|------|-------|
| `MONGODB_URI` | secret | Atlas connection string — إذا لم يُعيَّن يستخدم in-memory |
| `JWT_SECRET` | secret/env | مفتاح توقيع JWT |
| `PORT` | env | رقم المنفذ (8000 افتراضياً) |
| `NODE_ENV` | env | development / production |
| `JWT_EXPIRES_IN` | env | مدة صلاحية التوكن (7d افتراضياً) |
| `CLIENT_ORIGIN` | env | CORS origin للـ frontend |

## API Routes الكاملة

### Auth `/api/auth`
| الطريقة | المسار | الحماية | الوصف |
|---------|--------|---------|-------|
| POST | `/register` | — | تسجيل student أو business |
| POST | `/login` | — | تسجيل دخول → JWT |
| POST | `/logout` | auth | تسجيل خروج |
| GET | `/me` | auth | بيانات المستخدم الحالي |
| POST | `/forgot-password` | — | stub |

### Users `/api/users`
| الطريقة | المسار | الحماية |
|---------|--------|---------|
| GET | `/` | admin |
| GET | `/:id` | auth |
| PATCH | `/:id` | auth (self/admin) |
| PATCH | `/:id/verify` | admin |
| PATCH | `/:id/status` | admin |
| PATCH | `/:id/xp` | admin |
| DELETE | `/:id` | admin |
| POST | `/bulk-notify` | admin |

### Academy `/api/courses`
| الطريقة | المسار | الحماية |
|---------|--------|---------|
| GET | `/` | public |
| GET | `/:id` | public |
| POST | `/` | admin |
| PATCH | `/:id` | admin |
| DELETE | `/:id` | admin |
| POST | `/:id/enroll` | student |
| GET | `/:id/lessons` | auth |
| POST | `/:id/lessons` | admin |
| PATCH | `/lessons/:id/progress` | student → +250 XP on complete |

### Library `/api/library`
| الطريقة | المسار | الحماية |
|---------|--------|---------|
| GET | `/` | public |
| GET | `/:id` | public |
| POST | `/` | admin |
| PATCH | `/:id` | admin |
| DELETE | `/:id` | admin |
| POST | `/:id/download` | student → +25 XP |
| POST | `/:id/feedback` | auth |
| POST | `/check-links` | admin |
| GET/POST/DELETE | `/bookmarks` | student |

### Freelance `/api/freelance`
- profiles: CRUD (public read, auth write)
- services: CRUD (public read, freelancer write)
- contracts: POST (client), GET (client/freelancer), PATCH (status/escrow)
- leaderboard, onboard, reviews

### Store `/api/store`
- products: CRUD + visibility + vendor approval
- orders: place, status update, pickup confirm (4-digit code), cancel → wallet credit

### Transactions `/api/transactions`
- POST: ShamCash receipt upload
- GET: own (student) / all pending (admin)
- PATCH `/:id/confirm`: admin → triggers downstream action
- PATCH `/:id/reject`: admin

### Notifications `/api/notifications`
- GET / PATCH read / PATCH read-all / DELETE / POST (admin broadcast)

### Ads `/api/ads`
- CRUD + approve/reject/extend + impression/click counters + config toggle

### System Config `/api/config`
- GET (public) / PATCH (admin) / POST seed (admin)

### Admin `/api/admin`
- GET `/stats` — totals + pending verifications
- GET `/activity-log`
- GET `/revenue` — breakdown by stream
- PATCH `/subscription-fee`

---

## Business Logic Notes
- **ShamCash:** manual receipt upload → admin verifies → action triggers
- **Escrow:** ServiceContract needs `clientApproved` AND `adminApproved` to release funds
- **Business accounts:** start as `status: pending` until admin approves
- **Pickup code:** 4-digit auto-generated on Order creation
- **ProductCode:** auto-generated with `HS-` prefix on Product pre-save
- **XP formula:** `Level = Floor(√(XP / 100))`

---

## هيكل Frontend (client/src/)

```
client/src/
├── App.jsx               — React Router مع AuthProvider + Route Guards
├── index.css             — Tailwind v4 + @theme + animations + utility classes
├── main.jsx
├── context/
│   └── AuthContext.jsx   — global auth state + mock users + login/register/logout
├── components/
│   ├── layout/
│   │   ├── Layout.jsx    — root layout wrapper
│   │   ├── Header.jsx    — sticky header + account-aware nav + user menu dropdown
│   │   └── Footer.jsx    — 4-column footer + system status dot
│   ├── guards/
│   │   ├── StudentRoute.jsx
│   │   ├── BusinessRoute.jsx
│   │   └── AdminRoute.jsx
│   └── shared/
│       └── StatusPill.jsx
└── pages/
    ├── home/             — HomePage, SearchResults, ExamHub, ContactUs, About
    ├── academy/          — Academy, CourseDisplay
    ├── library/          — Library, DocumentReader
    ├── freelance/        — FreelanceHome, ServiceCatalog, FreelanceProfile, Leaderboard, FreelanceOnboarding
    ├── store/            — Store, ProductDetail
    ├── dashboard/        — DashboardLayout, AcademicProfile, EnrolledCourses, WalletOverview, OrderHistory, SystemInbox
    ├── admin/            — AdminDashboard
    ├── auth/             — Login, Register
    └── business/         — BusinessDashboard
```

## UI/UX Design Patterns
- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Page wrap:** `pt-16 min-h-screen`
- **Section header:** `<span className="section-label">` + `<h1 className="text-2xl sm:text-3xl font-black">`
- **Sidebar layout:** `flex gap-6` → `hidden md:block w-52 shrink-0` + `flex-1 min-w-0`
- **Responsive grids:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

## الألوان (الثيم الفعلي في index.css)
- `bg`: `#070C18` — الخلفية الرئيسية
- `surface`: `#0F1828` — سطح البطاقات
- `surface2`: `#162032` — سطح ثانوي
- `accent`: `#6366F1` — Indigo أساسي
- `accent2`: `#8B5CF6` — Violet ثانوي
- `amber`: `#F59E0B` | `teal`: `#14B8A6` | `rose`: `#F43F5E` | `emerald`: `#10B981`
- `text`: `#F1F5F9` | `muted`: `#94A3B8` | `border`: `#1E2D45`

## المسارات
| المسار | الصفحة |
|--------|---------|
| `/` | الرئيسية |
| `/academy` | الأكاديمية |
| `/academy/course/:id` | عرض الدورة |
| `/library` | المكتبة |
| `/library/viewer/:id` | قارئ المستندات |
| `/freelance` | سوق المستقلين |
| `/freelance/catalog/:category` | كتالوج الخدمات |
| `/freelance/profile/:id` | ملف المستقل |
| `/freelance/leaderboard` | لوحة المتميزين |
| `/freelance/onboarding` | تسجيل مستقل |
| `/store` | المتجر |
| `/store/product/:id` | تفاصيل المنتج |
| `/dashboard` + sub-routes | لوحة الطالب |
| `/admin` | لوحة الإدارة |
| `/auth/login` + `/auth/register` | المصادقة |
| `/business` | لوحة الأعمال |

## Docker للنشر على VPS

هيكل الـ Docker يعمل من **جذر المشروع** — خدمتان:
- `frontend`: يبني React (Vite) → ينسخ الـ dist إلى Nginx → يُوكّل `/api/*` إلى الـ backend
- `backend`: Node.js + Express فقط (لا يحتاج port عام — Nginx هو من يُوجّه إليه)

```
docker-compose.yml          ← جذر المشروع (يُشغّل كل شيء)
client/
  Dockerfile                ← multi-stage: node build → nginx serve
  nginx.conf                ← يخدم static files + يُوكّل /api إلى backend:8000
server/
  Dockerfile                ← Node.js backend فقط
  docker-compose.yml        ← للاختبار المنفرد للـ API (اختياري)
.env.example                ← قالب متغيرات البيئة
```

```bash
# من جذر المشروع
cp .env.example .env
# عدّل MONGODB_URI و JWT_SECRET في .env
docker compose up -d --build
```

- الموقع يعمل على port 80 (و 443 مع SSL)
- الـ Nginx يُوجّه `/api/*` داخلياً إلى `backend:8000` — لا يحتاج الـ backend أي port عام
- لاختبار الـ API بمفرده: `cd server && docker compose up -d --build`
