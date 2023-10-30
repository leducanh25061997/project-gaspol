/**
 *
 * GeneralInformation
 *
 */
import {
  Box,
  Card,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
  Checkbox,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { ClubGeneralInformation } from 'app/components/ClubGeneralInformation';
import { Key, Text, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, ClubInformation, IndividualInformation } from 'types';
import { KisStatus, MemberStatus } from 'types/enums';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, NestedValue, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Label } from 'app/components/Label';
import { MembershipKisList } from 'types/Kis';

import { useEditMemberSlice } from '../../slice';

const RootStyle = styled('div')({
  color: '#777777',
});

interface Props {
  info?: IndividualInformation;
}

export const GeneralInformation = memo(({ info }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [certForms, setCertForms] = useState<any>({});
  const [certError, setCertError] = useState<any>(undefined);
  const { actions } = useEditMemberSlice();
  const statusNoteRequestSchema = yup
    .object({
      note: yup
        .string()
        .required(t(translations.VerifyMembershipEdit.leaveNote)),
    })
    .required();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ClubInformation>({
    resolver: yupResolver(statusNoteRequestSchema),
  });

  const statusClub = [
    MemberStatus.DRAFT,
    MemberStatus.PROCESSING,
    MemberStatus.APPROVED,
    MemberStatus.EXPIRED,
    MemberStatus.REJECTED,
  ];

  const onSubmit = (data: ClubInformation) => {
    dispatch(
      actions.submitClubDocuments({
        forms: data,
        documents: [],
      }),
    );
  };

  useEffect(() => {
    return () => {
      setCertForms({});
      setCertError(undefined);
    };
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6}>
        <Card sx={{ mt: 5 }}>
          <RootStyle>
            <Label>{t(translations.editMember.clubInfo)}</Label>
          </RootStyle>
          <Row>
            <Text>{t(translations.editMember.club)}</Text>
            <Value>{info?.clubName}</Value>
          </Row>
          <Row>
            <Text>{t(translations.editMember.clubStatus)}</Text>
            <Value>{info?.clubStatus}</Value>
          </Row>
          <Row>
            <Text>{t(translations.editMember.clubAdmin)}</Text>
            <Value>{info?.clubPicName}</Value>
          </Row>
          <Row>
            <Text>{t(translations.editMember.adminPhoneNumber)}</Text>
            <Value>{info?.clubPicPhone}</Value>
          </Row>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Card sx={{ mt: 5 }}>
          <RootStyle>
            <Label>{t(translations.editMember.proRacerLicense)}</Label>
          </RootStyle>
          {info?.membershipKisList &&
            info?.membershipKisList.length > 0 &&
            info?.membershipKisList.map((kis, i) => (
              <Controller
                name={'membershipKisList' + i}
                key={kis?.kisName}
                render={({ field }) => {
                  return (
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        {...field}
                        disabled
                        checked
                        style={{ paddingLeft: 0, color: '#868686' }}
                      />
                      <Typography>{kis?.kisName}</Typography>
                    </Box>
                  );
                }}
              />
            ))}
        </Card>
        <Card sx={{ mt: 5 }} style={{ marginTop: 20 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={'row'}>
              <Label>{t(translations.clubInformation.changeStatus)}</Label>
              <Select {...register('status')} sx={{ height: 30, ml: 3 }}>
                {(statusClub || []).map((value, index) => (
                  <MenuItem key={value} value={value}>
                    {`${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack sx={{ mt: 3 }} style={{ marginTop: 20 }}>
              <TextField
                {...register('note')}
                fullWidth
                label={`${t(translations.tableMembership.note)}*`}
                error={!!errors.note}
                helperText={errors?.note?.message}
                multiline
                minRows={6}
              />
            </Stack>
            <Box sx={{ mt: 5, textAlign: 'end' }}>
              <LoadingButton variant="contained" type="submit">
                {t(translations.common.apply)}
              </LoadingButton>
            </Box>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
});
