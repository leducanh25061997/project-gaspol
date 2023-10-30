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
} from 'types';

export interface CreateMemberState {
  clubsRequest: PageableClub<Club>;
  provinceRequests: Province[];
  fileUploadRequests?: FileUpload[];
  memberCreateRequest?: IndividualRequest;
  urlImagesRequest?: any;
  packagesRequest?: Package[];
  packageProRequest?: Package;
  profile?: Profile[];
  hobby?: Category[];
  city?: Address[];
  district?: Address[];
  ward?: Address[];
  birthPlaceCity?: Address[];
}
