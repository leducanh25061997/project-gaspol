import { Pageable, RequestJoinClubList } from 'types';

/* --- STATE --- */
export interface MemberRequestJoinClubState {
  membersList?: Pageable<RequestJoinClubList>;
}
