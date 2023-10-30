/* --- STATE --- */
import {
  Province,
  Member,
  FileUpload,
  PageableClub,
  Package,
  Club,
  Profile,
  IndividualRequest,
  Category,
  Address,
  Bank,
  Pageable,
} from 'types';
import {
  AssociationInformationType,
  checkAssociationNameInfo,
  ClubAssociationInformationType,
} from 'types/AssociationManagement';

export interface EditAssociationState {
  clubsRequest: PageableClub<Club>;
  provinceRequests: Province[];
  fileUploadRequests?: FileUpload[];
  memberAssociationRequest?: IndividualRequest;
  urlImagesRequest?: any;
  packagesRequest?: Package;
  profile?: Profile;
  clubCategories?: Category[];
  hobby?: Category[];
  city?: Address[];
  district?: Address[];
  ward?: Address[];
  banks?: Bank[];
  associationInformation?: AssociationInformationType;
  clubAssociationInformation?: Pageable<ClubAssociationInformationType>;
  editClub?: EditClubStatus;
  checkAssociation?: checkAssociationNameInfo;
  isLoading?: boolean;
}

export enum EditClubStatus {
  ADDED = 'ADDED',
  REMOVED = 'REMOVED',
  LOADING = 'LOADING',
}

export enum Status {
  WAITING = 'WAITING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}
