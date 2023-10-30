import { MembershipRequest, Pageable } from 'types';

export interface MembershipRequestsState {
  membershipRequestsPageable?: Pageable<MembershipRequest>;
}
