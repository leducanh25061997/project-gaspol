/**
 *
 * Claim List
 *
 */
import React, { memo } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { MembershipType } from 'types/enums';
import { withTitle } from 'app/components/HOC/WithTitle';
import { Loading } from 'app/components/Loading';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { useClaimedClubListSlice } from 'app/pages/ClubManagement/ClaimClub/ClaimedClubList/slice';

import Page from 'app/components/Page';

import { Container, Paper } from '@mui/material';

import styled from 'styled-components';

import { TableList } from './components/TableList';
import { useClaimListSlice } from './slice';
import { selectClaimList } from './slice/selectors';

const RootContainer = styled.div`
  .title {
    color: #777777;
  }
  .section-container {
    box-shadow: 0 0 2px 0 rgb(145 158 171 / 24%),
      0 16px 32px -4px rgb(145 158 171 / 24%);
    border: 1px solid #ffffff;
  }
`;
interface Props {}

const ClaimOldMembership = memo((props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useClaimListSlice();
  const { actions: actionClaimClub } = useClaimedClubListSlice();
  const { claimList, isLoading, exporting } = useSelector(selectClaimList);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  const headers = [
    {
      id: 'username',
      label: t(translations.tableClaim.name),
      width: '200px',
    },
    {
      id: 'ktaNumber',
      label: t(translations.common.ktaNumber),
    },
    {
      id: 'phone',
      label: t(translations.tableClaim.phoneNumber),
    },
    {
      id: 'nikNumber',
      label: t(translations.tableClaim.nikKITAS),
    },
    {
      id: 'province',
      label: t(translations.common.province),
    },
    {
      id: 'status',
      label: t(translations.tableClaim.status),
    },
    {
      id: 'createdDate',
      label: t(translations.tableClaim.claimTime),
    },
  ];

  React.useEffect(() => {
    dispatch(actionClaimClub.fetchProvince());
  }, []);

  return (
    <Page title={t('sidebar.memberClaimOldMembership')}>
      <Container maxWidth="xl">
        <RootContainer>
          <span className="title fs-28 lh-35 fw-700">
            {t(translations.claimManagement.headerTitle)}
          </span>
          <Paper
            elevation={0}
            className="rounded-10 py-16 section-container mt-15"
          >
            <TableList
              headers={headers}
              items={claimList?.data}
              totalElements={claimList?.count}
              exporting={exporting}
              provinceId={userInformation?.provinceId}
            />
          </Paper>
        </RootContainer>
        <Loading isLoading={isLoading} />
      </Container>
    </Page>
  );
});

export default ClaimOldMembership;
