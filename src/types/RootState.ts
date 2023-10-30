import { BusinessPartnerInformationState } from 'app/pages/AssociationManagement/BusinessPartnerInformation/slice/type';
import { BusinessPartnerManagementState } from 'app/pages/AssociationManagement/BusinessPartnerManagement/slice/type';
import { ClubAssociationInformationState } from 'app/pages/AssociationManagement/ClubAssociationInformation/slice/types';
import { ClubAssociationManagementState } from 'app/pages/AssociationManagement/ClubAssociationList/slice/type';
import { CreateAssociationState } from 'app/pages/AssociationManagement/CreateAssociation/slice/types';
import { EditAssociationState } from 'app/pages/AssociationManagement/EditAssociation/slice/types';
import { PromoterInformationState } from 'app/pages/AssociationManagement/PromoterInformation/slice/types';
import { PromoterManagementState } from 'app/pages/AssociationManagement/PromoterManagement/slice/types';
import { AuthState } from 'app/pages/Auth/slice/types';
import { ClaimedClubDetailsState } from 'app/pages/ClubManagement/ClaimClub/ClaimedClubDetails/slice/types';
import { ClaimedClubListState } from 'app/pages/ClubManagement/ClaimClub/ClaimedClubList/slice/types';
import { ClubInformationState } from 'app/pages/ClubManagement/ClubInformation/slice/types';
import { ClubManagementState } from 'app/pages/ClubManagement/ClubManagement/slice/types';
import { CreateClubState } from 'app/pages/ClubManagement/CreateClub/slice/types';
import { EditClubState } from 'app/pages/ClubManagement/EditClub/slice/types';
import { DashboardDataState } from 'app/pages/Dashboard/slice/types';
import { KisManagementState } from 'app/pages/KisManagement/slice/types';
import { CardPrintingManagementState } from 'app/pages/MemberManagement/CardPrinting/slice/types';
import { ClaimListState } from 'app/pages/MemberManagement/ClaimOldMembership/slice/types';
import { ClaimDetailState } from 'app/pages/MemberManagement/ClaimOldMembershipDetail/slice/types';
import { CreateMemberState } from 'app/pages/MemberManagement/CreateMember/slice/types';
import { EditMemberState } from 'app/pages/MemberManagement/EditMember/slice/types';
import { MemberInformationState } from 'app/pages/MemberManagement/MemberInformation/slice/types';
import { MemberJoinClubDetailState } from 'app/pages/MemberManagement/MemberJoinClubDetail/slice/types';
import { MemberManagementState } from 'app/pages/MemberManagement/MemberManagement/slice/types';
import { MemberRequestJoinClubState } from 'app/pages/MemberManagement/MemberRequestJoinClub/slice/types';
import { NotifierState } from 'app/pages/Notifier/slice/types';
import { MemberReportState } from 'app/pages/Reporting/MemberReport/slice/types';
import { ClubReportState } from 'app/pages/Reporting/ClubReport/slice/types';
import { AssociationReportState } from 'app/pages/Reporting/ClubAssociationReport/slice/types';
import { ClubRequestState } from 'app/pages/Verification/ClubRequests/slice/types';
import { EditIndividualMemberState } from 'app/pages/Verification/EditMembershipInformation/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { MembershipRequestsState } from 'app/pages/Verification/MembershipRequests/slice/types';
import { MerchantRequestState } from 'app/pages/Verification/MerchantRequests/slice/types';
import { MembershipRequestDetailState } from 'app/pages/Verification/VerifyMembershipRequestDetail/slice/types';

import { DashboardData } from './Dashboard';

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  auth?: AuthState;
  notifier?: NotifierState;
  membershipRequestDetail?: MembershipRequestDetailState;
  editClub?: EditClubState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  membershipRequests?: MembershipRequestsState;
  clubRequests?: ClubRequestState;
  createMember?: CreateMemberState;
  createClub?: CreateClubState;
  editIndividualMember?: EditIndividualMemberState;
  merchantRequest?: MerchantRequestState;
  memberManagement?: MemberManagementState;
  cardPrintingManagement?: CardPrintingManagementState;
  cardPrintingDownloadManagement?: CardPrintingManagementState;
  kisManagement?: KisManagementState;
  editMember?: EditMemberState;
  memberInformation?: MemberInformationState;
  clubManagement?: ClubManagementState;
  memberRequestJoinClub?: MemberRequestJoinClubState;
  memberJoinClubDetail?: MemberJoinClubDetailState;
  clubInformation?: ClubInformationState;
  promoterManagement?: PromoterManagementState;
  businessPartnerInformation?: BusinessPartnerInformationState;
  promoterInformation?: PromoterInformationState;
  businessPartnerManagement?: BusinessPartnerManagementState;
  clubAssociationManagement?: ClubAssociationManagementState;
  clubAssociationInformation: ClubAssociationInformationState;
  createAssociation?: CreateAssociationState;
  editAssociation?: EditAssociationState;
  claimList: ClaimListState;
  claimDetail: ClaimDetailState;
  claimedClubList: ClaimedClubListState;
  claimedClubDetails: ClaimedClubDetailsState;
  memberReport: MemberReportState;
  clubReport: ClubReportState;
  associationReport: AssociationReportState;
  dashboardData: DashboardDataState;
}
