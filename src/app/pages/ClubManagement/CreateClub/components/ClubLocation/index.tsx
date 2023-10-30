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

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { selectClubManagementCreate } from '../../slice/selectors';
import { useClubManagementCreateSlice } from '../../slice';

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
    '& .MuiInputLabel-root': {
      background: '#FFFFFF',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(168, 70, 0, 1) !important',
  },
});

interface Props {
  setNumberUnique: (value?: FieldError) => void;
}

export const ClubLocation = (props: Props) => {
  const { setNumberUnique } = props;
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const fetchFormData = useSelector(selectClubManagementCreate);
  const { provinces } = fetchFormData;
  const dispatch = useDispatch();
  const { actions } = useClubManagementCreateSlice();
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);
  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };
  const [provinceValue, setProvinceValue] = useState('');
  const [isDisable, serIsDisable] = useState<boolean>(false);
  const fetchData = useSelector(selectAuth);
  const { userInformation } = fetchData;
  const [formValues, setFormValues] = useState({
    address: '',
    rtRwNumber: '',
    postCode: '',
    provinceName: '',
    cityName: '',
    districtName: '',
    wardName: '',
    provinceId: 0,
    cityId: 0,
    districtId: 0,
    wardId: 0,
  });

  useEffect(() => {
    if (userInformation && userInformation.provinceId) {
      const id = userInformation?.provinceId;
      const data = provinces?.find(value => value.id === parseInt(id));
      if (data && Object.keys(data).length > 0) {
        setProvinceValue(data.name || '');
        serIsDisable(true);
        setValue('provinceName', data.name);
      }
    }
  }, [userInformation, provinces]);

  useEffect(() => {
    if (
      (errors.provinceName ||
        errors.city ||
        errors.district ||
        errors.ward ||
        errors.address ||
        errors.rtRwNumber) &&
      !openCollapse
    ) {
      setOpenCollapse(true);
    }
  }, [errors]);

  useEffect(() => {
    if (getValues('provinceName')) {
      dispatch(
        actions.fetchCity({
          provinceId: provinces?.find(
            value => value.name === getValues('provinceName'),
          )?.id,
        }),
      );
    }
  }, [watch(['provinceName']) && getValues('provinceName')]);

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

  const checkIsUniqueClubname = (provinceName: string) => {
    if (provinceName) {
      const request: ClubNameRequest = {
        provinceId:
          fetchFormData?.provinces?.find(
            (value: any) => value.name === provinceName,
          )?.id || '',
        clubName: getValues('clubName'),
        type: 'tkt',
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
        title={`${t(translations.common.clubLocation)}`}
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
                        disabled={isDisable}
                        value={provinceValue}
                        onChange={(_, data) => {
                          if (data) {
                            setProvinceValue(data);
                            field.onChange(data);
                            setValue('city', '');
                            setValue('district', '');
                            setValue('ward', '');
                            checkIsUniqueClubname(data);
                          }
                        }}
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(
                                translations.clubManagementConfirm.province,
                              )}*`}
                              error={!!errors.provinceName}
                              helperText={errors?.provinceName?.message}
                            />
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
                              label={`${t(translations.common.ward)}*`}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  name="address"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        label={`${t(
                          translations.clubManagementConfirm.fullAddress,
                        )}*`}
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
                    </RenderInput>
                  )}
                  control={control}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
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
                              label={`${t(translations.common.district)}*`}
                              error={!!errors.district}
                              helperText={errors?.district?.message}
                            />
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
                  name="rtRwNumber"
                  render={({ field }) => {
                    return (
                      <NumberFormat
                        type="text"
                        label={`${t(translations.clubManagementConfirm.rtRW)}*`}
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
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
};
