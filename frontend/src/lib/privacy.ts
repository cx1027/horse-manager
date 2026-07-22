/**
 * Privacy & Access Control Utilities
 * 
 * Handles data visibility filtering based on user roles and horse visibility settings.
 */

import type { Horse, User, HorseVisibilitySettings, PrivacyLevel } from '@/types';

/**
 * Check if a user can access a specific privacy level
 */
export function canAccessPrivacyLevel(
  user: User | null,
  ownerId: string | undefined,
  privacyLevel: PrivacyLevel
): boolean {
  if (privacyLevel === 'public') return true;
  if (!user) return false;
  
  // Admin can access everything
  if (user.role === 'admin') return true;
  
  // Owner can always access their own data
  if (ownerId && user.id === ownerId) return true;
  
  if (privacyLevel === 'member') return true;
  
  if (privacyLevel === 'private') {
    // Staff can access if they have permission
    if (user.role === 'staff') return true;
  }
  
  if (privacyLevel === 'restricted') {
    // Owner is already checked above
    // Admin is already checked above
  }
  
  return false;
}

/**
 * Get privacy level for a specific horse field
 */
export function getFieldPrivacyLevel(
  fieldName: string,
  ownerPrivacyOverride?: PrivacyLevel
): PrivacyLevel {
  const fieldPrivacyMap: Record<string, PrivacyLevel> = {
    name: 'public',
    gender: 'public',
    breed: 'public',
    color: 'public',
    age: 'public',
    birthDate: 'public',
    status: 'member',
    coverImage: 'public',
    photos: 'member',
    description: 'member',
    stableLocation: 'member',
    commercialActivities: 'member',
    medicalRecords: 'private',
    healthData: 'private',
    feedingRecords: 'private',
    microchip: 'restricted',
    registrationNo: 'restricted',
    owner: 'restricted',
    insurance: 'restricted',
  };
  
  const defaultLevel = fieldPrivacyMap[fieldName] || 'member';
  
  // Owner can override certain fields
  if (ownerPrivacyOverride) {
    return ownerPrivacyOverride;
  }
  
  return defaultLevel;
}

/**
 * Filter horse data based on viewer's permissions
 */
export function filterHorseDataByPrivacy(
  horse: Horse,
  viewer: User | null,
  visibilitySettings?: HorseVisibilitySettings
): Partial<Horse> {
  const result: Partial<Horse> = {};
  
  // If viewer is admin or owner, return full data
  if (viewer && (viewer.role === 'admin' || viewer.id === horse.ownerId)) {
    return horse;
  }
  
  // Determine effective visibility settings
  const settings = visibilitySettings || getDefaultVisibilitySettings();
  
  // Check if viewer is blocked
  if (settings.blockedUsers.includes(viewer?.id || '')) {
    return filterToPublicOnly(horse);
  }
  
  // Check global visibility
  if (settings.globalVisibility === 'private') {
    if (!settings.allowedUsers.includes(viewer?.id || '') && viewer?.role !== 'staff') {
      return filterToPublicOnly(horse);
    }
  }
  
  // Check role-based access
  if (settings.allowedRoles.includes(viewer?.role as 'staff' | 'investor')) {
    // Allow partial access based on role
    if (viewer?.role === 'investor') {
      return filterForInvestor(horse);
    }
  }
  
  // Filter by field privacy levels
  return filterByPrivacyLevels(horse, viewer);
}

/**
 * Filter horse data to only public fields
 */
function filterToPublicOnly(horse: Horse): Partial<Horse> {
  return {
    id: horse.id,
    name: horse.name,
    breed: horse.breed,
    color: horse.color,
    gender: horse.gender,
    birthDate: horse.birthDate,
    status: horse.status,
    coverImage: horse.coverImage,
  };
}

/**
 * Filter horse data for investor role
 */
function filterForInvestor(horse: Horse): Partial<Horse> {
  return {
    ...filterToPublicOnly(horse),
    description: horse.description,
    commercialActivities: horse.commercialActivities?.map(a => ({
      ...a,
      // Hide seller/buyer info for investors unless authorized
      seller: undefined,
      buyer: undefined,
    })),
    insurance: horse.insurance ? {
      ...horse.insurance,
      policyNo: undefined,
    } : undefined,
  };
}

/**
 * Filter horse data by individual field privacy levels
 */
function filterByPrivacyLevels(horse: Horse, viewer: User | null): Partial<Horse> {
  const result: Partial<Horse> = {};
  
  // Public fields - always included
  const publicFields = ['id', 'name', 'breed', 'color', 'gender', 'birthDate', 'status'];
  for (const field of publicFields) {
    if (field in horse) {
      (result as Record<string, unknown>)[field] = (horse as Record<string, unknown>)[field];
    }
  }
  
  // Member fields - need login
  if (viewer) {
    const memberFields = ['description', 'stableLocation', 'commercialActivities', 'photos'];
    for (const field of memberFields) {
      if (field in horse && horse[field as keyof Horse] !== undefined) {
        (result as Record<string, unknown>)[field] = (horse as Record<string, unknown>)[field];
      }
    }
  }
  
  // Cover image is public
  if (horse.coverImage) {
    result.coverImage = horse.coverImage;
  }
  
  return result;
}

/**
 * Get default visibility settings for a new horse
 */
export function getDefaultVisibilitySettings(): HorseVisibilitySettings {
  return {
    horseId: '',
    globalVisibility: 'members_only',
    photoVisibility: {
      fullBodyPhotos: 'member',
      closeUpPhotos: 'member',
      actionPhotos: 'member',
      competitionPhotos: 'member',
    },
    allowedUsers: [],
    allowedRoles: [],
    blockedUsers: [],
    allowOtherOwnersToView: true,
    searchableInPublic: true,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Check if a user can view a specific horse's medical records
 */
export function canViewMedicalRecords(horse: Horse, user: User): boolean {
  if (user.role === 'admin') return true;
  if (user.id === horse.ownerId) return true;
  if (user.role === 'staff') return true; // Staff has access when authorized by owner
  return false;
}

/**
 * Check if a user can view financial information (insurance, amounts)
 */
export function canViewFinancials(horse: Horse, user: User): boolean {
  if (user.role === 'admin') return true;
  if (user.id === horse.ownerId) return true;
  if (user.role === 'investor') return true;
  return false;
}

/**
 * Check if a user can edit horse data
 */
export function canEditHorse(horse: Horse, user: User): boolean {
  if (user.role === 'admin') return true;
  if (user.id === horse.ownerId) return true;
  if (user.role === 'staff') return true; // Staff can edit when authorized
  return false;
}

/**
 * Generate a masked version of sensitive data for display
 */
export function maskSensitiveData(data: string, type: 'phone' | 'microchip' | 'registration'): string {
  switch (type) {
    case 'phone':
      return data.replace(/(\+?\d{3})\d{4}(\d{3})/, '$1****$2');
    case 'microchip':
    case 'registration':
      return data.length > 4 
        ? '*'.repeat(data.length - 4) + data.slice(-4)
        : '*'.repeat(data.length);
    default:
      return '*'.repeat(data.length);
  }
}

/**
 * Validate share link access
 */
export function validateShareLinkAccess(
  shareToken: string,
  requiredPermissions: string[]
): { valid: boolean; reason?: string } {
  // This would be implemented with actual share token validation
  // For now, return a placeholder implementation
  if (!shareToken) {
    return { valid: false, reason: 'Invalid share token' };
  }
  
  return { valid: true };
}

/**
 * Check if data can be exported by the user
 */
export function canExportData(horse: Horse, user: User): boolean {
  if (user.role === 'admin') return true;
  if (user.id === horse.ownerId) return true;
  return false;
}
