import { RootState } from './RootState';

export type { RootState };

export type { GPRoute, GPSidebarMenu, GPSidebarSubMenu } from './Sidebar';

export type {
  AuthParams,
  AuthResponse,
  UserProfile,
  UserInfomation,
} from './Auth';

export type { KeycloakError } from './Keycloak';

export type {
  Club,
  Clubdata,
  ClubParams,
  ClubFormRequest,
  ClubResponse,
} from './Club';
export type { IndividualRequest } from './Individual';
export type { Transaction, TransactionHistory } from './Transaction';
export type { PointHistory, RequestPointHistory } from './Point';
export type { UserPackage } from './UserPackage';
export type { MerchantRequests } from './Merchant';
export type {
  FilterParams,
  FilterMemberParams,
  FilterMemberValue,
  FilterBusinessPartnerValue,
  FilterAdminMembership,
  FilterIndividualMemberValue,
  clubFilterParams,
  FilterAssociationParams,
  FilterListParams,
} from './FilterParams';

export type {
  PackageType,
  RequestStatus,
  Gender,
  MembershipRequestType,
  ClubCode,
  bloodType,
  MemberStatus,
  OrderType,
  KisStatus,
  MembershipType,
  PackageMemberType,
  UserPackageType,
  MemberRoles,
  AddressField,
  Stars,
  Upload,
  ClubRequestStatus,
  PackageNewMemberType,
} from './enums';

export interface Pageable<T> {
  data: T[];
  total: number;
  count?: number;
}

export interface PageableClub<T> {
  data: T[];
  nextToken: string;
  isLastItem: boolean;
  isFetching: boolean;
  change: boolean;
  size: number;
  requestSize: number;
  isScroll: boolean;
}

export type {
  Member,
  Memberships,
  MembershipsRespon,
  MembershipsReponAblepage,
  MemberJoinClub,
  NewMember,
} from './Member';
export type { DashboardData } from './Dashboard';
export type { MemberReport, ClubReport } from './Report';
export type { KisInfo, AuditTrail } from './Kis';
export type { CardPrintingRequest } from './CardPrintingManagement';
export type {
  MembershipRequest,
  Membership,
  IndividualInformation,
  IndividualInformationV2,
  ClubListRequest,
  KtaNumberRequest,
} from './MembershipRequest';
export type {
  ClubRequest,
  RequestJoinClubList,
  ClubDocumentSubmit,
  ClubInfo,
} from './ClubRequest';

export type {
  ClubManagementCreate,
  CreateClubFormRequest,
  FormParams,
  CreateClubFormData,
  ClubInformation,
  UpdateClubFormRequest,
  EditClubFormRequest,
  CreateClubRequestMembers,
} from './ClubManagement';
export type { Province, Address, AddressRequest } from './Province';
export type { Package, UsersPackage } from './Package';
export type { Category } from './Categories';
export type { Profile, PhoneNumberRequest } from './PhoneNumber';
export type {
  FileUpload,
  ParamsUrl,
  ParamsUpload,
  ResponseError,
} from './FileUpload';
export type { TableHeaderProps, FilterData, FilterList } from './Table';

export type { Bank } from './Bank';
export type { Document } from './Document';

export type WithCallBack<T> = {
  params: T;
  onSuccess?: (e?: any) => void;
  onError?: (e?: any) => void;
  finally?: () => void;
};
