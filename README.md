# Mosque Management System — Backend

[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)](https://nestjs.com/) [![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql)](https://www.postgresql.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

The NestJS API for Mosque Management System. It powers public mosque data and operational administration: users, committee, families and their charges/payments, donors and donations, expenses, projects, galleries, prayer times, uploads, dashboard reporting, receipts, and search.

## Features

- Cookie-based JWT login/logout/current-user flow; password-reset emails through SMTP.
- `SUPER_ADMIN`, `ADMIN`, and `USER` roles, with controller-level JWT and role guards on designated operations.
- CRUD/read workflows for users, committee members, families, family fees, monthly charges, payments, donors, donations, expenses, projects, galleries, and prayer times.
- Family fee history, current fee, unique monthly charge generation, payments, summaries, and family ledger.
- Donation summary, donor donation history, and PDF receipts for payments and donations.
- Cloudinary direct-upload signatures, server-side image upload/replace/delete, and persisted file metadata.
- Dashboard aggregates/charts/recent records and JWT-protected global search.
- Prisma PostgreSQL persistence, migration and seed files, Swagger (configurable), structured DTO validation, CORS, and normalized errors.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | NestJS 11 / Express |
| Language | TypeScript |
| Database | PostgreSQL, Prisma 7, `@prisma/adapter-pg` |
| Auth/security | Passport JWT, `@nestjs/jwt`, HTTP-only cookies, bcrypt |
| Validation/config | class-validator, class-transformer, Joi, `@nestjs/config` |
| Media | Cloudinary, Multer |
| Mail/documents | `@nestjs-modules/mailer`, Handlebars, PDFKit |
| Documentation/testing | Swagger, Jest, Supertest |

## Installation

```bash
git clone <repository-url>
cd mosque-management/Backend
npm install
npx prisma migrate deploy
npx prisma db seed
npm run start:dev
```

With the example configuration, the API is at `http://localhost:3000/api/v1`; if Swagger is enabled, its UI is at `http://localhost:3000/api/docs`.

## Environment variables

```env
# Application
NODE_ENV=development
APP_NAME=Mosque Management API
APP_LOGO_URL=https://example.com/logo.png
APP_VERSION=1.0.0
PORT=3000
API_PREFIX=api
API_VERSION=1

# PostgreSQL
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public

# Authentication/cookies
JWT_ACCESS_SECRET=replace-with-a-long-random-secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_RESET_PASSWORD_SECRET=replace-with-a-different-long-random-secret
JWT_RESET_PASSWORD_EXPIRES_IN=15m
BCRYPT_SALT_ROUNDS=10
COOKIE_MAX_AGE=1d

# CORS
CORS_ORIGIN=http://localhost:3001
CORS_METHODS=GET,POST,PUT,DELETE,PATCH
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_CREDENTIALS=true

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_ROOT_FOLDER=mosque-management

# Documentation/logging
SWAGGER_ENABLED=true
LOG_LEVEL=info

# SMTP
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM=no-reply@example.com
```

Joi requires the core application, database, JWT, cookie, CORS origin, Cloudinary, and SMTP values. Defaults exist for `NODE_ENV`, `PORT`, bcrypt rounds, CORS methods/headers, Swagger, log level, and SMTP secure mode. `APP_LOGO_URL` and `CORS_CREDENTIALS` are read by configuration but not required by the validation schema. Never commit real credentials.

## Scripts

| Command | Description |
| --- | --- |
| `npm run start` / `start:dev` / `start:debug` | Start normally, in watch mode, or with the Node debugger. |
| `npm run build` | Compile to `dist/`. |
| `npm run start:prod` | Run `dist/src/main`. |
| `npm run lint` / `format` | Lint with auto-fix / format source and tests. |
| `npm run test`, `test:watch`, `test:cov`, `test:debug` | Unit test modes. |
| `npm run test:e2e` | Run the E2E Jest configuration. |

## Folder structure

```text
src/
├── common/
│   ├── cloudinary/ file/ uploads/ # Media storage, metadata, upload endpoints
│   ├── decorators/ guards/        # Current-user, public/role metadata, JWT/RBAC
│   ├── filters/ pipes/            # HTTP/Prisma errors and global validation
│   ├── mail/                      # SMTP service and Handlebars templates
│   ├── prisma/ strategies/ utils/ # Prisma service, JWT strategy, shared helpers
│   └── dto/ enums/ interfaces/ types/
├── config/                        # Config factories and Joi environment schema
├── modules/
│   ├── auth/ dashboard/ search/
│   ├── user/ committee/ families/ monthly-fees/ monthly-charges/
│   └── donors/ donations/ expense/ payments/ project/ gallery/ prayer-times/
├── lib/prisma/                    # Generated Prisma client
├── app.module.ts                  # Application composition
└── main.ts                        # Bootstrap, CORS, filters, pipes, Swagger
prisma/
├── schema.prisma                  # Models and enums
├── migrations/                    # Committed migrations
├── seed.ts                        # Seed entry point
└── seeds/                         # Domain seed files
test/                              # E2E setup
```

## Database

Prisma is configured for PostgreSQL and generates its client at `src/lib/prisma`.

| Models | Relationships / role |
| --- | --- |
| `Role`, `User` | A user belongs to a role, can own an avatar, and audits created/updated records. |
| `CommitteeMember`, `Donor`, `Family` | Core people/family records; each can reference an avatar `File`. Donors have donations; families have fees, charges, and payments. |
| `FamilyFee` → `MonthlyCharge` → `Payment` | An effective fee produces charges; charges are unique per family/year/month; a payment belongs to a family and charge. |
| `Donation`, `Expense` | Financial records; donations link to a donor and have a unique receipt number. |
| `Project`, `Gallery`, `File` | Projects/galleries relate to many uploaded files; files preserve Cloudinary and audit metadata. |
| `PrayerTime` | Daily prayer fields and optional sunrise/Jummah times. |

The schema defines `UserRole`, `UserStatus`, `CommitteeRole`, `PaymentMethod`, `ExpenseCategory`, `ProjectStatus`, and `Month` enums. Monetary fields use `Decimal(10,2)`. Most key records use UUIDs; fees, charges, and payments use CUIDs.

## Architecture

Controllers accept DTOs and delegate to focused services; mappers produce response DTOs. `PrismaService` provides persistence, while shared utilities cover pagination, dates, slugs, password hashing, cookies, payment status, receipts, and growth calculations. Query DTOs define pagination plus module-specific searching/filtering/sorting. Prisma seed files cover roles, users, committee, families/fees/charges/payments, donors/donations, expenses, projects, galleries, and prayer times.

`GlobalValidationPipe` transforms input, whitelists DTO fields, forbids undeclared fields, stops at the first error, and returns field-level validation errors. Global HTTP and Prisma exception filters return a consistent `{ success, statusCode, message, errors, timestamp, path }` shape, including unique-conflict and missing-record handling. Swagger metadata is compiled when `SWAGGER_ENABLED=true`.

### Authentication and authorization

1. Login validates an active user's bcrypt password, updates `lastLoginAt`, signs a JWT with user ID/email/role, and sets the `access_token` cookie.
2. Passport extracts the cookie; `JwtAuthGuard` verifies it, and `@CurrentUser()` provides its payload to handlers.
3. `@Roles()` with `RolesGuard` enforces `SUPER_ADMIN`/`ADMIN` restrictions where applied. User mutations require `SUPER_ADMIN`; selected destructive operations do too.
4. Forgot-password signs a separate reset JWT and sends the reset email through the configured SMTP service; reset consumes that token and new password.

Cookies are `httpOnly`, `sameSite: 'lax'`, path `/`, use configured max age, and become `secure` in production. CORS uses configured origin/method/header/credential options.

### File uploads

`/uploads/signature` supplies a signed Cloudinary payload for direct browser upload. `/uploads/file` persists metadata once upload completes. Multer-backed endpoints also upload or replace images through the API, and a delete endpoint removes a Cloudinary public ID. Upload routes require JWT authentication and `SUPER_ADMIN` or `ADMIN`.

## Endpoint reference

Base path: `/api/v1`. **Protected** reflects an explicit JWT guard in the current controller; **role** means a role guard/decorator is also present.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/login`, `/auth/logout` | Set / clear the access-token cookie. |
| GET | `/auth/me` | **Protected** current user. |
| POST | `/auth/forgot-password`, `/auth/reset-password` | Password recovery operations. |
| GET | `/dashboard/{overview,summary,financial-summary,monthly-chart,expense-chart,recent-donations,recent-expenses}` | Dashboard aggregates; chart/recent endpoints are protected admin-role; overview/summary guard lines are currently commented out. |
| GET/POST/PATCH/DELETE | `/users`, `/users/:id` | User management; controller is protected, create/update/delete are super-admin. |
| GET | `/users/summary` | Protected user summary. |
| GET | `/committee`, `/committee/:id` | Committee listing/detail. |
| POST/PATCH/DELETE | `/committee`, `/committee/:id` | Protected role mutations; delete is super-admin. |
| PATCH | `/committee/:id/{activate,deactivate}` | Protected admin/super-admin role state change. |
| GET/POST/PATCH/DELETE | `/families`, `/families/:id` | Family read/mutations; writes protected admin/super-admin. |
| GET | `/families/stats`, `/families/:familyId/{current-fee,fee-history}` | Family statistics and fees. |
| POST | `/families/:id/activate`, `/families/:familyId/fees` | Protected admin/super-admin activate/create fee. |
| PATCH | `/family-fees/:feeId` | Protected admin/super-admin update fee. |
| GET/POST/PATCH/DELETE | `/monthly-charges`, `/monthly-charges/:id` | Protected charge management; delete is super-admin. |
| POST | `/monthly-charges/generate` | Protected admin/super-admin charge generation. |
| POST | `/payments` | Protected create payment. |
| GET/PATCH/DELETE | `/payments`, `/payments/:id` | Payment listing/detail/update/delete. |
| GET | `/payments/summary`, `/payments/:id/receipt`, `/payments/family/:familyId/ledger` | Summary, PDF receipt, and ledger. |
| GET/POST/PATCH/DELETE | `/donors`, `/donors/:id` | Donor listing/detail and protected role mutations; delete is super-admin. |
| GET | `/donations`, `/donations/:id`, `/donations/summary`, `/donations/donor/history`, `/donations/:id/receipt` | Donations, summary/history, PDF receipt. |
| POST/PATCH/DELETE | `/donations`, `/donations/:id` | Protected role mutations; delete is super-admin. |
| GET/POST/PATCH/DELETE | `/expenses`, `/expenses/:id` | Expense read/mutations; writes protected admin/super-admin. |
| GET | `/expenses/summary` | Expense summary. |
| GET/POST/PATCH/DELETE | `/projects`, `/projects/:id` | Project read/mutations; writes protected admin/super-admin. |
| GET | `/projects/summary` | Project summary. |
| GET/POST/PATCH/DELETE | `/galleries`, `/galleries/:id` | Gallery read/mutations; writes protected admin/super-admin. |
| GET | `/galleries/summary` | Gallery summary. |
| GET/PUT | `/prayer-times` | Read prayer times; update protected admin/super-admin. |
| GET | `/search` | Protected global search. |
| GET | `/uploads/signature` | Protected admin/super-admin Cloudinary signature. |
| POST | `/uploads/file`, `/uploads/image` | Protected admin/super-admin create file/server image upload. |
| PUT/DELETE | `/uploads/:publicId` | Protected admin/super-admin replace/delete image. |

> **Important:** The protection notes match the code today. Several read APIs are unguarded by design; `PATCH` and `DELETE /payments/:id` currently have no guard decorators. Protect them before publicly deploying an administrative API.

## Deployment

Run `npm run build` then `npm run start:prod`. Provide all environment variables, provision PostgreSQL, run `npx prisma migrate deploy`, configure Cloudinary and SMTP, and set `CORS_ORIGIN` to the frontend origin. Use long unique JWT secrets and HTTPS: `NODE_ENV=production` makes the access cookie secure. Enable Swagger only in an appropriate environment.

## API Screenshots

### Swagger

![Swagger](./screenshots/swagger.png)

---

### Database Diagram

![Database](./screenshots/database.png)

---

### API Testing

![API](./screenshots/api.png)

## Future improvements

- Add comprehensive unit and E2E coverage.
- Remove reset-token console output and add audit logging for sensitive operations.
- Add health/readiness endpoints, backups, and structured production logging.
- Add refresh-token/session rotation if longer-lived administrative sessions are needed.
