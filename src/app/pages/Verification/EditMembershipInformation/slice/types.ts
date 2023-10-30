/* --- STATE --- */
import {
  UserPackage,
  Province,
  Member,
  FileUpload,
  PageableClub,
  Package,
  Club,
  IndividualInformation,
} from 'types';

export interface EditIndividualMemberState {
  individualInformation?: IndividualInformation;
  userPackage?: UserPackage;
  provinces?: Province[];
  fileUploadRequests?: FileUpload[];
  memberCreateRequest?: Member;
}
