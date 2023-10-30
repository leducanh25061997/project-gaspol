/* --- STATE --- */
import {
  Category,
  Membership,
  Package,
  Profile,
  CreateClubFormData,
  Province,
  Address,
  Bank,
  FileUpload,
} from 'types';
import { checkClubname } from 'types/ClubManagement';

export interface CreateClubState {
  createClub?: CreateClubFormData;
  provinces: Province[];
  membership?: Membership[];
  package?: Package[];
  clubCategories: Category[];
  kisCategories?: Category[];
  profiles?: Profile[];
  city?: Address[];
  district?: Address[];
  ward?: Address[];
  banks?: Bank[];
  fileUploadRequests?: FileUpload[];
  packageProRequest?: Package;
  profile: Profile;
  duplicateName?: checkClubname;
}
