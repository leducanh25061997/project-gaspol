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
  Divider,
  Checkbox,
} from '@mui/material';
import { Key } from 'app/components/KeyValue';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Transaction } from 'types';
import { currencyFormat, useCurrency } from 'utils/helpers/currency';
import { Controller } from 'react-hook-form';

interface Props {
  transaction?: Transaction & { taxPercent: number };
  methods: any;
  user?: any;
}

export const Fee = memo((props: Props) => {
  const { transaction, methods, user } = props;
  const { t } = useTranslation();
  const { total } = useCurrency(transaction);
  const [isCreateImi, setIsCreateImi] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (
        user.roles &&
        user.roles.length > 0 &&
        user.roles.includes('member_create_imi_paid')
      ) {
        setIsCreateImi(true);
      }
    }
  }, [user]);

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
                      <Checkbox
                        {...field}
                        disabled={!isCreateImi}
                        // disabled={
                        //   user && user.roles.includes('member_create_imi_paid')
                        // }
                      />
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
