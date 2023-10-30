/* --- STATE --- */
import { KisInfo, Pageable, Province } from 'types';

export interface KisManagementState {
  kisPageable?: Pageable<KisInfo>;
  provinces: Province[];
  kisInformation?: KisInfo;
  isLoading?: boolean;
}
