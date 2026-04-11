# HalabUnver — منصة طلاب جامعة حلب

## نظرة عامة
منصة MERN Stack أكاديمية وتجارية متكاملة لطلاب جامعة حلب. ثلاثة أنواع حسابات: Admin (تحكم كامل), Business (بائع/معلن/مستقل خارجي), Student (طالب).

## التحديثات الأخيرة
- **بيانات التواصل الديناميكية:** SystemConfig يحتوي على `contactEmail`, `contactPhone`, `contactLocation`, `socialLinks` (whatsapp/telegram/facebook مع روابط وأسماء عرض). Footer وصفحة التواصل يقرآن البيانات من API تلقائياً.
- **إعدادات التواصل في لوحة الإدارة:** قسم جديد "بيانات التواصل" في صفحة الإعدادات يتيح تعديل كل بيانات التواصل.
- **تغيير كلمة مرور المدير:** قسم جديد في الإعدادات مع إظهار/إخفاء لكل حقل. endpoint: `PATCH /api/users/me/password`.
- **إحصائيات حقيقية في الصفحة الرئيسية:** قسم "بالأرقام" يجلب الأرقام من `GET /api/stats` (public) بدلاً من القيم الثابتة.

## التقنيات المستخدمة
- **Frontend:** React 19 + Vite 8 + React Router DOM — يعمل على port 5000
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) — استخدم `@import "tailwindcss"` + `@theme {}` (ليس v3 directives)
- **Backend:** Node.js 20 + Express 5 + Mongoose 8 — يعمل على port 8000
- **Database:** MongoDB Atlas (URI في server/.env)
- **Auth:** JWT stored in localStorage key `hu_token`, verified via /api/auth/me

## بنية المشروع

### Frontend (client/src)
```
pages/
  auth/        Login.jsx, Register.jsx (real JWT API)
  admin/       AdminDashboard.jsx (real API, sub-panels: overview, users, businesses, orders, revenue, config)
  business/    BusinessDashboard.jsx (real API, permission-gated tabs per businessType)
  dashboard/   Student dashboard sub-pages (real API)
    DashboardLayout.jsx, AcademicProfile.jsx, EnrolledCourses.jsx
    WalletOverview.jsx, OrderHistory.jsx, SystemInbox.jsx
  academy/     Academy.jsx (real API /courses)
  library/     Library.jsx (real API /library)
  store/       Store.jsx (real API /store/products)
  freelance/   FreelanceHome.jsx (real API /freelance/services + /freelance/profiles)
context/
  AuthContext.jsx (real JWT, login/register/logout/refreshUser, isStudent/isBusiness/isAdmin)
lib/
  api.js (fetch wrapper auto-attaches Bearer token)
components/
  guards/      StudentRoute, AdminRoute, BusinessRoute (loading-safe)
  layout/      Header.jsx
  shared/      StatusPill.jsx
```

### Backend (server/src)
```
models/
  User.js (accountType, businessType, businessPermissions, verificationStatus, xp, isFreelancer)
  Transaction.js (type: store_order|freelance_subscription|freelance_escrow|academy_enrollment|refund|topup)
  Order.js (customerId not studentId, amount not totalPrice, orderId auto-generated)
  Course.js, LibraryDocument.js, FreelancerService.js, FreelancerProfile.js
  Product.js, AdCampaign.js, ServiceContract.js, Notification.js, ActivityLog.js, SystemConfig.js
controllers/
  auth.controller.js (login, register, me)
  user.controller.js (getAllUsers, verifyStudent, updateUserStatus, updateProfile, uploadUniversityId)
  admin.controller.js (getStats, getActivityLog, getRevenueStats, updateBusinessPermissions, approveBusiness, getPendingBusinesses, getPendingProducts, getAllOrders)
  course.controller.js, library.controller.js, store.controller.js, freelance.controller.js
  transaction.controller.js, notification.controller.js, config.controller.js, ad.controller.js
routes/
  /api/auth, /api/users, /api/admin, /api/courses, /api/library, /api/store
  /api/freelance, /api/transactions, /api/notifications, /api/config, /api/ads
```

## قواعد التصميم
- **ألوان:** bg-[#070C18] (body), bg-[#0F1828] (cards), border-[#1E2D45], text-[#F1F5F9] (primary), text-[#94A3B8] (secondary), text-[#4A5D78] (muted)
- **الأكسنت:** gradient-bg = linear-gradient(#6366F1 → #8B5CF6), class `gradient-text` for text
- **اللغة:** RTL، العربية دائماً في الواجهة
- **لا رفع ملفات:** جميع الصور/PDFs كروابط URL فقط

## Account Types & Flow
1. **Student** → registers → status=active immediately → dashboard at /dashboard
2. **Business** → registers with businessType (vendor/advertiser/freelancer) → status=pending → needs admin approval → then admin enables businessPermissions one by one
3. **Admin** → manually seeded in DB

## Business Permissions
```js
businessPermissions: {
  canSellProducts: Boolean,    // vendor tab unlocked
  canRunAds: Boolean,          // advertiser tab unlocked
  canOfferFreelance: Boolean,  // freelancer services tab unlocked
  canUploadCourses: Boolean,   // course upload button visible in Academy
  canUploadLibraryDocs: Boolean // library upload button visible
}
```

## API Utility (client/src/lib/api.js)
```js
api.get('/courses')   // GET /api/courses
api.post('/auth/login', {email, password})
api.patch('/users/me/profile', {name, bio})
```
Auto-attaches Bearer token from `localStorage.getItem('hu_token')`.

## Vite Proxy
All `/api` calls from frontend proxy to `localhost:8000`.

## Important Field Names (avoid common mistakes)
- Order: `customerId` (not studentId), `amount` (not totalPrice), `orderId` (auto-generated string like HS-xxx)
- Transaction: `txId` (ShamCash ref), `type` must be one of the enum values including 'topup'
- Course enrollment: GET /api/courses/my-enrollments → returns array with `.courseId`, `.progress`

## Workflows
- "Start application": `cd client && npm run dev` (port 5000)
- "Start backend": `cd server && node server.js` (port 8000)
