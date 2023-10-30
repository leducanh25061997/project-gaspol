/**
 *
 * Note
 *
 */
import React, { memo } from 'react';
import { Grid, Card, Typography, TextField, Stack, Box } from '@mui/material';
import { Club, IndividualInformation } from 'types';
import { Key, KV, RowJustifyBetween, Value } from 'app/components/KeyValue';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { get } from 'lodash';
import { PackageStatusLowerCase } from 'types/enums';

interface Props {
  info?: IndividualInformation;
}

export const ClubInfo = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <Card>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            color: '#777777',
          }}
        >
          {t(translations.createNewMemberPage.joinedClubInfo)}
        </Box>
      </Stack>
      <KV>
        <RowJustifyBetween>
          <Key>{t(translations.clubAssociationInformation.clubName)}</Key>
          <Value>{info?.clubInfo?.clubName || '-'}</Value>
        </RowJustifyBetween>
        <RowJustifyBetween>
          <Key>{t(translations.common.clubStatus)}</Key>
          <Value>
            {info?.clubInfo?.clubStatus
              ? get(PackageStatusLowerCase, info.clubInfo.clubStatus)
              : '-'}
          </Value>
        </RowJustifyBetween>
        <RowJustifyBetween>
          <Key>{t(translations.common.clubPackageStatus)}</Key>
          <Value>
            {info?.clubInfo?.clubPackageStatus
              ? get(PackageStatusLowerCase, info.clubInfo.clubPackageStatus)
              : '-'}
          </Value>
        </RowJustifyBetween>
        <RowJustifyBetween>
          <Key>{t(translations.common.clubAdmin)}</Key>
          <Value>{info?.clubInfo?.clubAdmin || '-'}</Value>
        </RowJustifyBetween>
        <RowJustifyBetween style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <Key>{t(translations.common.adminPhoneNumber)}</Key>
          <Value>{info?.clubInfo?.adminPhoneNumber || '-'}</Value>
        </RowJustifyBetween>
      </KV>
    </Card>
  );
});
