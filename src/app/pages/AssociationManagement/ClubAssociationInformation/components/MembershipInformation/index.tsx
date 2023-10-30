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
import moment from 'moment';

interface Props {
  info?: AssociationInformationType;
}

export const MembershipInformation = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <Card sx={{ marginTop: '1rem' }}>
      <TitleStyle>
        <Label>
          {t(
            translations.clubAssociationInformation
              .associationMembershipInformation,
          )}
        </Label>
      </TitleStyle>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.package)}
        </LabelInfo>
        <ValueStyle>{info?.subscribingPackage?.name}</ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.packageStatus)}
        </LabelInfo>
        <ValueStyle>{info?.packageStatus}</ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.associationCode)}
        </LabelInfo>
        <ValueStyle>{info?.associationCode}</ValueStyle>
      </RowInfo>
      <RowFooter>
        <LabelInfo>
          {t(translations.clubAssociationInformation.expirationDate)}
        </LabelInfo>
        <ValueStyle>
          {info?.expireDate && moment(info?.expireDate).format('DD/MM/YYYY')}
        </ValueStyle>
      </RowFooter>
    </Card>
  );
});
