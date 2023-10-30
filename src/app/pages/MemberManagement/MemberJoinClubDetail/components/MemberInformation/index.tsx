/**
 *
 * MemberInformation
 *
 */
import { Box, Grid } from '@mui/material';
import { ClubInfo } from 'app/components/Club/ClubInfo';
import { ClubStatus } from 'app/components/Club/ClubStatus';
import { MemberGeneralInformation } from 'app/components/MemberGeneralInformation';
import { translations } from 'locales/translations';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { IndividualInformation } from 'types';

interface Props {
  info?: IndividualInformation;
}

export const MemberInformation = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { info } = props;

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12} md={6}>
        <MemberGeneralInformation info={info} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ClubStatus
          status={t(translations.memberRequestJoinClub.memberStatus)}
        />
        <Box sx={{ mt: 3 }}>
          <ClubInfo info={info} />
        </Box>
      </Grid>
    </Grid>
  );
});
