import { memo, useState, useEffect } from 'react';
import {
  Grid,
  Stack,
  Box,
  Card,
  TextField,
  FormControl,
  Autocomplete,
  Collapse,
  Paper,
} from '@mui/material';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CustomPaperComponent } from 'app/components/CustomPaperComponent';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import nationalCode from 'utils/nationalCode/index.json';
import { Province, Club, Profile } from 'types';
import { UserPackageType } from 'types/enums';

import NumberFormat from 'react-number-format';

import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

import { selectCreateMember } from '../../slice/selectors';
import { useCreateMemberSlice } from '../../slice';
interface Props {
  userInformation?: any;
}

export const MemberAddressForm = ({ userInformation }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [isDisable, serIsDisable] = useState<boolean>(false);
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const memberGerenalInfo = useSelector(selectCreateMember);
  const [provinceValue, setProvinceValue] = useState({
    name: '',
    id: 0,
    clubNumber: 0,
  });

  // useEffect(() => {
  //   if (userInformation && userInformation.provinceId) {
  //     const id = userInformation?.provinceId;
  //     const data = memberGerenalInfo?.provinceRequests?.find(
  //       value => value.id === parseInt(id),
  //     );
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
  // }, [userInformation, memberGerenalInfo]);

  useEffect(() => {
    if (
      (errors.address ||
        errors.province ||
        errors.city ||
        errors.district ||
        errors.ward ||
        // errors.postCode ||
        errors.rtRwNumber) &&
      !open
    ) {
      setOpen(true);
    }
  }, [errors]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card sx={{ mt: 3, padding: '1rem' }}>
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
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      disabled={isDisable}
                      options={memberGerenalInfo?.provinceRequests || []}
                      getOptionLabel={option => option.name || ''}
                      // value={provinceValue}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.province}
                          label={`${t(
                            translations.createNewMemberPage.province,
                          )}*`}
                          helperText={errors?.province?.message}
                        />
                      )}
                      PaperComponent={param => (
                        <Paper
                          sx={{
                            boxShadow: 3,
                          }}
                          {...param}
                        />
                      )}
                      onChange={(_, data) => {
                        if (data && Object.keys(data).length > 0) {
                          // const obj = {
                          //   name: data.name as string,
                          //   id: data.id as number,
                          //   clubNumber: data.clubNumber as number,
                          // };
                          // setProvinceValue(obj)
                          // console.log(data, 'data----')
                          setValue('district', '');
                          setValue('city', '');
                          setValue('ward', '');
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
                name="city"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={
                        memberGerenalInfo?.city?.map(item => item.name) || []
                      }
                      disabled={!getValues('province')}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.city}
                          label={`${t(translations.common.city)}*`}
                          helperText={errors?.city?.message}
                        />
                      )}
                      onChange={(_, data) => {
                        setValue('district', '');
                        setValue('ward', '');
                        field.onChange(data);
                      }}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="district"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={
                        memberGerenalInfo?.district?.map(item => item.name) ||
                        []
                      }
                      disabled={!(getValues('province') && getValues('city'))}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.district}
                          label={`${t(translations.common.district)}*`}
                          helperText={errors?.district?.message}
                        />
                      )}
                      onChange={(_, data) => {
                        setValue('ward', '');
                        field.onChange(data);
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
                name="ward"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={
                        memberGerenalInfo?.ward?.map(item => item.name) || []
                      }
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
                          error={!!errors.ward}
                          label={`${t(translations.common.ward)}*`}
                          helperText={errors?.ward?.message}
                        />
                      )}
                      onChange={(_, data) => {
                        field.onChange(data);
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
                      label={`${t(translations.common.fullAddress)}*`}
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
                name="rtRwNumber"
                render={({ field }) => {
                  return (
                    <NumberFormat
                      format="###/###"
                      type="text"
                      label={`${t(
                        translations.createNewMemberPage.rtRwNumber,
                      )}*`}
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
            {/* <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="postCode"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!errors?.postCode}
                      helperText={errors?.postCode?.message}
                      label={`${t(
                        translations.createNewMemberPage.postalCode,
                      )}*`}
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
            </FormControl> */}
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
};
