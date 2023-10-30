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

export const ClubLocation = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <Card>
      <Grid container justifyContent={'space-between'}>
        <TitlePage>{t(translations.common.clubLocation)}</TitlePage>
      </Grid>
      <KV>
        <SubRow>
          <SubKey>{t(translations.clubManagementConfirm.province)}</SubKey>
          <SubValue>{info?.provinceName}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.common.city)}</SubKey>
          <SubValue>{info?.cityName}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.common.district)}</SubKey>
          <SubValue>{info?.districtName}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.common.ward)}</SubKey>
          <SubValue>{info?.wardName}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.clubManagementConfirm.fullAddress)}</SubKey>
          <SubValue>{info?.address}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{`${t(
            translations.clubManagementConfirm.rtRW,
          )} Number`}</SubKey>
          <SubValue>{info?.rtRwNumber}</SubValue>
        </SubRow>
        <Divider />
        {/* <SubRow>
          <SubKey>{t(translations.clubManagementConfirm.postalCode)}</SubKey>
          <SubValue>{info?.postCode}</SubValue>
        </SubRow> */}
      </KV>
    </Card>
  );
});
