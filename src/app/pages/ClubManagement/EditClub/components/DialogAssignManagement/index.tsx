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
import {
  lettersNumbersSpaceRegex,
  lettersAndNumbersDashUnderscoreRegex,
} from 'utils/helpers/regex';
import { CheckAssociationManagement } from 'types/AssociationManagement';
import { withLoading } from 'app/components/HOC/WithLoading';
import { useLoading } from 'app/hooks';
import { TitlePage } from 'app/components/Label';
import { PhoneNumberInput } from 'app/components/PhoneNumberInput';
import 'react-phone-input-2/lib/material.css';

import { useClubManagementEditSlice } from '../../slice';
import { selectClub } from '../../slice/selectors';

interface Props {
  open: boolean;
  onClose?: () => void;
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
    const [nikType, setNikType] = React.useState<string>('KITAS');
    const [numberIsUnique, setNumberUnique] = React.useState<
      FieldError | undefined
    >();

    const defaultIdentification = [
      { name: 'KITAS', value: 'KITAS' },
      { name: 'NIK', value: 'NIK' },
      { name: 'KTP', value: 'KTP' },
    ];

    const { profile } = useSelector(selectClub);

    const { actions } = useClubManagementEditSlice();

    const validateForm = yup.object().shape({
      phone: yup
        .string()
        .required(t(translations.createNewMemberPage.phoneNumberIsRequired))
        .matches(/^[0-9]+$/, t(translations.createNewMemberPage.phoneIsNumber))
        .min(6, t(translations.createNewMemberPage.phoneNumberToShort))
        .max(13, t(translations.createNewMemberPage.phoneNumberToLong)),
      name: yup
        .string()
        //  .required(t(translations.createNewMemberPage.fullnameIsRequired))
        .matches(
          /^(?!\s+$)[a-zA-Z ]+$/,
          t(translations.createNewMemberPage.fullnameMatchRegex),
        )
        .max(255, t(translations.createNewMemberPage.fullNameMaxCharacter)),
    });

    const {
      handleSubmit,
      control,
      setValue,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: yupResolver(validateForm),
    });

    const isValidPhoneNumber = (profile: Profile) => {
      return profile.isIndividual && !profile.isClubPic;
    };

    const checkIsUniquePhoneNumber = (phoneNumber: any) => {
      if (phoneNumber) {
        //  const phoneNumberRequest: PhoneNumberRequest = {
        //    number: phoneNumber.replace('+', ''),
        //    type: UserPackageType.TKT,
        //  };
        const newPhone = phoneNumber.split(' ');
        const newPhoneNumberShift = newPhone
          .filter((element: any, index: number) => index > 0)
          .join('');
        const phoneNumberRequest: PhoneNumberRequest = {
          number: newPhoneNumberShift,
          type: UserPackageType.TKT,
        };
        dispatch(actions.checkPhoneNumberRequest(phoneNumberRequest));
      }
      document.querySelector('.special-label')?.classList.remove('onFocus');
    };

    useEffect(() => {
      if (profile && Object.keys(profile).length > 0) {
        if (isValidPhoneNumber(profile)) {
          setNumberUnique({
            type: 'valid',
            message: t(translations.createNewMemberPage.phoneNumberError),
          });
        } else if (profile?.status === 'not_existed') {
          setNumberUnique({
            type: 'valid',
            message: t(translations.createNewMemberPage.phoneNumberError),
          });
        } else {
          setValue('fullName', profile.fullName);
          setValue('userUuid', profile.userUuid);
          setNumberUnique(undefined);
        }
      }
    }, [profile]);

    const checkHandleSubmit = (data: any) => {
      const newData: any = data;
      newData.role = Roles.ADMIN;
      newData.nikType = data.nikType || 'KITAS';
      if (profile) {
        newData.uuid = profile.userUuid;
      }
      onSubmit(newData);
    };

    return (
      <form>
        <Dialog
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
                        autoFormat={true}
                        containerStyle={{ width: '100%', marginTop: '1rem' }}
                        searchClass="search-class"
                        inputClass="fullWidth"
                        enableTerritories
                        enableSearch={true}
                        country="id"
                        specialLabel={`${t(
                          translations.createClubError.phoneNumber,
                        )}*`}
                        onChange={(e: any) => {
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
                        fullWidth
                        value={
                          profile && Object.keys(profile).length > 0
                            ? profile.fullName
                            : ''
                        }
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
                        value={
                          profile && Object.keys(profile).length > 0
                            ? profile.nikNumber
                            : ''
                        }
                        onChange={(e: any) => {
                          field.onChange(e);
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
