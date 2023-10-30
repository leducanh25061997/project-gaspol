import { TransactionType } from './enums';

export interface PointHistory {
  createdDate: string;
  processedDate?: string;
  changedPoint: string;
  balance: string;
  detail: string;
  transactionType: TransactionType;
}

export interface RequestPointHistory {
  id?: number;
  changedPoint: string;
  transactionType: TransactionType;
  sharingId: string;
  detail: string;
  createdDate: string;
  createdBy: string;
}
