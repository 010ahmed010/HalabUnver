# HalabUnver — منصة طلاب جامعة حلب

## نظرة عامة
منصة MERN Stack أكاديمية وتجارية متكاملة لطلاب جامعة حلب. تعتمد على **Description Mirror Method (DMM)** — كل ملف `.desc` في مجلد `HalabUnver_DescriptionMirrorMethod/` هو المخطط الدقيق للصفحة المقابلة.

## التقنيات المستخدمة
- **Frontend:** React 19 + Vite 8 + React Router DOM
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) — استخدم `@import "tailwindcss"` + `@theme {}` (ليس v3 directives)
- **Backend:** Node.js + Express + MongoDB (لم يُبنَ بعد)
- **الخط:** IBM Plex Sans Arabic + Cairo (Google Fonts)

## هيكل المشروع

```
client/src/
├── App.jsx               — React Router مع 20+ مسار lazy-loaded
├── index.css             — Tailwind v4 + @theme + animations
├── main.jsx
├── components/
│   ├── layout/
│   │   ├── Layout.jsx    — root layout wrapper
│   │   ├── Navbar.jsx    — sticky navbar + search HUD + mobile menu
│   │   └── Footer.jsx
│   └── shared/
│       └── StatusPill.jsx — shared status badge (4 states)
└── pages/
    ├── home/
    │   ├── HomePage.jsx      — hero + stats + pillars + news + XP + CTA
    │   ├── SearchResults.jsx — IDE terminal search
    │   ├── ExamHub.jsx       — exam season hub
    │   ├── ContactUs.jsx
    │   └── About.jsx         — ecosystem SVG map
    ├── academy/
    │   ├── Academy.jsx       — course catalog + branch filter
    │   └── CourseDisplay.jsx — video player + curriculum sidebar
    ├── library/
    │   ├── Library.jsx       — document browser (books/shorts/exams)
    │   └── DocumentReader.jsx— PDF viewer + context hub
    ├── freelance/
    │   ├── FreelanceHome.jsx     — marketplace hero + disciplines
    │   ├── ServiceCatalog.jsx    — service grid + lightbox
    │   ├── FreelanceProfile.jsx  — freelancer profile + hire me
    │   ├── Leaderboard.jsx       — top talent ranking
    │   └── FreelanceOnboarding.jsx — 3-step subscription wizard
    ├── store/
    │   ├── Store.jsx         — product catalog + reservation
    │   └── ProductDetail.jsx — product detail + buy box
    ├── dashboard/            — nested under DashboardLayout
    │   ├── DashboardLayout.jsx   — sidebar nav + XP bar
    │   ├── AcademicProfile.jsx   — student identity + XP engine
    │   ├── EnrolledCourses.jsx   — learning progress tracker
    │   ├── WalletOverview.jsx    — ShamCash transaction log
    │   ├── OrderHistory.jsx      — orders + 4-digit pickup code
    │   └── SystemInbox.jsx       — notifications + escrow alerts
    └── admin/
        └── AdminDashboard.jsx    — admin control center (7 modules)
```

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

## الألوان (الثيم)
- `bg`: `#121212` — الخلفية الرئيسية
- `surface`: `#1E1E1E` — سطح البطاقات
- `accent`: `#BB86FC` — الأكسنت البنفسجي
- `text`: `#E0E0E0` — النص الرئيسي
- `muted`: `#888888` — النص الثانوي
- `border`: `#2A2A2A` — الحدود

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
- Arabic RTL بالكامل
- Lazy loading لجميع الصفحات (Suspense + PageLoader)
- نظام XP والمستويات في لوحة الطالب
- بروتوكول الاستلام: رمز 4 أرقام في صفحة الطلبات
- بروتوكول الوساطة (Escrow) في صفحات الفريلانس
- بروتوكول الاشتراك ($5/month) في FreelanceOnboarding
- ShamCash كمزود دفع موثق في جميع صفحات الدفع
- موسم الامتحانات toggle في AdminDashboard

## للتطوير لاحقاً
- Backend: Node.js + Express + MongoDB (لم يُبنَ بعد)
- Authentication: JWT-based
- File uploads: للمكتبة ولوحة الإدارة
- Real payment integration: ShamCash API
