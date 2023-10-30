export interface MemberReport {
  totalNewKta?: number;
  totalNewKtaMobility?: number;
  totalNewKtaPro?: number;
  totalRenewKta?: number;
  totalRenewKtaMobility?: number;
  totalRenewKtaPro?: number;
  totalUserDownloads?: number;
  totalOfdownloads?: number;
  totalChange?: number;
  totalMemberOfUpgraded?: number;
  totalOfUpgradedKisTypes?: number;
  totalOfUpgradeToPro: number;
}
export interface ClubReport {
  StatisticReportingTkt?: ClubReportData;
  StatisticReportingTAAAssociation?: AssociationReportData;
}
export interface ClubReportData {
  totalTktClubActive?: number;
  totalTktClubExpired?: number;
  totalTktClubRenew?: number;
  totalFourStarClubActive?: number;
  totalThreeStarClubActive?: number;
  totalTwoStarClubActive?: number;
  totalOneStarClubActive?: number;
  totalNewTktClub?: number;
}
export interface AssociationReportData {
  totalAssociationActive?: number;
  totalAssociationExpired?: number;
  totalAssociationRenew?: number;
  totalFourStarAssociationActive?: number;
  totalThreeStarAssociationActive?: number;
  totalTwoStarAssociationActive?: number;
  totalOneStarAssociationActive?: number;
  totalNewAssociation?: number;
}

export interface MemberHistory {
  id: number;
  enrollmentType: string;
  userUuid: string;
  fullName: string;
  ktaNumber: string;
  packageName: string;
  provinceName: string;
  transactionTime: number;
  avatar: string;
  totalPrice: number;
  phone: string;
  clubJoined?: string;
  transactionId?: string;
  expirationDate: number;
}

export interface MemberHistoryParams {
  page: number;
  size: number;
  provinceId: any;
  searchKey: string;
  startDate: number;
  endDate: number;
  packageType: string[];
  enrollmentType: string[];
}

export enum PackageType {
  KTA_PRO = 'KTA_PRO',
  KTA_MOBILITY = 'KTA_MOBILITY',
}

export enum EnrollmentType {
  NEW_ENROLL = 'NEW_ENROLL',
  RENEW = 'RENEW',
  UPGRADE_PRO = 'UPGRADE_PRO',
}

export enum EnrollmentLowerCase {
  NEW_ENROLL = 'New enrollment',
  RENEW = 'Renew',
  UPGRADE_PRO = 'Upgrade to Pro',
}

export enum MemberType {
  LESS_THAN_15 = 'LESS_THAN_15',
  MORE_THAN_15 = 'MORE_THAN_15',
}

// export enum MemberType {
//   LESS_THAN_15 = 'Less than 15',
//   MORE_THAN_15 = '15 members or more',
// }

export interface ChangeHistoryParams {
  page: number;
  size: number;
  provinceId: any;
  searchKey: string;
  startDate: number;
  endDate: number;
}

export interface ChangeHistory {
  id: number;
  ktaId?: string;
  ktaName: string;
  ktaNumber: string;
  oldClubName: string;
  newClubName: string;
  oldProvinceName: string;
  newProvinceName: string;
  approveTime: number;
  avatar: string;
}

export interface UpgradeKis {
  id: number;
  avatar: string;
  fullName: string;
  ktaNumber: string;
  nikNumber: string;
  clubName: string;
  provinceName: string;
  ktaProvinceName: string;
  kisName: string;
  transactionTime: number;
}

export interface UpgradeKisParams {
  page: number;
  size: number;
  provinceId: any;
  searchKey: string;
  startDate: number;
  endDate: number;
}

export interface DownloadCard {
  id: number;
  cardName: string;
  phoneNumber: string;
  provinceName: string;
  clubName: string;
  requestedBy: string;
  requestedDate: number;
  processedBy: string;
  generatedDate: number;
  downloadCount: number;
}

export interface DownloadCardParams {
  page: number;
  size: number;
  provinceId: any;
  searchKey: string;
  fromDate: number;
  toDate: number;
  clubId: string;
}

export interface TktClub {
  clubName: string;
  star: number;
  provinceId: number;
  clubCode: string;
  createdTime: number;
  id: number;
  clubStatus: string;
  provinceName: string;
  packageName: string;
  packageCode: string;
  packageStatus: string;
  clubAdmin: string;
  enrollmentType?: string;
  memberNo: number;
  expiredDate?: number;
  transactionId: string;
  transactionTime: number;
}

export interface TktClubParams {
  page: number;
  size: number;
  provinceId: any;
  searchKey: string;
  startDate: number;
  endDate: number;
  clubType?: string;
  memberNo?: string[];
  enrollmentType?: string[];
}
