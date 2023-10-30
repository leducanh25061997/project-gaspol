/**
 *
 * ClubInformation
 *
 */
import { Button, Grid, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

import { withTitle } from 'app/components/HOC/WithTitle';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import path from 'app/routes/path';
import { ClubRequestStatus } from 'types/enums';

import { selectPromoterInformation } from './slice/selectors';
import { usePromoterInformationSlice } from './slice';
import { GeneralInformation } from './components/GeneralInformation';
import { AuditTrails } from './components/AuditTrails';

interface Props {}

const PromoterInformation = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const params = useParams();
  const { actions } = usePromoterInformationSlice();
  const navigate = useNavigate();
  const { id } = params;
  const dispatch = useDispatch();

  const promoterInformation = useSelector(selectPromoterInformation);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(actions.fetchPromoterInformation(id));
  }, []);

  return (
    <Grid>
      <GeneralInformation info={promoterInformation} />
    </Grid>
  );
});

export default withTitle(
  PromoterInformation,
  'promoterInformation.title',
  path.promotersList,
);
