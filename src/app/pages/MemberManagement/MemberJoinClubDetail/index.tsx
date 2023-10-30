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
import { useParams, useNavigate } from 'react-router';
import { useLoading } from 'app/hooks';

import { MemberPhotos } from 'app/components/MemberPhotos';
import { LoadingButton } from '@mui/lab';

import { CreateDialog } from 'app/components/CreateDialog';
import { ClubRequestStatus } from 'types/enums';
import { withLoading } from 'app/components/HOC/WithLoading';
import Notifier from 'app/pages/Notifier';

import { MemberInformation } from './components/MemberInformation';
import { useMemberJoinClubDetailSlice } from './slice';
import { selectMemberJoinClubDetail } from './slice/selectors';

interface Props {}

const MemberJoinClubDetail = withLoading(
  memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const { actions } = useMemberJoinClubDetailSlice();
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    const { memberInformation } = useSelector(selectMemberJoinClubDetail);
    const [openApprove, setOpenApprove] = React.useState(false);
    const navigate = useNavigate();

    const onConfirm = () => {
      setOpenApprove(true);
    };

    const { showLoading, hideLoading } = useLoading({ setLoading: Function });

    const handleConfirm = () => {
      showLoading();
      dispatch(
        actions.approveMember(
          { id, status: ClubRequestStatus.APPROVED },
          (error?: any) => {
            hideLoading();
            if (!error) {
              Notifier.addNotifySuccess({
                messageId: t(translations.memberRequestJoinClub.approveSuccess),
              });
              navigate(path.memberRequestJoinClub);
            } else {
              Notifier.addNotifyError({
                messageId: t(translations.memberRequestJoinClub.approveFailure),
              });
            }
          },
        ),
      );
    };

    React.useEffect(() => {
      id && dispatch(actions.fetchMemberInformation(id));
    }, []);

    return (
      <Grid item xs={12} sm={12} md={12}>
        <MemberPhotos info={memberInformation} />
        <MemberInformation info={memberInformation} />
        <Card sx={{ mt: 5 }}>
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              onClick={onConfirm}
              variant="contained"
              disabled={!memberInformation?.isImiAdmin}
            >
              {t(translations.common.approve)}
            </LoadingButton>
            <CreateDialog
              open={openApprove}
              title={t(translations.common.confirmApprove)}
              description={
                <Typography sx={{ fontWeight: 600 }}>
                  {t(translations.memberRequestJoinClub.confirmModal)}
                </Typography>
              }
              onCancel={() => setOpenApprove(false)}
              onCreate={() => {
                handleConfirm();
                setOpenApprove(false);
              }}
            />
          </Grid>
        </Card>
      </Grid>
    );
  }),
);

export default withTitle(
  MemberJoinClubDetail,
  'memberInformation.title',
  path.memberRequestJoinClub,
);
