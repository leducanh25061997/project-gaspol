import { MembershipRequest, Pageable, Province } from 'types';

/* --- STATE --- */
export interface PromoterManagementState {
  promoterList?: Pageable<MembershipRequest>;
  provinces?: Province[];
  isLoading?: boolean;
}
