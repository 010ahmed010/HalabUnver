# HalabUnver — منصة طلاب جامعة حلب

## نظرة عامة
منصة MERN Stack أكاديمية وتجارية متكاملة لطلاب جامعة حلب. تعتمد على **Description Mirror Method (DMM)** — كل ملف `.desc` في مجلد `HalabUnver_DescriptionMirrorMethod/` هو المخطط الدقيق للصفحة المقابلة.

## التقنيات المستخدمة
- **Frontend:** React 19 + Vite 8 + React Router DOM
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) — استخدم `@import "tailwindcss"` + `@theme {}` (ليس v3 directives)
- **Backend:** Node.js + Express + MongoDB (لم يُبنَ بعد)
- **الخط:** IBM Plex Sans Arabic + Cairo (Google Fonts)
- **Port:** 5000 (Vite) mapped to external port 80

## هيكل المشروع

```
client/src/
├── App.jsx               — React Router مع 20+ مسار lazy-loaded
├── index.css             — Tailwind v4 + @theme + animations + utility classes
├── main.jsx
├── components/
│   ├── layout/
│   │   ├── Layout.jsx    — root layout wrapper
│   │   ├── Navbar.jsx    — sticky navbar + search modal + mobile menu (backdrop+ESC)
│   │   └── Footer.jsx    — 4-column footer + system status dot
│   └── shared/
│       └── StatusPill.jsx — shared status badge (6 states)
└── pages/
    ├── home/
    │   ├── HomePage.jsx      — hero + animated counters + pillars + XP gamification + news
    │   ├── SearchResults.jsx — IDE terminal search
    │   ├── ExamHub.jsx       — exam season hub with live sessions + announcements
    │   ├── ContactUs.jsx     — contact form + capabilities grid
    │   └── About.jsx         — ecosystem map + philosophy section
    ├── academy/
    │   ├── Academy.jsx       — course catalog with branch filter + sidebar filters
    │   └── CourseDisplay.jsx — video player + curriculum sidebar
    ├── library/
    │   ├── Library.jsx       — document browser (books/shorts/exams) + sidebar + search
    │   └── DocumentReader.jsx— PDF viewer + context hub
    ├── freelance/
    │   ├── FreelanceHome.jsx     — hero + search + disciplines grid + trust pillars + top talent
    │   ├── ServiceCatalog.jsx    — service grid + lightbox
    │   ├── FreelanceProfile.jsx  — freelancer profile + hire me
    │   ├── Leaderboard.jsx       — top talent ranking
    │   └── FreelanceOnboarding.jsx — 3-step subscription wizard
    ├── store/
    │   ├── Store.jsx         — product catalog + sidebar + reservation
    │   └── ProductDetail.jsx — product detail + buy box
    ├── dashboard/            — nested under DashboardLayout
    │   ├── DashboardLayout.jsx   — sidebar nav + XP bar + profile header
    │   ├── AcademicProfile.jsx   — student identity + XP engine + achievements
    │   ├── EnrolledCourses.jsx   — learning progress tracker
    │   ├── WalletOverview.jsx    — ShamCash transaction log + virtual wallet
    │   ├── OrderHistory.jsx      — orders + 4-digit pickup code
    │   └── SystemInbox.jsx       — notifications + escrow alerts
    └── admin/
        └── AdminDashboard.jsx    — admin control center (7 modules + exam toggle)
```

## UI/UX Design Patterns
- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Page wrap:** `pt-16 min-h-screen` (accounts for fixed navbar height)
- **Section header:** `<span className="section-label">` + `<h1 className="text-2xl sm:text-3xl font-black">`
- **Sidebar layout:** `flex gap-6` → `hidden md:block w-52 shrink-0` + `flex-1 min-w-0`
- **Responsive grids:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Active nav indicator:** `w-4 h-0.5 gradient-bg` underline dot on desktop; `border-r-2 border-[#6366F1]` highlight on mobile
- **Sticky filter bars:** `sticky top-16 z-30` with `border-b border-[#1E2D45]`
- **Hero text:** `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` (was causing overflow at `text-7xl`)

## الألوان (الثيم الفعلي في index.css)
- `bg`: `#070C18` — الخلفية الرئيسية
- `surface`: `#0F1828` — سطح البطاقات
- `surface2`: `#162032` — سطح ثانوي
- `accent`: `#6366F1` — Indigo أساسي
- `accent2`: `#8B5CF6` — Violet ثانوي
- `amber`: `#F59E0B`
- `teal`: `#14B8A6`
- `rose`: `#F43F5E`
- `emerald`: `#10B981`
- `text`: `#F1F5F9`
- `muted`: `#94A3B8`
- `border`: `#1E2D45`

## CSS Utility Classes (index.css)
- `.gradient-text` — indigo→violet gradient text
- `.gradient-text-amber` — amber gradient (freelance page)
- `.gradient-bg` — indigo→violet background gradient
- `.glass` — frosted glass `bg: rgba(7,12,24,0.85)` with `backdrop-filter: blur(20px)`
- `.card` — standard card with hover border/shadow
- `.section-label` — small uppercase label above headings
- `.dot-bg` — radial dot pattern background
- `.no-scrollbar` — hide scrollbar utility
- `.animate-fade-up`, `.animate-blink-soft`, `.animate-float`, `.animate-spin-slow`, `.animate-marquee`
- `.page-wrap` — `pt-4rem min-h-screen`
- `.section-container` — responsive container shorthand

## StatusPill الحالات
- `pending` → أصفر / `#FFD700`
- `active` → أخضر / `#4CAF50`
- `processing` → سماوي / `#03DAC6`
- `success` → أزرق / `#1E90FF`
- `ready` → بنفسجي / `#BB86FC`
- `failed` → أحمر / `#EF4444`
- `verified` → أخضر مع ✅

## XP Formula
`Level = Floor(√(XP/100))`
- التسجيل: +100 XP
- التحقق من الهوية: +500 XP
- تحميل من المكتبة: +25 XP
- إتمام دورة: +250 XP
- أول طلب: +100 XP

## الميزات التقنية المنفّذة
- Arabic RTL بالكامل (`direction: rtl` في HTML)
- Lazy loading لجميع الصفحات (Suspense + PageLoader)
- نظام XP والمستويات في لوحة الطالب
- بروتوكول الاستلام: رمز 4 أرقام في صفحة الطلبات
- بروتوكول الوساطة (Escrow) في صفحات الفريلانس
- بروتوكول الاشتراك ($5/month) في FreelanceOnboarding
- ShamCash كمزود دفع موثق في جميع صفحات الدفع
- موسم الامتحانات toggle في AdminDashboard
- AnimatedCounter component (IntersectionObserver) في الصفحة الرئيسية
- Mobile menu with body overflow lock + backdrop click dismiss

## المسارات
| المسار | الصفحة |
|--------|---------|
| `/` | الرئيسية |
| `/search` | نتائج البحث |
| `/exam-hub` | مركز الامتحانات |
| `/contact` | اتصل بنا |
| `/about` | عن المنصة |
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
| `/dashboard` | لوحة الطالب — الملف |
| `/dashboard/learning` | الدورات المسجّلة |
| `/dashboard/wallet` | المحفظة |
| `/dashboard/orders` | الطلبات |
| `/dashboard/inbox` | الرسائل |
| `/admin` | لوحة الإدارة |

## للتطوير لاحقاً
- Backend: Node.js + Express + MongoDB (لم يُبنَ بعد)
- Authentication: JWT-based
- File uploads: للمكتبة ولوحة الإدارة
- Real payment integration: ShamCash API
