import { memo, useState, useEffect } from 'react';
import {
  Grid,
  Select,
  MenuItem,
  Card,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
  Autocomplete,
  Paper,
  Stack,
  Box,
  Collapse,
  InputAdornment,
} from '@mui/material';
import moment from 'moment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CustomPaperComponent } from 'app/components/CustomPaperComponent';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import nationalCode from 'utils/nationalCode/index.json';
import { PhoneNumberInput } from 'app/components/PhoneNumberInput';
import {
  Province,
  Club,
  Profile,
  Category,
  IndividualInformation,
} from 'types';
import {
  UserPackageType,
  MemberStatusLowerCase,
  MemberListStatusLowerCase,
} from 'types/enums';

import NumberFormat from 'react-number-format';
import { FormAutoComplete } from 'app/components/FormControl';

import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { get } from 'lodash';

import { selectEditMember } from '../../slice/selectors';
import { useEditMemberSlice } from '../../slice';

interface Props {
  info?: IndividualInformation;
}

interface genderType {
  name: string;
  value: string;
}

export const MemberInputForm = memo(({ info }: Props) => {
  const today = new Date();
  const defaultBloods: string[] = ['A', 'B', 'AB', 'O'];
  const defaultGender: genderType[] = [
    { name: 'MALE', value: 'MALE' },
    { name: 'FEMALE', value: 'FEMALE' },
  ];
  const defaultIdentification = [
    { name: 'NIK', value: 'NIK' },
    { name: 'KITAS', value: 'KITAS' },
    // { name: 'KTP', value: 'KTP' },
  ];
  const { actions } = useEditMemberSlice();
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const memberGerenalInfo = useSelector(selectEditMember);

  const isValidPhoneNumber = (profile: Profile) => {
    return profile.status !== 'not_existed';
  };

  const [gender, setGender] = useState<string>('');
  const [checkHobby, setCheckHobby] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(true);
  const [formValues, setFormValues] = useState({
    memberStatus: '',
    phone: '',
    fullName: '',
    email: '',
    birthPlace: '',
    birthday: '',
    gender: '',
    bloodType: '',
    nationality: '',
    hobbies: [] as string[],
    nikNumber: '',
    nikType: 'NIK',
  });

  const convertArr = (text: string) => {
    const myArray = text.split(',');
    const result = [];
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i] !== '') {
        result.push({ name: '#' + myArray[i] });
      }
    }
    return result;
  };

  useEffect(() => {
    // const phoneNumber = info?.phone ? info?.phone.substring(2) : '';
    setFormValues({
      ...formValues,
      memberStatus: info?.status ? get(MemberStatusLowerCase, info.status) : '',
      phone: info?.phone || '',
      fullName: info?.fullName || '',
      email: info?.email || '',
      birthPlace: info?.birthPlace || '',
      birthday: (moment(info?.birthday, 'DD-MM-YYYY')?.valueOf() as any) || '',
      gender: info?.gender ? info.gender.toUpperCase() : '',
      bloodType: info?.bloodType || '',
      nationality: info?.nationality || '',
      hobbies: info?.hobbies as string[],
      nikNumber:
        info?.identification?.identifierNikNumber ||
        info?.identification?.identifierKitasNumber ||
        (info?.identification?.identifierKtpNumber as string),
      nikType: info?.identification
        ? checkTypeOfNik(info.identification)
        : 'NIK',
    });

    setValue(
      'memberStatus',
      info?.status ? get(MemberStatusLowerCase, info.status) : '',
    );
    setValue('phone', info?.phone || '');
    setValue('fullName', info?.fullName || '');
    setValue('email', info?.email || '');
    setValue('birthPlace', info?.birthPlace || '');
    setValue('birthday', moment(info?.birthday, 'DD-MM-YYYY')?.valueOf() || '');
    setValue('gender', info?.gender ? info.gender.toUpperCase() : '');
    setValue('bloodType', info?.bloodType || '');
    setValue('nationality', info?.nationality || '');
    setValue('hobbies', (info?.hobbies as string[]) || []);
    setValue(
      'nikNumber',
      info?.identification?.identifierNikNumber ||
        info?.identification?.identifierKitasNumber ||
        (info?.identification?.identifierKtpNumber as string),
    );
    setValue(
      'nikType',
      info?.identification ? checkTypeOfNik(info.identification) : 'NIK',
    );
  }, [info]);

  const checkTypeOfNik = (identification: any) => {
    if (identification?.identifierNikNumber) {
      return 'NIK';
    } else if (identification?.identifierKitasNumber) {
      return 'KITAS';
    } else if (identification?.identifierKtpNumber) {
      return 'KTP';
    } else {
      return 'NIK';
    }
  };
  // useEffect(() => {
  //   if (
  //     memberGerenalInfo?.profile &&
  //     (memberGerenalInfo?.profile).length > 0
  //   ) {
  //     if (isValidPhoneNumber(memberGerenalInfo?.profile[0])) {
  //       setNumberUnique({
  //         type: 'valid',
  //         message: t(translations.editMember.phoneNumberError),
  //       });
  //     } else {
  //       setNumberUnique(undefined);
  //     }
  //   }
  // }, [memberGerenalInfo?.profile]);

  // console.log('formValues.gender: ', formValues.gender);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card sx={{ mt: 3 }}>
      <Stack
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            color: '#777777',
          }}
        >
          {t(translations.createNewMemberPage.memberInformation)}
        </Box>
        {open ? (
          <ArrowDropDown sx={{ color: '#777777', marginLeft: 2 }} />
        ) : (
          <ArrowRight sx={{ color: '#777777', marginLeft: 2 }} />
        )}
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container spacing={2} sx={{ marginTop: '0' }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Controller
                name="memberStatus"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      disabled
                      id="memberStatus"
                      label={t(translations.common.memberStatus)}
                      type="text"
                      onChange={(e: any) => {
                        field.onChange(e);
                      }}
                      value={formValues?.memberStatus}
                      InputLabelProps={{
                        sx: {
                          '&.MuiInputLabel-shrink': {
                            background: '#fff',
                          },
                        },
                      }}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="nikNumber"
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <TextField
                      {...field}
                      error={!!errors?.nikNumber}
                      helperText={errors?.nikNumber?.message}
                      label={`${t(translations.common.identificationNumber)}*`}
                      type="text"
                      fullWidth
                      onChange={(e: any) => {
                        if (e.target.value.length <= 16) {
                          field.onChange(e);
                          setFormValues({
                            ...formValues,
                            nikNumber: e.target.value,
                          });
                        }
                      }}
                      value={formValues?.nikNumber}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Controller
                              name="nikType"
                              render={({ field }) => {
                                return (
                                  <Select
                                    {...field}
                                    labelId="nikType"
                                    id="demo-simple-select-nikType"
                                    onChange={e => {
                                      field.onChange(e);
                                      setFormValues({
                                        ...formValues,
                                        nikType: e.target.value,
                                      });
                                    }}
                                    value={formValues.nikType}
                                    sx={{
                                      borderRadius: 0,
                                      '& .MuiSelect-outlined': {
                                        paddingLeft: 0,
                                      },
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                      },
                                    }}
                                  >
                                    {(defaultIdentification || []).map(
                                      (item, index) => (
                                        <MenuItem
                                          key={item.value}
                                          value={item.value}
                                        >
                                          {item.name}
                                        </MenuItem>
                                      ),
                                    )}
                                  </Select>
                                );
                              }}
                              control={control}
                            />
                          </InputAdornment>
                        ),
                        inputProps: { type: 'number', pattern: '[0-9*]' },
                      }}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="fullName"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!errors?.fullName}
                      helperText={errors?.fullName?.message}
                      label={`${t(translations.common.name)}*`}
                      type="text"
                      onChange={(e: any) => {
                        field.onChange(e);
                        setFormValues({
                          ...formValues,
                          fullName: e.target.value,
                        });
                      }}
                      value={formValues?.fullName}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="email"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!errors?.email}
                      helperText={errors?.email?.message}
                      label={`${t(translations.editMember.email)}*`}
                      type="text"
                      onChange={(e: any) => {
                        field.onChange(e);
                        setFormValues({
                          ...formValues,
                          email: e.target.value,
                        });
                      }}
                      value={formValues?.email}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="birthPlace"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={
                        (memberGerenalInfo?.birthPlaceCity &&
                          memberGerenalInfo?.birthPlaceCity.length > 0 &&
                          memberGerenalInfo?.birthPlaceCity.map(
                            value => value.name,
                          )) ||
                        []
                      }
                      onChange={(_, data) => {
                        if (data) {
                          field.onChange(data);
                          setFormValues({
                            ...formValues,
                            birthPlace: data,
                          });
                        }
                      }}
                      value={formValues?.birthPlace}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors?.birthPlace}
                          label={`${t(translations.editMember.birthPlace)}*`}
                          helperText={errors?.birthPlace?.message}
                        />
                      )}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="birthday"
                render={({ field }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        {...field}
                        label={`${t(translations.editMember.dateOfBirth)}*`}
                        inputFormat="dd/MM/yyyy"
                        onChange={(event: any) => {
                          console.log(
                            '🚀 ~ file: index.tsx ~ line 432 ~ MemberInputForm ~ event',
                            event,
                          );
                          field.onChange(event);
                          setFormValues({
                            ...formValues,
                            birthday: event,
                          });
                        }}
                        maxDate={new Date(today.setDate(today.getDate() - 1))}
                        minDate={new Date(1900, 1, 1)}
                        value={formValues?.birthday}
                        renderInput={params => {
                          const newParams = { ...params };
                          delete newParams.error;
                          return (
                            <TextField
                              {...newParams}
                              error={!!errors.birthday}
                              helperText={errors?.birthday?.message}
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Controller
                name="phone"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      id="phoneNumber"
                      label={`${t(translations.editMember.phoneNumber)}*`}
                      type="text"
                      disabled
                      onChange={(e: any) => {
                        field.onChange(e);
                        setFormValues({
                          ...formValues,
                          phone: e.target.value,
                        });
                      }}
                      value={formValues?.phone}
                      InputLabelProps={{
                        sx: {
                          '&.MuiInputLabel-shrink': {
                            background: '#fff',
                          },
                        },
                      }}
                    />
                  );
                }}
                control={control}
              />
              {/* <PhoneNumberInput
                  errors={
                    numberIsUnique
                      ? { ...numberIsUnique, ...errors?.phone }
                      : errors?.phone
                  }
                  control={control}
                  fieldName="phone"
                  disabled
                  requestPhoneNumber={actions.checkPhoneNumberRequest}
                  phoneRequestType={UserPackageType.KTA}
                  label={`${t(translations.editMember.phoneNumber)}*`}
                  defaultValue={formValues?.phone}
                /> */}
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel error={!!errors.gender}>
                {t(translations.editMember.gender)}*
              </InputLabel>
              <Controller
                name="gender"
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      labelId="gender"
                      error={!!errors.gender}
                      id="demo-simple-select-helper"
                      value={formValues.gender}
                      label={`${t(translations.editMember.gender)}*`}
                      onChange={e => {
                        field.onChange(e);
                        setFormValues({
                          ...formValues,
                          gender: e.target.value,
                        });
                      }}
                    >
                      {(defaultGender || []).map((item, index) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
                control={control}
              />
              {errors?.gender && (
                <FormHelperText style={{ color: 'red' }}>
                  {errors?.gender?.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel error={!!errors.bloodType}>
                {t(translations.editMember.bloodType)}*
              </InputLabel>
              <Controller
                name="bloodType"
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      error={!!errors.bloodType}
                      label={`${t(translations.editMember.bloodType)}*`}
                      onChange={e => {
                        field.onChange(e);
                        setFormValues({
                          ...formValues,
                          bloodType: e.target.value,
                        });
                      }}
                      value={formValues?.bloodType}
                    >
                      {(defaultBloods || []).map((value, index) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
                control={control}
              />
              {errors?.bloodType && (
                <FormHelperText style={{ color: 'red' }}>
                  {errors?.bloodType?.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="nationality"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={nationalCode.countries.map(value => value.name)}
                      onChange={(_, data) => {
                        if (data) {
                          field.onChange(data);
                          setFormValues({
                            ...formValues,
                            nationality: data,
                          });
                        }
                      }}
                      value={formValues?.nationality}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.nationality}
                          label={`${t(translations.editMember.nationality)}*`}
                          helperText={errors?.nationality?.message}
                          value={info?.nationality ? info?.nationality : ''}
                        />
                      )}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="hobbies"
                render={({ field }) => {
                  // if (checkHobby) {
                  //   field.value = convertArr(formValues?.hobby);
                  // } else {
                  //   field.value = convertArr(field.value);
                  // }
                  return (
                    <Autocomplete
                      multiple
                      {...field}
                      options={
                        memberGerenalInfo?.hobby?.length
                          ? memberGerenalInfo.hobby.map(item => item.name)
                          : []
                      }
                      getOptionLabel={option => option || ''}
                      value={formValues?.hobbies || []}
                      onChange={(_, data: any) => {
                        if (data) {
                          const _hobbies = [] as string[];
                          data.map((option: any) => {
                            if (_hobbies.indexOf(option) === -1) {
                              _hobbies.push(option);
                            } else {
                              const index = _hobbies.indexOf(option);
                              _hobbies.splice(index, 1);
                            }
                          });
                          field.onChange(_hobbies);
                          setFormValues({
                            ...formValues,
                            hobbies: _hobbies,
                          });
                        }
                        // setCheckHobby(false);
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label={t(translations.editMember.hobby)}
                          error={!!errors.hobbies}
                          helperText={errors?.hobbies?.message}
                        />
                      )}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
});
