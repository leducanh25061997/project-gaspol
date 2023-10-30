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
  styled,
  Checkbox,
} from '@mui/material';
import { Key } from 'app/components/KeyValue';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Transaction } from 'types';
import { currencyFormat, useCurrency } from 'utils/helpers/currency';
import { TitlePage } from 'app/components/Label';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { selectAuth } from 'app/pages/Auth/slice/selectors';
interface Props {
  transaction?: Transaction & { taxPercent: number };
}

const Label = styled('div')({
  color: 'rgba(134, 134, 134, 1)',
});

const ValueBold = styled('div')({
  fontWeight: 700,
});

const LabelBold = styled('div')({
  color: 'rgba(134, 134, 134, 1)',
  fontWeight: 700,
});

export const Fee = memo((props: Props) => {
  const { transaction } = props;
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [isCreateImi, setIsCreateImi] = React.useState<boolean>(false);
  const { total, subtotal, taxAmount } = useCurrency(transaction);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  React.useEffect(() => {
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
        <CardContent>
          <Grid container sx={{ display: 'flex' }} mb={2}>
            <TitlePage>
              {t(translations.clubAssociationInformation.paymentInformation)}
            </TitlePage>
          </Grid>
          <Grid
            container
            sx={{
              mt: 1,
            }}
          >
            <Grid item md={10}>
              <Grid
                container
                sx={{
                  mt: 1,
                }}
              >
                <Grid item md={6}>
                  <Label>{t(translations.common.registrationFee)}</Label>
                </Grid>
                <Grid item md={6}>
                  <Typography>
                    {transaction?.initFee
                      ? currencyFormat(transaction?.initFee)
                      : '_'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  mt: 1,
                }}
              >
                <Grid item md={6}>
                  <Label>{t(translations.common.annualFee)}</Label>
                </Grid>
                <Grid item md={6}>
                  <Typography>
                    {transaction?.processingFee
                      ? currencyFormat(transaction?.annualFee)
                      : '_'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  mt: 1,
                }}
              >
                <Grid item md={6}>
                  <Label>{t(translations.common.processingFee)}</Label>
                </Grid>
                <Grid item md={6}>
                  <Typography>
                    {transaction?.processingFee
                      ? currencyFormat(transaction?.processingFee)
                      : '_'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  mt: 5,
                }}
              >
                <Grid item md={6}>
                  <LabelBold>{t(translations.common.totalFee)}</LabelBold>
                </Grid>
                <Grid item md={6}>
                  <ValueBold>Rp {total}</ValueBold>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={2}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Controller
                  name="imiPaid"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox {...field} disabled={!isCreateImi} />
                        <Typography sx={{ fontWeight: 700 }}>
                          {t(translations.common.imiPaid)}
                        </Typography>
                      </Box>
                    );
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
});
