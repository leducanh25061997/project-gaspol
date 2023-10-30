/**
 *
 * MemberInformation
 *
 */
import { Container, Grid, Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MemberPhotos } from 'app/components/MemberPhotos';
import Page from 'app/components/Page';
import { translations } from 'locales/translations';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { MainContent, withTitle } from 'app/components/HOC/WithTitle';
import path from 'app/routes/path';
import { Icon } from '@iconify/react';
import { AuditBox } from 'app/components/AuditBox';
import { AuditTrail } from 'types';
import { CardPrintingStatus, MemberStatus, PackageName } from 'types/enums';

import { ApprovalDialog } from 'app/components/ApprovalDialog';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { Point } from './components/Point';
import { Information } from './components/Information';
import { Transactions } from './components/Transaction';
import { DownloadedCard } from './components/DownloadedCard';

import { useMemberInformationSlice } from './slice';
import { selectMemberInformation } from './slice/selectors';
import { ClubHistory } from './components/ClubHistory';

interface Props {}

const MemberInformation = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { actions } = useMemberInformationSlice();
  const navigate = useNavigate();
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isCardRequest, setIsCardRequest] = React.useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] =
    React.useState<boolean>(false);

  const { memberInformation, pointHistoryPageable, userPoint } = useSelector(
    selectMemberInformation,
  );
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  React.useEffect(() => {
    if (userInformation && userInformation.roles) {
      if (
        userInformation.roles.includes('member_details_update') ||
        userInformation.roles.includes('member_details_update_basic_profile')
      ) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
      if (
        userInformation.roles.includes('member_details_card_request') ||
        userInformation.roles.includes('member_details_card_request_province')
      ) {
        setIsCardRequest(true);
      } else {
        setIsCardRequest(false);
      }
    }
  }, [userInformation]);

  React.useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchIndividualInformation(id));
    dispatch(
      actions.fetchMembershipKis({
        id,
      }),
    );
  }, []);

  React.useEffect(
    (pageNumber: number = 0, limit: number = 10) => {
      if (memberInformation?.ktaMembershipInfor?.userUuid) {
        dispatch(
          actions.fetchPointHistory({
            userUuid: memberInformation.ktaMembershipInfor.userUuid,
          }),
        );
        dispatch(
          actions.fetchUserPoint({
            userUuid: memberInformation?.ktaMembershipInfor?.userUuid,
          }),
        );
      }
    },
    [memberInformation, dispatch],
  );

  const auditTrailHeaders = [
    {
      id: 'dateTime',
      label: t(translations.common.dateTime),
      width: 300,
    },
    {
      id: 'action',
      label: t(translations.common.action),
      width: 200,
    },
    {
      id: 'by',
      label: t(translations.common.by),
      width: 200,
    },
    {
      id: 'description',
      label: t(translations.common.description),
      width: 300,
    },
  ];

  const auditTrailRenderItem = (item: AuditTrail, index?: number) => {
    return [item.timestamp, item.actions, item.by, item.description];
  };

  const handleEditClick = () => {
    // console.log('Path: ', memberships + `/edit/${id}`);
    navigate(path.memberships + `/edit/${id}`);
  };

  const onApprovedSendRequestDownload = () => {
    setLoading(true);
    setOpenConfirmDialog(false);
    dispatch(
      actions.sendRequestDownloadCard(
        {
          membershipId: Number(id),
          status: CardPrintingStatus.REQUESTED,
        },
        (err?: any) => {
          if (!err) {
            // navigate(path.cardPrinting);
            setOpenConfirmDialog(false);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
        },
      ),
    );
  };
  return (
    <Page title={t(translations.memberInformation.title)}>
      <div style={{ padding: '10px' }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '-2rem',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              {isCardRequest &&
                memberInformation?.ktaMembershipInfor?.subscribingPackage
                  ?.name === PackageName.KTA_PRO &&
                memberInformation?.ktaMembershipInfor?.statusPackage ===
                  MemberStatus.ACTIVE && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginRight: '29px',
                      cursor: 'pointer',
                    }}
                    onClick={() => setOpenConfirmDialog(true)}
                  >
                    <Icon
                      icon="fluent:print-48-filled"
                      width={24}
                      height={24}
                    />
                    <Typography sx={{ marginLeft: '12px', color: '#FF6B00' }}>
                      {t(translations.memberManagement.requestCardPrint)}
                    </Typography>
                  </div>
                )}
              {isEdit && (
                <Button
                  variant="contained"
                  startIcon={<Icon fontSize="large" icon="bx:edit-alt" />}
                  onClick={handleEditClick}
                >
                  {t(translations.common.edit)}
                </Button>
              )}
            </Stack>
            <MemberPhotos info={memberInformation?.ktaMembershipInfor} />
            <Box sx={{ mt: 3 }}>
              <Information
                info={memberInformation?.ktaMembershipInfor}
                userPoint={userPoint}
              />
            </Box>
            <Transactions />
            <DownloadedCard />
            <Point
              items={pointHistoryPageable?.data}
              totalElements={pointHistoryPageable?.count}
            />
            <ClubHistory />
            <ApprovalDialog
              title={t(translations.common.confirmation)}
              description={t(translations.common.areYouWantRequestPrintCard)}
              open={openConfirmDialog}
              isConfirmDialog
              onCancel={() => {
                setOpenConfirmDialog(false);
                setLoading(false);
              }}
              onApprove={onApprovedSendRequestDownload}
              loading={loading}
            />
            {/* <AuditBox
              headers={auditTrailHeaders}
              items={[]}
              renderItem={auditTrailRenderItem}
            /> */}
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default withTitle(
  MemberInformation,
  'memberInformation.title',
  '',
  true,
);
