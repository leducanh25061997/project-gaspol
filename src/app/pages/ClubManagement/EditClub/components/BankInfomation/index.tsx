import {
  Autocomplete,
  Card,
  Grid,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { ClubInformation } from 'types';

import NestedList from 'app/components/Collapse';

import { useSelector } from 'react-redux';

import { selectClubManagementEdit } from '../../slice/selectors';

interface Props {
  info?: ClubInformation;
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

export const BankInfomation = memo(({ info }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const fetchFormData = useSelector(selectClubManagementEdit);
  const { banks } = fetchFormData;
  const [formValues, setFormValues] = useState({
    bankName: '',
    bankNumber: '',
    bankHolderName: '',
  });
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);
  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      bankName: info?.bankName || '',
      bankNumber: info?.bankNumber || '',
      bankHolderName: info?.bankHolderName || '',
    });
    setValue('bankName', info?.bankName || '');
    setValue('bankNumber', info?.bankNumber || '');
    setValue('bankHolderName', info?.bankHolderName || '');
  }, [info]);

  return (
    <Card sx={{ marginTop: 3 }}>
      <NestedList
        openCollapse={openCollapse}
        handleOpenCollapse={handleOpenCollapse}
        title={`${t(translations.common.bankInformation)}`}
        description={
          <Grid container spacing={2} justifyContent="center" mt={1}>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  control={control}
                  name="bankName"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        options={
                          (banks &&
                            banks.length > 0 &&
                            banks.map(value => value.name)) ||
                          []
                        }
                        onChange={(_, data) => {
                          if (data) {
                            setFormValues({
                              ...formValues,
                              bankName: data,
                            });
                            field.onChange(data);
                          }
                        }}
                        value={formValues?.bankName}
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(
                                translations.clubManagementConfirm.bankName,
                              )}`}
                              error={!!errors?.bankName}
                              helperText={errors?.bankName?.message}
                            />
                          </RenderInput>
                        )}
                      />
                    );
                  }}
                />
              </Stack>
              <Stack>
                <Controller
                  control={control}
                  name="bankNumber"
                  render={({ field }) => {
                    return (
                      <NumberFormat
                        type="text"
                        label={t(
                          translations.clubManagementConfirm.accountNumber,
                        )}
                        customInput={TextField}
                        onChange={event => {
                          const { value } = event.target;
                          setFormValues(prev => ({
                            ...prev,
                            bankNumber: value,
                          }));
                          field.onChange(event);

                          // field.onChange(event);
                          // setFormValues({
                          //   ...formValues,
                          //   bankNumber: event.target.value,
                          // });
                        }}
                        helperText={errors?.bankNumber?.message}
                        error={!!errors?.bankNumber}
                        value={formValues?.bankNumber}
                      />
                    );
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  name="bankHolderName"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        label={`${t(
                          translations.clubManagementConfirm.accountName,
                        )}`}
                        onChange={event => {
                          const { value } = event.target;
                          field.onChange(event);
                          setFormValues(prev => ({
                            ...prev,
                            bankHolderName: value,
                          }));
                        }}
                        inputProps={{ style: { textTransform: 'uppercase' } }}
                        error={!!errors?.bankHolderName}
                        helperText={errors?.bankHolderName?.message}
                        value={formValues?.bankHolderName}
                      />
                      {/* {errors &&
                        Object.keys(errors).length > 0 &&
                        !errors.bankHolderName && <div style={{ height: 23 }}></div>} */}
                    </RenderInput>
                  )}
                  control={control}
                />
              </Stack>
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
});
