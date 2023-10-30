import { MembershipRequest, Pageable, Province } from 'types';

/* --- STATE --- */
export interface ClubManagementState {
  clubList?: Pageable<MembershipRequest>;
  provinces?: Province[];
  isLoading?: boolean;
}
