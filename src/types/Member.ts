import { Gender, bloodType, UsersPackage } from 'types';

import { ClubRequestStatus } from './enums';
import { IndividualInformation } from './MembershipRequest';

export interface Member {
  name?: string;
  phone?: string;
  province?: string;
  postalCode?: string;
  address?: string;
  packageId?: number;
  gender?: Gender | string;
  hobby?: string;
  bloodType?: bloodType | string;
  birthDay?: string;
  birthPlace?: string;
  club?: string;
  nationality?: string;
  profilePicture?: string;
  nikPicture?: string;
  simPicture?: string;
  nikNumber?: string;
  sim?: string;
  email?: string;
  imiPaid?: boolean;
  expiredDate?: string;
}
export interface Memberships {
  id?: number;
  code?: string;
  name?: string;
  icon?: string;
  type?: string;
}
export interface MembershipsRespon {
  pkForm?: any[];
  userPackage?: UsersPackage;
  uuid?: string;
}
export interface MembershipsReponAblepage {
  data?: MembershipsRespon;
}

export interface MemberProfile {
  userUuid?: string;
  nickname?: string;
  emai?: string;
  updatedAt?: string;
  accumulatedPoints?: string;
  profile?: string;
  province?: string;
  website?: string;
  status?: string;
  middleName?: string;
  fullName?: string;
  bloodType?: string;
  followers?: string;
  familyName?: string;
  locale?: string;
  gender?: string;
  givenName?: string;
  driveLicenseNumber?: string;
  username?: string;
  picture?: string;
  birthdate?: string;
  zoneinfo?: string;
  address?: string;
  memberType?: string;
  expireDate?: string;
  imiId?: string;
  provinceIdentityCardNumber?: string;
  qrCode?: string;
  postalCode?: string;
  birthPlace?: string;
  hobby?: string;
  invitorPhone?: string;
  phone?: string;
  group?: string;
  nikNumber?: string;
}

export interface MemberJoinClub {
  status: ClubRequestStatus;
  id?: string;
}

export interface NewMember {
  requestCheckout?: boolean;
  packageId?: number;
  kta?: IndividualInformation;
}
