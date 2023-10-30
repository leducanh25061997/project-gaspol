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

import { selectAuth } from 'app/pages/Auth/slice/selectors';
import { TitlePage } from 'app/components/Label';

import { selectClubInformation } from './slice/selectors';
import { useClubInformationSlice } from './slice';
import { GeneralInformation } from './components/GeneralInformation';
import { MemberOfClub } from './components/MemberOfClub';
import { AuditTrails } from './components/AuditTrails';

interface Props {}

const ClubInformation = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const params = useParams();
  const { actions } = useClubInformationSlice();
  const navigate = useNavigate();
  const { id } = params;
  const dispatch = useDispatch();
  const { clubInformation, clubMembersPageable } = useSelector(
    selectClubInformation,
  );
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;
  const [isDetailUpdate, setIsDetailUpdate] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (userInformation && userInformation.roles) {
      if (
        userInformation.roles.length > 0 &&
        (userInformation.roles.includes('club_details_update') ||
          userInformation.roles.includes('club_details_update_basic_profile') ||
          userInformation.roles.includes('club_details_update_province'))
      ) {
        setIsDetailUpdate(true);
      }
    }
  }, [userInformation]);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(actions.fetchCategories());
    dispatch(actions.fetchClubInformation(id));
    dispatch(
      actions.fetchListMemberOfClub({
        clubId: Number(id),
        page: 0,
        size: 10,
      }),
    );
  }, []);

  const handleEditClick = () => {
    navigate(path.club + `/edit/${id}`);
  };

  return (
    <Grid>
      <Grid
        container
        direction={'row'}
        justifyContent={'flex-end'}
        sx={{ marginTop: '-1rem', marginBottom: '1rem' }}
      >
        {isDetailUpdate && (
          <Button
            variant="contained"
            startIcon={<Icon fontSize="large" icon="mdi:pencil" />}
            onClick={handleEditClick}
          >
            {t(translations.common.edit)}
          </Button>
        )}
      </Grid>
      <div style={{ display: 'flex' }}>
        <TitlePage>{t(translations.common.secretNumber)}:</TitlePage>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 700,
            paddingTop: '2px',
            paddingLeft: '0.6rem',
          }}
        >
          {clubInformation?.securityCode || '-'}
        </Typography>
      </div>
      <GeneralInformation info={clubInformation} />
      <MemberOfClub
        items={clubMembersPageable?.data}
        totalElements={clubMembersPageable?.total}
        clubId={id}
      />
      {/* <AuditTrails /> */}
    </Grid>
  );
});

export default withTitle(ClubInformation, 'clubInformation.title', '', true);
