/* --- STATE --- */
import { Pageable, FilterListParams } from 'types';
import { ClaimList } from 'types/ClaimList';

export interface ClaimListState {
  claimList?: ClaimData;
  isLoading?: boolean;
  exporting?: boolean;
}

export interface ClaimData {
  data: ClaimList[];
  count: number;
}
export interface FilterParams extends FilterListParams {
  status?: FilterStatusType | undefined;
}

export type FilterStatusType = 'PENDING' | 'DONE';
