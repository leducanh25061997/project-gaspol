/**
 *
 * Fee
 *
 */
import React, { memo } from 'react';
import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import { Key } from 'app/components/KeyValue';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Transaction } from 'types';
import { currencyFormat, useCurrency } from 'utils/helpers/currency';
interface Props {
  transaction?: Transaction & { taxPercent: number };
}

export const Fee = memo((props: Props) => {
  const { transaction } = props;
  const { t } = useTranslation();

  const { total, subtotal, taxAmount } = useCurrency(transaction);
  return (
    <Box sx={{ mt: 3 }}>
      <Card sx={{ padding: 0 }}>
        <CardHeader title={t(translations.common.feeSummary)}></CardHeader>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item md={4}>
              <Typography sx={{ fontWeight: 'bold' }}>
                {t(translations.common.idTransaction)}
              </Typography>
            </Grid>
            <Grid item md={4} textAlign="center">
              <Typography sx={{ fontWeight: 'bold' }}>XXX</Typography>
            </Grid>
            <Grid item md={4} textAlign="end">
              <Typography sx={{ fontWeight: 'bold' }}>
                {t(translations.common.amount)}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            sx={{
              mt: 3,
            }}
          >
            <Grid item md={4}>
              <Typography>{t(translations.common.initFee)}</Typography>
            </Grid>
            <Grid item md={4} textAlign="center">
              <Typography>_</Typography>
            </Grid>
            <Grid item md={4} textAlign="end">
              <Typography>
                {transaction?.initFee
                  ? currencyFormat(transaction?.initFee)
                  : '_'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            sx={{
              mt: 1,
            }}
          >
            <Grid item md={4}>
              <Typography>{t(translations.common.annualFee)}</Typography>
            </Grid>
            <Grid item md={4} textAlign="center">
              <Typography>_</Typography>
            </Grid>
            <Grid item md={4} textAlign="end">
              <Typography>
                {transaction?.annualFee
                  ? currencyFormat(transaction?.annualFee)
                  : '_'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            sx={{
              mt: 1,
            }}
          >
            <Grid item md={4}>
              <Typography>
                {t(translations.common.clubProcessingFee)}
              </Typography>
            </Grid>
            <Grid item md={4} textAlign="center">
              <Typography>_</Typography>
            </Grid>
            <Grid item md={4} textAlign="end">
              <Typography>
                {transaction?.processingFee
                  ? currencyFormat(transaction?.processingFee)
                  : '_'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            sx={{
              mt: 1,
            }}
          >
            <Grid item md={4}>
              <Typography>{t(translations.common.subtotal)}</Typography>
            </Grid>
            <Grid item md={4} textAlign="center">
              <Typography>_</Typography>
            </Grid>
            <Grid item md={4} textAlign="end">
              <Typography>{subtotal}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            sx={{
              mt: 1,
            }}
          >
            <Grid item md={4}>
              <Typography>{t(translations.common.tax)}</Typography>
            </Grid>
            <Grid item md={4} textAlign="center">
              <Typography>
                {transaction?.taxPercent
                  ? `${transaction?.taxPercent * 100} %`
                  : '_'}
              </Typography>
            </Grid>
            <Grid item md={4} textAlign="end">
              <Typography>{taxAmount}</Typography>
            </Grid>
          </Grid>

          <Divider />
          <Grid
            container
            justifyContent="space-between"
            sx={{
              mt: 2,
            }}
          >
            <Key>{t(translations.common.totalFee)}</Key>
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
            >
              Rp {total}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
});
