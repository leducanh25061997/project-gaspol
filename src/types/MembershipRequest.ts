import { KisType, Stars } from 'types/enums';

import {
  PackageType,
  MembershipRequestType,
  MemberStatus,
  Gender,
  UserPackageType,
  Province,
} from 'types';

import { MembershipKisList } from './Kis';
import { Address } from './Province';
import { Category } from './Categories';

export interface MembershipRequest {
  package?: PackageType;
  type?: MembershipRequestType;
  status?: MemberStatus;
  date?: Date;
  id?: number;
  name?: string;
  phone?: number;
  provinceName?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  gender?: Gender;
  path?: string;
  club?: string;
  profilePictureLink?: string;
  clubStatus?: MemberStatus;
  birthPlace?: string;
  dob: string;
  bloodType: string;
  hobby: string;
  email: string;
  userUuid: string;
  packageId: 3;
  clubName: string;
  ktaNumber: string;
  profilePicture?: string;
  packageName?: string;
  registerTime: string;
  avatar?: string;
  clubPic?: string;
  star?: Stars;
  paidMember?: number;
  avatarPictureLink?: string;
  unPaidMember?: number;
  title?: string[];
  role?: string;
  promotorName?: string;
  picName?: string;
  picPhoneNumber?: string;
  partnerName?: string;
  picPhone?: number;
  expiredDate?: number;
  picAddress?: number;
  bankName?: string;
  bankNumber?: number;
  bankHolderName?: string;
  companyName?: string;
  companyEmail?: string;
  headAddress?: string;
  headPhone?: string;
  domAddress?: string;
  domPhone?: string;
  npwpNumber?: number;
  businessType?: string;
  pkpNumber?: number;
  adArtNumber?: number;
  headWardName?: string;
  headDistrictName?: string;
  headCityName?: string;
  headProvinceName?: string;
  domWardName?: string;
  domDistrictName?: string;
  domCityName?: string;
  domProvinceName?: string;
  pic?: number;
  nikNumber?: number;
  documents: string[];
  documentLinks: string[];
  fullName?: string;
  packageStatus?: MemberStatus;
  memberStatus?: MemberStatus;
  clubCode?: string;
  createdTime?: number;
  roles?: any[];
  packageCode?: string;
}

export interface Membership {
  id?: number;
  code?: UserPackageType;
  name?: string;
  icon?: string;
  type?: string;
}

export interface IndividualInformation {
  id?: number;
  personInCharge?: string;
  personInChargeName?: string;
  clubName?: string;
  clubCategories?: string;
  kisCategories?: string;
  bankName?: string;
  bankHolderName?: string;
  bankNumber?: string;
  picPhoneNumber?: string;
  clubStatus?: string;
  permission?: string;
  documents?: string[];
  documentLinks?: string[];
  certDocuments?: string[];
  provinceId?: number;
  provinceName?: string;
  cityId?: number;
  cityName?: string;
  districtId?: number;
  districtName?: string;
  wardId?: number;
  wardName?: string;
  // members?: IndividualInformation[];
  coverPicture?: string;
  expiredDate?: number;
  address?: string;
  eCertificateNumber?: string;
  associationId?: number;
  userUuid?: string;
  name?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  clubId?: number;
  clubPic?: string;
  bloodType?: string;
  birthPlace?: string;
  hobby?: string;
  invitorPhoneNumber?: string;
  gender?: string;
  profilePicture?: string;
  profilePictureLink?: string;
  coverPictureLink?: string;
  nikNumber?: string;
  nikPicture?: string;
  nikPictureLink?: string;
  birthday?: string;
  simCar?: string;
  simCarPicture?: string;
  simCarPictureLink?: string;
  dob?: string;
  ktaNumber?: string;
  postalCode?: string;
  registerTime?: number;
  nationality?: string;
  packageName?: string;
  status?: string;
  rtRwNumber?: string;
  clubPicName?: string;
  clubPicPhone?: string;
  referralCode?: string;
  promoterUuid?: string;
  userPackageId?: number;
  merchantPic?: string;
  companyName?: string;
  companyNpwp?: string;
  hotline?: string;
  businessType?: string;
  companyAddress?: string;
  companyEmail?: string;
  ktp?: string;
  ktpPicture?: string;
  city?: string;
  district?: string;
  ward?: string;
  role?: string;
  isImiAdmin?: boolean | null;
  isApproved?: boolean | null;
  star?: string;
  note?: string;
  packageId?: number;
  membershipKisList?: MembershipKisList[];
  promotorName?: string;
  picName?: string;
  gPoint?: number;
  subscribingPackage?: SubscribingPackage;
  identification?: Identification;
  hobbies?: Category[];
  statusPackage?: string;
  postCode?: string;
  clubInfo?: ClubInfo;
  provinceClub?: Province;
  provinceClubId?: number;
  clubCategory?: string;
  externalLink?: string;
  clubCode?: string;
  clubPrivacy?: string;
  description?: string;
  artDocuments?: string[];
  certNumber?: string;
  additionalDocuments?: string[];
  artDocumentsApproval?: boolean;
  nikType?: string;
  cities?: Address;
  districts?: Address;
  wards?: Address;
  province?: Province;
  clubAdmin?: string;
  otherDocuments?: string[];
  packageStatus?: string;
  ClubCategory?: string;
  contentPreference?: any[];
  avatarUrl?: string;
  oldKtaNumber?: string;
}
export interface TransactionRequestData {
  size: number;
  page: number;
  id: TransactionId;
  userUuid?: string;
  startDate?: string;
  endDate?: string;
  createdBy?: CreatedBy;
}

interface CreatedBy {
  equals: string;
}
export interface TransactionId {
  asc?: boolean;
}

export interface UserPointParams {
  userUuid?: string;
}

export interface IndividualInformationV2 {
  ktaMembershipInfor?: KtaMembershipInfor;
}
export interface KtaMembershipInfor {
  id?: number;
  personInCharge?: string;
  personInChargeName?: string;
  clubName?: string;
  clubCategories?: string;
  kisCategories?: string;
  bankName?: string;
  bankHolderName?: string;
  bankNumber?: string;
  picPhoneNumber?: string;
  clubStatus?: string;
  permission?: string;
  documents?: string[];
  documentLinks?: string[];
  certDocuments?: string[];
  provinceId?: number;
  provinceName?: string;
  cityId?: number;
  cityName?: string;
  districtId?: number;
  districtName?: string;
  wardId?: number;
  wardName?: string;
  members?: any[];
  coverPicture?: string;
  expiredDate?: number;
  address?: string;
  eCertificateNumber?: string;
  associationId?: number;
  userUuid?: string;
  name?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  clubId?: number;
  clubPic?: string;
  bloodType?: string;
  birthPlace?: string;
  hobby?: string;
  invitorPhoneNumber?: string;
  gender?: string;
  profilePicture?: string;
  profilePictureLink?: string;
  coverPictureLink?: string;
  nikNumber?: string;
  nikPicture?: string;
  nikPictureLink?: string;
  birthday?: string;
  simCar?: string;
  simCarPicture?: string;
  simCarPictureLink?: string;
  dob?: string;
  ktaNumber?: string;
  postalCode?: string;
  registerTime?: number;
  nationality?: string;
  packageName?: string;
  status?: string;
  rtRwNumber?: string;
  clubPicName?: string;
  clubPicPhone?: string;
  referralCode?: string;
  promoterUuid?: string;
  userPackageId?: number;
  merchantPic?: string;
  companyName?: string;
  companyNpwp?: string;
  hotline?: string;
  businessType?: string;
  companyAddress?: string;
  companyEmail?: string;
  ktp?: string;
  ktpPicture?: string;
  city?: string;
  district?: string;
  ward?: string;
  role?: string;
  isImiAdmin?: boolean | null;
  isApproved?: boolean | null;
  star?: string;
  note?: string;
  packageId?: number;
  membershipKisList?: MembershipKisList[];
  promotorName?: string;
  picName?: string;
  gPoint?: number;
  subscribingPackage?: SubscribingPackage;
  identification?: Identification;
  hobbies?: Category[];
  statusPackage?: string;
  clubInfo?: ClubInfo;
  nikType?: string;
  cities?: Address;
  districts?: Address;
  wards?: Address;
  province?: Province;
}

export interface ClubInfo {
  clubName?: string;
  personInChargeName?: string;
  picPhoneNumber?: string;
  clubAdmin?: string;
  adminPhoneNumber?: string;
  clubStatus?: MemberStatus;
  clubPackageStatus?: MemberStatus;
}
export interface Identification {
  identifierKitasNumber?: string;
  identifierKtpNumber?: string;
  identifierNikNumber?: string;
}
export interface SubscribingPackage {
  id?: number;
  membershipId?: number;
  code?: string;
  name?: string;
  initFee?: number;
  annualFee?: number;
  renewalFee?: number;
  color?: string;
  iconUrl?: string;
  defaultBackground?: string;
  active?: boolean;
}
export interface ClubListRequest {
  id?: number;
  provinceId?: number;
  size?: number;
  paging?: string;
  typeIn?: string;
  status?: string;
}
export interface KtaNumberRequest {
  ktaNumber?: string;
}

export interface MembershipKis {
  kisProvinceId?: number;
  kisName?: string;
  kisId?: string;
  provinceName?: string;
  status?: string;
  kisStatus?: string;
  price?: number;
  enrolledDate?: number;
  expiredDate?: number;
  kisType?: KisType;
}
