import { memo } from 'react';
import { Card, styled } from '@mui/material';
import { SubRow, SubKey, SubValue } from 'app/components/KeyValue';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { Label } from 'app/components/Label';
import { Star } from 'app/components/Star';
import {
  LabelInfo,
  RowFooter,
  RowInfo,
  TitleStyle,
  ValueStyle,
} from 'app/components/KeyText';
import { AssociationInformationType } from 'types/AssociationManagement';

interface Props {
  info?: AssociationInformationType;
}

export const AssociationLocation = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <Card>
      <TitleStyle>
        <Label>
          {t(translations.clubAssociationInformation.associationLocation)}
        </Label>
      </TitleStyle>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.province)}
        </LabelInfo>
        <ValueStyle>{info?.provinceName}</ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>{t(translations.clubAssociationInformation.city)}</LabelInfo>
        <ValueStyle>{info?.cityName}</ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.district)}
        </LabelInfo>
        <ValueStyle>{info?.districtName}</ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>{t(translations.clubAssociationInformation.ward)}</LabelInfo>
        <ValueStyle>{info?.wardName}</ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.fullAddress)}
        </LabelInfo>
        <ValueStyle>{info?.address}</ValueStyle>
      </RowInfo>
      <RowFooter>
        <LabelInfo>
          {t(translations.clubAssociationInformation.rtRwNumber)}
        </LabelInfo>
        <ValueStyle>{info?.rtRwNumber}</ValueStyle>
      </RowFooter>
    </Card>
  );
});
