import { MerchantRequests, Pageable } from 'types';

/* --- STATE --- */
export interface MerchantRequestState {
  merchantRequestsPageable?: Pageable<MerchantRequests>;
}
