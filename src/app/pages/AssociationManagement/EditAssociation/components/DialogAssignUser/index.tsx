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
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { DialogTitle } from 'app/components/DialogTitle';
import { translations } from 'locales/translations';
import { Roles, UserPackageType } from 'types/enums';
import { withLoading } from 'app/components/HOC/WithLoading';
import { TitlePage } from 'app/components/Label';
import { PhoneNumberRequest, Profile } from 'types';
import 'react-phone-input-2/lib/material.css';

import { useEditAssociationSlice } from '../../slice';
import { selectAssociation } from '../../slice/selectors';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  onSubmit: (data: any) => void;
  role: Roles;
  associationAdmin: any;
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
    const { open, onClose, title, onSubmit, role, associationAdmin } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [nikType, setNikType] = React.useState<string>('NIK');
    const [nikNumber, setNikNumber] = React.useState<string>('');
    const [isAssign, setIsAssign] = React.useState<boolean>(false);
    const [valueAssign, setValueAssign] = React.useState<any>({});
    const [fullName, setFullName] = React.useState<string>('');
    const { profile } = useSelector(selectAssociation);
    const { actions } = useEditAssociationSlice();

    const defaultIdentification = [
      { name: 'KITAS', value: 'KITAS' },
      { name: 'NIK', value: 'NIK' },
      { name: 'KTP', value: 'KTP' },
    ];

    const validateForm = yup.object().shape({
      phone: yup
        .string()
        .required(
          t(translations.clubAssociationInformation.commonRequiredField),
        )
        .matches(/^[0-9]+$/, t(translations.createNewMemberPage.phoneIsNumber))
        .min(6, t(translations.createNewMemberPage.phoneNumberToShort))
        .max(13, t(translations.createNewMemberPage.phoneNumberToLong)),
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
      clearErrors,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: yupResolver(validateForm),
    });

    const checkHandleSubmit = (data: any) => {
      const newData: any = data;
      newData.role = role;
      newData.nikType = data.nikType || 'NIK';
      newData.nikNumber = nikNumber;
      onSubmit(newData);
      setValueAssign({});
      setIsAssign(false);
      reset();
      clearErrors();
      dispatch(actions.checkPhoneNumberRequestFailed(''));
    };

    const handleOnclose = () => {
      onClose();
      setValueAssign({});
      setIsAssign(false);
      reset();
      clearErrors();
      dispatch(actions.checkPhoneNumberRequestFailed(''));
    };

    useEffect(() => {
      if (isAssign) {
        setValueAssign(associationAdmin);
        setValue('phone', associationAdmin.phone);
        setValue('name', associationAdmin.fullName);
        setFullName(associationAdmin.fullName);
        if (associationAdmin.identification) {
          if (associationAdmin.identification?.identifierNikNumber) {
            setNikType('NIK');
            setNikNumber(associationAdmin.identification?.identifierNikNumber);
            setValue(
              'nikNumber',
              associationAdmin.identification?.identifierNikNumber,
            );
          } else if (associationAdmin.identification?.identifierKitasNumber) {
            setNikType('KITAS');
            setNikNumber(
              associationAdmin.identification?.identifierKitasNumber,
            );
            setValue(
              'nikNumber',
              associationAdmin.identification?.identifierKitasNumber,
            );
          } else if (associationAdmin.identification?.identifierKtpNumber) {
            setNikType('KTP');
            setNikNumber(associationAdmin.identification?.identifierKtpNumber);
            setValue(
              'nikNumber',
              associationAdmin.identification?.identifierKtpNumber,
            );
          }
        }
      } else {
        setValueAssign({});
        setValue('name', '');
        setNikNumber('');
        setValue('nikNumber', '');
        setValue('name', '');
        setFullName('');
      }
    }, [isAssign]);

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
      if (profile && profile?.phone && open) {
        clearErrors();
        setValue('name', profile && profile?.fullName);
        setFullName(profile?.fullName || '');
        if (profile && profile?.identification) {
          if (profile?.identification?.identifierNikNumber) {
            setNikType('NIK');
            setValue('nikType', 'NIK');
            setValue('nikNumber', profile?.identification?.identifierNikNumber);
            setNikNumber(profile?.identification?.identifierNikNumber);
          } else if (profile?.identification?.identifierKitasNumber) {
            setNikType('KITAS');
            setValue('nikType', 'KITAS');
            setNikNumber(profile?.identification?.identifierKitasNumber);
            setValue(
              'nikNumber',
              profile?.identification?.identifierKitasNumber,
            );
          } else if (profile?.identification?.identifierKtpNumber) {
            setNikType('KTP');
            setValue('nikType', 'KTP');
            setNikNumber(profile?.identification?.identifierKtpNumber);
            setValue('nikNumber', profile?.identification?.identifierKtpNumber);
          }
        }
      } else {
        setValue('name', '');
        setNikNumber('');
        setValue('nikNumber', '');
        setValue('name', '');
        setFullName('');
      }
    }, [profile]);
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
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '1rem',
                }}
              >
                <Checkbox
                  style={{ padding: 0 }}
                  value={isAssign}
                  disabled={!associationAdmin?.phone}
                  onChange={() => {
                    setIsAssign(!isAssign);
                  }}
                />
                <AssignText>
                  {t(translations.clubAssociationInformation.assignThisRole)}
                </AssignText>
              </Box>
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
                        disabled={isAssign}
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
                          setValueAssign({
                            ...valueAssign,
                            phone: e,
                          });
                          setValue('phone', e);
                        }}
                        onFocus={_ => {
                          document
                            .querySelector('.special-label')
                            ?.classList.add('onFocus');
                        }}
                        onBlur={e => checkIsUniquePhoneNumber(e.target.value)}
                        value={valueAssign.phone || ''}
                        inputProps={{
                          name: 'phone',
                        }}
                      />
                    );
                  }}
                  control={control}
                />
                <FormHelperText>{errors?.phone?.message}</FormHelperText>
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
                        fullWidth
                        disabled={
                          typeof profile?.fullName !== 'undefined' || isAssign
                        }
                        value={fullName || ''}
                        onChange={(e: any) => {
                          field.onChange(e);
                          setFullName(e.target.value);
                          setValue('name', e.target.value);
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
                      <TextField
                        {...field}
                        error={!!errors?.nikNumber}
                        helperText={errors?.nikNumber?.message}
                        label={`${t(translations.common.nikNumber)}*`}
                        type="text"
                        fullWidth
                        disabled={
                          typeof profile?.fullName !== 'undefined' || isAssign
                        }
                        value={nikNumber || ''}
                        onChange={(e: any) => {
                          if (e.target.value.length <= 16) {
                            field.onChange(e);
                            setNikNumber(e.target.value);
                            setValueAssign({
                              ...valueAssign,
                              nikNumber: e.target.value,
                            });
                            setValue('nikNumber', e.target.value);
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
                                      value={nikType}
                                      disabled={
                                        typeof profile?.fullName !==
                                          'undefined' || isAssign
                                      }
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
