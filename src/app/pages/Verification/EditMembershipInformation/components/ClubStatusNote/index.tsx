/**
 *
 * ClubStatusNote
 *
 */
import { Card, Grid, Stack, TextField } from '@mui/material';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Key, KV, Row, Value } from 'app/components/KeyValue';
import { translations } from 'locales/translations';
import { IndividualInformation, Transaction } from 'types';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  info?: IndividualInformation;
  status?: string;
}

export const ClubStatusNote = memo((props: Props) => {
  const { info, status } = props;
  const { t, i18n } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Card sx={{ mt: 3 }}>
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <Card>
            <KV>
              <Row>
                <Key>{t(translations.common.club)}</Key>
                <Value>{info?.clubName}</Value>
              </Row>
              <Row>
                <Key>{t(translations.common.clubStatus)}</Key>
                <Value>{info?.clubStatus}</Value>
              </Row>
              <Row>
                <Key>{t(translations.common.clubPIC)}</Key>
                <Value>{info?.clubPic}</Value>
              </Row>
              <Row>
                <Key>{t(translations.common.picPhoneNumber)}</Key>
                <Value>{info?.picPhoneNumber}</Value>
              </Row>
            </KV>
          </Card>
          <Card sx={{ mt: 3 }}>
            <KV>
              <Row>
                <Key>{t(translations.tableMembership.status)}</Key>
                <Value>{status}</Value>
              </Row>
            </KV>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} alignSelf="flex-start">
          <Card>
            <Controller
              name="note"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label={t(translations.tableMembership.note)}
                    onChange={(event: any) => {
                      field.onChange(event);
                    }}
                    error={!!errors.note}
                    helperText={errors.note ? errors.note.message : ''}
                    sx={{ width: '100%' }}
                    multiline={true}
                    minRows={6}
                    maxRows={7}
                  />
                );
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
});
