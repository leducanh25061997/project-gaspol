import { FilterStatusType } from 'app/pages/MemberManagement/ClaimOldMembership/slice/types';

import { ClubRequestStatus } from './enums';

import { OrderType, MembershipType } from './index';
export interface FilterParams {
  offset?: number;
  limit?: number;
  name?: string;
  membershipType?: MembershipType;
  fromRegisterTime?: number;
  toRegisterTime?: number;
  orderBy?: string;
  orderType?: OrderType;
  page?: number;
  provinceId?: string | number | null;
  size?: number;
  status?: ClubRequestStatus;
  isImiAdmin?: boolean | null;
  isApproved?: boolean | null;
  clubId?: number;
  clubFilter?: clubFilter;
  userUuid?: string | null;
  clubMembershipId?: number;
  startDate?: string;
  endDate?: string;
  type?: string;
  id?: string;
  memberId?: string;
  kisStatus?: string;
}

interface IndividualFilter {
  orderBy?: string;
  orderType?: OrderType;
  name?: string;
  packageCode?: string;
  status?: string[] | null;
  provinceId?: number | null;
  adArt?: string | null;
}

export interface FilterMemberValue {
  package: string;
  status: string[];
  page: number;
  rowsPerPage: number;
  order: OrderType;
  filterName: string;
  orderBy: string;
  provinceId?: any;
  size?: number;
}

export interface FilterClaimValue {
  status?: FilterStatusType;
  page: number;
  rowsPerPage: number;
  order: OrderType;
  filterName: string;
  orderBy: string;
  size?: number;
  fromDate: any;
  toDate: any;
}

export interface FilterIndividualMemberValue {
  memberStatus?: string[];
  packageStatus?: string[];
  page?: number;
  rowsPerPage?: number;
  province?: any;
  size?: number;
  filterName?: string;
  packageCode?: string[];
}

export interface FilterListParams {
  memberStatus?: string[];
  packageStatus?: string[];
  page?: number;
  province?: any;
  size?: number;
  provinceId?: any;
  searchKey?: string;
  adArtDocuments?: string;
  certDocuments?: string;
  packageCode?: string[];
  associationStatus?: string[];
  clubStatus?: string[];
  clubType?: string[];
  star?: string[];
  enrollmentType?: string[];
  endDate?: any;
  startDate?: any;
  fromDate?: any;
  toDate?: any;
  packageType?: string[];
  clubId?: any;
  memberNo?: string[];
  order?: OrderType;
}
export interface FilterMemberParams {
  offset?: number;
  limit?: number;
  membershipType?: MembershipType;
  individualFilter?: IndividualFilter;
  clubFilter?: clubFilter;
  promoterFilter?: PromoterFilter;
  partnerFilter?: BusinessPartnetFilter;
  associationFilter?: AssociationFilter;
}

export interface FilterAdminMembership {
  page?: number;
  size?: number;
  searchKey?: string;
  status?: string[];
  province?: string;
  packageCode?: string;
}

export interface FilterAssociationParams {
  page?: number;
  size?: number;
  searchKey?: string;
  status?: string[];
  adArt?: string[];
  adArtDocuments?: string;
  certDocuments?: string;
  associationStatus?: string[];
  packageStatus?: string[];
  star?: string[];
  provinceId?: string;
  province?: string;
  packageCode?: string;
}

export interface FilterBusinessPartnerValue {
  status: string;
  page: number;
  rowsPerPage: number;
  order: OrderType;
  name: string;
  orderBy: string;
  provinceId?: number | null;
}

export interface AssociationFilter {
  orderBy?: string;
  orderType?: string;
  name?: string;
  provinceId?: number;
  adArt?: string;
  star?: string[];
  status?: string[];
}

interface clubFilter {
  orderBy?: string;
  orderType?: OrderType;
  name?: string;
  star?: string[];
  status?: string[];
  provinceId?: number | null;
  adArt?: string | null;
}

interface PromoterFilter {
  orderBy?: string;
  orderType?: OrderType;
  name?: string;
  status?: string[] | null;
  provinceId?: number | null;
}
interface BusinessPartnetFilter {
  orderBy?: string;
  orderType?: OrderType;
  name?: string;
  status?: string[] | null;
  provinceId?: number | null;
}

export interface clubFilterParams {
  searchKey?: string | '';
  star?: string[];
  clubStatus?: string[];
  provinceId?: number | '';
  certDocuments?: string | '';
  adArtDocuments?: string | '';
  packageStatus?: string[];
  size?: number;
  page?: number;
}
