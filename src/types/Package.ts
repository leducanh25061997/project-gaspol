interface PackageDescriptions {
  id: number;
  code: string;
  name: string;
}

export interface UsersPackage {
  id?: number;
}

export interface Package {
  id: number;
  membershipId: number;
  code: string;
  name: string;
  initFee: number;
  annualFee: number;
  renewalFee: number;
  processingFee: number;
  color: string;
  packageDescriptions: PackageDescriptions;
  active?: boolean;
}
