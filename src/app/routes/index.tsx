import { BusinessPartnerInformation } from 'app/pages/AssociationManagement/BusinessPartnerInformation/Loadable';
import { BusinessPartnerManagement } from 'app/pages/AssociationManagement/BusinessPartnerManagement/Loadable';
import { ClubAssociationInformation } from 'app/pages/AssociationManagement/ClubAssociationInformation/Loadable';
import { ClubAssociationManagement } from 'app/pages/AssociationManagement/ClubAssociationList/Loadable';
import { CreateAssociation } from 'app/pages/AssociationManagement/CreateAssociation';
import { EditAssociation } from 'app/pages/AssociationManagement/EditAssociation';
import PromoterInformation from 'app/pages/AssociationManagement/PromoterInformation';
import PromoterManagement from 'app/pages/AssociationManagement/PromoterManagement';
import ClaimClubDetails from 'app/pages/ClubManagement/ClaimClub/ClaimedClubDetails';
import { ClaimClubList } from 'app/pages/ClubManagement/ClaimClub/ClaimedClubList/Loadable';
import { ClubInformation } from 'app/pages/ClubManagement/ClubInformation/Loadable';
import { ClubManagement } from 'app/pages/ClubManagement/ClubManagement/Loadable';
import { CreateClub } from 'app/pages/ClubManagement/CreateClub/Loadable';
import { EditClub } from 'app/pages/ClubManagement/EditClub';
import { ImiManagement } from 'app/pages/KisManagement/ImiManagement/Loadable';
import { KisProvince } from 'app/pages/KisManagement/KisProvince/Loadable';
import { CardPrintingManagement } from 'app/pages/MemberManagement/CardPrinting/Loadable';
import ClaimOldMembership from 'app/pages/MemberManagement/ClaimOldMembership';
import ClaimOldMembershipDetail from 'app/pages/MemberManagement/ClaimOldMembershipDetail';
import { CreateMember } from 'app/pages/MemberManagement/CreateMember';
import { EditMember } from 'app/pages/MemberManagement/EditMember/Loadable';
import { MemberInformation } from 'app/pages/MemberManagement/MemberInformation/Loadable';
import { MemberJoinClubDetail } from 'app/pages/MemberManagement/MemberJoinClubDetail/Loadable';
import { MemberManagement } from 'app/pages/MemberManagement/MemberManagement/Loadable';
import { MemberRequestJoinClub } from 'app/pages/MemberManagement/MemberRequestJoinClub/Loadable';
import ClubAssociationReport from 'app/pages/Reporting/ClubAssociationReport';
import { ClubReport } from 'app/pages/Reporting/ClubReport/Loadable';
import { MemberReport } from 'app/pages/Reporting/MemberReport/Loadable';
import { EditMembershipInformation } from 'app/pages/Verification/EditMembershipInformation/Loadable';
import MembershipRequests from 'app/pages/Verification/MembershipRequests';
import { MerchantRequests } from 'app/pages/Verification/MerchantRequests/Loadable';
import { VerifyMembershipRequestDetail } from 'app/pages/Verification/VerifyMembershipRequestDetail/Loadable';
import { Navigate, useRoutes } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth';

import DashboardLayout from '../components/Layouts/DashboardLayout';
// layouts
import LogoOnlyLayout from '../components/Layouts/LogoOnlyLayout';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard/Loadable';
import NotFound from '../pages/NotFound';

import path from './path';

export default function Router() {
  return useRoutes([
    {
      path: path.root,
      element: isAuthenticated() ? (
        <DashboardLayout />
      ) : (
        <Navigate to={path.login} />
      ),
      children: [
        { element: <Navigate to={path.dashboard} replace /> },
        {
          element: <Dashboard />,
          path: path.dashboard,
        },
        {
          path: path.reporting,
          children: [
            { path: path.memberReport, element: <MemberReport /> },
            { path: path.clubReport, element: <ClubReport /> },
            {
              path: path.clubAssociationReport,
              element: <ClubAssociationReport />,
            },
          ],
        },
        {
          path: path.verification,
          children: [
            {
              path: path.verifyIndividualMember,
              element: <MembershipRequests />,
            },
            {
              path: path.verifyIndividualMemberDetails,
              element: <VerifyMembershipRequestDetail />,
            },
            {
              path: path.verifyEditIndividualMember,
              element: <EditMembershipInformation />,
            },
            // { path: path.verifyClub, element: <ClubRequests /> },
            // {
            //   path: path.verifyClubDetails,
            //   element:<VerifyClubRequestDetail />
            // },
            { path: path.verifyPromoter, element: <div /> },
            { path: path.verifyAssociation, element: <div /> },
            { path: path.verifyMerchant, element: <MerchantRequests /> },
          ],
        },
        {
          path: path.memberships,
          children: [
            { path: path.createMember, element: <CreateMember /> },
            { path: path.memberManagement, element: <MemberManagement /> },
            { path: path.memberInformation, element: <MemberInformation /> },
            { path: path.memberEdit, element: <EditMember /> },
            {
              path: path.memberRequestJoinClub,
              element: <MemberRequestJoinClub />,
            },
            {
              path: path.memberJoinClubDetail,
              element: <MemberJoinClubDetail />,
            },
            {
              path: path.memberClaim,
              element: <ClaimOldMembership />,
            },
            {
              path: path.memberClaimDetail,
              element: <ClaimOldMembershipDetail />,
            },
          ],
        },
        {
          path: path.club,
          children: [
            { path: path.createClub, element: <CreateClub /> },
            { path: path.clubManagement, element: <ClubManagement /> },
            { path: path.clubEdit, element: <EditClub /> },
            { path: path.clubInformation, element: <ClubInformation /> },
            { path: path.claimClubList, element: <ClaimClubList /> },
            { path: path.claimClubDetails, element: <ClaimClubDetails /> },
          ],
        },
        {
          path: path.merchant,
          element: <DashboardLayout />,
          children: [
            // { path: path.createMerchant, element: <div /> },
            { path: path.merchantsList, element: <div /> },
          ],
        },
        {
          path: path.cardPrinting,
          element: <CardPrintingManagement />,
        },
        {
          path: path.associations,
          // element: <DashboardLayout />,
          children: [
            { path: path.createAssociations, element: <CreateAssociation /> },
            { path: path.editAssociation, element: <EditAssociation /> },
            {
              path: path.clubAssociationList,
              element: <ClubAssociationManagement />,
            },
            {
              path: path.clubAssociationInformation,
              element: <ClubAssociationInformation />,
            },
            {
              path: path.businessPartnerList,
              element: <BusinessPartnerManagement />,
            },
            {
              path: path.businessPartnerInformation,
              element: <BusinessPartnerInformation />,
            },
            { path: path.promotersList, element: <PromoterManagement /> },
            {
              path: path.PromotersInformation,
              element: <PromoterInformation />,
            },
          ],
        },
        {
          path: path.licenseManagement,
          children: [
            { path: path.licenseProvince, element: <ImiManagement /> },
            { path: path.licenseList, element: <KisProvince /> },
          ],
        },
        // {
        //   path: path.promoters,
        //   element: <DashboardLayout />,
        //   children: [
        //     { path: path.createPromoter, element: <div /> },
        //     { path: path.promoterManagement, element: <div /> },
        //   ],
        // },
      ],
    },
    {
      path: path.root,
      element: <LogoOnlyLayout />,
      children: [
        {
          path: path.login,
          element: isAuthenticated() ? (
            <Navigate to={path.dashboard} />
          ) : (
            <Auth />
          ),
        },
        { path: path.notFound, element: <NotFound /> },
      ],
    },
    { path: path.all, element: <Navigate to={path.notFound} replace /> },
  ]);
}
