import { Pageable, MembershipRequest } from 'types';

/* --- STATE --- */
export interface BusinessPartnerInformationState {
  businessPartnerInformation?: MembershipRequest;
  clubMembersPageable?: Pageable<MembershipRequest>;
}
