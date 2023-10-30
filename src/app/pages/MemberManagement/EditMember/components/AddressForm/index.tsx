import { memo, useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
  Autocomplete,
  Paper,
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
import { useDispatch, useSelector } from 'react-redux';
import { CustomPaperComponent } from 'app/components/CustomPaperComponent';

import {
  Profile,
  Category,
  IndividualInformation,
  Province,
  Address,
} from 'types';

import NumberFormat from 'react-number-format';

import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

import { selectEditMember } from '../../slice/selectors';
import { useEditMemberSlice } from '../../slice';

interface Props {
  info?: IndividualInformation;
}

interface propsInterface {
  province: Province;
  cities: Address;
  districts: Address;
  wards: Address;
}

export const defaultProvince: Province = {
  name: '',
  id: 0,
  ownerId: 0,
  clubNumber: 0,
};

export const defaultCity: Address = {
  name: '',
  id: 0,
  path: '',
  parentId: 0,
};

export const defaultDistrict: Address = {
  name: '',
  id: 0,
  path: '',
  parentId: 0,
};

export const defaultWard: Address = {
  name: '',
  id: 0,
  path: '',
  parentId: 0,
};

export const AddressForm = memo(({ info }: Props) => {
  const today = new Date();
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const memberGerenalInfo = useSelector(selectEditMember);

  const [open, setOpen] = useState<boolean>(true);
  const [formValues, setFormValues] = useState({
    address: '',
    rtRwNumber: '',
    // postCode: '',
    provinceName: '',
    cityName: '',
    districtName: '',
    wardName: '',
  });
  const [addressValues, setAddressValues] = useState({
    province: defaultProvince,
    cities: defaultCity,
    districts: defaultDistrict,
    wards: defaultWard,
  });

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
    });

    setValue('address', info?.address || '');
    setValue('rtRwNumber', info?.rtRwNumber || '');
    // setValue('postCode', info?.postCode || '');
    setValue('provinceName', info?.provinceName || '');
    setValue('city', info?.cityName || '');
    setValue('district', info?.districtName || '');
    setValue('ward', info?.wardName || '');
  }, [info]);

  useEffect(() => {
    let provinceData;
    let cityData;
    let districtData;
    let wardData;
    if (memberGerenalInfo?.provinceRequests?.length) {
      provinceData = memberGerenalInfo.provinceRequests.find(
        item => item.name === formValues?.provinceName,
      ) as Province;
      if (provinceData) {
        setAddressValues({
          ...addressValues,
          province: {
            ...addressValues.province,
            name: provinceData?.name,
            id: provinceData?.id,
          },
        });
        setValue('province', provinceData);
      }
    }

    if (memberGerenalInfo?.city?.length && provinceData) {
      cityData = memberGerenalInfo.city.find(
        item => item.name === formValues?.cityName,
      ) as Address;

      if (cityData) {
        setAddressValues({
          ...addressValues,
          province: {
            ...addressValues.province,
            name: provinceData?.name,
            id: provinceData?.id,
          },
          cities: {
            ...addressValues.cities,
            name: cityData?.name,
            id: cityData?.id,
          },
        });
        setValue('province', provinceData);
        setValue('cities', cityData);
      }
    }

    if (memberGerenalInfo?.district?.length && cityData && provinceData) {
      districtData = memberGerenalInfo.district.find(
        item => item.name === formValues?.districtName,
      ) as Address;

      if (districtData) {
        setAddressValues({
          ...addressValues,
          province: {
            ...addressValues.province,
            name: provinceData?.name,
            id: provinceData?.id,
          },
          cities: {
            ...addressValues.cities,
            name: cityData?.name,
            id: cityData?.id,
          },
          districts: {
            ...addressValues.districts,
            name: districtData?.name,
            id: districtData?.id,
          },
        });
        setValue('province', provinceData);
        setValue('cities', cityData);
        setValue('districts', districtData);
      }
    }

    if (
      memberGerenalInfo?.ward?.length &&
      cityData &&
      provinceData &&
      districtData
    ) {
      wardData = memberGerenalInfo.ward.find(
        item => item.name === formValues?.wardName,
      ) as Address;
      if (wardData) {
        setAddressValues({
          ...addressValues,
          province: {
            ...addressValues.province,
            name: provinceData?.name,
            id: provinceData?.id,
          },
          cities: {
            ...addressValues.cities,
            name: cityData?.name,
            id: cityData?.id,
          },
          districts: {
            ...addressValues.districts,
            name: districtData?.name,
            id: districtData?.id,
          },
          wards: {
            ...addressValues.wards,
            name: wardData?.name,
            id: wardData?.id,
          },
        });
        setValue('province', provinceData);
        setValue('cities', cityData);
        setValue('districts', districtData);
        setValue('wards', wardData);
      }
    }
  }, [memberGerenalInfo, formValues]);
  const handleClick = () => {
    setOpen(!open);
  };

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
          {t(translations.createNewMemberPage.address)}
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
                name="province"
                control={control}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={memberGerenalInfo?.provinceRequests || []}
                      getOptionLabel={option => option.name as string}
                      value={addressValues?.province}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.province}
                          label={`${t(translations.editMember.province)}*`}
                          helperText={errors?.province?.message}
                          // value={formValues.provinceName || ''}
                        />
                      )}
                      onChange={(_, data: any) => {
                        if (data) {
                          setAddressValues({
                            ...addressValues,
                            province: data,
                            districts: defaultDistrict,
                            cities: defaultCity,
                            wards: defaultWard,
                          });
                          setFormValues({
                            ...formValues,
                            provinceName: data.name as string,
                            cityName: '',
                            districtName: '',
                            wardName: '',
                          });
                          setValue('districts', '');
                          setValue('cities', '');
                          setValue('wards', '');
                          field.onChange(data);
                        }
                      }}
                    />
                  );
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="cities"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={memberGerenalInfo?.city || []}
                      getOptionLabel={option => option.name as string}
                      disabled={!getValues('province')}
                      value={addressValues?.cities}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.cities}
                          label={`${t(translations.common.city)}*`}
                          helperText={errors?.cities?.message}
                        />
                      )}
                      onChange={(_, data: any) => {
                        if (data) {
                          setAddressValues({
                            ...addressValues,
                            cities: data,
                            districts: defaultDistrict,
                            wards: defaultWard,
                          });
                          setFormValues({
                            ...formValues,
                            cityName: data.name as string,
                            districtName: '',
                            wardName: '',
                          });
                          setValue('districts', '');
                          setValue('wards', '');
                          field.onChange(data);
                        }
                      }}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="districts"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={memberGerenalInfo?.district || []}
                      disabled={!(getValues('province') && getValues('cities'))}
                      getOptionLabel={option => option.name as string}
                      value={addressValues?.districts}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.districts}
                          label={`${t(translations.common.district)}*`}
                          helperText={errors?.districts?.message}
                          // value={info?.district ? info?.district : ''}
                        />
                      )}
                      onChange={(_, data: any) => {
                        if (data) {
                          setAddressValues({
                            ...addressValues,
                            districts: data,
                            wards: defaultWard,
                          });
                          setFormValues({
                            ...formValues,
                            districtName: data.name as string,
                            wardName: '',
                          });
                          setValue('wards', '');
                          field.onChange(data);
                        }
                      }}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Controller
                name="wards"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={memberGerenalInfo?.ward || []}
                      getOptionLabel={option => option.name as string}
                      disabled={
                        !(
                          getValues('province') &&
                          getValues('cities') &&
                          getValues('districts')
                        )
                      }
                      value={addressValues?.wards}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.wards}
                          label={`${t(translations.common.ward)}*`}
                          helperText={errors?.wards?.message}
                          // value={formValues?.wards?.id || ''}
                        />
                      )}
                      onChange={(_, data: any) => {
                        if (data) {
                          setAddressValues({
                            ...addressValues,
                            wards: data,
                          });
                          setFormValues({
                            ...formValues,
                            wardName: data.name as string,
                          });
                          field.onChange(data);
                        }
                      }}
                    />
                  );
                }}
                control={control}
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
                      label={`${t(translations.common.addressDetail)}*`}
                      type="text"
                      fullWidth
                      onChange={(e: any) => {
                        field.onChange(e);
                        setFormValues({
                          ...formValues,
                          address: e.target.value,
                        });
                      }}
                      value={formValues?.address}
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
                      format="###/###"
                      type="text"
                      label={`${t(translations.editMember.rtRwNumber)}*`}
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
            {/* <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="postCode"
                render={({ field }) => {
                  return (
                    <NumberFormat
                      type="text"
                      label={`${t(
                        translations.createNewMemberPage.postalCode,
                      )}*`}
                      customInput={TextField}
                      onChange={event => {
                        field.onChange(event);
                        setFormValues({
                          ...formValues,
                          postCode: event.target.value,
                        });
                      }}
                      helperText={errors?.postCode?.message}
                      error={!!errors?.postCode}
                      value={formValues?.postCode}
                    />
                  );
                }}
                control={control}
              />
            </FormControl> */}
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
});
