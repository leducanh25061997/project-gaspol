const path = {
  root: '/',
  dashboard: '/dashboard',
  verification: '/verification',
  verifyIndividualMember: '/verification/verify-individual-member',
  verifyIndividualMemberDetails: '/verification/verify-individual-member/:id',
  verifyEditIndividualMember: '/verification/verify-individual-member/edit/:id',
  // verifyClub: '/verification/verify-club',
  // verifyClubDetails: '/verification/verify-club/:id',
  verifyPromoter: '/verification/verify-promoter',
  verifyAssociation: '/verification/verify-association',
  verifyMerchant: '/verification/verify-merchant',
  verifyMerchantDetails: '/verification/verify-merchant/:id',

  reporting: '/reporting',
  memberReport: '/reporting/member-report',
  clubReport: '/reporting/club-report',
  clubAssociationReport: '/reporting/club-association-report',

  memberships: '/memberships',
  createMember: '/memberships/create',
  memberManagement: '/memberships/list',
  memberEdit: '/memberships/edit/:id',
  memberInformation: '/memberships/:id',
  memberRequestJoinClub: '/memberships/request-join-club',
  memberJoinClubDetail: '/memberships/request-join-club/:id',
  memberClaim: '/memberships/member-claim',
  memberClaimDetail: '/memberships/member-claim/:id',
  kis: '/kis',
  kisManagement: '/kis/management',
  kisManagementProvince: '/kis/province',
  cardPrinting: '/card-printing',

  club: '/clubs',
  createClub: '/clubs/create',
  clubManagement: '/clubs/list',
  clubEdit: '/clubs/edit/:id',
  clubInformation: '/clubs/:id',
  claimClubList: '/clubs/claim-club-list',
  claimClubDetails: '/clubs/claim-club-details/:id',

  merchant: '/merchant',
  createMerchant: '/merchant/create',
  merchantsList: '/merchant/list',

  associations: '/associations',
  createAssociations: '/associations/create',
  editAssociation: '/associations/edit/:id',
  clubAssociationList: '/associations/club-association-list',
  clubAssociationInformation: '/associations/club-associations/:id',
  businessPartnerList: '/associations/business-partner-list',
  businessPartnerInformation: '/associations/business-partner/:id',
  promotersList: '/associations/promoter-list',
  PromotersInformation: '/associations/promoters/:id',
  PromotersEdit: '/associations/promoters/edit/:id',
  associationManagement: '/associations/management',

  licenseManagement: '/license',
  licenseProvince: '/license/province',
  licenseList: '/license/list',

  promoters: '/associations/promoters',
  createPromoter: '/promoters/create',
  promoterManagement: '/promoters/management',

  login: '/auth/login',
  notFound: '/not-found',
  all: '*',
};

export default path;
