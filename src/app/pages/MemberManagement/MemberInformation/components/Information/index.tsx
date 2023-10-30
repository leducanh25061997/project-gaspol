import React, { memo } from 'react';
import { Stack, Box, Button, Grid, Card, Paper, styled } from '@mui/material';
import { translations } from 'locales/translations';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MemberGeneralInformation } from 'app/components/MemberGeneralInformation';
import { Key, KV, Row, Value } from 'app/components/KeyValue';
import { IndividualInformation } from 'types';
import { ClubInfo } from 'app/components/Club/ClubInfo';
import { ClubStatus } from 'app/components/Club/ClubStatus';
import moment from 'moment';
import { PackageStatusLowerCase } from 'types/enums';
import { get } from 'lodash';

import { KisDetail } from '../KisDetail';

const GpointStyle = styled('div')({
  '& .MuiTypography-root': {
    color: '#FF6B00',
  },
});
interface Props {
  info?: IndividualInformation;
  userPoint?: number;
}

export const Information = memo((props: Props) => {
  const { info, userPoint } = props;
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <MemberGeneralInformation info={info} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <ClubStatus
            status={
              info?.statusPackage
                ? get(PackageStatusLowerCase, info?.statusPackage)
                : ''
            }
            expiredDate={
              info?.expiredDate
                ? moment(info?.expiredDate).format('DD/MM/YYYY')
                : ''
            }
            ktaNumber={info?.ktaNumber}
            oldKtaNumber={info?.oldKtaNumber}
            packageName={info?.subscribingPackage?.name}
            userPoint={userPoint}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <ClubInfo info={info} />
        </Box>
        <Box sx={{ mt: 3 }}>
          <KisDetail info={info} />
        </Box>
      </Grid>
    </Grid>
  );
});
