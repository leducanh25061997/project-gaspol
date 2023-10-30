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
} from 'types';
import { checkAssociationNameInfo } from 'types/AssociationManagement';

export interface CreateAssociationState {
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
  checkAssociation?: checkAssociationNameInfo;
  isLoading?: boolean;
}
