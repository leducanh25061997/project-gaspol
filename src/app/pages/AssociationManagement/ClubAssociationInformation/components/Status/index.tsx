import {
  Card,
  Grid,
  Stack,
  Select,
  MenuItem,
  TextField,
  Box,
} from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { ClubInformation } from 'types';

import { MemberStatus } from 'types/enums';

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { Label } from 'app/components/Label';

import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';

interface Props {}

export const Status = memo((props: Props) => {
  const { t } = useTranslation();
  const statusNoteRequestSchema = yup
    .object({
      note: yup
        .string()
        .required(t(translations.VerifyMembershipEdit.leaveNote)),
    })
    .required();

  const statusClub = [
    MemberStatus.ACTIVE,
    MemberStatus.BANNED,
    MemberStatus.EXPIRED,
  ];

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ClubInformation>({
    resolver: yupResolver(statusNoteRequestSchema),
  });

  const onSubmit = () => {};

  return (
    <Grid mt={2}>
      <Card sx={{ mt: 5 }} style={{ marginTop: 20, paddingTop: '10px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'row'} style={{ marginTop: '5px' }}>
            <Label>{t(translations.common.status)}</Label>
            <Select {...register('status')} sx={{ height: 30, ml: 3 }}>
              {(statusClub || []).map((value, index) => (
                <MenuItem key={value} value={value}>
                  {`${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`}
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
  );
});
