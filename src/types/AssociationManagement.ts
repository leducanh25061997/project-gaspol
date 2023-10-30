import { MemberStatus, Roles, PackageStatus } from './enums';
import { SubscribingPackage } from './MembershipRequest';

export interface AssociationList {
  count?: number;
  data?: AssociationManagement[];
}
export interface AssociationManagement {
  id: number;
  provinceName?: string;
  star?: number;
  associationName?: string;
  userPackageId?: string;
  packageCode?: string;
  packageStatus?: MemberStatus;
  associationStatus?: MemberStatus;
  userUuid?: string;
  ownerUuid?: string;
  avatarUrl?: string;
  avatarPictureLink?: string;
  provinceId?: string;
  associationCode?: string;
  packageName?: string;
  status?: MemberStatus;
  createdTime: number;
}

export interface ClubAssociationInformationType {
  id: any;
  associationId: number;
  communityId: number;
  clubId: number;
  status: MemberStatus;
  createdDate: number;
  modifiedDate: number;
  avatarUrl: string;
  associationName: string;
  adminName: string;
  message: string;
  star: number;
  provinceClub: string;
  clubName: string;
  followerNo: number;
  memberNo: number;
  clubCode: string;
  adminPhoneNumber: string;
  packageStatus: MemberStatus;
}

export interface AssociationInformationType {
  id?: number;
  avatarUrl: string;
  externalLink: string;
  communityId: number;
  bankName: string;
  bankHolderName: string;
  associationStatus: MemberStatus;
  associationCategory: string;
  bankNumber: string;
  documents: string[];
  documentLinks: string[];
  additionalDocuments: string[];
  artDocuments: string[];
  artDocumentLinks: string[];
  certDocuments: string[];
  certDocumentLinks: string[];
  additionalDocumentsKeyS3: string[];
  certDocumentsKeyS3: string[];
  artDocumentsKeyS3: string[];
  contentPreference: any[];
  provinceId: number;
  provinceName: string;
  cityId: number;
  cityName: string;
  districtId: number;
  districtName: string;
  wardId: number;
  wardName: string;
  rtRwNumber: string;
  postCode: string;
  address: string;
  ktaNumber: string;
  eCertificateNumber: string;
  star: number;
  associationName: string;
  artDocumentsApproval?: boolean;
  userPackageId: number;
  status: MemberStatus;
  adminUuid: string;
  adminName: string;
  associationCategories: string;
  associationMembers: AssociationInformationType_Member[];
  members: AssociationInformationType_Member[];
  clubCount: number;
  packageName?: string;
  packageStatus: string;
  associationCode: string;
  expireDate: any;
  description: string;
  certNumber: any;
  expiredDate: number;
  subscribingPackage?: SubscribingPackage;
}

export interface AssociationInformationType_Member {
  id: number;
  associationId: number;
  communityId: number;
  phone: string;
  nikNumber: string;
  ktaNumber: string;
  userUuid: string;
  name: string;
  status: string;
  title: string;
  fullName: string;
  packageStatus: MemberStatus;
  membershipStatus: MemberStatus;
  roles: AssociationInformationType_Member_Roles[];
}

export interface AssociationInformationType_Member_Roles {
  title: string;
  role: Roles;
}

export interface CheckAssociationManagement {
  phone: string;
  name: string;
  nikNumber: string;
}

export interface CreateAssociationRequest {
  requestCheckout: boolean;
  packageId: number;
  taaAssocication: CreateAssociationRequest_taaAssociation;
}

export interface EditAssociationRequest {
  id: any;
  body: CreateAssociationRequest_taaAssociation;
}

export interface checkAssociationNameInfo {
  isNameValid: boolean;
}

export interface AddClubAssociationRequest {
  id: number;
  body: AddClubAssociationRequest_taaAssociation;
}

export interface AddClubAssociationRequest_taaAssociation {
  clubId: number;
  communityId?: number;
  status: MemberStatus;
}

export interface CreateAssociationRequest_taaAssociation {
  associationName: string;
  ownerUuid: string;
  avatarUrl: string;
  associationCategory: string;
  externalLink: string;
  description: string;
  address: string;
  rtRwNumber: string;
  provinceId: number;
  cityId: number;
  districtId: number;
  wardId: number;
  postCode: string;
  bankId: number;
  bankHolderName: string;
  bankNumber: string;
  artDocuments: string[];
  certNumber: string;
  certDocuments: string[];
  additionalDocuments: string[];
  associationCode: string;
  star: number;
  artDocumentsApproval: boolean;
  clubs: CreateAssociationRequest_taaAssociation_Clubs[];
  members: CreateAssociationRequest_taaAssociation_Members[];
}

export interface CreateAssociationRequest_taaAssociation_Clubs {
  clubId: number;
  associationId: number;
  status: MemberStatus;
}

export interface CreateAssociationRequest_taaAssociation_Members {
  userUuid?: string;
  phone?: string;
  fullName: string;
  identification?: CreateAssociationRequest_taaAssociation_Members_Identification;
  role?: Roles;
}

export interface CreateAssociationRequest_taaAssociation_Members_Identification {
  identifierNikNumber: string;
  identifierKitasNumber: string;
  identifierKtpNumber: string;
}

export interface ApproveAssociationFormRequest {
  id: any;
  associationBody: EditAssociationFormRequest_body;
}

export interface EditAssociationFormRequest_body {
  artDocumentsApproval: boolean;
}

export interface ClubInformationRequest {
  size: number;
  page: number;
  id: string;
}
