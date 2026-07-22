# Horse Info Sharing App - Technical Specification

## Overview

A Progressive Web Application for managing and sharing horse information with role-based access control.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + React Query
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **UI Components**: Custom design system
- **PWA**: next-pwa

### Backend
- **CMS**: Strapi 5
- **Language**: Node.js
- **API**: REST / GraphQL
- **Authentication**: @strapi/plugin-users-permissions

### Infrastructure
- **Database**: PostgreSQL 15
- **Storage**: AWS S3 / Cloudflare R2
- **Auth**: Google OAuth 2.0
- **Email**: SendGrid API

## Notifications

The system includes a basic email notification service using SendGrid for timely reminders.

### Notification Types

| Type | Trigger | Frequency |
|------|---------|-----------|
| Insurance Renewal | Insurance expires in 30/7/1 days | Daily cron check |
| Vaccination Reminder | Medical appointment in 7 days | Daily cron check |
| Horse Status Change | Status updated by user | Immediate |

### Notification Settings (per user)

| Setting | Default | Description |
|---------|---------|-------------|
| emailInsuranceReminder | true | Insurance renewal reminders |
| emailVaccinationReminder | true | Vaccination/deworming reminders |
| emailHorseStatusChange | true | Horse status change notifications |
| emailCommercialActivity | false | Commercial activity updates |
| reminderDaysBefore | [30, 7, 1] | Days before expiry to send reminders |

### Implementation Details

- **Email Service**: `backend/src/services/email/index.ts`
- **Notification Service**: `backend/src/services/notification/index.ts`
- **Notification Setting API**: `/api/notification-settings`
- **Cron Schedule**: Daily at 9:00 AM (Asia/Shanghai timezone)

### Environment Variables

```bash
SENDGRID_API_KEY=your_api_key
EMAIL_FROM=noreply@horseinfo.app
FRONTEND_URL=https://horseinfo.app
```

## User Roles

| Role | Permissions |
|------|-------------|
| Admin | Full access, user management, system settings |
| Staff | Add/edit horses, upload photos, medical records |
| User | View, favorite, comment, share |
| Investor | View investment data, financial reports |

## Data Models

### Horse
- id (UUID)
- name (string, required)
- birthDate (date)
- gender (enum: male, female, gelding)
- breed (string)
- color (string)
- microchip (string)
- registrationNo (string)
- status (enum: active, inactive, sold, deceased)
- owner (relation to User)
- stableLocation (string)
- description (text)
- coverImage (media)
- createdAt, updatedAt

### MedicalRecord
- id (UUID)
- horse (relation)
- recordDate (date, required)
- recordType (enum: vaccination, checkup, illness, deworming, dental, surgery)
- description (text)
- veterinarian (string)
- attachments (media)
- nextAppointment (date)

### HealthData
- id (UUID)
- horse (relation)
- recordDate (date, required)
- weight (decimal)
- heartRate (integer)
- bloodPressure (string)
- temperature (decimal)
- notes (text)

### FeedingRecord
- id (UUID)
- horse (relation)
- feedDate (date, required)
- feedType (string)
- quantity (decimal)
- unit (enum: kg, lb)
- notes (text)

### CommercialActivity
- id (UUID)
- horse (relation)
- activityDate (date, required)
- activityType (enum: race, exhibition, sale, breeding, sponsorship)
- title (string)
- description (text)
- result (string)
- prizeMoney (decimal)
- buyer (string)
- seller (string)
- amount (decimal)

### Insurance
- id (UUID)
- horse (relation)
- provider (string)
- policyNo (string)
- startDate (date)
- endDate (date)
- coverageAmount (decimal)
- premium (decimal)
- coverage (text)
- status (enum: active, expired, cancelled)
- renewalReminder (boolean)

### Photo
- id (UUID)
- horse (relation)
- file (media, required)
- category (enum: full_body, close_up, action, competition)
- caption (string)
- isPrimary (boolean)

### NotificationSetting
- id (UUID)
- user (relation to User)
- emailInsuranceReminder (boolean, default: true)
- emailVaccinationReminder (boolean, default: true)
- emailHorseStatusChange (boolean, default: true)
- emailCommercialActivity (boolean, default: false)
- reminderDaysBefore (json, default: [30, 7, 1])

### User (extended from Strapi)
- googleId (string)
- role (enum: admin, staff, user, investor)
- favoriteHorses (relation to Horse)
- company (string)
- phone (string)
- notificationSetting (relation to NotificationSetting)

## API Endpoints

### Authentication
- POST /api/auth/google - Google OAuth
- POST /api/auth/local/login - Local login
- POST /api/auth/local/register - Local registration
- GET /api/auth/me - Current user

### Horses
- GET /api/horses - List horses (with filters)
- GET /api/horses/:id - Get horse details
- POST /api/horses - Create horse (Staff+)
- PUT /api/horses/:id - Update horse
- DELETE /api/horses/:id - Delete horse (Admin)

### Medical Records
- GET /api/medical-records?horse=:id
- POST /api/medical-records
- PUT /api/medical-records/:id
- DELETE /api/medical-records/:id

### Health Data
- GET /api/health-data?horse=:id
- GET /api/health-data/stats/:id - Get statistics
- POST /api/health-data
- PUT /api/health-data/:id

### (Similar CRUD for other entities)

### Notification Settings
- GET /api/notification-settings - Get user's notification settings
- PUT /api/notification-settings - Update notification settings

## UI/UX Design

### Color Palette
```
Primary Background: #0f0f23 → #1a1a2e (gradient)
Card Background: #16213e
Border: rgba(255,255,255,0.1)
Accent: #FF6B35
Success: #00D9A5
Warning: #FFB800
Error: #FF4757
Text Primary: #FFFFFF
Text Secondary: #8B8B9E
```

### Typography
- Headings: Inter (700)
- Body: Inter (400, 500)
- Monospace: JetBrains Mono (for data)

### Spacing
- Base unit: 4px
- Card padding: 24px
- Section gap: 32px
- Border radius: 16px (cards), 12px (buttons), 8px (inputs)

## Pages

1. `/` - Landing/Login page
2. `/dashboard` - Dashboard with horse overview
3. `/horses` - Horse list with search/filter
4. `/horses/[id]` - Horse detail page
5. `/horses/new` - Add new horse
6. `/horses/[id]/edit` - Edit horse
7. `/horses/[id]/medical` - Medical records
8. `/horses/[id]/health` - Health data charts
9. `/horses/[id]/feeding` - Feeding schedule
10. `/horses/[id]/activities` - Commercial activities
11. `/horses/[id]/insurance` - Insurance info
12. `/profile` - User profile
13. `/admin` - Admin panel (Admin only)

## Security

- JWT authentication
- Role-based permissions
- Input validation (Zod)
- XSS protection
- CSRF protection
- Rate limiting

## Performance

- Server-side rendering (SSR)
- Static generation (SSG) where applicable
- Image optimization
- Lazy loading
- Service worker caching
- CDN for static assets

## Privacy & Data Access Control

See [PRIVACY.md](./PRIVACY.md) for detailed privacy and data visibility strategy.

### Data Privacy Levels
| Level | Description | Access |
|-------|-------------|--------|
| Public | No login required | All users |
| Member | Login required | Registered users |
| Private | Owner only | Owner + authorized staff |
| Restricted | Highly sensitive | Owner + Admin only |

### Field Privacy Configuration
| Field | Default Privacy | Owner Override |
|-------|-----------------|----------------|
| name, breed, color, gender | Public | No |
| photos, description | Member | Yes |
| medicalRecords, healthData | Private | Limited |
| microchip, registrationNo | Restricted | No |

### Privacy Presets
- **Open**: All registered users can view
- **Private**: Only owner access
- **Club**: Specific users only
- **Showcase**: Public photos, private details

## Deployment

- **Frontend**: Vercel (Node.js adapter)
- **Backend**: Railway or Render
- **Database**: Neon PostgreSQL or Railway
- **Storage**: AWS S3 or Cloudflare R2
- **Email**: SendGrid API
