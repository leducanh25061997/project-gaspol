import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Box, Container, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import path from 'app/routes/path';

import Page from 'app/components/Page';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import ChangeHistory from './ChangeHistory';
import KTADashBoard from './KTADashboard';
import DownloadCard from './DownloadCard';
import KIS from './KIS';

const RootContainer = styled.div`
  width: 100%;
  .MuiTabs-indicator {
    background-color: #ff6b00;
    height: 3px;
    border-radius: 1px;
  }

  .MuiTab-root {
    width: fit-content;
    font-weight: 600;
    white-space: nowrap;
    flex-grow: unset;
  }
  .MuiTab-root.Mui-selected {
    color: #000000;
  }
  .MuiTabs-flexContainer {
    justify-content: space-between;
  }
  .tab-panel {
    padding: 0;
  }
`;

function MemberReporting() {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState<string>(
    new URL(window.location.href).searchParams.get('tab') || '1',
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  const listTabs = [
    {
      title: t(translations.dashboard.ktaDashboard),
      component: <KTADashBoard />,
    },
    {
      title: t(translations.dashboard.downloadCardDashboard),
      component: <DownloadCard />,
    },
    {
      title: t(translations.dashboard.changeClubHistory),
      component: <ChangeHistory />,
    },
    {
      title: t(translations.dashboard.upgradeToKIS),
      component: <KIS />,
    },
  ];

  return (
    <Page title="Member reporting">
      <Container maxWidth="xl">
        <Typography variant="h4" className="pb-30">
          {t(translations.dashboard.hiWelcome)}
        </Typography>
        <RootContainer>
          <TabContext value={tabIndex}>
            <Box>
              <TabList onChange={handleChange} textColor="inherit">
                {listTabs.map((item, index) => (
                  <Tab
                    label={item.title}
                    value={String(index + 1)}
                    component={Link}
                    to={`${path.memberReport}?tab=${index + 1}`}
                    key={item.title}
                  />
                ))}
              </TabList>
            </Box>
            {listTabs.map((item, index) => (
              <TabPanel
                className="tab-panel"
                value={String(index + 1)}
                key={item.title}
              >
                {item.component}
              </TabPanel>
            ))}
          </TabContext>
        </RootContainer>
      </Container>
    </Page>
  );
}

export default MemberReporting;
