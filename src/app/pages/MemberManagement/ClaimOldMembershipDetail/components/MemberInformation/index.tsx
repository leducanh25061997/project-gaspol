/**
 *
 * MemberInformation
 *
 */
import { Card, Grid } from '@mui/material';
import { Key, KV, Row, Value } from 'app/components/KeyValue';
import { translations } from 'locales/translations';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ClaimList } from 'types/ClaimList';

interface Props {
  info?: ClaimList;
  state?: any;
}

export const MemberInformation = memo((props: Props) => {
  const { t } = useTranslation();
  const { info, state } = props;

  const convertString = (data: any) => {
    if (!data) return '-';
    const chars = data.slice(0, data.search(/\d/));
    const numbs = data.replace(chars, '');
    return chars + ' - ' + numbs;
  };

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <KV>
            <Row>
              <Key style={{ marginRight: '3rem' }}>
                {t(translations.common.name)}
              </Key>
              <Value>:{state?.name}</Value>
            </Row>
            <Row>
              <Key style={{ marginRight: '3rem' }}>
                {t(translations.common.picPhoneNumber)}
              </Key>
              <Value>:{state?.phone}</Value>
            </Row>
            <Row>
              <Key style={{ marginRight: '3rem' }}>
                {t(translations.common.nikNumber)}
              </Key>
              <Value>:{convertString(info?.nikNumber)}</Value>
            </Row>
            <Row>
              <Key style={{ marginRight: '3rem' }}>
                {t(translations.common.oldKTANumber)}
              </Key>
              <Value>:{info?.ktaNumber}</Value>
            </Row>
          </KV>
        </Card>
      </Grid>
    </Grid>
  );
});
