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
import { AssociationInformationType } from 'types/AssociationManagement';
import NumberFormat from 'react-number-format';
import { lettersAndSpaceRegex } from 'utils/helpers/regex';

import { selectAssociation } from '../../slice/selectors';

interface Props {
  info?: AssociationInformationType;
}

export const BankInformation = memo((props: Props) => {
  const {
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext();
  const { info } = props;
  const { t } = useTranslation();
  const { banks } = useSelector(selectAssociation);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [formValues, setFormValues] = useState({
    bankName: '',
    bankNumber: '',
    bankHolderName: '',
  });
  useEffect(() => {
    setFormValues({
      ...formValues,
      bankName: info?.bankName || '',
      bankNumber: info?.bankNumber || '',
      bankHolderName: info?.bankHolderName.toUpperCase() || '',
    });

    setValue('bankName', info?.bankName || '');
    setValue('bankNumber', info?.bankNumber || '');
    setValue('bankHolderName', info?.bankHolderName.toUpperCase() || '');
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
          {t(translations.clubAssociationInformation.bankInformation)}
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
                name="bankName"
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={banks?.map(item => item.name) || []}
                    onChange={(_, data) => {
                      field.onChange(data);
                      if (data) {
                        setFormValues({
                          ...formValues,
                          bankName: data,
                        });
                      }
                    }}
                    value={formValues?.bankName}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={`${t(
                          translations.clubManagementConfirm.bankName,
                        )}*`}
                        error={!!errors.bankName}
                        helperText={errors?.bankName?.message}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="bankNumber"
                render={({ field }) => {
                  return (
                    <NumberFormat
                      type="text"
                      label={`${t(
                        translations.clubAssociationInformation.accountNumber,
                      )}*`}
                      customInput={TextField}
                      value={formValues?.bankNumber}
                      onChange={(e: any) => {
                        const data = e.target.value;
                        if (data && data.length > 16) {
                          setError('bankNumber', {});
                        } else {
                          field.onChange(e);
                          setFormValues({
                            ...formValues,
                            bankNumber: data,
                          });
                        }
                      }}
                      helperText={errors?.bankNumber?.message}
                      error={!!errors?.bankNumber}
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
                name="bankHolderName"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!errors?.bankHolderName}
                      helperText={errors?.bankHolderName?.message}
                      label={`${t(
                        translations.clubAssociationInformation.accountName,
                      )}*`}
                      type="text"
                      value={formValues?.bankHolderName}
                      onChange={(e: any) => {
                        const data = e.target.value;
                        if (lettersAndSpaceRegex.test(data) || data === '') {
                          field.onChange(e);
                          setFormValues({
                            ...formValues,
                            bankHolderName: e.target.value.toUpperCase(),
                          });
                        }
                      }}
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
