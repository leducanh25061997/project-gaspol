import React, { memo } from 'react';
import { MembershipRequest } from 'types';
import { Card, Grid, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { TitlePage } from 'app/components/Label';

import document_icon from '../../../../../../assets/images/document.svg';
interface Props {
  info?: MembershipRequest;
}

const DocumentRoot = styled('div')({
  border: '0.5px dashed #C0B9B9',
  borderRadius: 3,
  '& .document_icon': {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
  },
  '& .document_name': {
    background: 'rgba(192, 185, 185, 0.3)',
    borderTop: '0.5px dashed #C0B9B9',
    padding: '9px 0px',
  },
});

export const Document = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();

  return (
    <Card>
      <Grid container justifyContent={'space-between'}>
        <TitlePage>{t(translations.common.document)}</TitlePage>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={6} sm={6} md={6}>
          <DocumentRoot>
            <div className="document_icon">
              <img src={document_icon} width={100} height={100} alt="" />
            </div>
            <div className="document_name">
              <Typography>{'Club F1 in Indonesia racing car...'}</Typography>
            </div>
          </DocumentRoot>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <DocumentRoot>
            <div className="document_icon">
              <img src={document_icon} width={100} height={100} alt="" />
            </div>
            <div className="document_name">
              <Typography>{'Club F1 in Indonesia racing car...'}</Typography>
            </div>
          </DocumentRoot>
        </Grid>
      </Grid>
    </Card>
  );
});
