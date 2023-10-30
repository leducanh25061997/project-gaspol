/* --- STATE --- */
import { Province, MemberReport, Pageable, PageableClub, Club } from 'types';
import {
  ChangeHistory,
  MemberHistory,
  UpgradeKis,
  DownloadCard,
} from 'types/Report';

export interface MemberReportState {
  provinces?: Province[];
  memberReport?: MemberReport;
  membershipHistory?: Pageable<MemberHistory>;
  isLoadingKTA?: boolean;
  exportKtaMembership?: string;
  isLoadingExportKTA?: boolean;
  changeHistoryClub?: Pageable<ChangeHistory>;
  isLoadingChangeHistory?: boolean;
  exportChangeHistoryClub?: string;
  isLoadingExportChangeHistory?: boolean;
  upgradeKis?: Pageable<UpgradeKis>;
  isLoadingUpgradeKis?: boolean;
  exportUpgradeKis?: string;
  isLoadingExportUpgradeKis?: boolean;
  downloadCard?: Pageable<DownloadCard>;
  isLoadingDownloadCard?: boolean;
  exportDownloadCard?: string;
  isLoadingExportDownloadCard?: boolean;
  clubsRequest?: PageableClub<Club>;
}
