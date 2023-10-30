/**
 *
 * RouterBreadcrumbs
 *
 */
import * as React from 'react';
import Box from '@mui/material/Box';
import Link, { LinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { keyBy } from 'lodash';

import sidebarConfig from 'app/components/Sidebar/SidebarConfig';

import {
  Link as RouterLink,
  Route,
  MemoryRouter,
  RouterProps,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

export const RouterBreadcrumbs = React.memo(() => {
  const { t } = useTranslation();

  const breadcrumbNameMap = keyBy(
    sidebarConfig.flatMap(config => config.children || []).map(x => x),
    'path',
  );

  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x: string) => x);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 360 }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {pathNames.map((value, index) => {
          const last = index === pathNames.length - 1;
          const to = `/${pathNames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography color="text.primary" key={to}>
              {breadcrumbNameMap[to]?.title && t(breadcrumbNameMap[to].title)}
            </Typography>
          ) : (
            <LinkRouter underline="hover" color="inherit" to={to} key={to}>
              {breadcrumbNameMap[to]?.title && t(breadcrumbNameMap[to].title)}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
});
