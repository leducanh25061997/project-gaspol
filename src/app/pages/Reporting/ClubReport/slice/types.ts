/* --- STATE --- */
import { Province, ClubReport, Pageable } from 'types';
import { TktClub } from 'types/Report';

export interface ClubReportState {
  provinces?: Province[];
  clubReport?: ClubReport;
  TKTClub?: Pageable<TktClub>;
  isLoadingTKTClub?: boolean;
  exportTKTClub?: string;
  isLoadingExportTKTClub?: boolean;
}
