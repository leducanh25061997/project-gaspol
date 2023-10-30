import React, { memo, useEffect } from 'react';
import {
  Grid,
  Card,
  Stack,
  TextField,
  Autocomplete,
  styled,
} from '@mui/material';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

import { Province } from 'types';

import NestedList from 'app/components/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';

import { selectClubManagementCreate } from '../../CreateClub/slice/selectors';
import { useClubManagementCreateSlice } from '../../CreateClub/slice';

interface Props {
  provinces: Province[];
  setValue: any;
  getValues: any;
  control: any;
  watch: any;
  errors: any;
}

interface FormInputs {
  fullAddress: string;
  city?: string;
  district?: string;
  ward?: string;
  province?: Province;
  rtRW: string;
  postalCode: string;
}

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(168, 70, 0, 1) !important',
  },
});

export const ClubLocation = (props: Props) => {
  const { provinces, setValue, getValues, control, watch, errors } = props;
  const { t } = useTranslation();
  const fetchFormData = useSelector(selectClubManagementCreate);
  const dispatch = useDispatch();
  const { actions } = useClubManagementCreateSlice();

  useEffect(() => {
    if (getValues('province')) {
      dispatch(
        actions.fetchCity({
          provinceId: getValues('province')?.id,
        }),
      );
    }
  }, [watch(['province']) && getValues('province')]);

  useEffect(() => {
    if (getValues('city')) {
      dispatch(
        actions.fetchDistrict({
          cityId: fetchFormData?.city?.find(
            value => value.name === getValues('city'),
          )?.id,
        }),
      );
    }
  }, [watch(['city']) && getValues('city')]);

  useEffect(() => {
    if (getValues('district')) {
      dispatch(
        actions.fetchWard({
          districtId: fetchFormData?.district?.find(
            value => value.name === getValues('district'),
          )?.id,
        }),
      );
    }
  }, [watch(['district']) && getValues('district')]);

  return (
    <Card sx={{ marginTop: 3 }}>
      <NestedList
        title={'Club location'}
        description={
          <Grid container spacing={2} justifyContent="center" mt={1}>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  control={control}
                  name="province"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        options={provinces || []}
                        getOptionLabel={option => option.name || ''}
                        onChange={(_, data) => {
                          field.onChange(data);
                          setValue('city', '');
                          setValue('district', '');
                          setValue('ward', '');
                        }}
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(
                                translations.clubManagementConfirm.province,
                              )}*`}
                              // error={!!errors.province}
                              helperText={errors?.province?.name?.message}
                            />
                            {errors &&
                              Object.keys(errors).length > 0 &&
                              !errors.province && (
                                <div style={{ height: 23 }}></div>
                              )}
                          </RenderInput>
                        )}
                      />
                    );
                  }}
                />
              </Stack>
              <Stack mt={5}>
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
                        disabled={!getValues('province')}
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(translations.common.city)}*`}
                              // error={!!errors.city}
                              helperText={errors?.city?.message}
                            />
                            {errors &&
                              Object.keys(errors).length > 0 &&
                              !errors.city && (
                                <div style={{ height: 23 }}></div>
                              )}
                          </RenderInput>
                        )}
                      />
                    );
                  }}
                />
              </Stack>
              <Stack mt={5}>
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
                        disabled={!(getValues('province') && getValues('city'))}
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(translations.common.district)}*`}
                              // error={!!errors.district}
                              helperText={errors?.district?.message}
                            />
                            {errors &&
                              Object.keys(errors).length > 0 &&
                              !errors.district && (
                                <div style={{ height: 23 }}></div>
                              )}
                          </RenderInput>
                        )}
                      />
                    );
                  }}
                />
              </Stack>
              <Stack mt={5}>
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
                            getValues('province') &&
                            getValues('city') &&
                            getValues('district')
                          )
                        }
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(translations.common.ward)}*`}
                              // error={!!errors.ward}
                              helperText={errors?.ward?.message}
                            />
                            {errors &&
                              Object.keys(errors).length > 0 &&
                              !errors.ward && (
                                <div style={{ height: 23 }}></div>
                              )}
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
                  name="fullAddress"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        // error={!!errors.fullAddress}
                        label={`${t(
                          translations.clubManagementConfirm.fullAddress,
                        )}*`}
                        helperText={errors?.fullAddress?.message}
                        onChange={event => field.onChange(event)}
                      />
                      {errors &&
                        Object.keys(errors).length > 0 &&
                        !errors.fullAddress && (
                          <div style={{ height: 23 }}></div>
                        )}
                    </RenderInput>
                  )}
                />
              </Stack>
              <Stack mt={5}>
                <Controller
                  control={control}
                  name="rtRW"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        // error={!!errors.rtRW}
                        label={`${t(translations.clubManagementConfirm.rtRW)}*`}
                        helperText={errors?.rtRW?.message}
                        onChange={event => field.onChange(event)}
                      />
                      {errors &&
                        Object.keys(errors).length > 0 &&
                        !errors.rtRW && <div style={{ height: 23 }}></div>}
                    </RenderInput>
                  )}
                />
              </Stack>
              <Stack mt={5}>
                <Controller
                  control={control}
                  name="postalCode"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        // error={!!errors.postalCode}
                        label={`${t(
                          translations.clubManagementConfirm.postalCode,
                        )}*`}
                        helperText={errors?.postalCode?.message}
                        onChange={event => field.onChange(event)}
                      />
                      {errors &&
                        Object.keys(errors).length > 0 &&
                        !errors.postalCode && (
                          <div style={{ height: 23 }}></div>
                        )}
                    </RenderInput>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
};
