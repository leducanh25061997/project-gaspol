import { ClubInformation, Pageable, RequestJoinClubList } from 'types';
import { PromoterInformation } from 'types/PromoterManagement';

/* --- STATE --- */
export interface PromoterInformationState {
  promoterInformation?: PromoterInformation;
}
