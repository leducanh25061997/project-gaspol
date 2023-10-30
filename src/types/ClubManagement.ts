import { Province } from 'types';

import { Roles } from './enums';

import { IndividualInformation } from './MembershipRequest';
export interface ClubManagementCreate {
  province: string;
  clubName: string;
  clubCategories: string;
  kisCategories: string;
  clubPic: number;
  bankName: string;
  bankAccountNumber: number;
  bankHolderName: string;
}

export interface FormParams {
  key: string;
  values: string[];
}

interface ClubMemberFormStandard {
  id?: number;
  userPackageId?: number;
  role?: string;
  phone?: string;
  ktp?: string;
  ktaNumber?: string;
}

export interface CreateClubFormRequest {
  membershipType?: string;
  userPackageId?: any;
  packageId?: number;
  id?: number;
  forms?: Array<FormParams>;
  members?: Array<ClubMemberFormStandard>;
  userUuid?: string | false | undefined;
}
export interface EditClubFormRequest {
  clubMembershipId?: string;
  clubData?: IndividualInformation;
}

export interface CreateClubFormData {
  province?: Province;
  kisCategories?: string;
  clubCategories?: string;
}

export interface ClubInformation extends IndividualInformation {
  certDocumentLinks?: string[];
  clubCategoriesLink?: string[];
  certDocuments?: string[];
  artDocuments?: string[];
  artDocumentLinks?: string[];
  packageStatus?: string;
  additionalDocumentsKeyS3?: string[];
  artDocumentsKeyS3?: string[];
  certDocumentsKeyS3?: string[];
  expireDate?: number;
  securityCode?: string;
}

export interface UpdateClubFormRequest {
  id?: number;
  forms?: Array<FormParams>;
}

export interface CreateClubRequestMembers {
  userUuid?: string;
  phone?: string;
  fullName: string;
  role?: Roles;
  uuid?: string;
}

export interface ClubNameRequest {
  clubName?: string;
  type?: string;
  provinceId?: number | '';
  clubCode?: string;
  clubId?: number | null;
}

export interface ClubNameResponse {
  duplicateName: boolean;
  duplicateCode: boolean;
}
export interface checkClubname {
  duplicateName?: boolean;
}
