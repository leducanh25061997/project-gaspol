import { memo, useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TextField,
  FormControl,
  Stack,
  Box,
  Collapse,
} from '@mui/material';
import moment from 'moment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { IndividualInformation } from 'types';

import { PackageStatusLowerCase } from 'types/enums';

import { get } from 'lodash';

import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import NumberFormat from 'react-number-format';

import { useDispatch, useSelector } from 'react-redux';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { selectEditMember } from '../../slice/selectors';

import { useEditMemberSlice } from '../../slice';

interface Props {
  info?: IndividualInformation;
  setNumberUnique: (value?: FieldError) => void;
  numberIsUnique?: FieldError;
}

interface genderType {
  name: string;
  value: string;
}

export const MembershipForm = memo(
  ({ numberIsUnique, setNumberUnique, info }: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
      control,
      setValue,
      getValues,
      setError,
      formState: { errors },
    } = useFormContext();
    const [isDisableKtaNumber, setIsDisableKtaNumber] = useState<boolean>(true);
    const [isDisableExpirationDate, setIsDisableExpirationDate] =
      useState<boolean>(true);
    const { userInformation } = useSelector(selectAuth);
    const { actions } = useEditMemberSlice();
    const editMember = useSelector(selectEditMember);
    const [open, setOpen] = useState<boolean>(true);
    const [formValues, setFormValues] = useState({
      expiredDate: 0,
      ktaNumber: '',
      statusPackage: '',
      packageName: '',
    });

    useEffect(() => {
      setFormValues({
        ...formValues,
        expiredDate: info?.expiredDate || 0,
        ktaNumber: info?.ktaNumber || '',
        packageName: info?.subscribingPackage?.name || '',
        statusPackage: info?.statusPackage
          ? get(PackageStatusLowerCase, info.statusPackage)
          : '',
      });

      setValue('expiredDate', info?.expiredDate || 0);
      setValue('ktaNumber', info?.ktaNumber || '');
      setValue('packageName', info?.subscribingPackage?.name || '');
      setValue(
        'statusPackage',
        info?.statusPackage
          ? get(PackageStatusLowerCase, info.statusPackage)
          : '',
      );
    }, [info]);

    useEffect(() => {
      if (
        userInformation &&
        userInformation?.roles &&
        userInformation?.roles?.length > 0
      ) {
        if (
          userInformation?.roles.includes('member_details_update_kta_number') &&
          info?.ktaNumber
        ) {
          setIsDisableKtaNumber(false);
        }
        if (
          userInformation?.roles.includes(
            'member_details_update_expiration_date',
          ) &&
          info?.expiredDate
        ) {
          setIsDisableExpirationDate(false);
        }
      }
    }, [userInformation, info]);

    const handleClick = () => {
      setOpen(!open);
    };

    const verifyKtaNumber = (ktaNumber: string) => {
      if (ktaNumber) {
        dispatch(
          actions.checkKtaNumberUnique({
            ktaNumber,
          }),
        );
      }
    };

    useEffect(() => {
      if (
        editMember?.checkKtaNumberUnique &&
        editMember.memberInformation?.ktaMembershipInfor?.ktaNumber !==
          formValues.ktaNumber
      ) {
        setNumberUnique({
          type: 'valid',
          message: t(translations.editMember.ktaNumberError),
        });
      } else {
        setNumberUnique(undefined);
      }
    }, [editMember, formValues.ktaNumber, t]);

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
            {t(translations.createNewMemberPage.membershipInfo)}
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
                        disabled
                        id="packageName"
                        label={t(translations.common.package)}
                        type="text"
                        fullWidth
                        onChange={(e: any) => {
                          field.onChange(e);
                        }}
                        value={formValues?.packageName}
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
                  name="ktaNumber"
                  render={({ field }) => {
                    return (
                      <NumberFormat
                        type="text"
                        label={`${t(translations.common.ktaNumber)}*`}
                        customInput={TextField}
                        disabled={isDisableKtaNumber}
                        onChange={event => {
                          if (event.target.value.length <= 10) {
                            field.onChange(event);
                            setFormValues({
                              ...formValues,
                              ktaNumber: event.target.value,
                            });
                            setError('ktaNumber', {});
                          } else {
                            setError('ktaNumber', {
                              type: 'manual',
                              message: t(
                                translations.editMember.ktaNumberMaxCharacter,
                              ),
                            });
                          }
                        }}
                        onBlur={(event: any) => {
                          verifyKtaNumber(event.target.value);
                        }}
                        helperText={
                          numberIsUnique
                            ? numberIsUnique.message
                            : errors?.ktaNumber?.message
                        }
                        errors={
                          numberIsUnique
                            ? { ...numberIsUnique, ...errors?.ktaNumber }
                            : errors?.ktaNumber
                        }
                        // error={!!errors?.ktaNumber}
                        value={formValues?.ktaNumber}
                      />
                      // <TextField
                      //   {...field}
                      //   error={!!errors?.ktaNumber}
                      //   helperText={errors?.ktaNumber?.message}
                      //   label={`${t(translations.common.ktaNumber)}*`}
                      //   type="text"
                      //   fullWidth
                      //   onChange={(e: any) => {
                      //     field.onChange(e);
                      //     setFormValues({
                      //       ...formValues,
                      //       ktaNumber: e.target.value,
                      //     });
                      //   }}
                      //   value={formValues?.ktaNumber}
                      // />
                    );
                  }}
                  control={control}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="statusPackage"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        disabled
                        id="packageStatus"
                        label={`${t(
                          translations.clubAssociationInformation.packageStatus,
                        )}`}
                        type="text"
                        fullWidth
                        onChange={(e: any) => {
                          field.onChange(e);
                        }}
                        value={formValues?.statusPackage}
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
                  name="expiredDate"
                  render={({ field }) => {
                    return (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          {...field}
                          label={`${t(
                            translations.editMember.expirationDate,
                          )}*`}
                          disabled={isDisableExpirationDate}
                          inputFormat="dd/MM/yyyy"
                          onChange={(event: any) => {
                            field.onChange(
                              event ? parseInt(moment(event).format('x')) : '',
                            );
                            setFormValues({
                              ...formValues,
                              expiredDate: event
                                ? parseInt(moment(event).format('x'))
                                : 0,
                            });
                          }}
                          value={formValues?.expiredDate}
                          minDate={new Date(1900, 1, 1)}
                          renderInput={params => {
                            const newParams = { ...params };
                            delete newParams.error;
                            return (
                              <TextField
                                {...newParams}
                                error={!!errors.expiredDate}
                                helperText={errors?.expiredDate?.message}
                              />
                            );
                          }}
                        />
                      </LocalizationProvider>
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
