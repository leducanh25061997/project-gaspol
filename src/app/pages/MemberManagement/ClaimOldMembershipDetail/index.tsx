/**
 *
 * MemberJoinClubDetail
 *
 */
import { withTitle } from 'app/components/HOC/WithTitle';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import path from 'app/routes/path';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { translations } from 'locales/translations';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useLoading } from 'app/hooks';

import { MemberPhotos } from 'app/components/MemberPhotos';
import { LoadingButton } from '@mui/lab';

import { CreateDialog } from 'app/components/CreateDialog';
import { ClubRequestStatus, MemberStatus } from 'types/enums';
import { withLoading } from 'app/components/HOC/WithLoading';
import Notifier from 'app/pages/Notifier';
import { Loading } from 'app/components/Loading';
import { ApprovalDialog } from 'app/components/ApprovalDialog';

import { MemberInformation } from './components/MemberInformation';
import { selectClaimDetail } from './slice/selectors';
import { useClaimDetailSlice } from './slice';
import { ClaimPhotos } from './components/ClaimPhotos';
import { TableList } from './components/TableList';

interface Props {}

const ClaimOldMembershipDetail = withLoading(
  memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const { actions } = useClaimDetailSlice();
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    const { claimDetail, oldMemberList, isActive, isLoading } =
      useSelector(selectClaimDetail);
    const [openApprove, setOpenApprove] = React.useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] =
      React.useState<boolean>(false);
    const navigate = useNavigate();
    const { state } = useLocation();

    React.useEffect((limit: number = 10, pageNumber: number = 0) => {
      id && dispatch(actions.fetchClaimDetail(id));
      dispatch(
        actions.fetchOldMemberList({
          size: limit,
          page: pageNumber,
          filter: {
            nikNumber: null,
            oldKtaNumber: state?.oldKtaNumber,
            searchKey: null,
          },
        }),
      );
    }, []);

    const headers = [
      {
        id: 'name',
        label: t(translations.tableOldMemberShip.name),
        hasSort: true,
      },
      {
        id: 'ktaNumber',
        label: t(translations.tableOldMemberShip.oldKTANumber),
      },
      {
        id: 'phone',
        label: t(translations.tableOldMemberShip.phoneNumberOldAccount),
      },
      {
        id: 'nikNumber',
        label: t(translations.tableOldMemberShip.nikNumber),
        hasSort: true,
      },
      {
        id: 'package',
        label: t(translations.tableOldMemberShip.package),
        hasSort: true,
      },
      {
        id: 'status',
        label: t(translations.tableOldMemberShip.status),
        hasSort: true,
      },
      {
        id: 'createdDate',
        label: t(translations.tableOldMemberShip.registerTime),
        hasSort: true,
      },
      {
        id: 'action',
        label: t(translations.tableOldMemberShip.action),
        hasSort: true,
      },
    ];

    const handleApprove = () => {
      const claimId = id;
      const newParams: any = {
        id: claimId,
        navigate,
      };
      dispatch(actions.rejectRequest(newParams));
      setOpenConfirmDialog(false);
    };

    const handleRejectRequest = () => {
      setOpenConfirmDialog(true);
    };

    return (
      <Grid item xs={12} sm={12} md={12}>
        {state?.status === 'PENDING' && (
          <Grid
            container
            direction={'row'}
            justifyContent={'flex-end'}
            sx={{ marginBottom: '1rem' }}
          >
            <Button
              variant="contained"
              onClick={handleRejectRequest}
              sx={{ backgroundColor: '#FF6B00', color: 'white' }}
            >
              {t(translations.common.rejectRequest)}
            </Button>
          </Grid>
        )}
        <ClaimPhotos info={claimDetail} />
        <MemberInformation info={claimDetail} state={state} />
        <TableList
          headers={headers}
          data={oldMemberList}
          id={id}
          state={state}
          isActive={isActive}
        />
        <Loading isLoading={isLoading} />
        <ApprovalDialog
          title={t(translations.common.confirmation)}
          description={t(translations.common.areYouWantReject)}
          open={openConfirmDialog}
          isConfirmDialog
          onCancel={() => setOpenConfirmDialog(false)}
          onApprove={() => handleApprove()}
        />
      </Grid>
    );
  }),
);

export default withTitle(
  ClaimOldMembershipDetail,
  'claimManagement.claimMemberDetail',
  path.memberClaim,
);
