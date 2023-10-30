import { Club, Transaction, IndividualInformation } from 'types';

export interface UserPackage {
  transactionInfo: Transaction;
  individualInfo: IndividualInformation;
  clubInfo: Club;
}
