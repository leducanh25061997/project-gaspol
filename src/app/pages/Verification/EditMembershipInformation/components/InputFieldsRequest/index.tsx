/**
 *
 * InputFieldsRequest
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Autocomplete,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { borderRadius } from '@mui/system';
import { translations } from 'locales/translations';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import { ControlCamera } from '@mui/icons-material';
import { Controller, useFormContext } from 'react-hook-form';
import { IndividualInformation, Transaction } from 'types';
import nationalCode from 'utils/nationalCode/index.json';

import { selectEditIndividualMember } from '../../slice/selectors';
import { useEditIndividualMemberSlice } from '../../slice';

interface Props {
  initialInfo?: IndividualInformation;
}

export const InputFieldsRequest = memo((props: Props) => {
  const { initialInfo } = props;

  const { t } = useTranslation();
  const today = new Date();
  const bloodTypes = ['A', 'B', 'AB', 'O'];
  const genders = ['MALE', 'FEMALE'];
  const { actions } = useEditIndividualMemberSlice();
  const dispatch = useDispatch();
  const [dob, setDob] = React.useState('');
  const { provinces } = useSelector(selectEditIndividualMember);
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [formValues, setFormValues] = React.useState({
    packageName: '',
    name: '',
    hobby: '',
    bloodType: '',
    gender: '',
    nationality: '',
    province: '',
    rtRwNumber: '',
    address: '',
    birthPlace: '',
    postalCode: '',
    email: '',
    phone: '',
    dob: '',
  });

  React.useEffect(() => {
    setFormValues({
      ...formValues,
      packageName: initialInfo?.packageName || '',
      name: initialInfo?.name || '',
      bloodType: initialInfo?.bloodType || '',
      gender: initialInfo?.gender || '',
      nationality: initialInfo?.nationality || '',
      province: initialInfo?.provinceName || '',
      rtRwNumber: initialInfo?.rtRwNumber || '',
      address: initialInfo?.address || '',
      birthPlace: initialInfo?.birthPlace || '',
      postalCode: initialInfo?.postalCode || '',
      email: initialInfo?.email || '',
      phone: initialInfo?.phone || '',
      dob: initialInfo?.dob || '',
    });

    setValue('name', initialInfo?.name || '');
    setValue('dob', initialInfo?.dob || '');
    setValue('bloodType', initialInfo?.bloodType || '');
    setValue('hobby', initialInfo?.hobby || '');
    setValue('gender', initialInfo?.gender || '');
    setValue('nationality', initialInfo?.nationality || '');
    setValue('province', initialInfo?.provinceName || '');
    setValue('rtRwNumber', initialInfo?.rtRwNumber || '');
    setValue('address', initialInfo?.address || '');
    setValue('birthPlace', initialInfo?.birthPlace || '');
    setValue('postalCode', initialInfo?.postalCode || '');
    setValue('email', initialInfo?.email || '');
  }, [initialInfo]);

  React.useEffect(() => {
    dispatch(actions.fetchProvinceRequests());
  }, []);

  return (
    <Card sx={{ mt: 3 }}>
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <Stack mt={3}>
            <TextField
              disabled={true}
              label={t(translations.createNewMemberPage.packageName)}
              value={formValues.packageName}
              sx={{
                borderRadius: 1,
              }}
            />
          </Stack>
          <Stack mt={3}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    error={!!errors.name}
                    defaultValue={formValues.name}
                    label={t(translations.createNewMemberPage.fullname)}
                    value={formValues.name}
                    helperText={errors.name ? errors.name.message : ''}
                    onChange={(event: any) => {
                      field.onChange(event);
                      setFormValues({
                        ...formValues,
                        name: event.target.value,
                      });
                    }}
                  />
                );
              }}
            />
          </Stack>
          <Stack mt={3}>
            <TextField
              disabled={true}
              label={t(translations.createNewMemberPage.phoneNumber)}
              value={formValues.phone}
              sx={{
                borderRadius: 1,
              }}
            />
          </Stack>
          <Stack mt={3}>
            <Controller
              name="dob"
              render={({ field }) => {
                return (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      {...field}
                      label={`${t(
                        translations.createNewMemberPage.dateOfBirth,
                      )}*`}
                      inputFormat="dd/MM/yyyy"
                      value={formValues.dob}
                      onChange={(event: any) => {
                        field.onChange(event);
                        setFormValues({
                          ...formValues,
                          dob: event,
                        });
                      }}
                      maxDate={new Date(today.setDate(today.getDate() - 1))}
                      minDate={new Date(1900, 1, 1)}
                      renderInput={params => {
                        const newParams = { ...params };
                        delete newParams.error;
                        return (
                          <TextField
                            {...newParams}
                            error={!!errors.dob}
                            helperText={errors.dob ? errors.dob.message : ''}
                          />
                        );
                      }}
                    />
                  </LocalizationProvider>
                );
              }}
              control={control}
              defaultValue=""
            />
          </Stack>
          <Stack mt={3}>
            <Controller
              name="hobby"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label={t(translations.createNewMemberPage.hobby)}
                    value={formValues.hobby}
                    onChange={(event: any) => {
                      field.onChange(event);
                      setFormValues({
                        ...formValues,
                        hobby: event.target.value,
                      });
                    }}
                  />
                );
              }}
            />
          </Stack>
          <Stack mt={3}>
            <FormControl>
              <InputLabel>
                {t(translations.createNewMemberPage.bloodType)}
              </InputLabel>
              <Controller
                name="bloodType"
                control={control}
                defaultValue={''}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      label={`${t(
                        translations.createNewMemberPage.bloodType,
                      )}*`}
                      value={formValues.bloodType}
                      error={!!errors.bloodType}
                      onChange={event => {
                        field.onChange(event);
                        setFormValues({
                          ...formValues,
                          bloodType: event.target.value,
                        });
                      }}
                    >
                      {(bloodTypes || []).map((value, index) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
              />
              {errors?.bloodType && (
                <FormHelperText style={{ color: 'red' }}>
                  {errors?.bloodType?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
          <Stack mt={3}>
            <FormControl>
              <InputLabel>
                {t(translations.createNewMemberPage.gender)}
              </InputLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue={''}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      label={`${t(translations.createNewMemberPage.gender)}*`}
                      value={formValues.gender}
                      error={!!errors.gender}
                      onChange={event => {
                        field.onChange(event);
                        setFormValues({
                          ...formValues,
                          gender: event.target.value,
                        });
                      }}
                    >
                      {(genders || []).map((value, index) => (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
              />
              {errors?.gender && (
                <FormHelperText style={{ color: 'red' }}>
                  {errors?.gender?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack mt={3}>
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => {
                return (
                  <Autocomplete
                    {...field}
                    options={nationalCode.countries.map(value => value.name)}
                    onChange={(_, data) => {
                      field.onChange(data);
                    }}
                    value={formValues.nationality}
                    renderInput={params => (
                      <TextField
                        {...params}
                        error={!!errors.nationality}
                        helperText={
                          errors.nationality ? errors.nationality.message : ''
                        }
                        style={{ width: '100%' }}
                        label={`${t(
                          translations.createNewMemberPage.nationality,
                        )}*`}
                      />
                    )}
                  />
                );
              }}
            />
          </Stack>
          <Stack mt={3}>
            <Controller
              name="province"
              control={control}
              render={({ field }) => {
                return (
                  <Autocomplete
                    options={provinces?.map(value => value.name) || []}
                    value={formValues.province}
                    onChange={(_, data) => {
                      setFormValues({ ...formValues, province: data || '' });
                      field.onChange(data);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={t(translations.createNewMemberPage.province)}
                        error={!!errors.province}
                        helperText={errors?.province?.message}
                      />
                    )}
                  />
                );
              }}
            />
          </Stack>
          <Stack mt={3}>
            <Controller
              name="rtRwNumber"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    error={!!errors.rtRwNumber}
                    label={t(translations.createNewMemberPage.rtRwNumber)}
                    value={formValues.rtRwNumber}
                    onChange={(event: any) => {
                      field.onChange(event);
                      setFormValues({
                        ...formValues,
                        rtRwNumber: event.target.value,
                      });
                    }}
                  />
                );
              }}
            />
          </Stack>
          <Stack mt={3}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    error={!!errors.address}
                    label={t(translations.createNewMemberPage.address)}
                    value={formValues.address}
                    helperText={errors?.address?.message}
                    onChange={(event: any) => {
                      field.onChange(event);
                      setFormValues({
                        ...formValues,
                        address: event.target.value,
                      });
                    }}
                  />
                );
              }}
            />
          </Stack>
          <Stack mt={3}>
            <Controller
              name="birthPlace"
              control={control}
              render={({ field }) => {
                return (
                  <Autocomplete
                    options={provinces?.map(value => value.name) || []}
                    value={formValues.birthPlace}
                    onChange={(_, data) => {
                      setFormValues({ ...formValues, birthPlace: data || '' });
                      field.onChange(data);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={t(translations.createNewMemberPage.birthPlace)}
                        error={!!errors.birthPlace}
                        helperText={errors?.birthPlace?.message}
                      />
                    )}
                  />
                );
              }}
            />
          </Stack>
          <Stack mt={3}>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label={t(translations.createNewMemberPage.postalCode)}
                    value={formValues.postalCode}
                    error={!!errors.postalCode}
                    helperText={errors?.postalCode?.message}
                    onChange={(event: any) => {
                      field.onChange(event);
                      setFormValues({
                        ...formValues,
                        postalCode: event.target.value,
                      });
                    }}
                  />
                );
              }}
            />
          </Stack>
          <Stack mt={3}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    error={!!errors.email}
                    label={t(translations.createNewMemberPage.email)}
                    value={formValues.email}
                    helperText={errors?.email?.message}
                    onChange={(event: any) => {
                      field.onChange(event);
                      setFormValues({
                        ...formValues,
                        email: event.target.value,
                      });
                    }}
                  />
                );
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
});
