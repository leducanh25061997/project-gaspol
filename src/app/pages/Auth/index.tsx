import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { KeycloakError } from 'types';
import { Logo } from 'app/components/Logo';
import { withLoading } from 'app/components/HOC/WithLoading';
import { useLoading } from 'app/hooks';

import Page from '../../components/Page';
import LoginForm from '../../components/Login';
import path from '../../routes/path';
import Notifier from '../Notifier';

import { useAuthSlice } from './slice';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
interface Props {
  setLoading?: Function;
}

const AuthPage = (props: Props) => {
  const { t } = useTranslation();
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading(props);
  const [error, setError] = React.useState<KeycloakError | undefined>();

  const handleLogin = React.useCallback(
    ({ username, password }) => {
      showLoading();
      dispatch(
        actions.login({ username, password }, (err?: any) => {
          hideLoading();
          if (!err) {
            navigate(path.root);
          } else {
            Notifier.addNotifyError({ messageId: 'error.signInFailed' });
            setError(err);
          }
        }),
      );
    },
    [actions, dispatch, navigate],
  );

  return (
    <RootStyle title={t(translations.loginPage.login)}>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5, alignItems: 'center' }}>
            <Logo />
            <Typography
              sx={{ fontSize: '40px', textTransform: 'uppercase', mt: 10 }}
              gutterBottom
            >
              {t(translations.loginPage.title)}
            </Typography>
          </Stack>
          <LoginForm onSubmit={handleLogin} error={error} />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default withLoading(AuthPage);
