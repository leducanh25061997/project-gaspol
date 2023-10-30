/**
 *
 * MerchantRequests
 *
 */
import Page from 'app/components/Page';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Container, Grid, Stack, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { MembershipType, OrderType } from 'types/enums';

import { useMerchantRequestSlice } from './slice';
import { selectMerchantRequest } from './slice/selectors';
import { ListMerchant } from './components/ListMerchant';

interface Props {}

export const MerchantRequests = memo((props: Props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useMerchantRequestSlice();
  const { merchantRequestsPageable } = useSelector(selectMerchantRequest);

  const fetchMerchantsRequest = (
    limit: number = 5,
    orderBy: string = '',
    page: number = 0,
    keyword: string = '',
    orderType: OrderType = 'desc' as OrderType,
    toRegisterTime: number = Date.now(),
    fromRegisterTime: number = 0,
  ) => {
    dispatch(
      actions.fetchMerchantRequests({
        limit,
        offset: page,
        name: keyword,
        membershipType: MembershipType.GASPOL_MERCHANT,
        orderType,
        orderBy,
        toRegisterTime,
        fromRegisterTime,
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
      id: 'companyNAme',
      label: t(translations.common.companyName),
      hasSort: true,
    },
    {
      id: 'companyNpwp',
      label: t(translations.common.companyNpwp),
      hasSort: true,
    },
    {
      id: 'registerTime',
      label: t(translations.tableMembership.registerTime),
      hasSort: true,
    },
  ];

  React.useEffect(() => {
    fetchMerchantsRequest();
  }, []);

  return (
    <Page title={t(translations.verifyMerchant.title)}>
      <Container maxWidth="xl">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <Stack
              sx={{
                ml: 5,
                mb: 10,
              }}
            >
              <Box
                sx={{
                  fontWeight: 'bold',
                  fontSize: 24,
                }}
              >
                {t(translations.verifyMerchant.title)}
              </Box>
            </Stack>
            <ListMerchant
              headers={headers}
              items={merchantRequestsPageable?.data}
              totalElements={merchantRequestsPageable?.total}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
});
