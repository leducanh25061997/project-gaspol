import { CardPrintingStatus } from './enums';
export interface CardPrintingRequest {
  page?: number;
  size?: number;
  membershipId?: string;
  searchKey?: string;
  status?: string[];
  orders?: string[];
  provinceId?: string;
  clubId?: string;
  fromDate?: string;
  toDate?: string;
}

export interface CardPrintingResponse {
  count?: number;
  data: CardPrinting[];
}

export interface CardPrinting {
  id?: number;
  cardName?: string;
  phoneNumber?: string;
  provinceName?: string;
  downloadedBy?: string;
  clubName?: string;
  requestedBy?: string;
  requestedDate?: number;
  processedBy?: string;
  generatedDate?: number;
  downloadedDate?: number;
  downloadCount?: number;
  status?: CardPrintingStatus;
}

export interface RequestDownloadCard {
  id?: number;
  membershipId?: number;
  status?: CardPrintingStatus;
  ids?: number[];
}
