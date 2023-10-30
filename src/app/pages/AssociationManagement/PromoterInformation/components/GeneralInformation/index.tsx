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
import {
  Document,
  ClubInformation,
  IndividualInformation,
  IndividualRequest,
} from 'types';
import { KisStatus, MemberStatus } from 'types/enums';
import { PromoterInformation } from 'types/PromoterManagement';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import {
  useForm,
  Controller,
  NestedValue,
  FieldError,
  FormProvider,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Label } from 'app/components/Label';
import { MembershipKisList } from 'types/Kis';
import { KV } from 'app/components/KeyValue';
import { GeneralExcelDetail } from 'app/components/GeneralExcelDetail';

import { PromoterInformationState } from '../../slice/types';

import { Footer } from '../Footer';

const RootStyle = styled('div')({
  color: '#777777',
});

interface Props {
  info?: PromoterInformation;
}

export const GeneralInformation = memo(({ info }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [certForms, setCertForms] = useState<any>({});
  const [certError, setCertError] = useState<any>(undefined);
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
  } = useForm<PromoterInformation>({
    resolver: yupResolver(statusNoteRequestSchema),
  });

  const statusClub = [
    MemberStatus.DRAFT,
    MemberStatus.PROCESSING,
    MemberStatus.APPROVED,
    MemberStatus.EXPIRED,
    MemberStatus.REJECTED,
  ];

  const methods = useForm<IndividualRequest>({
    defaultValues: { imiPaid: false, city: '', district: '', ward: '' },
  });

  const onSubmit = (data: PromoterInformation) => {};

  return (
    <FormProvider {...methods}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Card sx={{ mt: 5 }} style={{ marginTop: 20, paddingTop: 10 }}>
            <KV>
              <Row>
                <Text>{t(translations.promoterInformation.promoterName)}</Text>
                <Value>
                  {info?.promotorName ? info?.promotorName : 'Thich Promoter'}
                </Value>
              </Row>
              <Row>
                <Text>{t(translations.promoterInformation.ktaNumber)}</Text>
                <Value>
                  {info?.ktaNumber ? info?.ktaNumber : '1111122157'}
                </Value>
              </Row>
              <Row>
                <Text>{t(translations.promoterInformation.promoterPIC)}</Text>
                <Value>{info?.picName ? info?.picName : 'Thich Gi'}</Value>
              </Row>
              <Row>
                <Text>
                  {t(translations.promoterInformation.picPhoneNumber)}
                </Text>
                <Value>
                  {info?.clubPicPhone ? info?.clubPicPhone : '62949550350'}
                </Value>
              </Row>
              <Row>
                <Text>{t(translations.promoterInformation.clubLicense)}</Text>
                <Value>
                  {info?.clubPicPhone ? info?.clubPicPhone : 'Fake data'}
                </Value>
              </Row>
              <Row>
                <Text>
                  {t(translations.promoterInformation.associationLicense)}
                </Text>
                <Value>
                  {info?.clubPicPhone ? info?.clubPicPhone : 'Fake data'}
                </Value>
              </Row>
            </KV>
          </Card>
          <Card style={{ marginTop: 10 }}>
            <Label>{t(translations.common.documents)}</Label>
            <GeneralExcelDetail info={info} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card sx={{ mt: 5 }} style={{ marginTop: 20, paddingTop: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction={'row'} style={{ marginTop: '5px' }}>
                <Label>{t(translations.common.status)}</Label>
                <Select {...register('status')} sx={{ height: 30, ml: 3 }}>
                  {(statusClub || []).map((value, index) => (
                    <MenuItem key={value} value={value}>
                      {`${value.charAt(0).toLocaleUpperCase()}${value.slice(
                        1,
                      )}`}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              <Stack sx={{ mt: 3 }} style={{ marginTop: 10 }}>
                <TextField
                  {...register('note')}
                  fullWidth
                  label={`${t(translations.tableMembership.note)}*`}
                  error={!!errors.note}
                  helperText={errors?.note?.message}
                  multiline
                  minRows={3}
                />
              </Stack>
              <Box sx={{ mt: 5, textAlign: 'end' }} style={{ marginTop: 10 }}>
                <LoadingButton variant="contained" type="submit">
                  {t(translations.common.apply)}
                </LoadingButton>
              </Box>
            </form>
          </Card>
        </Grid>
      </Grid>
      <Footer handleSubmit={methods.handleSubmit(onSubmit)} />
    </FormProvider>
  );
});
