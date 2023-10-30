/* --- STATE --- */
import { MembershipRequest, Pageable, Province } from 'types';
import { CardPrinting } from 'types/CardPrintingManagement';

export interface MemberManagementState {
  membersDataPageable?: Pageable<MembershipRequest>;
  provinces?: Province[];
  cardPrinting?: CardPrinting;
  isLoading?: boolean;
}
