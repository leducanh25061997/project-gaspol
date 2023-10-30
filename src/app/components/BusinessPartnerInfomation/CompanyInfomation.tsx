import React, { memo } from 'react';
import { Card, Grid } from '@mui/material';
import { KV, SubRow, SubValue, SubKey } from 'app/components/KeyValue';
import { MembershipRequest } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Label, TitlePage } from 'app/components/Label';

interface Props {
  info?: MembershipRequest;
}

export const CompanyInfomation = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <Card>
      <Grid container justifyContent={'space-between'}>
        <TitlePage>{t(translations.companyInformation.title)}</TitlePage>
      </Grid>
      <KV>
        <SubRow>
          <SubKey>
            {t(translations.companyInformation.companyName)}
            <span>:</span>
          </SubKey>
          <SubValue>{'Nghia Nghia'}</SubValue>
          {/* <SubValue>{info?.companyName}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.companyInformation.headquarterAddress)}
            <span>:</span>
          </SubKey>
          <SubValue>
            <Grid>{'86 Dich Vong street'}</Grid>
            <Grid>{'Hanoi'}</Grid>
            <Grid>{'Cau giay'}</Grid>
            <Grid>{'Dich vong'}</Grid>
            {/* <Grid>{info?.headAddress}</Grid> */}
            {/* <Grid>{info?.headWardName}</Grid> */}
            {/* <Grid>{info?.headDistrictName}</Grid> */}
            {/* <Grid>{info?.headCityName}</Grid> */}
            {/* <Grid>{info?.headProvinceName}</Grid> */}
          </SubValue>
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.companyInformation.headquarterPhoneNumber)}
            <span>:</span>
          </SubKey>
          <SubValue>{'6589785498567'}</SubValue>
          {/* <SubValue>{info?.headPhone}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.companyInformation.domicileAddress)}
            <span>:</span>
          </SubKey>
          <SubValue>
            <Grid>{'86 Dich Vong street'}</Grid>
            <Grid>{'Hanoi'}</Grid>
            <Grid>{'Cau giay'}</Grid>
            <Grid>{'Dich vong'}</Grid>
            {/* <Grid>{info?.domAddress}</Grid>
            <Grid>{info?.domWardName}</Grid>
            <Grid>{info?.domDistrictName}</Grid>
            <Grid>{info?.domCityName}</Grid>
            <Grid>{info?.domProvinceName}</Grid> */}
          </SubValue>
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.companyInformation.domicilePhoneNumber)}
            <span>:</span>
          </SubKey>
          <SubValue>{'54654645465'}</SubValue>
          {/* <SubValue>{info?.domPhone}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.companyInformation.companyEmail)}
            <span>:</span>
          </SubKey>
          <SubValue>{'anhtuan9nat@gmail.com'}</SubValue>
          {/* <SubValue>{info?.companyEmail}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.companyInformation.businessType)}
            <span>:</span>
          </SubKey>
          <SubValue>{'Service'}</SubValue>
          {/* <SubValue>{info?.businessType}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.companyInformation.ARTInfo)}
            <span>:</span>
          </SubKey>
          <SubValue>
            <Grid>{'6445454545454'}</Grid>
            <Grid>{'22/12/2022'}</Grid>
          </SubValue>
          {/* <SubValue>{info?.adArtNumber}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.companyInformation.NPWPNumber)}
            <span>:</span>
          </SubKey>
          <SubValue>{'6445454545454'}</SubValue>
          {/* <SubValue>{info?.npwpNumber}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.companyInformation.PKPInfo)}
            <span>:</span>
          </SubKey>
          <SubValue>
            <Grid>{'6445454545454'}</Grid>
            <Grid>{'22/12/2022'}</Grid>
          </SubValue>
          {/* <SubValue>{info?.pkpNumber}</SubValue> */}
        </SubRow>
      </KV>
    </Card>
  );
});
