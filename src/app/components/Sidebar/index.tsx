import { useEffect, useMemo } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled, Theme } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
import LogoGaspol from 'assets/images/logoGaspol.png';
import { useSelector } from 'react-redux';

import path from 'app/routes/path';
import { GPSidebarMenu } from 'types';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { Role } from 'types/Role';

import Scrollbar from '../Scrollbar';
import NavSection from '../NavSection';
import { MHidden } from '../@material-extend';
import { Logo } from '../Logo';

import membersIcon from '../../../assets/images/member-icon.svg';
import clubIcon from '../../../assets/images/club-icon.svg';
import associationIcon from '../../../assets/images/association-icon.svg';
import merchantIcon from '../../../assets/images/merchant-icon.svg';
import licenseIcon from '../../../assets/images/license-icon.svg';
import dashboardIcon from '../../../assets/images/dashboard-icon.svg';
import reportingIcon from '../../../assets/images/reporting-icon.svg';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 330;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

interface AccountStyleProps {
  theme?: Theme;
}

const AccountStyle = styled('div')((props: AccountStyleProps) => ({
  display: 'flex',
  alignItems: 'center',
  padding: props.theme?.spacing(2, 2.5),
  borderRadius: props.theme?.shape.borderRadius,
  backgroundColor: props.theme?.palette.grey[200],
}));

// ----------------------------------------------------------------------

interface Props {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
}

export default function DashboardSidebar(props: Props) {
  const { isOpenSidebar, onCloseSidebar } = props;
  const { pathname } = useLocation();
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const getIcon = (name: string) => (
    <img src={name} alt="" style={{ color: 'white' }} />
  );

  const sidebarConfig: GPSidebarMenu[] = useMemo(
    () => [
      {
        title: 'sidebar.dashboard',
        path: path.dashboard,
        icon: getIcon(dashboardIcon),
        roles: [Role.dashboard_read, Role.dashboard_read_province],
      },
      {
        title: 'sidebar.reporting',
        path: path.reporting,
        icon: getIcon(reportingIcon),
        roles: [
          Role.member_report_read,
          Role.member_report_read_province,
          Role.club_report_read,
          Role.club_report_read_province,
        ],
        isShow: true,
        children: [
          {
            title: 'sidebar.memberReport',
            path: path.memberReport,
            roles: [Role.member_report_read, Role.member_report_read_province],
          },
          {
            title: 'sidebar.clubReport',
            path: path.clubReport,
            roles: [Role.club_report_read, Role.club_report_read_province],
          },
        ],
      },
      {
        title: 'sidebar.membershipManagement',
        path: path.memberships,
        icon: getIcon(membersIcon),
        roles: [
          Role.member_create,
          Role.member_create_province,
          Role.member_create_imi_paid,
          Role.member_list_read,
          Role.member_list_read_province,
          Role.member_list_card_request,
          Role.member_list_card_request_province,
          Role.member_list_export,
          Role.member_list_export_province,
          Role.member_details_read,
          Role.member_details_card_request,
          Role.member_details_read_province,
          Role.member_details_card_request_province,
          Role.member_details_update,
          Role.member_claim_list_read,
          Role.member_claim_list_update,
          Role.member_claim_list_read_province,
          Role.member_claim_list_update_province,
          Role.member_card_printing_request,
          Role.member_card_printing_read,
          Role.member_card_printing_process,
          Role.member_card_printing_download,
          Role.member_card_printing_read_province,
          Role.member_card_printing_process_province,
          Role.member_card_printing_download_province,
        ],
        children: [
          {
            title: 'sidebar.createMember',
            path: path.createMember,
            roles: [
              Role.member_create,
              Role.member_create_province,
              Role.member_create_imi_paid,
            ],
          },
          {
            title: 'sidebar.memberList',
            path: path.memberManagement,
            roles: [
              Role.member_list_read,
              Role.member_list_read_province,
              Role.member_list_card_request,
              Role.member_list_card_request_province,
              Role.member_list_export,
              Role.member_list_export_province,
              Role.member_details_read,
              Role.member_details_card_request,
              Role.member_details_read_province,
              Role.member_details_card_request_province,
              Role.member_details_update,
            ],
          },
          {
            title: 'sidebar.memberClaimOldMembership',
            path: path.memberClaim,
            roles: [
              Role.member_claim_list_read,
              Role.member_claim_list_update,
              Role.member_claim_list_read_province,
              Role.member_claim_list_update_province,
            ],
          },
          {
            title: 'sidebar.cardPrintingManagement',
            path: path.cardPrinting,
            roles: [
              Role.member_card_printing_request,
              Role.member_card_printing_read,
              Role.member_card_printing_process,
              Role.member_card_printing_download,
              Role.member_card_printing_read_province,
              Role.member_card_printing_process_province,
              Role.member_card_printing_download_province,
            ],
          },
        ],
      },
      {
        title: 'sidebar.club',
        path: path.club,
        icon: getIcon(clubIcon),
        roles: [
          Role.club_create,
          Role.club_create_province,
          Role.club_create_imi_paid,
          Role.club_list_read,
          Role.club_list_read_province,
          Role.club_list_export,
          Role.club_details_read,
          Role.club_details_update,
          Role.club_claim_list_read,
          Role.club_claim_list_update,
          Role.club_claim_list_read_province,
          Role.club_claim_list_update_province,
        ],
        children: [
          {
            title: 'sidebar.createClub',
            path: path.createClub,
            roles: [
              Role.club_create,
              Role.club_create_province,
              Role.club_create_imi_paid,
            ],
          },
          {
            title: 'sidebar.clubList',
            path: path.clubManagement,
            roles: [
              Role.club_list_read,
              Role.club_list_read_province,
              Role.club_list_export,
              Role.club_details_read,
              Role.club_details_update,
            ],
          },
          {
            title: 'sidebar.claimClubList',
            path: path.claimClubList,
            roles: [
              Role.club_claim_list_read,
              Role.club_claim_list_update,
              Role.club_claim_list_read_province,
              Role.club_claim_list_update_province,
            ],
          },
        ],
      },
      // {
      //   title: 'sidebar.association',
      //   path: path.associations,
      //   icon: getIcon(associationIcon),
      //   children: associationManagement(userInformation),
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
        roles: [
          Role.kis_configure_read,
          Role.kis_configure_update,
          Role.kis_pricing_read,
          Role.kis_pricing_range_update,
          Role.kis_pricing_read_province,
          Role.kis_pricing_update_province,
        ],
        children: [
          {
            title: 'sidebar.KISConfiguration',
            path: path.licenseProvince,
            roles: [Role.kis_configure_read, Role.kis_configure_update],
          },
          {
            title: 'sidebar.KISPricingManagement',
            path: path.licenseList,
            roles: [
              Role.kis_pricing_read,
              Role.kis_pricing_range_update,
              Role.kis_pricing_read_province,
              Role.kis_pricing_update_province,
            ],
          },
        ],
      },
    ],
    [userInformation],
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, textAlign: 'start' }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: 'inline-flex', textDecoration: 'none' }}
        >
          <img
            src={LogoGaspol}
            alt={'Gaspol'}
            style={{
              width: '85px',
              objectFit: 'contain',
              marginTop: '-1.1rem',
              marginRight: '1rem',
            }}
          />
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src="/" alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Gaspol
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userInformation?.userName}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
