/**
 *
 * DialogAssignManagement
 *
 */
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  TextField,
  Divider,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  Checkbox,
  styled,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import {
  Controller,
  FieldError,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';

import { DialogTitle } from 'app/components/DialogTitle';
import { Key, KV, Row } from 'app/components/KeyValue';
import NumberFormatInput from 'app/components/NumberFormatInput';
import { translations } from 'locales/translations';
import { IndividualRequest, KisInfo, PhoneNumberRequest, Profile } from 'types';
import {
  KisStatus,
  PackageNewMemberType,
  Roles,
  UserPackageType,
} from 'types/enums';
import {
  lettersNumbersSpaceRegex,
  lettersAndNumbersDashUnderscoreRegex,
} from 'utils/helpers/regex';
import { CheckAssociationManagement } from 'types/AssociationManagement';
import { withLoading } from 'app/components/HOC/WithLoading';
import { useLoading } from 'app/hooks';
import { TitlePage } from 'app/components/Label';
import { PhoneNumberInput } from 'app/components/PhoneNumberInput';

import { useEditAssociationSlice } from '../../slice';
import { selectAssociation } from '../../slice/selectors';
import 'react-phone-input-2/lib/material.css';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  isAdmin?: boolean;
  onSubmit: (data: any) => void;
}

export const RootStyle = styled('div')({
  '& .MuiInputLabel-root.Mui-error': {
    color: '#9D9D9D',
  },
  '& .MuiFormHelperText-root': {
    color: '#A84600',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: '#A84600',
  },
  '& .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: '#9D9D9D',
  },
  '& .MuiFormControl-root': {
    marginTop: 0,
    height: '87px',
  },
  '& #packageName': {
    background: '#E8E8E8',
    borderRadius: '8px',
  },
  '& .react-tel-input .special-label': {
    color: '#637381',
    fontSize: '12px',
    fontFamily: 'Public Sans,sans-serif',
  },
  '& .react-tel-input .onFocus': {
    color: '#00AB55',
  },
  '& .react-tel-input .fullWidth': {
    width: '100%',
    borderRadius: '8px',
    borderColor: '#9d9d9d',
    '&:focus': {
      border: '2px solid #00AB55',
      borderRadius: '8px',
      boxShadow: 'none',
    },
    '&:hover': {
      borderColor: '#9d9d9d',
    },
    '&:focus ~ .react-tel-input .special-label': {
      color: '#00AB55',
    },
  },
});

const AssignText = styled('div')({
  color: 'rgba(134, 134, 134, 1)',
  marginLeft: '10px',
  fontSize: '13px',
});

export const DialogAssignManagement = withLoading(
  memo((props: Props) => {
    const { open, isAdmin, onClose, title, onSubmit } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { showLoading, hideLoading } = useLoading(props);
    const [nikType, setNikType] = React.useState<string>('NIK');
    const [nikValue, setNikValue] = React.useState<any>('');
    const [isFullName, setIsFullName] = React.useState<boolean>(false);
    const [numberIsUnique, setNumberUnique] = React.useState<
      FieldError | undefined
    >();

    const defaultIdentification = [
      { name: 'KITAS', value: 'KITAS' },
      { name: 'NIK', value: 'NIK' },
      { name: 'KTP', value: 'KTP' },
    ];

    const { profile } = useSelector(selectAssociation);

    const { actions } = useEditAssociationSlice();

    const validateForm = yup.object().shape({
      phone: yup
        .string()
        .required(
          t(translations.clubAssociationInformation.commonRequiredField),
        )
        .matches(/^[0-9]+$/, t(translations.createNewMemberPage.phoneIsNumber)),
      name: yup
        .string()
        .required(
          t(translations.clubAssociationInformation.commonRequiredField),
        )
        .matches(
          /^(?!\s+$)[a-zA-Z ]+$/,
          t(translations.createNewMemberPage.fullnameMatchRegex),
        )
        .max(255, t(translations.createNewMemberPage.fullNameMaxCharacter)),
      nikNumber: yup
        .string()
        .required(
          t(translations.clubAssociationInformation.commonRequiredField),
        ),
    });

    const {
      handleSubmit,
      control,
      setValue,
      reset,
      setError,
      clearErrors,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: yupResolver(validateForm),
    });

    const isValidPhoneNumber = (profile: Profile) => {
      return (
        !profile.isAssociationAdmin &&
        profile.activePackage?.code === PackageNewMemberType.KTA_PRO
      );
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

    useEffect(() => {
      if (profile) {
        if (
          !isValidPhoneNumber(profile) ||
          profile.status === 'not_existed' ||
          profile.userUuid === 'null' ||
          !profile.userUuid
        ) {
          setNumberUnique({
            type: 'valid',
            message: t(translations.createNewMemberPage.phoneNumberError),
          });
          setNikValue('');
          setValue('nikNumber', '');
          setValue('name', '');
          setIsFullName(false);
        } else {
          clearErrors();
          setIsFullName(true);
          setValue('name', profile && profile?.fullName);
          if (profile && profile?.identification) {
            if (profile?.identification?.identifierNikNumber) {
              setNikType('NIK');
              setValue('nikType', 'NIK');
              setValue(
                'nikNumber',
                profile?.identification?.identifierNikNumber,
              );
              setNikValue(profile?.identification?.identifierNikNumber);
            } else if (profile?.identification?.identifierKitasNumber) {
              setNikType('KITAS');
              setValue('nikType', 'KITAS');
              setNikValue(profile?.identification?.identifierKitasNumber);
              setValue(
                'nikNumber',
                profile?.identification?.identifierKitasNumber,
              );
            } else if (profile?.identification?.identifierKtpNumber) {
              setNikType('KTP');
              setValue('nikType', 'KTP');
              setNikValue(profile?.identification?.identifierKtpNumber);
              setValue(
                'nikNumber',
                profile?.identification?.identifierKtpNumber,
              );
            }
          }
          setNumberUnique(undefined);
        }
      }
    }, [profile]);

    const checkHandleSubmit = (data: any) => {
      const newData: any = data;
      newData.role = Roles.ADMIN;
      newData.nikType = data.nikType || 'NIK';
      if (profile) {
        newData.uuid = profile.userUuid;
      }
      onSubmit(newData);
      setNikValue('');
      setIsFullName(false);
      reset();
      clearErrors();
      dispatch(actions.checkPhoneNumberRequestFailed(''));
    };

    const handleOnclose = () => {
      onClose();
      setNikValue('');
      setIsFullName(false);
      reset();
      clearErrors();
      dispatch(actions.checkPhoneNumberRequestFailed(''));
    };

    return (
      <form>
        <Dialog
          open={open}
          onClose={handleOnclose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" onClose={handleOnclose}>
            <Grid sx={{ display: 'flex' }} mb={2}>
              <TitlePage>{title}</TitlePage>
              {!isAdmin && (
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '1rem',
                  }}
                >
                  <Checkbox style={{ padding: 0 }} />
                  <AssignText>
                    {t(translations.clubAssociationInformation.assignThisRole)}
                  </AssignText>
                </Box>
              )}
            </Grid>
          </DialogTitle>
          <DialogContent sx={{ padding: 2 }}>
            <RootStyle>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <Controller
                  name="phone"
                  render={({ field }) => {
                    return (
                      <PhoneInput
                        {...field}
                        autoFormat={false}
                        containerStyle={{ width: '100%', marginTop: '1rem' }}
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
                ) : (
                  <FormHelperText>{errors?.phone?.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: '1rem!important' }}>
                <Controller
                  name="name"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        error={!!errors?.name}
                        helperText={errors?.name?.message}
                        label={`${t(translations.common.fullName)}*`}
                        type="text"
                        disabled={profile && profile?.fullName !== ''}
                        fullWidth
                        value={profile && isFullName ? profile?.fullName : ''}
                      />
                    );
                  }}
                  control={control}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <Controller
                  name="nikNumber"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        error={!!errors?.nikNumber}
                        helperText={errors?.nikNumber?.message}
                        label={`${t(translations.common.nikNumber)}*`}
                        type="text"
                        fullWidth
                        disabled
                        value={nikValue}
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
                                      disabled
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
                        }}
                      />
                    );
                  }}
                  control={control}
                />
              </FormControl>
            </RootStyle>
          </DialogContent>
          <DialogActions
            sx={{
              padding: '12px 16px',
            }}
          >
            <LoadingButton
              sx={{ border: '1px solid #777777', color: '#777777' }}
              color="primary"
              variant="outlined"
              onClick={handleOnclose}
            >
              {t(translations.common.cancel)}
            </LoadingButton>
            <LoadingButton
              variant="contained"
              loading={isSubmitting}
              onClick={handleSubmit(checkHandleSubmit)}
            >
              {t(translations.common.submit)}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </form>
    );
  }),
);
