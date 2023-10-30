/* eslint-disable no-nested-ternary */
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
  Stack,
  Box,
  Collapse,
  InputAdornment,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import nationalCode from 'utils/nationalCode/index.json';
import { PhoneNumberInput } from 'app/components/PhoneNumberInput';
import { Province, Club, Profile, Package, PhoneNumberRequest } from 'types';
import { UserPackageType } from 'types/enums';
import searchIcon from 'assets/images/search-icon.svg';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import NumberFormat from 'react-number-format';

import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

import { selectCreateMember } from '../../slice/selectors';
import { useCreateMemberSlice } from '../../slice';
interface PackageProps {
  id: number;
  name: string;
}
interface Props {
  setNumberUnique: (value?: FieldError) => void;
  numberIsUnique?: FieldError;
  packagePro?: PackageProps;
}
export const defaultPackage = {
  packageId: 0,
  packageName: '',
};
export const MemberInputForm = memo(
  ({ setNumberUnique, numberIsUnique, packagePro }: Props) => {
    const today = new Date();
    const defaultBloods = ['A', 'B', 'AB', 'O'];
    const defaultGender = ['MALE', 'FEMALE'];
    const defaultIdentification = [
      { name: 'KITAS', value: 'KITAS' },
      { name: 'NIK', value: 'NIK' },
      // { name: 'KTP', value: 'KTP' },
    ];
    const { actions } = useCreateMemberSlice();
    const { t } = useTranslation();
    const {
      control,
      setValue,
      getValues,
      formState: { errors },
    } = useFormContext();
    const memberGerenalInfo = useSelector(selectCreateMember);
    const dispatch = useDispatch();
    // const [packageId, setPackageId] = useState<number>();
    const [packageNew, setPackageNew] = useState({
      packageId: 0,
      packageName: '',
    });

    const [nikType, setNikType] = useState<string>('NIK');

    const [open, setOpen] = useState(true);
    const isValidPhoneNumber = (profile: Profile) => {
      return (
        (profile.isIndividual && !profile.isClubPic) ||
        profile.status === 'not_existed'
      ); //profile.status !== 'not_existed' ;
    };

    useEffect(() => {
      if (
        memberGerenalInfo?.profile &&
        (memberGerenalInfo?.profile).length > 0
      ) {
        if (!isValidPhoneNumber(memberGerenalInfo?.profile[0])) {
          setNumberUnique({
            type: 'inValid',
            message: t(translations.createNewMemberPage.phoneNumberError),
          });
        } else {
          setNumberUnique(undefined);
        }
      }
    }, [memberGerenalInfo?.profile]);

    useEffect(() => {
      // console.log(packagePro);
      setPackageNew({
        packageId: packagePro?.id as number,
        packageName: packagePro?.name as string,
      });
      // setPackageId(packageProId);
      setValue('packageId', packagePro?.id);
      setValue('packageName', packagePro?.name);
    }, [packagePro]);

    useEffect(() => {
      if (
        (errors.phone ||
          errors.birthday ||
          errors.nikNumber ||
          errors.gender ||
          errors.bloodType ||
          errors.fullName ||
          errors.nationality ||
          errors.email ||
          errors.birthPlace) &&
        !open
      ) {
        setOpen(true);
      }
    }, [errors]);

    useEffect(() => {
      setValue('nikType', 'NIK');
    }, []);

    const handleClick = () => {
      setOpen(!open);
    };

    const checkIsUniquePhoneNumber = (phoneNumber: any) => {
      if (phoneNumber) {
        const phoneNumberRequest: PhoneNumberRequest = {
          number: phoneNumber.replace('+', ''),
          type: UserPackageType.KTA,
        };
        dispatch(actions.checkPhoneNumberRequest(phoneNumberRequest));
      }
      document.querySelector('.special-label')?.classList.remove('onFocus');
    };

    return (
      <Card sx={{ mt: 3, padding: '1rem' }}>
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
            <ArrowDropDown sx={{ color: '#868686', marginLeft: 2 }} />
          ) : (
            <ArrowRight sx={{ color: '#868686', marginLeft: 2 }} />
          )}
        </Stack>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid container spacing={2} sx={{ marginTop: '0' }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="packageName"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label={`${t(translations.common.package)}*`}
                        type="text"
                        id="packageName"
                        disabled
                        value={packageNew.packageName || ''}
                        InputLabelProps={{
                          sx: { background: '#fff' },
                        }}
                        onChange={(e: any) => {
                          field.onChange(e);
                          setPackageNew({
                            ...packageNew,
                            packageName: e.target.value,
                          });
                        }}
                      />
                    );
                  }}
                  control={control}
                />
                <Controller
                  name="packageId"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        sx={{ display: 'none' }}
                        type="text"
                        label={t(translations.common.package)}
                        value={packageNew.packageId || ''}
                        onChange={(e: any) => {
                          field.onChange(e);
                          setPackageNew({
                            ...packageNew,
                            packageId: e.target.value,
                          });
                        }}
                        InputLabelProps={{
                          sx: { background: '#fff' },
                        }}
                      />
                    );
                  }}
                  control={control}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 3 }}>
                {/* <PhoneNumberInput
                  errors={
                    numberIsUnique
                      ? { ...numberIsUnique, ...errors?.phone }
                      : errors?.phone
                  }
                  control={control}
                  fieldName="phone"
                  requestPhoneNumber={actions.checkPhoneNumberRequest}
                  phoneRequestType={UserPackageType.KTA}
                  label={`${t(translations.createClubError.phoneNumber)}*`}
                /> */}
                <Controller
                  name="phone"
                  render={({ field }) => {
                    return (
                      <PhoneInput
                        {...field}
                        autoFormat={false}
                        containerStyle={{ width: '100%' }}
                        searchClass="search-class"
                        inputClass="fullWidth"
                        enableTerritories
                        enableSearch={true}
                        country="id"
                        specialLabel={`${t(
                          translations.createClubError.phoneNumber,
                        )}*`}
                        onChange={(e: any, country: any) => {
                          if (country.dialCode === '62') {
                            setNikType('NIK');
                          } else {
                            setNikType('KITAS');
                          }
                          field.onChange(e);
                        }}
                        onFocus={_ => {
                          document
                            .querySelector('.special-label')
                            ?.classList.add('onFocus');
                        }}
                        onBlur={e => checkIsUniquePhoneNumber(e.target.value)}
                        inputProps={{
                          name: 'phone',
                        }}
                      />
                    );
                  }}
                  control={control}
                />
                {numberIsUnique ? (
                  <FormHelperText>{numberIsUnique.message}</FormHelperText>
                ) : errors?.phone ? (
                  <FormHelperText>{errors?.phone?.message}</FormHelperText>
                ) : (
                  ''
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <Controller
                  name="nikNumber"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
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
                                      value={nikType}
                                      onChange={e => {
                                        field.onChange(e);
                                        setNikType(e.target.value);
                                        setValue('nikType', e.target.value);
                                      }}
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
                        error={!!errors?.nikNumber}
                        helperText={errors?.nikNumber?.message}
                        label={`${t(
                          translations.common.identificationNumber,
                        )}*`}
                        type="text"
                        fullWidth
                        onChange={(e: any) => {
                          if (e.target.value.length <= 16) {
                            field.onChange(e);
                          }
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
                        label={`${t(translations.createNewMemberPage.name)}*`}
                        type="text"
                        onChange={(e: any) => {
                          field.onChange(e);
                        }}
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
                        label={`${t(translations.createNewMemberPage.email)}*`}
                        type="text"
                        onChange={(e: any) => {
                          field.onChange(e);
                        }}
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
                            memberGerenalInfo?.birthPlaceCity.map(
                              value => value.name,
                            )) ||
                          []
                        }
                        freeSolo
                        onChange={(_, data) => {
                          field.onChange(data);
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            error={!!errors?.birthPlace}
                            label={`${t(
                              translations.createNewMemberPage.birthPlace,
                            )}*`}
                            helperText={errors?.birthPlace?.message}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {params.InputProps.endAdornment}
                                  <InputAdornment
                                    position="end"
                                    sx={{ marginRight: '10px' }}
                                  >
                                    <img src={searchIcon} alt="" />
                                  </InputAdornment>
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    );
                  }}
                  control={control}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="birthday"
                  render={({ field }) => {
                    return (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          {...field}
                          label={`${t(
                            translations.createNewMemberPage.dateOfBirth,
                          )}*`}
                          inputFormat="dd/MM/yyyy"
                          onChange={(event: any) => {
                            field.onChange(event);
                          }}
                          maxDate={new Date()}
                          minDate={new Date(1900, 1, 1)}
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
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel error={!!errors.gender}>
                  {t(translations.createNewMemberPage.gender)}*
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
                        label={`${t(translations.createNewMemberPage.gender)}*`}
                        onChange={e => field.onChange(e)}
                      >
                        {(defaultGender || []).map((value, index) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                  control={control}
                />
                {errors?.gender && (
                  <FormHelperText>{errors?.gender?.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel error={!!errors.bloodType}>
                  {t(translations.createNewMemberPage.bloodType)}*
                </InputLabel>
                <Controller
                  name="bloodType"
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        error={!!errors.bloodType}
                        label={`${t(
                          translations.createNewMemberPage.bloodType,
                        )}*`}
                        onChange={e => field.onChange(e)}
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
                  <FormHelperText>{errors?.bloodType?.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <Controller
                  name="nationality"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        options={nationalCode.countries.map(
                          value => value.name,
                        )}
                        onChange={(_, data) => {
                          field.onChange(data);
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            error={!!errors.nationality}
                            label={`${t(
                              translations.createNewMemberPage.nationality,
                            )}*`}
                            helperText={errors?.nationality?.message}
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
                  name="hobby"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        multiple
                        {...field}
                        options={memberGerenalInfo?.hobby || []}
                        getOptionLabel={option => option.name || ''}
                        onChange={(_, data) => {
                          field.onChange(
                            data?.map(item => item?.name).join(', '),
                          );
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={`${t(
                              translations.createNewMemberPage.hobby,
                            )}*`}
                            error={!!errors?.hobby}
                            helperText={errors?.hobby?.message}
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
  },
);
