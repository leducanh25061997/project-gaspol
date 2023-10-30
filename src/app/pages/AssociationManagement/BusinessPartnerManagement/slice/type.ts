import { MembershipRequest, Pageable, Province } from 'types';

export interface BusinessPartnerManagementState {
  membersDataPageable?: Pageable<MembershipRequest>;
  provinces?: Province[];
  isLoading?: boolean;
}
