import { withTitle } from 'app/components/HOC/WithTitle';
import React, { memo, useState } from 'react';
import path from 'app/routes/path';

import { Button, Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AssociationInformation } from './components/AssociationInformation';

import { AssociationManagement } from './components/AssociationManagement';
import { ClubList } from './components/ClubList';
import { AssociationLocation } from './components/AssociationLocation';
import { MembershipInformation } from './components/MembershipInformation';
import { BankInformation } from './components/BankInformation';
import { Documents } from './components/Documents';
import { Description } from './components/Description';
import { useAssociationInformationSlice } from './slice';
import { selectAssociationInformation } from './slice/selectors';

interface Props {}

const ClubAssociationInformation = memo((props: Props) => {
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useAssociationInformationSlice();
  const { associationInformation } = useSelector(selectAssociationInformation);

  const handleEditClick = () => {
    navigate(path.associations + `/edit/${id}`);
  };

  React.useEffect(() => {
    if (!id) {
      return;
    }
    const idAssociation = id;
    dispatch(actions.fetchAssociationInformation(id));
    dispatch(actions.fetchCategories());
    dispatch(
      actions.fetchClubAssociationInformation({
        size: 10,
        page: 0,
        id: idAssociation,
      }),
    );
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid
        container
        direction={'row'}
        justifyContent={'flex-end'}
        sx={{ marginBottom: '1rem' }}
      >
        <Button
          variant="contained"
          startIcon={<Icon fontSize="large" icon="mdi:pencil" />}
          onClick={handleEditClick}
        >
          {t(translations.common.edit)}
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <AssociationInformation info={associationInformation} />
        <BankInformation info={associationInformation} />
        <Documents info={associationInformation} />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <AssociationLocation info={associationInformation} />
        <MembershipInformation info={associationInformation} />
        <Description info={associationInformation} />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <AssociationManagement info={associationInformation} />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <ClubList idAssociation={id} />
      </Grid>
    </Grid>
  );
});

export default withTitle(
  ClubAssociationInformation,
  'clubAssociationInformation.title',
  '',
  true,
);
