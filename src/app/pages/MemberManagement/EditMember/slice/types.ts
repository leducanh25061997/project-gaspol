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
  IndividualInformation,
  IndividualInformationV2,
} from 'types';

export interface EditMemberState {
  clubsRequest: PageableClub<Club>;
  provinceRequests: Province[];
  memberInformation?: IndividualInformationV2;
  fileUploadRequests?: FileUpload[];
  memberCreateRequest?: IndividualRequest;
  urlImagesRequest?: any;
  packagesRequest?: Package[];
  profile?: Profile[];
  hobby?: Category[];
  hobbies?: string[];
  city?: Address[];
  district?: Address[];
  ward?: Address[];
  checkKtaNumberUnique?: boolean;
  birthPlaceCity?: Address[];
  loading?: boolean;
}
