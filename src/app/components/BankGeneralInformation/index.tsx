import React, { memo } from 'react';
import { Card, Grid, Divider } from '@mui/material';

import { Star } from 'app/components/Star';

import { SubKey, KV, SubRow, SubValue } from 'app/components/KeyValue';
import { IndividualInformation } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { TitlePage } from 'app/components/Label';

interface Props {
  info?: IndividualInformation;
}

export const BankGeneralInformation = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <Card sx={{ mt: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <TitlePage>{t(translations.common.bankInformation)}</TitlePage>
      </Grid>
      <KV>
        <SubRow>
          <SubKey>{t(translations.clubAssociationInformation.bankName)}</SubKey>
          <SubValue>{info?.bankName}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>
            {t(translations.clubAssociationInformation.accountNumber)}
          </SubKey>
          <SubValue>{info?.bankNumber}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>
            {t(translations.clubAssociationInformation.accountName)}
          </SubKey>
          <SubValue>
            {info?.bankHolderName && info?.bankHolderName.toUpperCase()}
          </SubValue>
        </SubRow>
      </KV>
    </Card>
  );
});
