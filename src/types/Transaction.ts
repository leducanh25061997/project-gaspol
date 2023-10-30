import { MemberStatus } from './enums';

export interface Transaction {
  packageName: string;
  transactionId: string;
  initFee: number;
  annualFee: number;
  processingFee: number;
  adminFee: number;
}

export interface TransactionHistory {
  poId?: string;
  createdDate?: string;
  processedDate?: string;
  poCreatedBy?: string;
  poCreatedDate?: string;
  poUserUuid?: string;
  poOrderNumber?: string;
  dateTime?: string;
  poTotal?: string;
  poStatus?: string;
  poiQuantity?: string;
  poiTotalPrice?: string;
  poiType?: string;
  total?: number;
  orderNumber?: string;
  poiStatus?: MemberStatus;
  status?: MemberStatus;
  orderItem?: OrderItem[];
}

export interface OrderItem {
  itemName?: string;
}
