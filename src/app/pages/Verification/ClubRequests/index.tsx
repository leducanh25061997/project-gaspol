import { Grid, Container, Stack, Box, Avatar } from '@mui/material';
import Table from 'app/components/Table';
import { translations } from 'locales/translations';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ClubRequest } from 'types';

import Page from '../../../components/Page';

import { useClubRequestsSlice } from './slice';
import { selectClubRequests } from './slice/selectors';

export default function ClubRequests() {
  const dispatch = useDispatch();
  const { actions } = useClubRequestsSlice();
  const { clubRequestsPageable } = useSelector(selectClubRequests);
  const data = clubRequestsPageable?.data;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(actions.fetchClubRequests());
  }, []);

  const renderItem = (item: ClubRequest, index?: number) => {
    return [item.name, item.picClub, item.clubCode, item.type, item.date];
  };

  const headers = [
    {
      id: 'Name',
      label: t(translations.tableRequestClub.name),
      hasSort: true,
    },
    {
      id: 'picClub',
      label: t(translations.tableRequestClub.clubPic),
      hasSort: true,
    },
    {
      id: 'clubCode',
      label: t(translations.tableRequestClub.clubCode),
      hasSort: true,
    },
    {
      id: 'type',
      label: t(translations.tableRequestClub.status),
      hasSort: true,
    },
    {
      id: 'date',
      label: t(translations.tableRequestClub.registerTime),
      hasSort: true,
    },
  ];

  return (
    <Page title={t(translations.tableRequestClub.clubRequestTitle)}>
      <Container maxWidth="xl">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <Stack
              sx={{
                marginBottom: '30px',
                marginLeft: '25px',
              }}
            >
              <Box
                sx={{
                  fontWeight: 700,
                  fontSize: '36px',
                  color: '#777777',
                }}
              >
                {t(translations.tableRequestClub.clubRequest)}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
