import { PackageNewMemberType } from './enums';
import { MemberProfile } from './Member';

export interface Profile {
  userUuid?: string;
  username?: string;
  group?: string;
  uuid?: string;
  phone?: string;
  membershipStatus?: string;
  profile?: MemberProfile;
  status?: string;
  isEnable?: boolean;
  membership?: string[];
  isIndividual?: boolean;
  isClubPic?: boolean;
  isImiClubStandard?: boolean;
  nikNumber?: string;
  fullName?: string;
  identification?: any;
  isAssociationAdmin?: boolean;
  activePackage?: ActivePackage;
  isClubAdmin?: boolean;
}

export interface PhoneNumberRequest {
  number?: string;
  type?: string;
}

export interface ActivePackage {
  code: PackageNewMemberType;
  id: number;
}
