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
import { KisStatus, Roles, UserPackageType } from 'types/enums';
import { CheckAssociationManagement } from 'types/AssociationManagement';
import { withLoading } from 'app/components/HOC/WithLoading';
import { useLoading } from 'app/hooks';
import { TitlePage } from 'app/components/Label';

import { numberRegex } from 'utils/helpers/regex';

import { useClubManagementCreateSlice } from '../../CreateClub/slice';
import { selectClub } from '../../CreateClub/slice/selectors';
import 'react-phone-input-2/lib/material.css';

interface Props {
  index?: number;
  open: boolean;
  onClose?: () => void;
  title?: string;
  isAdmin?: boolean;
  onSubmit: (data: any) => void;
  clubMangement?: any;
  clubMangements?: any;
  isDataAdmin?: boolean;
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

export const DialogAssignUser = withLoading(
  memo((props: Props) => {
    const {
      open,
      isAdmin,
      onClose,
      title,
      onSubmit,
      clubMangement,
      clubMangements,
      index,
      isDataAdmin,
    } = props;
    const { t } = useTranslation();
    const [numberIsUnique, setNumberUnique] = React.useState<
      FieldError | undefined
    >();
    const { actions } = useClubManagementCreateSlice();
    const dispatch = useDispatch();
    const { profile } = useSelector(selectClub);
    const [checked, setChecked] = React.useState<boolean>(false);
    const [valueClub, setValueClub] = React.useState({
      phone: '',
      fullName: '',
      nikType: 'NIK',
      nikNumber: '',
    });
    const defaultIdentification = [
      { name: 'KITAS', value: 'KITAS' },
      { name: 'NIK', value: 'NIK' },
      { name: 'KTP', value: 'KTP' },
    ];

    const validateForm = yup.object().shape({
      phone: yup
        .string()
        .required(t(translations.createClubError.pleaseEnterRequiredFields))
        .matches(/^[0-9]+$/, t(translations.createNewMemberPage.phoneIsNumber))
        .min(6, t(translations.createNewMemberPage.phoneNumberToShort))
        .max(13, t(translations.createNewMemberPage.phoneNumberToLong)),
      fullName: yup
        .string()
        .required(t(translations.createClubError.pleaseEnterRequiredFields))
        .max(255, t(translations.createNewMemberPage.fullNameMaxCharacter)),
      nikNumber: yup
        .string()
        .required(t(translations.createClubError.pleaseEnterRequiredFields))
        .max(255, t(translations.createNewMemberPage.fullNameMaxCharacter)),
    });

    useEffect(() => {
      if (clubMangement && index === clubMangement.index) {
        setValueClub({
          phone: clubMangement.phone,
          fullName: clubMangement.fullName,
          nikType: clubMangement.nikType,
          nikNumber: clubMangement.valueIdentification,
        });
        setValue('nikType', clubMangement.nikType);
        setValue('fullName', clubMangement.fullName);
        setValue('nikNumber', clubMangement.valueIdentification);
        setValue('userUuid', clubMangement.userUuid);
        setValue('phone', clubMangement.phone);
        setChecked(false);
        clearErrors();
      }
    }, [clubMangement]);

    const {
      handleSubmit,
      control,
      setValue,
      clearErrors,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: yupResolver(validateForm),
    });

    useEffect(() => {
      if (index && index !== clubMangement.index) {
        setValue('fullName', '');
        setValue('nikType', 'NIK');
        setValue('nikNumber', '');
        setValue('phone', '');
        setValue('userUuid', '');
        clearErrors();
        setChecked(false);
      }
    }, [index]);

    const checkIsUniquePhoneNumber = (phoneNumber: any) => {
      if (phoneNumber) {
        const newPhone = phoneNumber.split(' ');
        const newPhoneNumberShift = newPhone
          .filter((element: any, index: number) => index > 0)
          .join('');
        const phoneNumberRequest: PhoneNumberRequest = {
          number: phoneNumber.replace('+', ''),
          type: UserPackageType.TKT,
        };
        dispatch(actions.checkPhoneNumberRequest(phoneNumberRequest));
      }
      document.querySelector('.special-label')?.classList.remove('onFocus');
    };

    const checkHandleSubmit = (data: any) => {
      const newData = {
        index: clubMangement.index,
        userUuid: data.userUuid,
        role: clubMangement.role,
        title: clubMangement.title,
        name: clubMangement.name,
        fullName: data.fullName,
        phone: data.phone,
        identification:
          data.nikType === 'KITAS'
            ? { identifierNikNumber: data.nikNumber }
            : { identifierKitasNumber: data.nikNumber },
        valueIdentification: data.nikNumber,
        nikType: data.nikType,
      };
      onSubmit(newData);
    };

    const handleChange = (e: any, field: any) => {
      setValue('nikType', e.target.value);
      setValueClub({
        ...valueClub,
        nikType: e.target.value,
      });
      field.onChange(e);
    };

    const handleChecked = (event: any) => {
      const dataFilter =
        clubMangements &&
        clubMangements?.filter((item: any) => item.role === Roles.ADMIN);
      const data = dataFilter[0];
      setValue('nikType', data?.nikType);
      setValue('fullName', data?.fullName);
      setValue('nikNumber', data?.valueIdentification);
      setValue('userUuid', data?.userUuid);
      setValue('identification', data?.identification);
      setValue('phone', data?.phone);
      setValueClub({
        nikType: data?.nikType,
        fullName: data?.fullName,
        phone: data?.phone,
        nikNumber: data?.valueIdentification,
      });
      setChecked(event.target.checked);
    };

    const isValidPhoneNumber = (profile: Profile) => {
      return profile.isIndividual && !profile.isClubPic;
    };

    useEffect(() => {
      if (profile) {
        if (Object.keys(profile).length > 0) {
          if (
            isValidPhoneNumber(profile) ||
            (profile.identification &&
              Object.keys(profile.identification).length === 0) ||
            profile.userUuid === 'null' ||
            (profile.activePackage &&
              profile.activePackage?.code !== 'KTA_PRO') ||
            profile.isClubAdmin === true
          ) {
            setNumberUnique({
              type: 'valid',
              message: t(translations.createNewMemberPage.phoneNumberError),
            });
            setValueClub({
              ...valueClub,
              nikNumber: '',
              nikType: 'NIK',
              fullName: '',
            });
            setValue('fullName', '');
            setValue('userUuid', '');
            setValue('identification', '');
            setValue('nikType', 'KITAS');
            setValue('nikNumber', '');
          } else {
            const code = profile.phone && profile.phone.slice(0, 2);
            if (code === '62') {
              setValueClub({
                ...valueClub,
                nikNumber: profile?.identification?.identifierNikNumber,
                nikType: 'NIK',
                fullName: profile?.fullName || '',
                phone: profile?.phone || '',
              });
              setValue('identification', profile && profile?.identification);
              setValue('nikType', 'NIK');
              setValue(
                'nikNumber',
                profile && profile?.identification?.identifierNikNumber,
              );
            } else {
              setValueClub({
                ...valueClub,
                nikNumber:
                  profile && profile?.identification?.identifierKitasNumber,
                nikType: 'KITAS',
                fullName: profile?.fullName || '',
                phone: profile?.phone || '',
              });
              setValue('nikType', 'KITAS');
              setValue(
                'nikNumber',
                profile && profile?.identification?.identifierKitasNumber,
              );
            }
            setValue('fullName', profile?.fullName);
            setValue('phone', profile?.phone);
            setValue('userUuid', profile?.userUuid);
            setNumberUnique(undefined);
          }
        } else {
          setNumberUnique({
            type: 'valid',
            message: t(translations.createNewMemberPage.phoneNumberError),
          });
        }
      }
    }, [profile]);

    return (
      <form>
        <Dialog
          key={index}
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" onClose={onClose}>
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
                  <Checkbox
                    checked={checked}
                    style={{ padding: 0 }}
                    disabled={!isDataAdmin}
                    onChange={e => handleChecked(e)}
                  />
                  <AssignText>
                    {t(translations.clubManagementConfirm.assignThisRoleClub)}
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
                        value={valueClub.phone || ''}
                        specialLabel={`${t(
                          translations.createClubError.phoneNumber,
                        )}*`}
                        onChange={(e: any) => {
                          // setValueClub({
                          //   ...valueClub,
                          //   phone: e.target.value
                          // })
                          field.onChange(e);
                        }}
                        onBlur={e => checkIsUniquePhoneNumber(e.target.value)}
                        onFocus={_ => {
                          document
                            .querySelector('.special-label')
                            ?.classList.add('onFocus');
                        }}
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
                  name="fullName"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        disabled={isAdmin}
                        error={!!errors?.fullName}
                        helperText={errors?.fullName?.message}
                        label={`${t(translations.common.fullName)}*`}
                        type="text"
                        fullWidth
                        value={valueClub.fullName || ''}
                        onChange={(e: any) => {
                          setValueClub({
                            ...valueClub,
                            fullName: e.target.value,
                          });
                          setValue('fullName', e.target.value);
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
                  name="nikNumber"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <>
                        <TextField
                          {...field}
                          error={!!errors?.nikNumber}
                          helperText={errors?.nikNumber?.message}
                          label={`${t(translations.common.nikNumber)}*`}
                          type="text"
                          fullWidth
                          value={valueClub.nikNumber || ''}
                          onChange={(e: any) => {
                            if (e.target.value.length <= 16) {
                              setValueClub({
                                ...valueClub,
                                nikNumber: e.target.value,
                              });
                              setValue('nikNumber', e.target.value);
                              field.onChange(e);
                            }
                          }}
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
                                        value={valueClub.nikType}
                                        onChange={e => handleChange(e, field)}
                                        sx={{
                                          borderRadius: 0,
                                          '& .MuiSelect-outlined': {
                                            paddingLeft: 0,
                                          },
                                          '& .MuiOutlinedInput-notchedOutline':
                                            {
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
                      </>
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
              onClick={onClose}
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
