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

export const Description = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <Card sx={{ marginTop: '1rem' }}>
      <TitleStyle>
        <Label>{t(translations.clubAssociationInformation.description)}</Label>
      </TitleStyle>
      <p>{info?.description}</p>
    </Card>
  );
});
