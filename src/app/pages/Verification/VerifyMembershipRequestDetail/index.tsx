/**
 *
 * VerifyMembershipRequestDetail
 *
 */
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import Page from 'app/components/Page';
import { replaceDotByWhitespace } from 'utils/helpers/Errors';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Container,
  Box,
  Card,
  TextField,
  FormHelperText,
} from '@mui/material';
import moment from 'moment';
import { Key, KV, Row, Value } from 'app/components/KeyValue';
import { ApprovalDialog } from 'app/components/ApprovalDialog';
import { translations } from 'locales/translations';
import { Transaction } from 'types';
import Notifier from 'app/pages/Notifier';
import path from 'app/routes/path';
import { withLoading } from 'app/components/HOC/WithLoading';
import { MemberPhotos } from 'app/components/MemberPhotos';
import { MemberGeneralInformation } from 'app/components/MemberGeneralInformation';
import { ClubStatus } from 'app/components/Club/ClubStatus';
import { ClubInfo } from 'app/components/Club/ClubInfo';

import { Fee } from './components/Fee';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useMembershipRequestDetailSlice } from './slice';
import { selectMembershipRequestDetail } from './slice/selectors';
interface Props {
  setLoading?: Function;
}

export const VerifyMembershipRequestDetail = withLoading(
  memo((props: Props) => {
    const { actions } = useMembershipRequestDetailSlice();
    const { userPackage } = useSelector(selectMembershipRequestDetail);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();
    const [approvalDialogOpen, setApprovalDialogOpen] = React.useState(false);

    const showLoading = () => {
      if (props.setLoading) {
        props.setLoading(true);
      }
    };

    const hideLoading = () => {
      if (props.setLoading) {
        props.setLoading(false);
      }
    };

    React.useEffect(() => {
      if (id) {
        dispatch(actions.fetchMembershipRequestDetail(id));
      }
    }, [id, dispatch, actions]);

    const isOver24Hours: boolean = React.useMemo(() => {
      const time = userPackage?.individualInfo?.registerTime || Date.now();
      return moment().diff(moment(time), 'hours') > 24;
    }, [userPackage?.individualInfo?.registerTime]);

    const currentStatus = React.useMemo(() => {
      if (isOver24Hours) {
        return 'Switch Club';
      }
      return 'Waiting Approve';
    }, [isOver24Hours]);

    const handleApprove = React.useCallback(() => {
      if (id) {
        showLoading();
        dispatch(
          actions.approveMembershipRequest(Number(id), (error?: any) => {
            hideLoading();
            if (error) {
              Notifier.addNotifyError({
                message: error.response.data?.messages?.[0]
                  ? replaceDotByWhitespace(error.response.data.messages[0])
                  : t(translations.error.verifyFailed),
              });
            } else {
              Notifier.addNotifySuccess({
                message: t(translations.success.verifySuccess),
              });
              navigate(path.memberManagement);
            }
          }),
        );
      }
    }, [id, dispatch, actions]);

    return (
      <Page title={t(translations.verifyMembershipDetailPage.title)}>
        <Container maxWidth="xl">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12}>
              <Header
                onEdit={() => {
                  if (id)
                    navigate(path.verifyIndividualMember + `/edit/${id}`, {
                      state: {
                        id,
                      },
                    });
                  else {
                    navigate(path.notFound);
                  }
                }}
              />
              <Fee
                transaction={
                  {
                    ...userPackage?.transactionInfo,
                    taxPercent: 0.1,
                  } as Transaction & { taxPercent: number }
                }
              />
              <MemberPhotos info={userPackage?.individualInfo} />
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MemberGeneralInformation
                      info={{
                        ...userPackage?.individualInfo,
                        ...userPackage?.transactionInfo,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ClubInfo info={userPackage?.individualInfo} />
                    <Box sx={{ mt: 3 }}>
                      <ClubStatus status={currentStatus} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Footer
                onSetApprovalDialogOpen={() => setApprovalDialogOpen(true)}
              />
            </Grid>
          </Grid>
          <ApprovalDialog
            open={approvalDialogOpen}
            title={t(translations.common.confirmApprove)}
            description={
              <KV>
                <Row>
                  <Key>{t(translations.common.package)}</Key>
                  <Value>{userPackage?.transactionInfo?.packageName}</Value>
                </Row>
                <Row>
                  <Key>{t(translations.common.memberName)}</Key>
                  <Value>{userPackage?.individualInfo?.name}</Value>
                </Row>
                <Row>
                  <Key>{t(translations.common.ktaNumber)}</Key>
                  <Value>{userPackage?.individualInfo?.ktaNumber}</Value>
                </Row>
                <Row>
                  <Key>{t(translations.common.club)}</Key>
                  <Value>{userPackage?.individualInfo?.clubName}</Value>
                </Row>
                <Row>
                  <Key>{t(translations.common.clubStatus)}</Key>
                  <Value>{userPackage?.individualInfo?.clubStatus}</Value>
                </Row>
                <Row>
                  <Key>{t(translations.common.expiredDate)}</Key>
                  <Value>
                    {userPackage?.individualInfo?.expiredDate &&
                      moment(userPackage?.individualInfo?.expiredDate).format(
                        'DD/MM/YYYY',
                      )}
                  </Value>
                </Row>
              </KV>
            }
            onCancel={() => setApprovalDialogOpen(false)}
            onApprove={handleApprove}
          />
        </Container>
      </Page>
    );
  }),
);
