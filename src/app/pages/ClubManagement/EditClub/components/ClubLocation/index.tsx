import { memo, useEffect, useState, useMemo } from 'react';
import {
  Grid,
  Card,
  Stack,
  TextField,
  styled,
  Autocomplete,
} from '@mui/material';
import { ClubInformation } from 'types';
import { translations } from 'locales/translations';
import { Controller, useFormContext, FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { ClubNameRequest, ClubNameResponse } from 'types/ClubManagement';

import NestedList from 'app/components/Collapse';
import { useDispatch, useSelector } from 'react-redux';

import { selectClubManagementEdit } from '../../slice/selectors';
import { useClubManagementEditSlice } from '../../slice';
interface Props {
  info?: ClubInformation;
  setNumberUnique: (value?: FieldError) => void;
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

export const ClubLocation = memo(({ info, setNumberUnique }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const fetchFormData = useSelector(selectClubManagementEdit);
  const { provinces } = fetchFormData;
  const dispatch = useDispatch();
  const { actions } = useClubManagementEditSlice();
  const [formValues, setFormValues] = useState({
    address: '',
    rtRwNumber: '',
    // postCode: '',
    provinceName: '',
    cityName: '',
    districtName: '',
    wardName: '',
    provinceId: 0,
    cityId: 0,
    districtId: 0,
    wardId: 0,
  });
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);
  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      address: info?.address || '',
      rtRwNumber: info?.rtRwNumber || '',
      // postCode: info?.postCode || '',
      provinceName: info?.provinceName || '',
      cityName: info?.cityName || '',
      districtName: info?.districtName || '',
      wardName: info?.wardName || '',
      provinceId: info?.provinceId || 0,
      cityId: info?.cityId || 0,
      districtId: info?.districtId || 0,
      wardId: info?.wardId || 0,
    });

    setValue('address', info?.address || '');
    setValue('rtRwNumber', info?.rtRwNumber || '');
    // setValue('postCode', info?.postCode || '');
    setValue('provinceName', info?.provinceName || '');
    setValue('city', info?.cityName || '');
    setValue('district', info?.districtName || '');
    setValue('ward', info?.wardName || '');
    setValue('provinceId', info?.provinceId || '');
    setValue('cityId', info?.cityId || '');
    setValue('districtId', info?.districtId || '');
    setValue('wardId', info?.wardId || '');
  }, [info]);

  useEffect(() => {
    if (getValues('provinceName') && getValues('provinceId')) {
      if (getValues('provinceName')?.id) {
        dispatch(
          actions.fetchCity({
            provinceId: getValues('provinceName')?.id,
          }),
        );
      } else {
        dispatch(
          actions.fetchCity({
            provinceId: getValues('provinceId'),
          }),
        );
      }
    }
  }, [
    watch(['provinceName']) &&
      getValues('provinceName') &&
      watch(['provinceId']) &&
      getValues('provinceId'),
  ]);

  useEffect(() => {
    if (getValues('city') && getValues('cityId')) {
      if (getValues('provinceName')?.id) {
        dispatch(
          actions.fetchDistrict({
            cityId: fetchFormData?.city?.find(
              value => value.name === getValues('city'),
            )?.id,
          }),
        );
      } else {
        dispatch(
          actions.fetchDistrict({
            cityId: getValues('cityId'),
          }),
        );
      }
    }
  }, [
    watch(['city']) &&
      getValues('city') &&
      watch(['cityId']) &&
      getValues('cityId'),
  ]);

  useEffect(() => {
    if (getValues('district') && getValues('districtId')) {
      if (getValues('district')?.id) {
        dispatch(
          actions.fetchWard({
            districtId: fetchFormData?.district?.find(
              value => value.name === getValues('district'),
            )?.id,
          }),
        );
      } else {
        dispatch(
          actions.fetchWard({
            districtId: getValues('districtId'),
          }),
        );
      }
    }
  }, [
    watch(['district']) &&
      getValues('district') &&
      watch(['districtId']) &&
      getValues('districtId'),
  ]);

  const checkIsUniqueClubname = (provinceName: string) => {
    if (provinceName) {
      const request: ClubNameRequest = {
        provinceId:
          fetchFormData?.provinces?.find(
            (value: any) => value.name === provinceName,
          )?.id || '',
        clubName: getValues('clubName'),
        type: 'tkt',
        clubId: info?.id || null,
      };

      dispatch(
        actions.checkClubnameRequest(
          request,
          (clubNameResponse?: ClubNameResponse) => {
            if (clubNameResponse?.duplicateName) {
              setNumberUnique({
                type: 'duplicateName',
                message: t(translations.common.clubNameHasBeenDuplicated),
              });
            } else {
              setNumberUnique(undefined);
            }
          },
        ),
      );
    }
  };

  return (
    <Card sx={{ marginTop: 3 }}>
      <NestedList
        openCollapse={openCollapse}
        handleOpenCollapse={handleOpenCollapse}
        title={'Club location'}
        description={
          <Grid container spacing={2} justifyContent="center" mt={1}>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  control={control}
                  name="provinceName"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        options={provinces?.map(item => item.name) || []}
                        onChange={(_, data) => {
                          if (data) {
                            field.onChange(data);
                            setValue('city', '');
                            setValue('district', '');
                            setValue('ward', '');
                            checkIsUniqueClubname(data);
                            setFormValues({
                              ...formValues,
                              provinceName: data,
                            });
                          }
                        }}
                        value={formValues?.provinceName}
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(
                                translations.clubManagementConfirm.province,
                              )}`}
                              error={!!errors.province}
                              helperText={errors?.provinceName?.name?.message}
                            />
                          </RenderInput>
                        )}
                      />
                    );
                  }}
                />
              </Stack>
              <Stack mt={1}>
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        options={
                          fetchFormData?.city?.map(item => item.name) || []
                        }
                        onChange={(_, data) => {
                          field.onChange(data);
                          setValue('district', '');
                          setValue('ward', '');
                        }}
                        disabled={!getValues('provinceName')}
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(translations.common.city)}*`}
                              error={!!errors.city}
                              helperText={errors?.city?.message}
                            />
                          </RenderInput>
                        )}
                      />
                    );
                  }}
                />
              </Stack>
              <Stack mt={1}>
                <Controller
                  control={control}
                  name="district"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        options={
                          fetchFormData?.district?.map(item => item.name) || []
                        }
                        onChange={(_, data) => {
                          field.onChange(data);
                          setValue('ward', '');
                        }}
                        disabled={
                          !(getValues('provinceName') && getValues('city'))
                        }
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(translations.common.district)}`}
                              error={!!errors.district}
                              helperText={errors?.district?.message}
                            />
                            {/* {errors &&
                              Object.keys(errors).length > 0 &&
                              !errors.district && (
                                <div style={{ height: 23 }}></div>
                              )} */}
                          </RenderInput>
                        )}
                      />
                    );
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  control={control}
                  name="ward"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        options={
                          fetchFormData?.ward?.map(item => item.name) || []
                        }
                        onChange={(_, data) => {
                          field.onChange(data);
                        }}
                        disabled={
                          !(
                            getValues('provinceName') &&
                            getValues('city') &&
                            getValues('district')
                          )
                        }
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(translations.common.ward)}`}
                              error={!!errors.ward}
                              helperText={errors?.ward?.message}
                            />
                          </RenderInput>
                        )}
                      />
                    );
                  }}
                />
              </Stack>
              <Stack mt={1}>
                <Controller
                  name="address"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        label={`${t(
                          translations.clubManagementConfirm.fullAddress,
                        )}`}
                        onChange={event => {
                          field.onChange(event);
                          setFormValues({
                            ...formValues,
                            address: event.target.value,
                          });
                        }}
                        error={!!errors.address}
                        helperText={errors?.address?.message}
                        value={formValues?.address}
                      />
                      {/* {errors &&
                        Object.keys(errors).length > 0 &&
                        !errors.address && <div style={{ height: 23 }}></div>} */}
                    </RenderInput>
                  )}
                  control={control}
                />
              </Stack>
              <Stack mt={1}>
                <Controller
                  control={control}
                  name="rtRwNumber"
                  render={({ field }) => {
                    return (
                      <NumberFormat
                        type="text"
                        label={`${t(translations.clubManagementConfirm.rtRW)}`}
                        format="###/###"
                        customInput={TextField}
                        onChange={event => {
                          field.onChange(event);
                          setFormValues({
                            ...formValues,
                            rtRwNumber: event.target.value,
                          });
                        }}
                        helperText={errors?.rtRwNumber?.message}
                        error={!!errors?.rtRwNumber}
                        value={formValues?.rtRwNumber}
                      />
                    );
                  }}
                />
              </Stack>
              {/* <Stack mt={1}>
                <Controller
                  name="postCode"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        label={`${t(
                          translations.clubManagementConfirm.postalCode,
                        )}*`}
                        onChange={event => {
                          field.onChange(event);
                          setFormValues({
                            ...formValues,
                            postCode: event.target.value,
                          });
                        }}
                        error={!!errors?.postCode}
                        helperText={errors?.postCode?.message}
                      />
                    </RenderInput>
                  )}
                  control={control}
                />
              </Stack> */}
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
});
