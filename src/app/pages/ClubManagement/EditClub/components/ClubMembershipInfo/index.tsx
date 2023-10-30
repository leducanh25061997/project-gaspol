import { memo, useEffect, useState } from 'react';
import { Grid, Card, Stack, TextField, styled } from '@mui/material';
import moment from 'moment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { translations } from 'locales/translations';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import NestedList from 'app/components/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { ClubNameRequest, ClubNameResponse } from 'types/ClubManagement';
import { useRole } from 'app/hooks';
import { Role } from 'types/Role';
import { ClubInformation } from 'types';

import { PackageStatusLowerCase } from 'types/enums';

import { selectClubManagementEdit } from '../../slice/selectors';
import { useClubManagementEditSlice } from '../../slice';

interface Props {
  info?: ClubInformation;
  setClubCodeUnique: (value?: FieldError) => void;
  clubcodeIsUnique?: FieldError;
}

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
    '& .Mui-disabled': {
      background: '#E8E8E8',
      borderRadius: '10px',
    },
    '& .MuiInputLabel-root': {
      background: '#FFFFFF',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(168, 70, 0, 1) !important',
  },
});

export const ClubMembershipInfo = memo(
  ({ info, setClubCodeUnique, clubcodeIsUnique }: Props) => {
    const { t } = useTranslation();
    const fetchFormData = useSelector(selectClubManagementEdit);
    const { clubCategories } = fetchFormData;
    const dispatch = useDispatch();
    const { actions } = useClubManagementEditSlice();
    const {
      setValue,
      control,
      formState: { errors },
    } = useFormContext();
    const [formValues, setFormValues] = useState({
      expireDate: 0,
      clubCode: '',
      packageStatus: '',
      package: '',
    });
    const [openCollapse, setOpenCollapse] = useState<boolean>(true);
    const handleOpenCollapse = () => {
      setOpenCollapse(!openCollapse);
    };

    useEffect(() => {
      setFormValues(prev => ({
        ...prev,
        expireDate:
          info?.expiredDate || parseInt(moment(new Date()).format('x')),
        clubCode: info?.clubCode || '',
        package: info?.subscribingPackage?.name || '',
        packageStatus: info?.packageStatus
          ? get(PackageStatusLowerCase, info.packageStatus)
          : '',
      }));

      setValue(
        'expireDate',
        info?.expiredDate || parseInt(moment(new Date()).format('x')),
      );
      setValue('ktaNumber', info?.ktaNumber || '');
      setValue('clubCode', info?.clubCode || '');
      setValue('package', info?.subscribingPackage?.name || '');
      setValue(
        'statusPackage',
        info?.statusPackage
          ? get(PackageStatusLowerCase, info.statusPackage)
          : '',
      );
    }, [info, setValue]);

    const checkIsUniqueClubCode = (valueClubCode: any) => {
      if (valueClubCode) {
        const request: ClubNameRequest = {
          provinceId: '',
          // provinceId:
          //   fetchFormData?.provinces?.find(
          //     (value: any) => value.name === getValues('provinceName'),
          //   )?.id || '',
          clubCode: valueClubCode.target.value,
          clubName: '',
          type: 'tkt',
          clubId: info?.id || null,
        };

        dispatch(
          actions.checkClubnameRequest(
            request,
            (clubNameResponse?: ClubNameResponse) => {
              if (clubNameResponse?.duplicateCode) {
                setClubCodeUnique({
                  type: 'duplicateCode',
                  message: 'This code has been taken, please use other code',
                });
              } else {
                setClubCodeUnique(undefined);
              }
            },
          ),
        );
      }
    };

    const { userHasAtLeastAllowedRoles } = useRole();

    return (
      <Card sx={{ marginTop: 3 }}>
        <NestedList
          openCollapse={openCollapse}
          handleOpenCollapse={handleOpenCollapse}
          title={'Club membership info'}
          description={
            <Grid container spacing={2} justifyContent="center" mt={1}>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Controller
                    name="package"
                    render={({ field }) => (
                      <RenderInput>
                        <TextField
                          {...field}
                          disabled
                          label={`${t(
                            translations.clubManagementConfirm.package,
                          )}`}
                          helperText={errors?.package?.message}
                          error={!!errors?.package}
                          value={
                            formValues?.package === 'Gaspol Club'
                              ? t(translations.common.gaspolClub)
                              : formValues?.package
                          }
                        />
                      </RenderInput>
                    )}
                    control={control}
                  />
                </Stack>
                <Stack mt={1}>
                  <Controller
                    control={control}
                    name="clubCode"
                    render={({ field }) => (
                      <RenderInput>
                        <TextField
                          {...field}
                          label={`${t(
                            translations.clubManagementConfirm.clubCode,
                          )}`}
                          value={formValues?.clubCode}
                          // error={!!errors?.clubCode}
                          // helperText={errors?.clubCode?.message}

                          error={
                            clubcodeIsUnique?.message
                              ? true
                              : !!errors?.clubCode
                          }
                          helperText={
                            clubcodeIsUnique?.message ||
                            errors?.clubCode?.message
                          }
                          onChange={event => {
                            field.onChange(event);
                            setFormValues({
                              ...formValues,
                              clubCode: event.target.value,
                            });
                          }}
                          onBlur={checkIsUniqueClubCode}
                        />
                      </RenderInput>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <Controller
                    control={control}
                    name="packageStatus"
                    render={({ field }) => (
                      <RenderInput>
                        <TextField
                          {...field}
                          disabled
                          label={`${t(
                            translations.clubManagementConfirm.packageStatus,
                          )}`}
                          error={!!errors?.packageStatus}
                          value={formValues?.packageStatus}
                          helperText={errors?.packageStatus?.message}
                        />
                      </RenderInput>
                    )}
                  />
                </Stack>
                <Stack mt={1}>
                  <Controller
                    control={control}
                    name="expireDate"
                    render={({ field }) => {
                      return (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            {...field}
                            disabled={
                              !userHasAtLeastAllowedRoles([
                                Role.club_details_update_expiration_date,
                              ])
                            }
                            label={`${t(
                              translations.editMember.expirationDate,
                            )}`}
                            inputFormat="dd/MM/yyyy"
                            onChange={(event: any) => {
                              field.onChange(
                                event
                                  ? parseInt(moment(event).format('x'))
                                  : '',
                              );
                              setFormValues({
                                ...formValues,
                                expireDate: event
                                  ? parseInt(moment(event).format('x'))
                                  : 0,
                              });
                            }}
                            value={formValues?.expireDate}
                            minDate={new Date(1900, 1, 1)}
                            renderInput={params => {
                              const newParams = { ...params };
                              delete newParams.error;
                              return (
                                <RenderInput>
                                  <TextField
                                    {...newParams}
                                    error={!!errors.expireDate}
                                    helperText={errors?.expireDate?.message}
                                  />
                                </RenderInput>
                              );
                            }}
                          />
                        </LocalizationProvider>
                      );
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          }
        />
      </Card>
    );
  },
);
