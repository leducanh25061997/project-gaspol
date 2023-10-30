import { IndividualInformation } from './MembershipRequest';

export interface PromoterInformation extends IndividualInformation {
  documents?: string[];
  documentLinks?: string[];
}
