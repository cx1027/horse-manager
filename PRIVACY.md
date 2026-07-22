# 马匹信息隐私与公开范围策略

## 概述

本文档定义了马匹信息分享APP的数据隐私策略，包括不同用户角色对各类数据的访问权限、马匹主人的可见性控制选项，以及敏感信息的处理规范。

---

## 一、数据分类与敏感级别

### 1.1 数据敏感级别定义

| 级别 | 标识 | 描述 | 示例数据 |
|------|------|------|----------|
| **公开** | `public` | 无需登录即可查看 | 马匹名称、品种、毛色、基本照片 |
| **会员可见** | `member` | 登录用户可查看 | 详细描述、马厩位置、赛事记录 |
| **私密** | `private` | 仅马主和授权人员可见 | 医疗记录、健康数据、财务信息 |
| **高度敏感** | `restricted` | 仅马主和Admin可见 | 芯片号、血统证书号、完整联系方式 |

### 1.2 字段级别隐私配置

```typescript
// 隐私配置类型
export type PrivacyLevel = 'public' | 'member' | 'private' | 'restricted';

export interface FieldPrivacyConfig {
  fieldName: string;           // 字段名
  privacyLevel: PrivacyLevel;  // 默认隐私级别
  canOwnerOverride: boolean;   // 马主是否可自定义
}

// Horse 实体字段隐私配置
export const horseFieldPrivacy: FieldPrivacyConfig[] = [
  // 公开字段 - 无需登录可见
  { fieldName: 'name', privacyLevel: 'public', canOwnerOverride: false },
  { fieldName: 'breed', privacyLevel: 'public', canOwnerOverride: false },
  { fieldName: 'color', privacyLevel: 'public', canOwnerOverride: false },
  { fieldName: 'gender', privacyLevel: 'public', canOwnerOverride: false },
  { fieldName: 'age', privacyLevel: 'public', canOwnerOverride: false },
  { fieldName: 'coverImage', privacyLevel: 'public', canOwnerOverride: true },
  { fieldName: 'photos', privacyLevel: 'member', canOwnerOverride: true },
  
  // 会员可见字段
  { fieldName: 'description', privacyLevel: 'member', canOwnerOverride: true },
  { fieldName: 'stableLocation', privacyLevel: 'member', canOwnerOverride: true },
  { fieldName: 'status', privacyLevel: 'member', canOwnerOverride: false },
  { fieldName: 'commercialActivities', privacyLevel: 'member', canOwnerOverride: true },
  
  // 私密字段 - 仅马主和授权人员
  { fieldName: 'medicalRecords', privacyLevel: 'private', canOwnerOverride: false },
  { fieldName: 'healthData', privacyLevel: 'private', canOwnerOverride: false },
  { fieldName: 'feedingRecords', privacyLevel: 'private', canOwnerOverride: true },
  
  // 高度敏感字段
  { fieldName: 'microchip', privacyLevel: 'restricted', canOwnerOverride: false },
  { fieldName: 'registrationNo', privacyLevel: 'restricted', canOwnerOverride: false },
  { fieldName: 'owner', privacyLevel: 'restricted', canOwnerOverride: false },
  { fieldName: 'insurance', privacyLevel: 'restricted', canOwnerOverride: false },
];
```

---

## 二、角色权限矩阵

### 2.1 用户角色定义

| 角色 | 描述 | 典型用户 |
|------|------|----------|
| `admin` | 系统管理员 | 平台运营方 |
| `staff` | 员工/马匹管理人员 | 马场工作人员 |
| `user` | 普通注册用户 | 马主、马匹爱好者 |
| `investor` | 投资者 | 投资人、马匹投资人 |

### 2.2 访问权限矩阵

```
权限说明:
✓ = 完全访问
◐ = 部分访问（特定字段）
✗ = 无访问权限
R = 只读
RW = 读写

┌─────────────────────────────┬────────┬────────┬────────┬────────┐
│ 数据类别                     │ Admin  │ Staff  │ User   │Investor│
├─────────────────────────────┼────────┼────────┼────────┼────────┤
│ 公开马屁信息                 │   ✓    │   ✓    │   ✓    │   ✓    │
│ (名称、品种、毛色)           │        │        │        │        │
├─────────────────────────────┼────────┼────────┼────────┼────────┤
│ 会员可见信息                 │   ✓    │   ✓    │   ✓    │   ✓    │
│ (描述、位置、赛事)           │        │        │        │        │
├─────────────────────────────┼────────┼────────┼────────┼────────┤
│ 医疗记录                     │   ✓    │  RW*   │  Own   │   R    │
│                             │        │        │        │   ◐    │
├─────────────────────────────┼────────┼────────┼────────┼────────┤
│ 健康数据                     │   ✓    │  RW*   │  Own   │   R    │
│                             │        │        │        │   ◐    │
├─────────────────────────────┼────────┼────────┼────────┼────────┤
│ 财务信息(保险、交易金额)     │   ✓    │   ✗    │  Own   │   ✓    │
│                             │        │        │        │        │
├─────────────────────────────┼────────┼────────┼────────┼────────┤
│ 敏感信息(芯片号、证件)       │   ✓    │   R    │  Own   │   ✗    │
│                             │        │        │        │        │
├─────────────────────────────┼────────┼────────┼────────┼────────┤
│ 马主联系方式                 │   ✓    │   ✗    │  Own   │ Own/Oth│
│                             │        │        │        │   ◐    │
├─────────────────────────────┼────────┼────────┼────────┼────────┤
│ 用户管理                     │   ✓    │   ✗    │   ✗    │   ✗    │
├─────────────────────────────┼────────┼────────┼────────┼────────┤
│ 系统设置                     │   ✓    │   ✗    │   ✗    │   ✗    │
└─────────────────────────────┴────────┴────────┴────────┴────────┘

图例:
- Own = 仅能访问自己的数据
- * = 仅能访问被授权管理的马匹
- ◐ = 部分访问（由马主设置的可见性决定）
```

---

## 三、马主可见性控制

### 3.1 马主控制面板

每个马主可为自己的马匹设置以下可见性级别：

```typescript
// 马匹可见性设置
export interface HorseVisibilitySettings {
  horseId: string;
  
  // 全局可见性
  globalVisibility: 'public' | 'members_only' | 'private';
  
  // 照片可见性
  photoVisibility: {
    fullBodyPhotos: 'public' | 'members' | 'private';
    closeUpPhotos: 'public' | 'members' | 'private';
    actionPhotos: 'public' | 'members' | 'private';
    competitionPhotos: 'public' | 'members' | 'private';
  };
  
  // 允许访问的用户列表 (whitelist)
  allowedUsers: string[];  // 用户ID列表
  
  // 允许访问的角色列表
  allowedRoles: ('staff' | 'investor')[];
  
  // 禁止访问的用户列表 (blacklist)
  blockedUsers: string[];
  
  // 是否允许其他马主互访
  allowOtherOwnersToView: boolean;
  
  // 是否在公共搜索中显示
  searchableInPublic: boolean;
  
  // 最后更新时间
  updatedAt: string;
}
```

### 3.2 预设可见性模式

```typescript
// 预设可见性配置
export const visibilityPresets = {
  // 完全公开模式 - 所有注册用户可见
  open: {
    globalVisibility: 'members_only',
    photoVisibility: {
      fullBodyPhotos: 'public',
      closeUpPhotos: 'public',
      actionPhotos: 'public',
      competitionPhotos: 'public',
    },
    searchableInPublic: true,
  },
  
  // 私密模式 - 仅自己可见
  private: {
    globalVisibility: 'private',
    photoVisibility: {
      fullBodyPhotos: 'private',
      closeUpPhotos: 'private',
      actionPhotos: 'private',
      competitionPhotos: 'private',
    },
    searchableInPublic: false,
  },
  
  // 俱乐部模式 - 仅特定用户可见
  club: {
    globalVisibility: 'members_only',
    photoVisibility: {
      fullBodyPhotos: 'members',
      closeUpPhotos: 'members',
      actionPhotos: 'members',
      competitionPhotos: 'members',
    },
    searchableInPublic: false,
  },
  
  // 展示模式 - 公开照片用于展示
  showcase: {
    globalVisibility: 'public',
    photoVisibility: {
      fullBodyPhotos: 'public',
      closeUpPhotos: 'public',
      actionPhotos: 'public',
      competitionPhotos: 'members', // 比赛照片仅会员
    },
    searchableInPublic: true,
  },
};
```

---

## 四、具体数据访问规则

### 4.1 Horse (马匹基本信息)

| 字段 | Admin | Staff | Owner | 其他User | Investor |
|------|-------|-------|-------|----------|----------|
| name | ✓ | ✓ | ✓ | ✓ | ✓ |
| gender | ✓ | ✓ | ✓ | ✓ | ✓ |
| breed | ✓ | ✓ | ✓ | ✓ | ✓ |
| color | ✓ | ✓ | ✓ | ✓ | ✓ |
| birthDate | ✓ | ✓ | ✓ | ✓ | ✓ |
| age (计算) | ✓ | ✓ | ✓ | ✓ | ✓ |
| coverImage | ✓ | ✓ | ✓ | ◐ | ◐ |
| photos | ✓ | ✓ | ✓ | ◐ | ◐ |
| description | ✓ | ✓ | ✓ | ◐ | ◐ |
| stableLocation | ✓ | ✓ | ✓ | ◐ | ◐ |
| status | ✓ | ✓ | ✓ | ✓ | ✓ |
| microchip | ✓ | R | ✓ | ✗ | ✗ |
| registrationNo | ✓ | R | ✓ | ✗ | ✗ |

### 4.2 MedicalRecord (医疗记录)

| 字段 | Admin | Staff | Owner | 其他User | Investor |
|------|-------|-------|-------|----------|----------|
| recordDate | ✓ | ✓ | ✓ | ✗ | ◐ |
| recordType | ✓ | ✓ | ✓ | ✗ | ◐ |
| description | ✓ | ✓ | ✓ | ✗ | ◐ |
| veterinarian | ✓ | ✓ | ✓ | ✗ | ✗ |
| attachments | ✓ | ✓ | ✓ | ✗ | ✗ |
| nextAppointment | ✓ | ✓ | ✓ | ✗ | ✗ |

> **医疗记录访问说明**:
> - 所有医疗记录默认完全私密
> - Staff 在马主授权后可读写
> - Investor 可在马主授权后查看摘要（不含敏感医疗详情）

### 4.3 HealthData (健康数据)

| 字段 | Admin | Staff | Owner | 其他User | Investor |
|------|-------|-------|-------|----------|----------|
| recordDate | ✓ | ✓ | ✓ | ✗ | ◐ |
| weight | ✓ | ✓ | ✓ | ✗ | ◐ |
| heartRate | ✓ | ✓ | ✓ | ✗ | ✗ |
| bloodPressure | ✓ | ✓ | ✓ | ✗ | ✗ |
| temperature | ✓ | ✓ | ✓ | ✗ | ✗ |
| notes | ✓ | ✓ | ✓ | ✗ | ✗ |

### 4.4 Insurance (保险信息)

| 字段 | Admin | Staff | Owner | 其他User | Investor |
|------|-------|-------|-------|----------|----------|
| provider | ✓ | ✗ | ✓ | ✗ | ◐ |
| policyNo | ✓ | ✗ | ✓ | ✗ | ✗ |
| startDate | ✓ | ✗ | ✓ | ✗ | ◐ |
| endDate | ✓ | ✗ | ✓ | ✗ | ◐ |
| coverageAmount | ✓ | ✗ | ✓ | ✗ | ✓ |
| premium | ✓ | ✗ | ✓ | ✗ | ✓ |
| coverage | ✓ | ✗ | ✓ | ✗ | ◐ |
| status | ✓ | ✗ | ✓ | ✗ | ✓ |

### 4.5 CommercialActivity (商业活动)

| 字段 | Admin | Staff | Owner | 其他User | Investor |
|------|-------|-------|-------|----------|----------|
| activityDate | ✓ | ✓ | ✓ | ✓ | ✓ |
| activityType | ✓ | ✓ | ✓ | ✓ | ✓ |
| title | ✓ | ✓ | ✓ | ✓ | ✓ |
| description | ✓ | ✓ | ✓ | ◐ | ✓ |
| result | ✓ | ✓ | ✓ | ✓ | ✓ |
| prizeMoney | ✓ | ✓ | ✓ | ✗ | ✓ |
| buyer | ✓ | ✗ | ✓ | ✗ | ◐ |
| seller | ✓ | ✗ | ✓ | ✗ | ◐ |
| amount | ✓ | ✗ | ✓ | ✗ | ✓ |

---

## 五、数据共享与导出

### 5.1 马主数据导出权利

根据数据可携带性原则，马主有权：
- 导出自己马匹的完整数据（JSON/CSV格式）
- 导出医疗记录PDF报告
- 批量导出名下所有马匹数据

### 5.2 数据共享选项

```typescript
// 数据分享配置
export interface DataShareSettings {
  // 是否允许第三方API访问
  allowApiAccess: boolean;
  
  // 分享链接设置
  shareLinks: {
    enabled: boolean;
    expiresAt?: string;
    viewCount?: number;
    requirePassword?: boolean;
    password?: string;
  };
  
  // 分享权限
  sharePermissions: {
    canViewPhotos: boolean;
    canViewMedical: boolean;
    canViewFinancial: boolean;
    canDownloadData: boolean;
  };
  
  // 被分享的用户
  sharedWithUsers: string[];
  
  // 分享记录
  shareHistory: ShareRecord[];
}

export interface ShareRecord {
  sharedAt: string;
  sharedWith: string;  // 用户ID
  permissions: string[];
  revokedAt?: string;
}
```

---

## 六、隐私合规要求

### 6.1 GDPR/CCPA 合规

| 合规要求 | 实现方式 |
|----------|----------|
| 数据访问权 | 用户可查看所有个人数据 |
| 数据删除权 | 支持账户和数据删除请求 |
| 数据可携带权 | 支持数据导出功能 |
| 通知义务 | 隐私政策变更通知用户 |
| 默认隐私 | 新马匹信息默认私密 |

### 6.2 数据保留策略

```typescript
// 数据保留配置
export const dataRetentionPolicy = {
  // 用户账户
  inactiveUserAccount: {
    duration: '2_years',  // 2年后标记为不活跃
    action: 'anonymize_pii',  // 匿名化个人可识别信息
  },
  
  // 医疗记录
  medicalRecords: {
    retention: '7_years',  // 法定保留7年
    afterDeletion: 'secure_archive',  // 安全归档
  },
  
  // 照片
  photos: {
    retention: 'indefinite',  // 永久保留（用户可删除）
    compressionAfterYears: 3,  // 3年后压缩存储
  },
  
  // 审计日志
  auditLogs: {
    retention: '3_years',
  },
  
  // 缓存数据
  cachedData: {
    ttl: '24_hours',  // 24小时后过期
  },
};
```

---

## 七、API 访问控制

### 7.1 隐私感知的API响应

```typescript
// API响应时的隐私过滤
export function filterHorseDataByPrivacy(
  horse: Horse,
  viewer: User,
  visibilitySettings: HorseVisibilitySettings
): Partial<Horse> {
  const result = { ...horse };
  
  // 如果是马主，返回全部数据
  if (viewer.id === horse.ownerId || viewer.role === 'admin') {
    return result;
  }
  
  // 根据可见性设置过滤
  if (visibilitySettings.globalVisibility === 'private') {
    if (!visibilitySettings.allowedUsers.includes(viewer.id)) {
      return filterToPublicOnly(result);
    }
  }
  
  // 过滤敏感字段
  delete result.microchip;
  delete result.registrationNo;
  delete result.owner;
  
  // 根据隐私级别过滤照片
  if (visibilitySettings.photoVisibility.fullBodyPhotos === 'private') {
    result.photos = result.photos?.filter(p => p.category !== 'full_body');
  }
  
  return result;
}
```

### 7.2 端点权限检查

```
GET    /api/horses              → 需要认证 (member+)
GET    /api/horses/public       → 无需认证 (公开数据)
GET    /api/horses/:id          → 需要认证 + 隐私检查
POST   /api/horses              → 需要 staff+ 角色
PUT    /api/horses/:id          → 需要 owner 或 staff
DELETE /api/horses/:id          → 需要 owner 或 admin

GET    /api/horses/:id/medical  → 需要 owner 或 admin
POST   /api/horses/:id/medical  → 需要 owner 或 staff

GET    /api/horses/:id/health   → 需要 owner 或 admin
POST   /api/horses/:id/health   → 需要 owner 或 staff

GET    /api/insurance/:horseId  → 需要 owner, investor(受限) 或 admin
```

---

## 八、实施检查清单

### 马主端
- [ ] 每个马匹有独立的可见性设置界面
- [ ] 提供"快速设置"预设模式
- [ ] 显示每条数据的当前可见性状态
- [ ] 支持单次分享链接生成
- [ ] 支持数据导出功能

### 后端
- [ ] 实现字段级别的权限检查中间件
- [ ] 实现隐私感知的API响应过滤
- [ ] 记录数据访问审计日志
- [ ] 实现数据删除和匿名化功能

### 前端
- [ ] 隐私设置页面
- [ ] 数据导出界面
- [ ] 分享链接生成和撤销功能
- [ ] 敏感信息遮蔽显示（如部分手机号）

---

## 九、变更历史

| 版本 | 日期 | 变更说明 |
|------|------|----------|
| 1.0 | 2026-07-22 | 初始版本 |
