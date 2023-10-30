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
import { Controller, FieldError, useForm } from 'react-hook-form';

import { DialogTitle } from 'app/components/DialogTitle';
import { translations } from 'locales/translations';
import { PhoneNumberRequest, Profile } from 'types';
import { UserPackageType } from 'types/enums';
import { withLoading } from 'app/components/HOC/WithLoading';
import { TitlePage } from 'app/components/Label';

import { useClubManagementCreateSlice } from '../../CreateClub/slice';
import { selectClub } from '../../CreateClub/slice/selectors';
import 'react-phone-input-2/lib/material.css';

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

interface Props {
  selectedId?: number;
  open: boolean;
  onClose?: () => void;
  onSubmit: (data: any) => void;
  clubMangement?: any;
  selectedRole?: string;
  isClubAdmin?: boolean;
  dataAdmin?: any;
}

export const DialogClubManagement = withLoading(
  memo((props: Props) => {
    const {
      open,
      onClose,
      onSubmit,
      clubMangement,
      selectedId,
      selectedRole,
      isClubAdmin,
      dataAdmin,
    } = props;
    const [checked, setChecked] = React.useState<boolean>(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isEdit = React.useMemo(() => !!selectedId, [selectedId]);
    const isAdmin = React.useMemo(
      () => selectedRole === 'ADMIN',
      [selectedRole],
    );
    const [phoneData, setPhoneData] = React.useState();
    const [isDisable, setIsDisable] = React.useState<boolean>(false);
    const [numberIsUnique, setNumberUnique] = React.useState<
      FieldError | undefined
    >();
    const defaultIdentification = React.useMemo(
      () => [
        { name: 'KITAS', value: 'KITAS' },
        { name: 'NIK', value: 'NIK' },
      ],
      [],
    );
    const { profile } = useSelector(selectClub);
    const { actions } = useClubManagementCreateSlice();
    const [isFocusPhone, setIsFocusPhone] = React.useState<boolean>(false);

    const validateForm = yup.object().shape({
      phone: yup
        .string()
        .required(t(translations.createClubError.pleaseEnterRequiredFields))
        .matches(/^[0-9]+$/, t(translations.createNewMemberPage.phoneIsNumber))
        .min(6, t(translations.createNewMemberPage.phoneNumberToShort)),
      // .max(13, t(translations.createNewMemberPage.phoneNumberToLong)),
      fullName: yup
        .string()
        .required(t(translations.createClubError.pleaseEnterRequiredFields))
        .max(255, t(translations.createNewMemberPage.fullNameMaxCharacter)),
      nikNumber: yup
        .string()
        .required(t(translations.createClubError.pleaseEnterRequiredFields))
        .max(255, t(translations.createNewMemberPage.fullNameMaxCharacter)),
    });

    const {
      handleSubmit,
      control,
      reset,
      setValue,
      getValues,
      formState: { errors, isSubmitting },
      clearErrors,
    } = useForm({
      resolver: yupResolver(validateForm),
    });

    React.useEffect(() => {
      if (!open) {
        setNumberUnique(undefined);
        setIsFocusPhone(false);
        setIsDisable(false);
        setChecked(false);
        setPhoneData(undefined);
        reset();
        return;
      }
      setNumberUnique(undefined);
      // console.log(profile, 'profile -----')
      if (profile) {
        if (
          Object.keys(profile).length > 0 &&
          selectedRole === 'ADMIN' &&
          (profile.activePackage?.code !== 'KTA_PRO' ||
            profile.isClubAdmin === true)
        ) {
          // console.log('1111111111')
          setNumberUnique({
            type: 'valid',
            message: t(translations.createNewMemberPage.phoneNumberError),
          });
          setIsDisable(false);
        } else if (Object.keys(profile).length > 0) {
          // console.log('2222222222')
          setNumberUnique(undefined);
          const code = profile.phone && profile.phone.slice(0, 2);
          const defaultValues = {
            phone: profile.phone,
            fullName: profile.fullName,
            nikType: code === '62' ? 'NIK' : 'KITAS',
            nikNumber:
              code === '62'
                ? profile?.identification?.identifierNikNumber
                : profile?.identification?.identifierKitasNumber,
            userUuid: profile.userUuid,
          };
          setIsDisable(true);
          reset(defaultValues);
        } else if (
          clubMangement &&
          Object.keys(clubMangement).length > 0 &&
          clubMangement.phone
        ) {
          // console.log('33333333333')
          const defaultValues = {
            phone: clubMangement.phone,
            fullName: clubMangement.fullName,
            nikType: clubMangement.nikType,
            nikNumber: clubMangement.nikNumber,
            userUuid: clubMangement.userUuid,
          };
          if (clubMangement.isFillData) {
            setIsDisable(true);
          }
          reset(defaultValues);
        } else {
          // console.log('444444444444')
          const initialCLub = {
            phone: '62',
            fullName: '',
            nikType: 'NIK',
            nikNumber: '',
            userUuid: '',
          };
          setIsDisable(false);
          reset(initialCLub);
        }
      } else {
        // console.log('55555555555')
        const initialCLub = {
          phone: phoneData ? phoneData : '62',
          fullName: '',
          nikType: 'NIK',
          nikNumber: '',
          userUuid: '',
        };
        if (selectedRole === 'ADMIN') {
          setNumberUnique({
            type: 'valid',
            message: t(translations.createNewMemberPage.phoneNumberError),
          });
        }
        // setValue('phone', getValues('phone'));
        // setValue('fullName', '');
        // setValue('userUuid', '');
        // setValue('nikType', '');
        // setValue('nikNumber', '');
        setIsDisable(false);
        reset(initialCLub);
      }
      // if (profile && typeof profile === 'object' && isFocusPhone) {
      //   if (
      //     (selectedRole === 'ADMIN' && profile.userUuid === 'null') ||
      //     !profile.userUuid ||
      //     profile.activePackage?.code === 'BASIC_ACCOUNT' ||
      //     profile.isClubAdmin === true
      //   ) {
      //     setNumberUnique({
      //       type: 'valid',
      //       message: t(translations.createNewMemberPage.phoneNumberError),
      //     });
      //     setIsDisable(false);
      //   } else if (Object.keys(profile).length > 0) {
      //     setNumberUnique(undefined);
      //     const code = profile.phone && profile.phone.slice(0, 2);
      //     const defaultValues = {
      //       phone: profile.phone,
      //       fullName: profile.fullName,
      //       nikType: code === '62' ? 'NIK' : 'KITAS',
      //       nikNumber:
      //         code === '62'
      //           ? profile?.identification?.identifierNikNumber
      //           : profile?.identification?.identifierKitasNumber,
      //       userUuid: profile.userUuid,
      //     };
      //     setIsDisable(true);
      //     reset(defaultValues);
      //   } else {
      //     const initialCLub = {
      //       phone: '62',
      //       fullName: '',
      //       nikType: 'NIK',
      //       nikNumber: '',
      //       userUuid: '',
      //     };
      //     setIsDisable(false);
      //     reset(initialCLub);
      //   }
      // } else if (
      //   clubMangement &&
      //   Object.keys(clubMangement).length > 0 &&
      //   clubMangement.phone
      // ) {
      //   const code = clubMangement.phone.slice(0, 2);
      //   const defaultValues = {
      //     phone: clubMangement.phone,
      //     fullName: clubMangement.fullName,
      //     nikType: clubMangement.nikType,
      //     nikNumber: clubMangement.nikNumber,
      //     userUuid: clubMangement.userUuid,
      //   };
      //   reset(defaultValues);
      // } else {
      //   const initialCLub = {
      //     phone: phoneData ? phoneData : '62',
      //     fullName: '',
      //     nikType: 'NIK',
      //     nikNumber: '',
      //     userUuid: '',
      //   };
      //   setIsDisable(false);
      //   reset(initialCLub);
      // }
    }, [isEdit, clubMangement, reset, open, profile, selectedRole]);

    const checkIsUniquePhoneNumber = (phoneNumber: any) => {
      setChecked(false);
      setValue('phone', phoneNumber.replace('+', ''));
      setValue('nikType', 'NIK');
      if (phoneNumber) {
        setIsFocusPhone(true);
        setPhoneData(phoneNumber.replace('+', ''));
        const phoneNumberRequest: PhoneNumberRequest = {
          number: phoneNumber.replace('+', ''),
          type: UserPackageType.TKT,
        };
        dispatch(actions.checkPhoneNumberRequest(phoneNumberRequest));
      }
    };

    const submit = (data: any) => {
      const defaultValues = data;
      defaultValues.role = selectedRole;
      defaultValues.title = clubMangement.title;
      defaultValues.index = selectedId;
      onSubmit(defaultValues);
    };

    const handleChecked = (event: any, data: any) => {
      if (event.target.checked) {
        const defaultValues = {
          phone: data.phone,
          fullName: data.fullName,
          nikType: data.nikType,
          nikNumber: data.nikNumber,
          userUuid: data.userUuid,
          isFillData: true,
        };
        reset(defaultValues);
        setIsDisable(true);
        setChecked(event.target.checked);
      } else {
        setIsDisable(false);
        const defaultValues = {
          phone: '62',
          fullName: '',
          nikType: '',
          nikNumber: '',
          userUuid: '',
          isFillData: false,
        };
        reset(defaultValues);
        setChecked(event.target.checked);
      }
    };

    const handleChange = (e: any, field: any) => {
      field.onChange(e);
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
              <TitlePage>{clubMangement?.title}</TitlePage>
              {!isAdmin && (
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '1rem',
                  }}
                >
                  <Checkbox
                    disabled={!isClubAdmin}
                    checked={checked}
                    style={{ padding: 0 }}
                    onChange={e => handleChecked(e, dataAdmin)}
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
                  name="fullName"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        disabled={isAdmin || isDisable}
                        error={!!errors?.fullName}
                        helperText={errors?.fullName?.message}
                        label={`${t(translations.common.fullName)}*`}
                        type="text"
                        fullWidth
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
                          onChange={(e: any) => {
                            if (e.target.value.length <= 16) {
                              field.onChange(e);
                            }
                          }}
                          disabled={isAdmin || isDisable}
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
                                        onChange={e => handleChange(e, field)}
                                        disabled={isAdmin || isDisable}
                                        id="demo-simple-select-nikType"
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
                                        {defaultIdentification.map(item => (
                                          <MenuItem
                                            key={item.value}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        ))}
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
              onClick={handleSubmit(submit)}
            >
              {t(translations.common.submit)}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </form>
    );
  }),
);
