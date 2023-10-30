/**
 *
 * WithTitle
 *
 */
import * as React from 'react';
import { Container, Grid, styled } from '@mui/material';
import Page from 'app/components/Page';
import { useTranslation } from 'react-i18next';
import { Header } from 'app/components/Header';

export const MainContent = styled('div')({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  fontSize: '14px',
});

export function withTitle(
  WrappedComponent: React.ElementType,
  title: string,
  navigateTo?: string,
  goBack?: boolean,
) {
  function HOC(props: any) {
    const { t } = useTranslation();
    return (
      <>
        <Page title={t(title)}>
          <MainContent>
            <Container maxWidth="xl" sx={{ marginLeft: 'unset' }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12}>
                  <Header
                    title={t(title)}
                    navigateTo={navigateTo}
                    goBack={goBack}
                  />
                  <WrappedComponent />
                </Grid>
              </Grid>
            </Container>
          </MainContent>
        </Page>
      </>
    );
  }
  return HOC;
}
