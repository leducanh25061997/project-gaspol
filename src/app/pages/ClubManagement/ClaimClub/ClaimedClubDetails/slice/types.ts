/* --- STATE --- */
export interface ClaimedClubDetailsState {
  clubDetails: { data?: ClaimClubDetailsResponse; loading: boolean };
  oldMemberList: {
    data?: OldMemberItem[];
    filter: FilterParams;
    total: number;
  };
}

export interface FilterParams {
  page: number;
  size: number;
}

export interface OldMemberListRequestParams {
  claimId: string | number;
  filter: FilterParams;
}

export interface ClaimClubDetailsResponse {
  name: string;
  ktaNumber: string;
  identificationNumber: string;
  phone: string;
  clubName: string;
  clubPrivacy: string;
  clubCategory: string;
  extarnalLink: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  oldArtDocuments: string;
  oldCertDocuments: string;
  oldCertNumber: string;
  oldAdditionalDocuments: string;
  province: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  rtRwNumber: string;
  postCode: string;
  packageName: string;
  packageStatus: string;
  oldClubCode: string;
  newClubCode: string;
  expirationDate: number;
  description: string;
  clubMembershipId: string;
  status: string;
  securityCode: string;
}

export interface OldMemberListResponse {
  data: OldMemberItem[];
  total: number;
}

export interface OldMemberItem {
  userUuid: string;
  phone: string;
  fullName: string;
  clubMembershipId: number;
  ktaNumber: string;
  packageStatus: 'EXPIRED' | 'ACTIVE';
  status: 'ACTIVE' | 'BANNED';
  roles: {
    title: string;
    role: string;
  }[];
}

export interface AssignAdminParams {
  userUuid: string;
  claimId: string;
}
