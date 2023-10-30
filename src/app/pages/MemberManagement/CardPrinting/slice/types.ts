/* --- STATE --- */
import { CardPrintingRequest, Pageable, Province, ClubResponse } from 'types';
import { CardPrinting } from 'types/CardPrintingManagement';

export interface CardPrintingManagementState {
  cardPrintingDataPageable?: Pageable<CardPrintingRequest>;
  cardPrintingApprovedDataPageable?: Pageable<CardPrintingRequest>;
  provinces?: Province[];
  clubs?: ClubResponse;
  cardPrinting?: CardPrinting;
  downloadLink?: string;
  exportLink?: string;
  isLoading?: boolean;
}
