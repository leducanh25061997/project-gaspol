/* --- STATE --- */

import { Province, FilterListParams } from 'types';

export interface ClaimedClubList {
  id: number;
  name: string;
  phone: string;
  ktaProvinceName: string;
  provinceName: string;
  status: FilterStatusType;
  claimTime: number;
  profilePicture: string;
  clubName: string;
  clubMembershipId: number;
}

export interface FilterParams extends FilterListParams {
  searchField?: string;
  status?: FilterStatusType | undefined;
}

export interface ClaimedClubListState {
  data: ClaimedClubList[];
  loading: boolean;
  count: number;
  filter: FilterParams;
  exporting?: boolean;
  provinces?: Province[];
}

export type ClaimedClubListResponse = {
  data: ClaimedClubList[];
  count: number;
};

export type FilterStatusType = 'PENDING' | 'DONE';
