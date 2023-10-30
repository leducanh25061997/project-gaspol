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
import { useSelector } from 'react-redux';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { AssociationInformationType } from 'types/AssociationManagement';
import { PackageStatusLowerCase } from 'types/enums';
import { get } from 'lodash';

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

export const AssociationMembershipInfo = memo((props: Props) => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const { info } = props;
  const [collapse, setCollapse] = useState<boolean>(true);
  const [formValues, setFormValues] = useState({
    packageName: '',
    associationCode: '',
    packageStatus: '',
    expireDate: 0,
  });
  useEffect(() => {
    setFormValues({
      ...formValues,
      expireDate: info?.expiredDate || 0,
      packageName: info?.subscribingPackage?.name || '',
      associationCode: info?.associationCode || '',
      packageStatus: info?.packageStatus
        ? get(PackageStatusLowerCase, info.packageStatus)
        : '',
    });

    setValue('expireDate', info?.expireDate || 0);
    setValue('packageName', info?.subscribingPackage?.name || '');
    setValue('associationCode', info?.associationCode || '');
    setValue(
      'packageStatus',
      info?.packageStatus
        ? get(PackageStatusLowerCase, info.packageStatus)
        : '',
    );
  }, [info]);
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
          {t(translations.clubAssociationInformation.associationMembershipInfo)}
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
                name="packageName"
                render={({ field }) => {
                  return (
                    <RenderInput>
                      <TextField
                        {...field}
                        disabled
                        error={!!errors?.packageName}
                        helperText={errors?.packageName?.message}
                        label={`${t(
                          translations.clubAssociationInformation.package,
                        )}`}
                        type="text"
                        value={formValues?.packageName}
                        onChange={(e: any) => {
                          field.onChange(e);
                          if (e) {
                            setFormValues({
                              ...formValues,
                              packageName: e,
                            });
                          }
                        }}
                      />
                    </RenderInput>
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="associationCode"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!errors?.associationCode}
                      helperText={errors?.associationCode?.message}
                      label={`${t(
                        translations.clubAssociationInformation.associationCode,
                      )}*`}
                      type="text"
                      onChange={(e: any) => {
                        field.onChange(e);
                        setFormValues({
                          ...formValues,
                          associationCode: e.target.value,
                        });
                      }}
                      value={formValues?.associationCode}
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
                name="packageStatus"
                render={({ field }) => {
                  return (
                    <RenderInput>
                      <TextField
                        {...field}
                        disabled
                        error={!!errors?.packageStatus}
                        helperText={errors?.packageStatus?.message}
                        label={`${t(
                          translations.clubAssociationInformation.packageStatus,
                        )}`}
                        type="text"
                        onChange={(e: any) => {
                          field.onChange(e);
                        }}
                        value={formValues?.packageStatus}
                      />
                    </RenderInput>
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="expireDate"
                render={({ field }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        {...field}
                        label={`${t(translations.editMember.expirationDate)}*`}
                        inputFormat="dd/MM/yyyy"
                        onChange={(event: any) => {
                          field.onChange(parseInt(moment(event).format('x')));
                          setFormValues({
                            ...formValues,
                            expireDate: event
                              ? parseInt(moment(event).format('x'))
                              : 0,
                          });
                        }}
                        minDate={new Date(1900, 1, 1)}
                        renderInput={params => {
                          const newParams = { ...params };
                          delete newParams.error;
                          return (
                            <TextField
                              {...newParams}
                              error={!!errors.expireDate}
                              helperText={errors?.expireDate?.message}
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
});
