/* --- STATE --- */
import {
  Category,
  Membership,
  Package,
  Profile,
  CreateClubFormData,
  Province,
  Address,
  ClubInformation,
  Bank,
  FileUpload,
  RequestJoinClubList,
  Pageable,
} from 'types';

export interface EditClubState {
  club: ClubInformation;
  createClub?: CreateClubFormData;
  provinces: Province[];
  membership?: Membership[];
  packages?: Package[];
  clubCategories: Category[];
  kisCategories?: Category[];
  profiles?: Profile[];
  city?: Address[];
  district?: Address[];
  ward?: Address[];
  banks?: Bank[];
  profile: Profile;
  fileUploadRequests?: FileUpload[];
  clubMembersPageable?: Pageable<RequestJoinClubList>;
}
