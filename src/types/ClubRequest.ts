import { Club, MembershipRequestType, Document } from 'types';
import { number, string } from 'yup/lib/locale';

import { ClubInformation } from './ClubManagement';

export interface ClubRequest {
  id: number;
  name: string;
  picClub: string;
  clubCode: number;
  type: MembershipRequestType;
  path: string;
  date: Date;
}

export interface RequestJoinClubList {
  id?: number;
  clubId?: number;
  communityId?: number;
  role?: string;
  roles?: string[];
  phone?: string;
  nikNumber?: string;
  ktaNumber?: string;
  userUuid?: string;
  name?: string;
  status?: string;
  title?: string[];
  createdDate?: number;
  modifiedDate?: number;
  provinceName?: string;
  avatarUrl?: string;
  membershipId?: number;
  fullName?: string;
}

export interface ClubDocumentSubmit {
  documents: Document[];
  club?: ClubInformation;
  key?: string;
  forms?: any;
}

export interface ClubInfo {
  id?: number;
  star?: number;
  artDocumentsApproval?: boolean;
}
