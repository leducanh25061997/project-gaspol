import { useDispatch, useSelector } from 'react-redux';

import { MembershipRequest } from 'types';
import { Avatar, Stack, Box, Grid, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate } from 'react-router-dom';
import { MembershipType, OrderType } from 'types/enums';

import Page from '../../../components/Page';

import { useMembershipRequestsSlice } from './slice';
import { selectIndividualMembers } from './slice/selector';
import { TableList } from './components/TableList';

export default function MembershipRequests() {
  const dispatch = useDispatch();
  const { actions } = useMembershipRequestsSlice();
  const { membershipRequestsPageable } = useSelector(selectIndividualMembers);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [rowSelected, setRowSelected] = useState(0);

  useEffect(() => {
    fetchDataForPage();
  }, []);

  const fetchDataForPage = (
    page: number = 0,
    limit: number = 5,
    keyword: string = '',
    orderBy: string = '',
    orderType: OrderType = OrderType.DESC,
    fromRegisterTime: number = Date.now() - 86400000,
    toRegisterTime: number = Date.now(),
  ) => {
    dispatch(
      actions.fetchMembershipRequests({
        limit,
        offset: page,
        name: keyword,
        membershipType: MembershipType?.KTA,
        orderBy,
        orderType,
        fromRegisterTime,
        toRegisterTime,
      }),
    );
  };

  const headers = [
    {
      id: 'name',
      label: t(translations.tableMembership.name),
      hasSort: true,
    },
    {
      id: 'phone',
      label: t(translations.tableMembership.phoneNumber),
      hasSort: true,
    },
    {
      id: 'ktaNumber',
      label: t(translations.common.ktpNumber),
      hasSort: true,
    },
    {
      id: 'provinceName',
      label: t(translations.common.province),
      hasSort: true,
    },
    {
      id: 'registerTime',
      label: t(translations.tableMembership.registerTime),
      hasSort: true,
    },
  ];

  return (
    <Page title="Verify Individual Member">
      <Container maxWidth="xl">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <Stack
              sx={{
                marginBottom: '20px',
                ml: 3,
              }}
            >
              <Box
                sx={{
                  fontWeight: 700,
                  fontSize: '36px',
                  color: '#777777',
                }}
              >
                {t(translations.tableMembership.verifyMembership)}
              </Box>
            </Stack>
            <TableList
              headers={headers}
              items={membershipRequestsPageable?.data}
              totalElements={membershipRequestsPageable?.total}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
