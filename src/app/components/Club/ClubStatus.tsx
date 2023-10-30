import React, { memo } from 'react';
import { Card, Stack, Box, Typography } from '@mui/material';
import {
  Key,
  KV,
  Row,
  RowJustifyBetween,
  Value,
} from 'app/components/KeyValue';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { get } from 'lodash';
import { PackageStatus } from 'types/enums';
interface Props {
  status?: string;
  expiredDate?: string;
  ktaNumber?: string;
  oldKtaNumber?: string;
  packageName?: string;
  userPoint?: number;
}

export const ClubStatus = memo((props: Props) => {
  const {
    status,
    expiredDate,
    ktaNumber,
    packageName,
    userPoint,
    oldKtaNumber,
  } = props;
  const { t } = useTranslation();

  return (
    <Card>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            color: '#777777',
          }}
        >
          {t(translations.createNewMemberPage.membershipInfo)}
        </Box>
        {/* <Typography sx={{ color: '#3784EB' }}>
          {t(translations.common.gPoint)}: {userPoint}
        </Typography> */}
      </Stack>
      <KV>
        <RowJustifyBetween>
          <Key>{t(translations.common.package)}</Key>
          <Value>{packageName ? packageName : '-'}</Value>
        </RowJustifyBetween>
        <RowJustifyBetween>
          <Key>{t(translations.tableMembership.memberShipStatus)}</Key>
          <Value>{status ? status : '-'}</Value>
        </RowJustifyBetween>
        <RowJustifyBetween>
          <Key>{t(translations.common.expirationDate)}</Key>
          <Value>{expiredDate ? expiredDate : '-'}</Value>
        </RowJustifyBetween>
        <RowJustifyBetween>
          <Key>{t(translations.common.ktaNumber)}</Key>
          <Value>{ktaNumber ? ktaNumber : '-'}</Value>
        </RowJustifyBetween>
        <RowJustifyBetween style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <Key>{t(translations.common.oldKTANumber)}</Key>
          <Value>{oldKtaNumber ? oldKtaNumber : '-'}</Value>
        </RowJustifyBetween>
      </KV>
    </Card>
  );
});
