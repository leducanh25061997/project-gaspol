/**
 *
 * Fee
 *
 */
import React, { memo, useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Checkbox,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Transaction } from 'types';
import { currencyFormat, useCurrency } from 'utils/helpers/currency';
import { useSelector } from 'react-redux';

import { selectAuth } from 'app/pages/Auth/slice/selectors';
interface Props {
  transaction?: Transaction & { taxPercent: number };
  methods: any;
}

export const Fee = memo(({ transaction, methods }: Props) => {
  const { t } = useTranslation();
  const { total } = useCurrency(transaction);
  const [isCreateImi, setIsCreateImi] = useState<boolean>(false);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  useEffect(() => {
    if (userInformation) {
      if (
        userInformation.roles &&
        userInformation.roles.length > 0 &&
        userInformation.roles.includes('club_create_imi_paid')
      ) {
        setIsCreateImi(true);
      }
    }
  }, [userInformation]);

  return (
    <Box sx={{ mt: 3 }}>
      <Card sx={{ padding: 0 }}>
        <CardHeader
          sx={{ color: '#777777' }}
          title={t(translations.common.payment)}
        ></CardHeader>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item md={6} sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Typography sx={{ width: '50%', marginBottom: '8px' }}>
                {t(translations.common.annualFee)}
              </Typography>
              <Typography
                sx={{ width: '50%', marginBottom: '8px', textAlign: 'right' }}
              >
                {transaction?.annualFee
                  ? currencyFormat(transaction?.annualFee)
                  : '_'}
              </Typography>
              <Typography sx={{ width: '50%', marginBottom: '8px' }}>
                {t(translations.common.processingFee)}
              </Typography>
              <Typography
                sx={{ width: '50%', marginBottom: '8px', textAlign: 'right' }}
              >
                {transaction?.processingFee
                  ? currencyFormat(transaction?.processingFee)
                  : '_'}
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Controller
                name="imiPaid"
                control={methods.control}
                render={({ field }) => {
                  return (
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox {...field} disabled={!isCreateImi} />
                      <Typography style={{ fontWeight: 'bold' }}>
                        IMI Paid
                      </Typography>
                    </Box>
                  );
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Typography
                sx={{
                  width: '50%',
                  fontWeight: 'bold',
                }}
              >
                {t(translations.common.totalFee)}
              </Typography>
              <Typography
                sx={{
                  width: '50%',
                  fontWeight: 'bold',
                  textAlign: 'right',
                }}
              >
                Rp {total}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
});
