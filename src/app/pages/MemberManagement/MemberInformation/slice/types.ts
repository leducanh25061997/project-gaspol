import {
  CardPrintingRequest,
  IndividualInformationV2,
  Pageable,
  RequestPointHistory,
  TransactionHistory,
} from 'types';
import { CardPrinting } from 'types/CardPrintingManagement';
import { ClubHistoryType } from 'types/ClubHistoryType';
import { MembershipKis } from 'types/MembershipRequest';

/* --- STATE --- */
export interface MemberInformationState {
  memberInformation?: IndividualInformationV2;
  pointHistoryPageable?: Pageable<RequestPointHistory>;
  transactionHistoryPageable?: Pageable<TransactionHistory>;
  downloadHistoryPageable?: Pageable<CardPrintingRequest>;
  clubHistoryPageable?: Pageable<ClubHistoryType>;
  userPoint?: number;
  cardPrinting?: CardPrinting;
  membershipKis?: MembershipKis[];
  loading: boolean;
}
