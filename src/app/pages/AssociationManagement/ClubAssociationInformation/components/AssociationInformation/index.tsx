import { memo, useEffect } from 'react';
import { Avatar, Card, styled } from '@mui/material';
import { SubRow, SubKey, SubValue } from 'app/components/KeyValue';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { Label } from 'app/components/Label';
import { Star } from 'app/components/Star';
import { useSelector } from 'react-redux';
import {
  LabelInfo,
  RowFooter,
  RowInfo,
  TitleStyle,
  ValueStyle,
} from 'app/components/KeyText';
import { AssociationInformationType } from 'types/AssociationManagement';
import { get } from 'lodash';
import { MemberStatusLowerCase } from 'types/enums';
import { EllipsisText } from 'app/components/EllipsisText';

import { selectAssociationInformation } from '../../slice/selectors';

interface Props {
  info?: AssociationInformationType;
}

export const AssociationInformation = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();
  let contentPre: string = '';
  const fetchFormData = useSelector(selectAssociationInformation);
  info &&
    info?.contentPreference &&
    info?.contentPreference.length > 0 &&
    info?.contentPreference.map((res: any, index: number) => {
      const newContentPre = fetchFormData?.clubCategories?.find(
        (value: any) => value.id === res,
      )?.name;
      if (newContentPre) {
        if (index === 0) {
          contentPre = contentPre + newContentPre.toString();
        } else {
          contentPre = contentPre + ', ' + newContentPre.toString();
        }
      }
    });

  function capitalizeFirstLetter(data: any) {
    if (data) {
      const convertString = data.toLowerCase();
      return convertString.charAt(0).toUpperCase() + convertString.slice(1);
    }
    return '';
  }

  return (
    <Card>
      <TitleStyle>
        <Label>
          {t(translations.clubAssociationInformation.associationInfo)}
        </Label>
      </TitleStyle>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.associationAvatar)}
        </LabelInfo>
        <ValueStyle>
          <Avatar
            alt="Association avatar"
            src={info?.avatarUrl}
            sx={{ width: '50px', height: '50px', float: 'right' }}
          />
        </ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>{t(translations.clubAssociationInformation.name)}</LabelInfo>
        <ValueStyle>{info?.associationName}</ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.associationStatus)}
        </LabelInfo>
        <ValueStyle>
          {get(MemberStatusLowerCase, `${info?.associationStatus}`)}
        </ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.associationStar)}
        </LabelInfo>
        <ValueStyle>
          <Star numberStar={info?.star ? info.star : 0} />
        </ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.associationCategory)}
        </LabelInfo>
        <ValueStyle>
          {capitalizeFirstLetter(info?.associationCategory)}
        </ValueStyle>
      </RowInfo>
      <RowInfo>
        <LabelInfo>
          {t(translations.clubAssociationInformation.associationPreference)}
        </LabelInfo>
        <ValueStyle>
          <EllipsisText
            isFloat
            text={contentPre ? contentPre.toString() : ''}
            line={1}
          ></EllipsisText>
        </ValueStyle>
      </RowInfo>
      <RowFooter>
        <LabelInfo>
          {t(translations.clubAssociationInformation.externalLink)}
        </LabelInfo>
        <ValueStyle>{info?.externalLink}</ValueStyle>
      </RowFooter>
    </Card>
  );
});
