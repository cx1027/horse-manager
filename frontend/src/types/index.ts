// User Types
export type UserRole = 'admin' | 'staff' | 'user' | 'investor';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  googleId?: string;
  company?: string;
  phone?: string;
  avatar?: string;
  favoriteHorses?: Horse[];
  createdAt: string;
  updatedAt: string;
}

// Horse Types
export type HorseGender = 'male' | 'female' | 'gelding';
export type HorseStatus = 'active' | 'inactive' | 'sold' | 'deceased';
export type PhotoCategory = 'full_body' | 'close_up' | 'action' | 'competition';

export interface Horse {
  id: string;
  name: string;
  birthDate?: string;
  gender: HorseGender;
  breed?: string;
  color?: string;
  microchip?: string;
  registrationNo?: string;
  status: HorseStatus;
  owner?: User;
  ownerId?: string;
  stableLocation?: string;
  description?: string;
  coverImage?: MediaFile;
  photos?: Photo[];
  medicalRecords?: MedicalRecord[];
  healthData?: HealthData[];
  feedingRecords?: FeedingRecord[];
  commercialActivities?: CommercialActivity[];
  insurance?: Insurance;
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  id: string;
  horse: string | Horse;
  file: MediaFile;
  category: PhotoCategory;
  caption?: string;
  isPrimary: boolean;
  createdAt: string;
}

// Medical Record Types
export type MedicalRecordType = 
  | 'vaccination' 
  | 'checkup' 
  | 'illness' 
  | 'deworming' 
  | 'dental' 
  | 'surgery';

export interface MedicalRecord {
  id: string;
  horse: string | Horse;
  recordDate: string;
  recordType: MedicalRecordType;
  description?: string;
  veterinarian?: string;
  attachments?: MediaFile[];
  nextAppointment?: string;
  createdAt: string;
  updatedAt: string;
}

// Health Data Types
export interface HealthData {
  id: string;
  horse: string | Horse;
  recordDate: string;
  weight?: number;
  heartRate?: number;
  bloodPressure?: string;
  temperature?: number;
  notes?: string;
  createdAt: string;
}

// Feeding Record Types
export type FeedUnit = 'kg' | 'lb';

export interface FeedingRecord {
  id: string;
  horse: string | Horse;
  feedDate: string;
  feedType: string;
  quantity?: number;
  unit: FeedUnit;
  notes?: string;
  createdAt: string;
}

// Commercial Activity Types
export type ActivityType = 'race' | 'exhibition' | 'sale' | 'breeding' | 'sponsorship';

export interface CommercialActivity {
  id: string;
  horse: string | Horse;
  activityDate: string;
  activityType: ActivityType;
  title?: string;
  description?: string;
  result?: string;
  prizeMoney?: number;
  buyer?: string;
  seller?: string;
  amount?: number;
  createdAt: string;
}

// Insurance Types
export type InsuranceStatus = 'active' | 'expired' | 'cancelled';

export interface Insurance {
  id: string;
  horse: string | Horse;
  provider: string;
  policyNo: string;
  startDate: string;
  endDate: string;
  coverageAmount?: number;
  premium?: number;
  coverage?: string;
  status: InsuranceStatus;
  renewalReminder: boolean;
  createdAt: string;
  updatedAt: string;
}

// Media File
export interface MediaFile {
  id: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  format?: string;
  size?: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  };
}

// Form Types
export interface HorseFormData {
  name: string;
  birthDate?: string;
  gender: HorseGender;
  breed?: string;
  color?: string;
  microchip?: string;
  registrationNo?: string;
  status: HorseStatus;
  stableLocation?: string;
  description?: string;
}

export interface MedicalRecordFormData {
  recordDate: string;
  recordType: MedicalRecordType;
  description?: string;
  veterinarian?: string;
  nextAppointment?: string;
}

export interface HealthDataFormData {
  recordDate: string;
  weight?: number;
  heartRate?: number;
  bloodPressure?: string;
  temperature?: number;
  notes?: string;
}

export interface FeedingRecordFormData {
  feedDate: string;
  feedType: string;
  quantity?: number;
  unit: FeedUnit;
  notes?: string;
}

export interface CommercialActivityFormData {
  activityDate: string;
  activityType: ActivityType;
  title?: string;
  description?: string;
  result?: string;
  prizeMoney?: number;
  buyer?: string;
  seller?: string;
  amount?: number;
}

export interface InsuranceFormData {
  provider: string;
  policyNo: string;
  startDate: string;
  endDate: string;
  coverageAmount?: number;
  premium?: number;
  coverage?: string;
  status: InsuranceStatus;
  renewalReminder: boolean;
}

// Filter Types
export interface HorseFilters {
  search?: string;
  gender?: HorseGender;
  status?: HorseStatus;
  breed?: string;
  ownerId?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalHorses: number;
  activeHorses: number;
  totalMedicalRecords: number;
  upcomingAppointments: number;
  recentActivities: CommercialActivity[];
  healthAlerts: HealthData[];
}

// ============================================
// Privacy & Access Control Types
// ============================================

/** 隐私级别定义 */
export type PrivacyLevel = 'public' | 'member' | 'private' | 'restricted';

/** 字段隐私配置 */
export interface FieldPrivacyConfig {
  fieldName: string;
  privacyLevel: PrivacyLevel;
  canOwnerOverride: boolean;
}

/** 马匹可见性设置 */
export interface HorseVisibilitySettings {
  horseId: string;
  globalVisibility: 'public' | 'members_only' | 'private';
  photoVisibility: {
    fullBodyPhotos: PrivacyLevel;
    closeUpPhotos: PrivacyLevel;
    actionPhotos: PrivacyLevel;
    competitionPhotos: PrivacyLevel;
  };
  allowedUsers: string[];
  allowedRoles: ('staff' | 'investor')[];
  blockedUsers: string[];
  allowOtherOwnersToView: boolean;
  searchableInPublic: boolean;
  updatedAt: string;
}

/** 可见性预设 */
export const visibilityPresets = {
  open: {
    globalVisibility: 'members_only' as const,
    photoVisibility: {
      fullBodyPhotos: 'public' as PrivacyLevel,
      closeUpPhotos: 'public' as PrivacyLevel,
      actionPhotos: 'public' as PrivacyLevel,
      competitionPhotos: 'public' as PrivacyLevel,
    },
    searchableInPublic: true,
  },
  private: {
    globalVisibility: 'private' as const,
    photoVisibility: {
      fullBodyPhotos: 'private' as PrivacyLevel,
      closeUpPhotos: 'private' as PrivacyLevel,
      actionPhotos: 'private' as PrivacyLevel,
      competitionPhotos: 'private' as PrivacyLevel,
    },
    searchableInPublic: false,
  },
  club: {
    globalVisibility: 'members_only' as const,
    photoVisibility: {
      fullBodyPhotos: 'member' as PrivacyLevel,
      closeUpPhotos: 'member' as PrivacyLevel,
      actionPhotos: 'member' as PrivacyLevel,
      competitionPhotos: 'member' as PrivacyLevel,
    },
    searchableInPublic: false,
  },
  showcase: {
    globalVisibility: 'public' as const,
    photoVisibility: {
      fullBodyPhotos: 'public' as PrivacyLevel,
      closeUpPhotos: 'public' as PrivacyLevel,
      actionPhotos: 'public' as PrivacyLevel,
      competitionPhotos: 'member' as PrivacyLevel,
    },
    searchableInPublic: true,
  },
} as const;

/** 数据分享设置 */
export interface DataShareSettings {
  allowApiAccess: boolean;
  shareLinks: {
    enabled: boolean;
    expiresAt?: string;
    viewCount?: number;
    requirePassword?: boolean;
    password?: string;
  };
  sharePermissions: {
    canViewPhotos: boolean;
    canViewMedical: boolean;
    canViewFinancial: boolean;
    canDownloadData: boolean;
  };
  sharedWithUsers: string[];
  shareHistory: ShareRecord[];
}

/** 分享记录 */
export interface ShareRecord {
  sharedAt: string;
  sharedWith: string;
  permissions: string[];
  revokedAt?: string;
}

/** Horse 字段隐私配置 */
export const horseFieldPrivacy: FieldPrivacyConfig[] = [
  { fieldName: 'name', privacyLevel: 'public', canOwnerOverride: false },
  { fieldName: 'breed', privacyLevel: 'public', canOwnerOverride: false },
  { fieldName: 'color', privacyLevel: 'public', canOwnerOverride: false },
  { fieldName: 'gender', privacyLevel: 'public', canOwnerOverride: false },
  { fieldName: 'age', privacyLevel: 'public', canOwnerOverride: false },
  { fieldName: 'coverImage', privacyLevel: 'public', canOwnerOverride: true },
  { fieldName: 'photos', privacyLevel: 'member', canOwnerOverride: true },
  { fieldName: 'description', privacyLevel: 'member', canOwnerOverride: true },
  { fieldName: 'stableLocation', privacyLevel: 'member', canOwnerOverride: true },
  { fieldName: 'status', privacyLevel: 'member', canOwnerOverride: false },
  { fieldName: 'commercialActivities', privacyLevel: 'member', canOwnerOverride: true },
  { fieldName: 'medicalRecords', privacyLevel: 'private', canOwnerOverride: false },
  { fieldName: 'healthData', privacyLevel: 'private', canOwnerOverride: false },
  { fieldName: 'feedingRecords', privacyLevel: 'private', canOwnerOverride: true },
  { fieldName: 'microchip', privacyLevel: 'restricted', canOwnerOverride: false },
  { fieldName: 'registrationNo', privacyLevel: 'restricted', canOwnerOverride: false },
  { fieldName: 'owner', privacyLevel: 'restricted', canOwnerOverride: false },
  { fieldName: 'insurance', privacyLevel: 'restricted', canOwnerOverride: false },
];

/** 数据保留策略 */
export const dataRetentionPolicy = {
  inactiveUserAccount: {
    duration: '2_years',
    action: 'anonymize_pii',
  },
  medicalRecords: {
    retention: '7_years',
    afterDeletion: 'secure_archive',
  },
  photos: {
    retention: 'indefinite',
    compressionAfterYears: 3,
  },
  auditLogs: {
    retention: '3_years',
  },
  cachedData: {
    ttl: '24_hours',
  },
} as const;
