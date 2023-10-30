/* --- STATE --- */

import { ClubRequest, Pageable } from 'types';

export interface ClubRequestState {
  clubRequestsPageable?: Pageable<ClubRequest>;
}
