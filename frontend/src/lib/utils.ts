'use client';

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('zh-CN', options || defaultOptions).format(new Date(date));
}

export function formatDateShort(date: string | Date): string {
  return formatDate(date, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function calculateAge(birthDate: string | Date): string {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return `${age}岁`;
}

export function formatCurrency(amount: number, currency: string = 'CNY'): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('zh-CN').format(num);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export const genderLabels: Record<string, string> = {
  male: '公马',
  female: '母马',
  gelding: '骟马',
};

export const statusLabels: Record<string, string> = {
  active: '活跃',
  inactive: '不活跃',
  sold: '已出售',
  deceased: '已故',
};

export const medicalRecordTypeLabels: Record<string, string> = {
  vaccination: '疫苗接种',
  checkup: '体检',
  illness: '疾病',
  deworming: '驱虫',
  dental: '牙科检查',
  surgery: '手术',
};

export const activityTypeLabels: Record<string, string> = {
  race: '赛事',
  exhibition: '展览',
  sale: '交易',
  breeding: '配种',
  sponsorship: '赞助',
};

export const insuranceStatusLabels: Record<string, string> = {
  active: '生效中',
  expired: '已过期',
  cancelled: '已取消',
};

export const photoCategoryLabels: Record<string, string> = {
  full_body: '全身照',
  close_up: '特写照',
  action: '动态照',
  competition: '比赛照',
};

export const privacyLevelLabels: Record<string, string> = {
  public: '公开',
  member: '会员可见',
  private: '仅自己',
  restricted: '高度私密',
};

export const visibilityPresetLabels: Record<string, string> = {
  open: '开放模式',
  private: '私密模式',
  club: '俱乐部模式',
  showcase: '展示模式',
};
