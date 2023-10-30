import { KisStatus } from './index';

export interface KisInfo {
  id?: number;
  provinceId?: number;
  kisId?: string;
  kisIdStr?: string;
  kisName?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: KisStatus;
  modifiedDate?: string;
  description?: string;
  kisType?: string;
  provincePrice?: number;
  createdDate?: string;
}

export interface MembershipKisList {
  kisProvinceId?: string;
  kisName?: string;
  kisType?: string;
  kisId?: string;
  provinceName?: string;
  status?: string;
  kisStatus?: KisStatus;
  enrolledDate?: string;
  expiredDate?: string;
}

export interface AuditTrail {
  id: number;
  timestamp: string;
  by: string;
  actions: string;
  description: string;
}
