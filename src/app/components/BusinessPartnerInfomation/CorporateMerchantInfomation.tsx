import React, { memo } from 'react';
import { Card, Grid } from '@mui/material';
import { KV, SubRow, SubKey, SubValue } from 'app/components/KeyValue';
import { MembershipRequest } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import moment from 'moment';
import { Label, TitlePage } from 'app/components/Label';
interface Props {
  info?: MembershipRequest;
}

export const CorporateMerchantInfomation = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <Card>
      <Grid container justifyContent={'space-between'}>
        <TitlePage>
          {t(translations.businessPartnerInformation.CorporateMerchantInfo)}
        </TitlePage>
      </Grid>
      <KV>
        <SubRow>
          <SubKey>
            {t(translations.common.expiredDate)}
            <span>:</span>
          </SubKey>
          <SubValue>
            {/* {info?.expiredDate && moment(info?.expiredDate).format('DD/MM/YYYY')} */}
            {'22/01/2022'}
          </SubValue>
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.businessPartnerInformation.businessPartnerCode)}
          </SubKey>
          <SubValue>{'B-123456'}</SubValue>
          {/* <SubValue>{info?.businessPartnerCode}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.businessPartnerInformation.businessPartnerName)}
            <span>:</span>
          </SubKey>
          <SubValue>{'Nghia Nghia'}</SubValue>
          {/* <SubValue>{info?.partnerName}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.businessPartnerInformation.businessPartnerPic)}
            <span>:</span>
          </SubKey>
          <SubValue>{'Nghia Nghia'}</SubValue>
          {/* <SubValue>{info?.pic}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.businessPartnerInformation.picName)}
            <span>:</span>
          </SubKey>
          <SubValue>{'Nghia Nghia'}</SubValue>
          {/* <SubValue>{info?.picName}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.businessPartnerInformation.KITASNumber)}
            <span>:</span>
          </SubKey>
          <SubValue>{'65464654'}</SubValue>
          {/* <SubValue>{info?.nikNumber}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.businessPartnerInformation.PICPhoneNumber)}
            <span>:</span>
          </SubKey>
          <SubValue>{'6589785498567'}</SubValue>
          {/* <SubValue>{info?.picPhone}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.businessPartnerInformation.PICAddress)}
            <span>:</span>
          </SubKey>
          <SubValue>
            <Grid>{'86 Dich Vong'}</Grid>
            <Grid>{'street Hanoi'}</Grid>
            <Grid>{'Cau giay'}</Grid>
            <Grid>{'Dich vong'}</Grid>
          </SubValue>
          {/* <SubValue>{info?.picAddress}</SubValue> */}
        </SubRow>
        <SubRow>
          <SubKey>
            {t(translations.common.bankInfo)}
            <span>:</span>
          </SubKey>
          <SubValue>
            <Grid>{'Vietcom Bank'}</Grid>
            <Grid>{'54654645465'}</Grid>
            <Grid>{'Nguyen Nguyen Nguyen'}</Grid>
          </SubValue>
          {/* <SubValue>{info?.bankName}</SubValue> */}
        </SubRow>
      </KV>
    </Card>
  );
});
