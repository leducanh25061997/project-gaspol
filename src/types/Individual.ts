import { Province, Club, IndividualInformation } from 'types';

export interface IndividualRequest extends IndividualInformation {
  province?: Province;
  packageId?: number;
  birthDay?: string;
  club?: Club;
  imiPaid?: boolean;
  contentPreference?: any[];
}
