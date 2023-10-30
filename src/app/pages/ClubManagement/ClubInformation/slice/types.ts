import {
  Category,
  ClubInformation,
  Pageable,
  RequestJoinClubList,
} from 'types';

/* --- STATE --- */
export interface ClubInformationState {
  clubInformation?: ClubInformation;
  clubCategories: Category[];
  clubMembersPageable?: Pageable<RequestJoinClubList>;
}
