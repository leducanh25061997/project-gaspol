import { memo, useEffect, useState } from 'react';
import {
  Grid,
  Card,
  TextField,
  FormControl,
  IconButton,
  styled,
  Autocomplete,
  Stack,
  Box,
  Collapse,
} from '@mui/material';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { TitlePage } from 'app/components/Label';
import { useDispatch, useSelector } from 'react-redux';
import { AssociationInformationType } from 'types/AssociationManagement';
import NumberFormat from 'react-number-format';

import { selectAssociation } from '../../slice/selectors';
import { useEditAssociationSlice } from '../../slice';

interface Props {
  info?: AssociationInformationType;
}
const CharacterNumber = styled('div')({
  float: 'right',
  color: 'rgba(134, 134, 134, 1)',
});

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

export const AssociationLocation = memo((props: Props) => {
  const { info } = props;
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(true);
  const { provinceRequests, city, ward, district } =
    useSelector(selectAssociation);
  const { actions } = useEditAssociationSlice();
  const dispatch = useDispatch();

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
    setFormValues({
      ...formValues,
      address: info?.address || '',
      rtRwNumber: info?.rtRwNumber || '',
      postCode: info?.postCode || '',
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
    setValue('postCode', info?.postCode || '');
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
    const provinceId = provinceRequests?.find(
      (value: any) => value.name === getValues('provinceName'),
    )?.id;
    setValue('provinceId', provinceId);
    if (getValues('provinceName') && provinceId) {
      if (getValues('provinceName')?.id) {
        dispatch(
          actions.fetchCity({
            provinceId: getValues('provinceName')?.id,
          }),
        );
      } else {
        dispatch(
          actions.fetchCity({
            provinceId,
          }),
        );
      }
    }
  }, [watch(['provinceName']) && getValues('provinceName')]);

  useEffect(() => {
    if (getValues('city') && getValues('cityId')) {
      if (getValues('provinceName')?.id) {
        dispatch(
          actions.fetchDistrict({
            cityId: city?.find(value => value.name === getValues('city'))?.id,
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
            districtId: district?.find(
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

  return (
    <Card sx={{ mt: 3 }}>
      <Stack
        onClick={() => setCollapse(!collapse)}
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
          {t(translations.clubAssociationInformation.associationLocation)}
        </Box>
        {collapse ? (
          <ArrowDropDown sx={{ color: '#777777', marginLeft: 2 }} />
        ) : (
          <ArrowRight sx={{ color: '#777777', marginLeft: 2 }} />
        )}
      </Stack>
      <Collapse in={collapse} timeout="auto" unmountOnExit>
        <Grid container spacing={2} sx={{ marginTop: '0' }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="provinceName"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={provinceRequests?.map(item => item.name) || []}
                      value={formValues?.provinceName}
                      onChange={(_, data) => {
                        field.onChange(data);
                        if (data) {
                          setFormValues({
                            ...formValues,
                            provinceName: data,
                          });
                          setValue('provinceName', data);
                        }
                        setValue('city', '');
                        setValue('district', '');
                        setValue('ward', '');
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label={`${t(
                            translations.clubManagementConfirm.province,
                          )}*`}
                          error={!!errors.provinceName}
                          helperText={errors?.provinceName?.message}
                        />
                      )}
                    />
                  );
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                control={control}
                name="city"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={city?.map(item => item.name) || []}
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
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                control={control}
                name="district"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={district?.map(item => item.name) || []}
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="ward"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={ward?.map(item => item.name) || []}
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
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="address"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!errors?.address}
                      helperText={errors?.address?.message}
                      label={`${t(
                        translations.clubAssociationInformation.fullAddress,
                      )}*`}
                      type="text"
                      value={formValues?.address}
                      onChange={(e: any) => {
                        field.onChange(e);
                        setFormValues({
                          ...formValues,
                          address: e.target.value,
                        });
                      }}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
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
                control={control}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
});
