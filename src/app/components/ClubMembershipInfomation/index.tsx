import React, { memo, useEffect, useState } from 'react';
import { Card, Grid, Divider } from '@mui/material';

import { Star } from 'app/components/Star';

import { SubKey, KV, SubRow, SubValue } from 'app/components/KeyValue';
import { IndividualInformation } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { TitlePage } from 'app/components/Label';
import moment from 'moment';
import { useSelector } from 'react-redux';

interface Props {
  info?: IndividualInformation;
}

export const ClubMembershipInfomation = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <Card sx={{ mt: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <TitlePage>
          {t(translations.common.clubMembershipInformation)}
        </TitlePage>
      </Grid>
      <KV>
        <SubRow>
          <SubKey>{t(translations.common.package)}</SubKey>
          <SubValue>
            {info?.subscribingPackage?.name === 'Gaspol Club'
              ? t(translations.common.gaspolClub)
              : info?.subscribingPackage?.name}
          </SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.common.packageStatus)}</SubKey>
          <SubValue>{info?.packageStatus}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.clubAssociationInformation.clubCode)}</SubKey>
          <SubValue>{info?.clubCode}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.common.expirationDate)}</SubKey>
          <SubValue>
            {info?.expiredDate &&
              moment(info?.expiredDate).format('DD/MM/YYYY')}
          </SubValue>
        </SubRow>
      </KV>
    </Card>
  );
});
