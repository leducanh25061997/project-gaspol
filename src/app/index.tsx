/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SnackbarProvider } from 'notistack';

import ThemeConfig from '../styles/theme';
import GlobalStyles from '../styles/theme/globalStyles';

import Routes from './routes';
import Notifier from './pages/Notifier';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <ThemeConfig>
        <Helmet
          titleTemplate="%s | Gaspol Admin"
          defaultTitle="Gaspol Admin"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Gaspol Admin" />
        </Helmet>
        <SnackbarProvider anchorOrigin={Notifier.anchorOrigin}>
          <Notifier />
        </SnackbarProvider>
        <Routes />
        <GlobalStyles />
      </ThemeConfig>
    </BrowserRouter>
  );
}
