export enum PackageType {
  MOBILITY = 'Mobility',
  CLUB_STANDARD = 'Club Standard',
}

export enum RequestStatus {
  MISSING_DATA = 'Missing - Data',
  IN_QUEUING = 'In Queuing',
  FREEZED = 'Freezed',
  NO_RESPONSE = 'No-Response',
  DRAFT = 'draft',
}

export enum Roles {
  PRIME_MEMBER = 'Prime Member',
  SUB_MEMBER = 'Sub Member',
  CLUB_ADMIN = 'Club admin',
  PRESIDENT = 'PRESIDENT',
  SECRETARY = 'SECRETARY',
  ADMIN = 'ADMIN',
  FINANCE = 'FINANCE',
  VICE_PRESIDENT = 'VICE_PRESIDENT',
  HUMAN_RESOURCE = 'HUMAN_RESOURCE',
}

export enum ViewRoles {
  PRESIDENT = 'President',
  SECRETARY = 'Secretary',
  ADMIN = 'Admin',
  FINANCE = 'Finance',
  VICE_PRESIDENT = 'Vice President',
  HUMAN_RESOURCE = 'Human Resource',
}

export enum MemberStatus {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  BANNED = 'BANNED',
  DRAFT = 'DRAFT',
  PROCESSING = 'PROCESSING',
  VERIFYING = 'ACTIVE',
  APPROVED = 'APPROVED',
  PAYMENT_FAILED = 'PAYMENT FAILED',
  PAYMENT_PROCESSING = 'PAYMENT PROCESSING',
  PAYMENT_ERROR = 'ACTIVATED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  DONE = 'DONE',
  ACTIVATED = 'ACTIVATED',
  SUCCESS = 'SUCCESS',
  ACCEPTED = 'ACTIVATED',
  ERROR = 'FAILED',
  WAITING = 'WAITING',
}

export enum MemberStatusLowerCase {
  CREATED = 'Created',
  ACTIVE = 'Activated',
  EXPIRED = 'Expired',
  ACTIVATED = 'Activated',
  BANNED = 'Banned',
  DRAFT = 'Draft',
  PROCESSING = 'Processing',
  VERIFYING = 'Activated',
  APPROVED = 'Approved',
  PAYMENT_FAILED = 'Payment failed',
  PAYMENT_PROCESSING = 'Payment processing',
  REJECTED = 'Rejected',
  PENDING = 'Processing',
  FAILED = 'Failed',
  DONE = 'Done',
  SUCCESS = 'Success',
  ERROR = 'Failed',
  ACCEPTED = 'Activated',
  WAITING = 'Waitting',
}

export enum PackageStatusLowerCase {
  CREATED = 'Active',
  ACTIVE = 'Active',
  EXPIRED = 'Expired',
  BANNED = 'Banned',
  DRAFT = 'Draft',
  PROCESSING = 'Processing',
  VERIFYING = 'Verifying',
  APPROVED = 'Approved',
  PAYMENT_FAILED = 'Payment failed',
  PAYMENT_PROCESSING = 'Active',
  PAYMENT_ERROR = 'Active',
  REJECTED = 'Rejected',
  PENDING = 'Processing',
  FAILED = 'Failed',
  DONE = 'Done',
  ERROR = 'Failed',
  SUCCESS = 'Success',
  ACCEPTED = 'Accepted',
  ACTIVATED = 'Activated',
}

export enum MemberListStatusLowerCase {
  CREATED = 'Created',
  ACTIVE = 'Active',
  EXPIRED = 'Expired',
  ACTIVATED = 'Activated',
  BANNED = 'Banned',
  DRAFT = 'Draft',
  PROCESSING = 'Processing',
  VERIFYING = 'Activated',
  APPROVED = 'Approved',
  PAYMENT_FAILED = 'Payment failed',
  PAYMENT_PROCESSING = 'Payment processing',
  REJECTED = 'Rejected',
  PENDING = 'Processing',
  FAILED = 'Failed',
  DONE = 'Done',
  SUCCESS = 'Success',
  ERROR = 'Failed',
  ACCEPTED = 'Activated',
}

export enum PackageStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  BANNED = 'BANNED',
  DRAFT = 'DRAFT',
  PROCESSING = 'PROCESSING',
  VERIFYING = 'VERIFYING',
  APPROVED = 'ACTIVE',
  PAYMENT_FAILED = 'PAYMENT FAILED',
  PAYMENT_PROCESSING = 'PAYMENT PROCESSING',
  REJECTED = 'BANNED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  DONE = 'DONE',
  ACTIVATED = 'ACTIVATED',
  CREATED = 'ACTIVE',
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum MembershipRequestType {
  NEW = 'New',
  RE_NEW = 'Re-New',
}
export enum PackageMemberType {
  IMI_MOBILITY_STANDARD = 'IMI_MOBILITY_STANDARD',
  IMI_CLUB_STANDARD = 'IMI_CLUB_STANDARD',
}

export enum PackageNewMemberType {
  KTA_MOBILITY = 'KTA_MOBILITY',
  KTA_PRO = 'KTA_PRO',
  BASIC_ACCOUNT = 'BASIC_ACCOUNT',
}

export enum ClubCode {
  SPORT = 'Sport',
  RACING = 'Racing',
  SHARING = 'Sharing',
  TRADING = 'Trading',
}

export enum MembershipType {
  KTA = 'KTA',
  TKT = 'TKT',
  TAA = 'TAA',
  GASPOL_MERCHANT = 'GASPOL_MERCHANT',
  TAA_PROMOTOR = 'TAA_PROMOTOR',
  TAA_BUSINESS_PARTNER = 'TAA_BUSINESS_PARTNER',
  TAA_ASSOCIATION = 'TAA_ASSOCIATION',
}
export enum KisStatus {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE',
}

export enum OrderType {
  ASC = 'asc',
  DESC = 'desc',
}

export enum bloodType {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O',
}

export enum UserPackageType {
  TKT = 'TKT',
  KTA = 'KTA',
  TAA = 'TAA',
}

export enum ErrorCode {
  DATA_DUPLICATED = 'DATA_DUPLICATED',
}

export enum MemberRoles {
  PERSON_IN_CHARGE = 'PERSON_IN_CHARGE',
}

export enum AddressField {
  CITY = 'CITY',
  DISTRICT = 'DISTRICT',
  WARD = 'WARD',
  BIRTH_PLACE = 'BIRTH_PLACE',
}

export enum Stars {
  ZERO = '0',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
}

export enum Upload {
  UPLOAD = 'upload',
  NOTUPLOAD = 'notUpload',
}

export enum ClubRequestStatus {
  VERIFYING = 'VERIFYING',
  APPROVED = 'APPROVED',
}

export enum BusinessPartner {
  TAA_BUSINESS_PARTNER = 'TAA_BUSINESS_PARTNER',
}

export enum TransactionType {
  INVITE_FRIEND = 'INVITE_FRIEND',
}

export enum PackageName {
  KTA_MOBILITY = 'KTA Mobility',
  KTA_PRO = 'KTA Pro',
  BASIC_ACCOUNT = 'Basic',
}

export enum CardPrintingStatus {
  REQUESTED = 'REQUESTED',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  AVAILABLE = 'AVAILABLE',
  ERROR = 'ERROR',
}
export enum KisType {
  CAR = 'CAR',
  MOTOR = 'MOTOR',
}
