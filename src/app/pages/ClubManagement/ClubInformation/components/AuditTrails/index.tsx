import { Grid, List, ListItem, Typography, styled } from '@mui/material';
import { Status } from 'app/components/Status';
import Table from 'app/components/Table';
import { translations } from 'locales/translations';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from 'app/components/Label';
import { IndividualInformation, MembershipRequest } from 'types';

interface Props {}

export const AuditTrails = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const headers = [
    {
      id: 'timestamp',
      label: t(translations.kisInformation.timestamp),
    },
    {
      id: 'action',
      label: t(translations.common.action),
    },
    {
      id: 'by',
      label: t(translations.common.by),
    },
    {
      id: 'description',
      label: t(translations.common.description),
    },
  ];

  const renderItem = (item: MembershipRequest, index?: number) => {
    return [index, item.name, item.phone, item.ktaNumber];
  };

  return (
    <Grid sx={{ mt: 5, mb: 5 }}>
      <Label>{t(translations.kisInformation.auditTrails)}</Label>
      <Table
        headers={headers}
        renderItem={renderItem}
        order={'asc'}
        orderBy={''}
      />
    </Grid>
  );
});
