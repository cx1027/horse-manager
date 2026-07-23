# Horse Info Sharing Application

A modern PWA for horse information management and sharing, built with Next.js, Strapi, PostgreSQL, and S3 storage.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, PWA
- **Backend**: Strapi 5 (Node.js)
- **Database**: PostgreSQL 15
- **Storage**: AWS S3 / Cloudflare R2
- **Authentication**: Google OAuth 2.0
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend)

## Features

- Horse profile management (basic info, photos, medical records)
- Health data tracking (weight, vitals, exercise)
- Feeding records management
- Commercial activities and race records
- Insurance information
- Role-based access (Admin, Staff, User, Investor)
- Google Sign-in
- Progressive Web App (PWA)

---

## Role-Based Access Control

### Role Overview

| Role | Test Count | Core Features |
|------|------------|---------------|
| User | 9 | Basic access, personal profile |
| Investor | 9 | Investment perspective, reports, badges |
| Staff | 14 | Full CRUD, all management features |
| Admin | Full | User management, system settings |

---

### User (普通用户)

**测试数量**: 9

#### 页面访问
- [x] 访问仪表盘 (Dashboard)
- [x] 访问马匹列表 (Horses List)
- [x] 访问健康数据页 (Health Data)
- [x] 访问个人资料 (Profile)
- [x] 登出 (Logout)

#### 马匹管理
- [x] 查看马匹列表
- [x] 查看马匹详情
- [x] 查看马匹照片/相册

#### 健康追踪
- [x] 查看健康数据
- [ ] ~~添加健康记录~~ (需升级为Staff)

#### 个人
- [x] 查看个人资料
- [ ] ~~修改个人资料~~ (基础功能)

---

### Investor (投资者)

**测试数量**: 9

#### 页面访问
- [x] 访问仪表盘 (Dashboard)
- [x] 访问报告中心 (Reports)
- [x] 访问马匹列表 (Horses List)
- [x] 访问健康数据 (Health Data)
- [x] 查看投资者徽章 (Investor Badge)
- [x] 登出 (Logout)

#### 投资分析
- [ ] 查看马匹价值评估
- [ ] 查看投资回报率
- [ ] 查看收益报表

#### 禁止功能
- [x] 无马匹创建权限
- [x] 无马匹编辑权限
- [x] 无删除权限
- [x] 无用户管理权限

---

### Staff (员工)

**测试数量**: 14

#### 页面访问
- [x] 访问仪表盘 (Dashboard)
- [x] 访问马匹列表 (Horses List)
- [x] 访问报告中心 (Reports)

#### 马匹管理 (CRUD)
- [x] 查看马匹列表
- [x] 查看马匹详情
- [x] 查看马匹照片
- [x] 创建新马匹
- [x] 编辑马匹信息
- [ ] 删除马匹

#### 医疗记录
- [x] 查看医疗记录
- [x] 添加医疗记录
- [ ] 编辑医疗记录
- [ ] 删除医疗记录

#### 健康数据
- [x] 查看健康数据
- [x] 添加健康数据

#### 喂养记录
- [x] 查看喂养记录
- [x] 添加喂养记录

#### 商业活动
- [x] 查看活动记录
- [x] 添加商业活动

#### 保险管理
- [x] 查看保险信息
- [x] 添加保险记录

#### 照片管理
- [x] 上传马匹照片
- [x] 删除马匹照片
- [x] 分享照片 (生成链接)

#### 用户管理
- [ ] 查看用户列表
- [ ] 编辑用户角色

---

## Test Accounts (测试账号)

### Default Login Credentials

| Role | Email | Password | Username | 测试数 |
|------|-------|----------|----------|--------|
| **User** | `user@test.com` | `Test123456` | testuser | 9 |
| **Investor** | `investor@test.com` | `Test123456` | testinvestor | 9 |
| **Staff** | `staff@test.com` | `Test123456` | teststaff | 14 |

---

### Role Permissions Summary

#### User (普通用户)
- **可访问**: 仪表盘、马匹列表、健康数据、个人资料
- **可查看**: 马匹详情、马匹照片/相册
- **不可**: 添加马匹、添加健康记录、管理功能

#### Investor (投资者)
- **可访问**: 仪表盘、报告中心、马匹列表、健康数据
- **特殊功能**: 投资者徽章、投资视角的财务指标
- **不可**: 创建/编辑/删除马匹、用户管理

#### Staff (员工)
- **可访问**: 所有页面
- **可操作**: 完整 CRUD（创建、读取、更新）
- **特殊功能**: 马匹管理、医疗记录、健康数据、喂养记录、商业活动、保险、照片管理

---

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Local Development

1. Clone the repository
2. Run `docker-compose up -d` to start PostgreSQL
3. Set up environment variables
4. Run `npm install` in both frontend and backend directories
5. Start development servers

See individual READMEs for detailed setup instructions.

## Project Structure

```
├── frontend/          # Next.js PWA application
├── backend/           # Strapi CMS
├── docker-compose.yml # PostgreSQL setup
├── SPEC.md           # Detailed specifications
└── README.md
```

## License

MIT
