import { Pageable, Category } from 'types';
import {
  AssociationInformationType,
  ClubAssociationInformationType,
} from 'types/AssociationManagement';

/* --- STATE --- */
export interface ClubAssociationInformationState {
  associationInformation?: AssociationInformationType;
  clubAssociationInformation?: Pageable<ClubAssociationInformationType>;
  clubCategories?: Category[];
  isApproved?: boolean;
}
