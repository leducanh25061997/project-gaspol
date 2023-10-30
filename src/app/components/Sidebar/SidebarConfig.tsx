import path from 'app/routes/path';
import { GPSidebarMenu } from 'types';

import membersIcon from '../../../assets/images/member-icon.svg';
import clubIcon from '../../../assets/images/club-icon.svg';
import associationIcon from '../../../assets/images/association-icon.svg';
import merchantIcon from '../../../assets/images/merchant-icon.svg';
import licenseIcon from '../../../assets/images/license-icon.svg';
import dashboardIcon from '../../../assets/images/dashboard-icon.svg';
import reportingIcon from '../../../assets/images/reporting-icon.svg';

const getIcon = (name: string) => (
  <img src={name} alt="" style={{ color: 'white' }} />
);

const sidebarConfig: GPSidebarMenu[] = [
  {
    title: 'sidebar.dashboard',
    path: path.dashboard,
    icon: getIcon(dashboardIcon),
  },
  {
    title: 'sidebar.reporting',
    path: path.reporting,
    icon: getIcon(reportingIcon),
    children: [
      {
        title: 'sidebar.memberReport',
        path: path.memberReport,
      },
      {
        title: 'sidebar.clubReport',
        path: path.clubReport,
      },
      // {
      //   title: 'sidebar.clubAssociationReport',
      //   path: path.clubAssociationReport,
      // },
    ],
  },
  {
    title: 'sidebar.membershipManagement',
    path: path.memberships,
    icon: getIcon(membersIcon),
    children: [
      {
        title: 'sidebar.createMember',
        path: path.createMember,
      },
      {
        title: 'sidebar.memberList',
        path: path.memberManagement,
      },
      // {
      //   title: 'sidebar.memberRequestJoinClub',
      //   path: path.memberRequestJoinClub,
      // },
      {
        title: 'sidebar.memberClaimOldMembership',
        path: path.memberClaim,
      },
      {
        title: 'sidebar.cardPrintingManagement',
        path: path.cardPrinting,
      },
    ],
  },
  {
    title: 'sidebar.club',
    path: path.club,
    icon: getIcon(clubIcon),
    children: [
      {
        title: 'sidebar.createClub',
        path: path.createClub,
      },
      {
        title: 'sidebar.clubList',
        path: path.clubManagement,
      },
      {
        title: 'sidebar.claimClubList',
        path: path.claimClubList,
      },
    ],
  },
  // {
  //   title: 'sidebar.association',
  //   path: path.associations,
  //   icon: getIcon(associationIcon),
  //   children: [
  //     {
  //       title: 'sidebar.createAssociation',
  //       path: path.createAssociations,
  //     },
  //     {
  //       title: 'sidebar.clubAssociationList',
  //       path: path.clubAssociationList,
  //     },
  //     {
  //       title: 'sidebar.businessPartnerList',
  //       path: path.businessPartnerList,
  //     },
  //     {
  //       title: 'sidebar.promoterList',
  //       path: path.promotersList,
  //     },
  //   ],
  // },
  // {
  //   title: 'sidebar.merchant',
  //   path: path.merchant,
  //   icon: getIcon(merchantIcon),
  //   children: [
  //     {
  //       title: 'sidebar.merchantList',
  //       path: path.merchantsList,
  //     },
  //   ],
  // },
  {
    title: 'sidebar.kisManagement',
    path: path.licenseManagement,
    icon: getIcon(licenseIcon),
    children: [
      {
        title: 'sidebar.KISConfiguration',
        path: path.licenseProvince,
      },
      {
        title: 'sidebar.KISPricingManagement',
        path: path.licenseList,
      },
    ],
  },
];

export default sidebarConfig;
