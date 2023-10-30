import { FilterStatusType } from 'app/pages/MemberManagement/ClaimOldMembership/slice/types';

import { MemberStatus, OrderType } from './enums';

export interface ClaimList {
  username: string;
  phone: string;
  ktaNumber: string;
  nikNumber: string;
  status?: MemberStatus;
  createdDate: any;
  nikPicture?: string;
  ktaPicture?: string;
  provinceName?: string;
  avatarUrl?: string;
}

export interface OldMemberListType {
  id: number;
  fullName: string;
  nikNumber: string;
  phone: string;
  oldKtaNumber: string;
  packageType: string;
  packageName?: string;
  status: MemberStatus;
  registerTime: any;
}

export interface ClaimRequestData {
  size: number;
  page: number;
  filter: string;
  searchKey: string;
  status?: FilterStatusType;
  fromDate?: number;
  toDate?: number;
  provinceId?: number;
}

export interface ClaimFilter {
  filter: string;
  status?: FilterStatusType;
}

export interface ClaimRequestDetail {
  id: number;
}

export interface OldMemberListRequestData {
  searchKey?: string[];
  nikNumber?: string;
  oldKtaNumber?: string;
  phoneOrName?: string;
  rowsPerPage?: number;
  page?: number;
  order?: OrderType;
  orderBy?: string;
  size?: number;
  filter?: OldMemberListFilter;
}

export interface OldMemberListFilter {
  searchKey?: string;
  province?: string;
  packageCode?: string[];
  status?: string[];
  nikNumber?: string;
  oldKtaNumber?: string;
}

export interface ActiveOldMemberListData {
  claimId: number;
  ktaMembershipId: number;
}
