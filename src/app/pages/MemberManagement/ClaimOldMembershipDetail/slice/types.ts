import { IndividualInformation } from 'types';
import { ClaimList, OldMemberListType } from 'types/ClaimList';

/* --- STATE --- */
export interface MemberJoinClubDetailState {
  memberInformation?: IndividualInformation;
}

export interface ClaimDetailState {
  claimDetail?: ClaimList;
  oldMemberList?: OldMemberListDataType;
  isActive?: boolean;
  isLoading?: boolean;
  loading?: boolean;
}

export interface OldMemberListDataType {
  data: OldMemberListType[];
  count: number;
}
