import React, { memo, useEffect, useState } from 'react';
import { Card, Grid, Divider, Avatar, Stack } from '@mui/material';

import { Star } from 'app/components/Star';
import { useSelector } from 'react-redux';

import { SubKey, KV, SubRow, SubValue } from 'app/components/KeyValue';
import { IndividualInformation } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { TitlePage } from 'app/components/Label';
import { selectClubInformation } from 'app/pages/ClubManagement/ClubInformation/slice/selectors';

interface Props {
  info?: IndividualInformation;
}

export const ClubGeneralInformation = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();
  const fetchFormData = useSelector(selectClubInformation);
  const [dataContentPreferences, setDataContentPreferences] = useState<any[]>(
    [],
  );
  const { clubCategories } = fetchFormData;

  useEffect(() => {
    const contentPreferences: any[] = [];
    info?.contentPreference?.map((item: any) => {
      contentPreferences.push(
        clubCategories?.find((value: any) => value.id === item)?.name,
      );
    });
    setDataContentPreferences(contentPreferences);
  }, [info]);

  return (
    <Card>
      <Grid container justifyContent={'space-between'}>
        <TitlePage>{t(translations.clubInformation.clubInformation)}</TitlePage>
      </Grid>
      <KV>
        <SubRow>
          <SubKey>{t(translations.clubInformation.clubAvatar)}</SubKey>
          <Avatar
            alt="club avatar"
            src={info?.avatarUrl}
            sx={{ width: '50px', height: '50px' }}
          />
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.tableRequestClub.name)}</SubKey>
          <SubValue>{info?.clubName}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.tableRequestClub.clubStatus)}</SubKey>
          <SubValue>{info?.clubStatus}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.tableRequestClub.clubStar)}</SubKey>
          <SubValue>
            <Stack
              sx={{
                '& .star': {
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                },
              }}
            >
              <Star
                className={'star'}
                numberStar={info?.star ? parseInt(info.star) : 0}
              />
            </Stack>
          </SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.clubManagementConfirm.clubPrivacy)}</SubKey>
          <SubValue>{info?.clubPrivacy}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>
            {t(translations.clubManagementConfirm.clubCategories)}
          </SubKey>
          <SubValue>{info?.clubCategory}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.clubManagementConfirm.clubPrefence)}</SubKey>
          <SubValue>{dataContentPreferences.join(', ')}</SubValue>
        </SubRow>
        <Divider />
        <SubRow>
          <SubKey>{t(translations.tableRequestClub.externalLink)}</SubKey>
          <SubValue>{info?.externalLink}</SubValue>
        </SubRow>
      </KV>
    </Card>
  );
});
