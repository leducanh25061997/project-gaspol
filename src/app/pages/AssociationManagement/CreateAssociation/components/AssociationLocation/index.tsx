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

import { Controller, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { selectAssociation } from '../../slice/selectors';
import { useCreateAssociationSlice } from '../../slice';

interface Props {}

const CharacterNumber = styled('div')({
  float: 'right',
  color: 'rgba(134, 134, 134, 1)',
});

export const AssociationLocation = memo(({}: Props) => {
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(true);
  // const [provinceValue, setProvinceValue] = useState({
  //   name: '',
  //   id: 0,
  //   clubNumber: 0,
  // });
  const [isDisable, serIsDisable] = useState<boolean>(false);
  const fetchData = useSelector(selectAuth);
  const { userInformation } = fetchData;
  const { provinceRequests, city, ward, district } =
    useSelector(selectAssociation);
  const { actions } = useCreateAssociationSlice();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (userInformation && userInformation.provinceId) {
  //     const id = userInformation?.provinceId;
  //     const data = provinceRequests?.find(value => value.id === parseInt(id));
  //     if (data && Object.keys(data).length > 0) {
  //       serIsDisable(true);
  //       const obj = {
  //         name: data.name as string,
  //         id: data.id as number,
  //         clubNumber: data.clubNumber as number,
  //       };
  //       setProvinceValue(obj);
  //       setValue('province', data);
  //     }
  //   }
  // }, [userInformation, provinceRequests]);

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
          cityId: city?.find(value => value.name === getValues('city'))?.id,
        }),
      );
    }
  }, [watch(['city']) && getValues('city')]);

  useEffect(() => {
    if (getValues('district')) {
      dispatch(
        actions.fetchWard({
          districtId: district?.find(
            value => value.name === getValues('district'),
          )?.id,
        }),
      );
    }
  }, [watch(['district']) && getValues('district')]);

  return (
    <Card sx={{ mt: 3, padding: '1rem' }}>
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
                name="province"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={provinceRequests || []}
                      getOptionLabel={option => option.name || ''}
                      // value={provinceValue}
                      disabled={isDisable}
                      onChange={(_, data) => {
                        field.onChange(data);
                        setValue('province', data);
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
                          error={!!errors.province}
                          helperText={errors?.province?.message}
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
                      disabled={!getValues('province')}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label={`${t(translations.common.city)}*`}
                          error={!!errors.city}
                          helperText={errors?.city?.message}
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
                      disabled={!(getValues('province') && getValues('city'))}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label={`${t(translations.common.district)}*`}
                          error={!!errors.district}
                          helperText={errors?.district?.message}
                        />
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
                          getValues('province') &&
                          getValues('city') &&
                          getValues('district')
                        )
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          label={`${t(translations.common.ward)}*`}
                          error={!!errors.ward}
                          helperText={errors?.ward?.message}
                        />
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
                      }}
                      helperText={errors?.rtRwNumber?.message}
                      error={!!errors?.rtRwNumber}
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
