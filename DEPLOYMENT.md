# 部署配置 - 马匹信息分享APP

## 确认日期
2026年7月22日

## 部署方案

### 前端部署
- **平台**: Vercel
- **特点**:
  - 免费额度足够初期使用
  - 自动部署，与 GitHub 集成
  - 内置 CDN 和边缘网络
  - 支持 Next.js 优化

### 后端部署
- **平台**: Railway
- **特点**:
  - 第一个项目免费
  - 支持 Node.js / Strapi
  - 内置 PostgreSQL 数据库（付费）
  - 简单的环境变量管理
  - 美国/欧洲多区域部署

### 存储
- **云存储**: AWS S3 或 Cloudflare R2
- **考虑**: Railway 有持久化存储限制，建议媒体文件使用独立 S3/R2

## 域名配置
- 当前状态: 无域名
- 临时方案: 使用 Vercel 和 Railway 提供的免费子域名
  - 前端: `your-app.vercel.app`
  - 后端: `your-app.railway.app`

## 预算估算（月度）

| 服务 | 方案 | 预估费用 |
|------|------|----------|
| Vercel | Hobby (免费) | $0 |
| Railway | Starter (免费额度) | $0-5 |
| PostgreSQL | Railway 或 Neon (免费) | $0-5 |
| S3/R2 存储 | 按使用量 | $0-5 |
| **总计** | | **$0-15/月** |

## 部署流程

### Phase 1: 开发完成后
1. 创建 GitHub 仓库
2. 连接 Vercel → 部署前端
3. 连接 Railway → 部署后端 Strapi
4. 配置环境变量

### Phase 2: 生产环境准备
1. 购买域名
2. 配置 DNS
3. 设置 SSL 证书（Vercel/Railway 自动提供）
4. 配置 CI/CD 流程

## 环境变量清单

### Vercel (前端)
```
NEXT_PUBLIC_API_URL=https://api.horses.railway.app
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxx
```

### Railway (后端)
```
DATABASE_URL=postgres://...
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_BUCKET_NAME=horses-media
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
JWT_SECRET=xxx
APP_KEYS=xxx
API_TOKEN_SALT=xxx
ADMIN_RESET_TOKEN=xxx
TRANSFER_TOKEN_SALT=xxx
```

## 下一步行动

- [ ] 开发完成后，创建 GitHub 仓库
- [ ] 在 Vercel 导入前端项目
- [ ] 在 Railway 导入后端项目
- [ ] 配置环境变量
- [ ] 测试部署流程
