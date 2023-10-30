import { memo, useState } from 'react';
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
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { lettersAndSpaceRegex } from 'utils/helpers/regex';

import { selectAssociation } from '../../slice/selectors';

interface Props {}

export const BankInformation = memo(({}: Props) => {
  const {
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const { banks } = useSelector(selectAssociation);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [bankHolderName, setBankHolderName] = useState<string>('');
  const [bankNumber, setBankNumber] = useState<string>('');

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
                name="bankId"
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={banks?.map(item => item.name) || []}
                    onChange={(_, data) => {
                      field.onChange(data);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={`${t(
                          translations.clubManagementConfirm.bankName,
                        )}*`}
                        error={!!errors.bankId}
                        helperText={errors?.bankId?.message}
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
                      onChange={(e: any) => {
                        const data = e.target.value;
                        if (data && data.length > 16) {
                          setError('bankNumber', {});
                        } else {
                          setBankNumber(data);
                          field.onChange(e);
                          setError('bankNumber', {});
                        }
                      }}
                      value={bankNumber}
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
                      onChange={(e: any) => {
                        const data = e.target.value;
                        if (lettersAndSpaceRegex.test(data) || data === '') {
                          setBankHolderName(
                            e.target.value && e.target.value.toUpperCase(),
                          );
                          setValue(
                            'bankHolderName',
                            e.target.value.toUpperCase(),
                          );
                          field.onChange(e);
                        }
                      }}
                      value={bankHolderName}
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
