import { memo } from 'react';
import { Card, Grid, Typography, styled, IconButton, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { TitlePage } from 'app/components/Label';

import AddIcon from '@mui/icons-material/Add';

import { LoadingButton } from '@mui/lab';

import document_icon from '../../../../../../assets/images/document.svg';

interface Props {}

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

export const ADARTDocument = memo((props: Props) => {
  const { t } = useTranslation();

  return (
    <Grid mt={2}>
      <Card>
        <Grid container justifyContent={'space-between'} mt={1}>
          <TitlePage>
            {t(translations.clubAssociationInformation.ADARTDocuments)}
          </TitlePage>
          <IconButton component="span" children={<AddIcon />} />
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
        <Box sx={{ mt: 4, textAlign: 'end' }}>
          <LoadingButton variant="contained" type="submit">
            {t(translations.common.approve)}
          </LoadingButton>
        </Box>
      </Card>
    </Grid>
  );
});
