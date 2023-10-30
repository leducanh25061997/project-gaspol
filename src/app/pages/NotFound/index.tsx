import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import path from 'app/routes/path';

import Page from '../../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  const { t } = useTranslation();

  return (
    <RootStyle>
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Button
            to={path.root}
            size="large"
            variant="contained"
            component={RouterLink}
          >
            {t('notFoundPage.goToHome')}
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
