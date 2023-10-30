export interface ClubHistoryType {
  approveTime: any;
  oldClubName: string;
  newClubName: string;
  oldProvinceName: string;
  newProvinceName: string;
}

export interface ClubHistoryRequestData {
  size: number;
  page: number;
  membershipId?: number;
}
