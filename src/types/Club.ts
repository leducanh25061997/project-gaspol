import { Category, Member, Province } from 'types';

import { OrderType } from './enums';

export interface ClubResponse {
  data?: Club[];
  count?: number;
}
export interface Club {
  id: number;
  personInCharge?: string;
  personInChargeName?: string;
  personInChargePhoneNumber?: string;
  clubName?: string;
  packageStatus?: string;
  clubCategories?: string;
  kisCategories?: string;
  bankName?: string;
  bankHolderName?: string;
  bankNumber?: string;
  documents?: string[];
  provinceId?: number;
  members?: ClubMember[];
  status?: string;
  name?: string;
  ownerId?: number;
  packageCode?: string;
}

export interface Clubdata {
  id?: number;
  clubName?: string;
  clubCode?: string;
}

export interface ClubMember extends Member {
  userPackageId: number;
  role: string;
  ktp: string;
  ktaNumber: string;
  userUuid: string;
  status: string;
}

export interface ClubParams {
  size?: number;
  page?: number;
  isLastItem?: boolean;
  provinceId?: number;
  searchKey?: string;
  nameFullText?: string;
  nextToken?: string;
  change?: boolean;
  paging?: string;
  typeIn?: string;
  isScroll: boolean;
}

export interface ClubFormRequest {
  bankHolderName: string;
  bankName: string;
  bankNumber: string;
  clubCategories: Category[];
  imiPaid: boolean;
  name: string;
  personInCharge: string;
  province?: Province;
}
