import axios, { AxiosInstance, AxiosError } from 'axios';
import type { 
  Horse, 
  MedicalRecord, 
  HealthData, 
  FeedingRecord, 
  CommercialActivity, 
  Insurance,
  HorseFilters,
  DashboardStats,
  ApiResponse,
  User 
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth
  async googleAuth(idToken: string) {
    const response = await this.client.post<ApiResponse<{ user: User; jwt: string }>>(
      '/auth/google',
      { idToken }
    );
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.client.post<ApiResponse<{ user: User; jwt: string }>>(
      '/auth/local',
      { identifier: email, password }
    );
    return response.data;
  }

  async register(username: string, email: string, password: string) {
    const response = await this.client.post<ApiResponse<{ user: User; jwt: string }>>(
      '/auth/local/register',
      { username, email, password }
    );
    return response.data;
  }

  async getCurrentUser() {
    const response = await this.client.get<ApiResponse<User>>('/users/me', {
      params: { populate: '*' },
    });
    return response.data;
  }

  // Horses
  async getHorses(filters?: HorseFilters) {
    const params = new URLSearchParams();
    if (filters?.search) params.append('filters[name][$containsi]', filters.search);
    if (filters?.gender) params.append('filters[gender]', filters.gender);
    if (filters?.status) params.append('filters[status]', filters.status);
    if (filters?.breed) params.append('filters[breed][$containsi]', filters.breed);
    
    const response = await this.client.get<ApiResponse<Horse[]>>('/horses', {
      params,
      paramsSerializer: { serialize: (p) => p.toString() },
    });
    return response.data;
  }

  async getHorse(id: string) {
    const response = await this.client.get<ApiResponse<Horse>>(`/horses/${id}`, {
      params: { populate: '*' },
    });
    return response.data;
  }

  async createHorse(data: Partial<Horse>) {
    const response = await this.client.post<ApiResponse<Horse>>('/horses', { data });
    return response.data;
  }

  async updateHorse(id: string, data: Partial<Horse>) {
    const response = await this.client.put<ApiResponse<Horse>>(`/horses/${id}`, { data });
    return response.data;
  }

  async deleteHorse(id: string) {
    await this.client.delete(`/horses/${id}`);
  }

  // Medical Records
  async getMedicalRecords(horseId: string) {
    const response = await this.client.get<ApiResponse<MedicalRecord[]>>(
      '/medical-records',
      { params: { filters: { horse: horseId }, sort: 'recordDate:desc' } }
    );
    return response.data;
  }

  async createMedicalRecord(data: Partial<MedicalRecord> & { horse: string }) {
    const response = await this.client.post<ApiResponse<MedicalRecord>>('/medical-records', { data });
    return response.data;
  }

  async updateMedicalRecord(id: string, data: Partial<MedicalRecord>) {
    const response = await this.client.put<ApiResponse<MedicalRecord>>(`/medical-records/${id}`, { data });
    return response.data;
  }

  async deleteMedicalRecord(id: string) {
    await this.client.delete(`/medical-records/${id}`);
  }

  // Health Data
  async getHealthData(horseId: string) {
    const response = await this.client.get<ApiResponse<HealthData[]>>(
      '/health-data',
      { params: { filters: { horse: horseId }, sort: 'recordDate:desc' } }
    );
    return response.data;
  }

  async getHealthStats(horseId: string) {
    const response = await this.client.get<ApiResponse<{
      latestWeight: number;
      weightTrend: { date: string; weight: number }[];
      avgHeartRate: number;
    }>>(`/health-data/stats/${horseId}`);
    return response.data;
  }

  async createHealthData(data: Partial<HealthData> & { horse: string }) {
    const response = await this.client.post<ApiResponse<HealthData>>('/health-data', { data });
    return response.data;
  }

  // Feeding Records
  async getFeedingRecords(horseId: string) {
    const response = await this.client.get<ApiResponse<FeedingRecord[]>>(
      '/feeding-records',
      { params: { filters: { horse: horseId }, sort: 'feedDate:desc' } }
    );
    return response.data;
  }

  async createFeedingRecord(data: Partial<FeedingRecord> & { horse: string }) {
    const response = await this.client.post<ApiResponse<FeedingRecord>>('/feeding-records', { data });
    return response.data;
  }

  // Commercial Activities
  async getCommercialActivities(horseId: string) {
    const response = await this.client.get<ApiResponse<CommercialActivity[]>>(
      '/commercial-activities',
      { params: { filters: { horse: horseId }, sort: 'activityDate:desc' } }
    );
    return response.data;
  }

  async createCommercialActivity(data: Partial<CommercialActivity> & { horse: string }) {
    const response = await this.client.post<ApiResponse<CommercialActivity>>('/commercial-activities', { data });
    return response.data;
  }

  // Insurance
  async getInsurance(horseId: string) {
    const response = await this.client.get<ApiResponse<Insurance>>(
      '/insurances',
      { params: { filters: { horse: horseId }, populate: '*' } }
    );
    return response.data;
  }

  async createOrUpdateInsurance(data: Partial<Insurance> & { horse: string }) {
    if (data.id) {
      const response = await this.client.put<ApiResponse<Insurance>>(`/insurances/${data.id}`, { data });
      return response.data;
    }
    const response = await this.client.post<ApiResponse<Insurance>>('/insurances', { data });
    return response.data;
  }

  // File Upload
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('files', file);
    const response = await this.client.post<ApiResponse<Array<{ id: string; url: string }>>>(
      '/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  }

  // Dashboard
  async getDashboardStats() {
    const response = await this.client.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data;
  }

  // Favorites
  async addToFavorites(horseId: string) {
    const response = await this.client.post(`/users/me/favorites`, { horseId });
    return response.data;
  }

  async removeFromFavorites(horseId: string) {
    const response = await this.client.delete(`/users/me/favorites/${horseId}`);
    return response.data;
  }
}

export const api = new ApiService();
export default api;
