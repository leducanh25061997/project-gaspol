import { Container, Paper } from '@mui/material';
import Page from 'app/components/Page';
import { translations } from 'locales/translations';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Loading } from 'app/components/Loading';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import ClaimClubTable from './components/ClaimClubTable';
import FilterBar from './components/FilterBar';
import { useClaimedClubListSlice } from './slice';
import { selectClaimedClubList } from './slice/selectors';

interface Props {}

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

const ClaimClubList = memo((props: Props) => {
  const dispatch = useDispatch();
  const { actions } = useClaimedClubListSlice();
  const { t } = useTranslation();
  const { loading, filter } = useSelector(selectClaimedClubList);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  useEffect(() => {
    dispatch(actions.fetchProvince());
  }, [actions, dispatch]);

  return (
    <Page title={t('sidebar.claimClubList')}>
      <Container maxWidth="xl">
        <RootContainer>
          <span className="title fs-28 lh-35 fw-700">
            {t(translations.claimClubList.title)}
          </span>
          <Paper
            elevation={0}
            className="rounded-10 py-16 section-container mt-15"
          >
            <ClaimClubTable
              provinceId={userInformation?.provinceId as string}
            />
          </Paper>
        </RootContainer>
        <Loading isLoading={!loading} updated />
      </Container>
    </Page>
  );
});
export default ClaimClubList;
