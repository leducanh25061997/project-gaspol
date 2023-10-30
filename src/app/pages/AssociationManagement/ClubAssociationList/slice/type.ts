import { Pageable, Province } from 'types';
import {
  AssociationList,
  AssociationManagement,
} from 'types/AssociationManagement';

export interface ClubAssociationManagementState {
  provinces?: Province[];
  associationManagement?: Pageable<AssociationList>;
  isLoading?: boolean;
}
