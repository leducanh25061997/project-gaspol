import { memo, useEffect, useState } from 'react';
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
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import NestedList from 'app/components/Collapse';

import { useDispatch, useSelector } from 'react-redux';
import { lettersAndSpaceRegex } from 'utils/helpers/regex';

import { selectClubManagementCreate } from '../../slice/selectors';

interface Props {}

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

export const BankInfomation = () => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const fetchFormData = useSelector(selectClubManagementCreate);
  const { banks } = fetchFormData;
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);
  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };
  const [formValues, setFormValues] = useState({
    bankName: '',
    bankNumber: '',
    bankHolderName: '',
  });

  useEffect(() => {
    if (
      (errors.bankName || errors.bankNumber || errors.bankHolderName) &&
      !openCollapse
    ) {
      setOpenCollapse(true);
    }
  }, [errors]);

  return (
    <Card sx={{ marginTop: 3 }}>
      <NestedList
        openCollapse={openCollapse}
        handleOpenCollapse={handleOpenCollapse}
        title={`${t(translations.common.bankInformation)}`}
        description={
          <Grid container spacing={2} mt={1}>
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
                          field.onChange(data);
                        }}
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(
                                translations.clubManagementConfirm.bankName,
                              )}*`}
                              error={!!errors?.bankName}
                              helperText={(errors?.bankName as any)?.message}
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
                  name="bankHolderName"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        label={`${t(
                          translations.clubManagementConfirm.accountName,
                        )}*`}
                        onChange={event => {
                          const data = event.target.value;
                          if (lettersAndSpaceRegex.test(data) || data === '') {
                            setFormValues({
                              ...formValues,
                              bankHolderName: data.toUpperCase(),
                            });
                            setValue('bankHolderName', data.toUpperCase());
                            field.onChange(event);
                          }

                          // field.onChange(event);
                          // setFormValues({
                          //   ...formValues,
                          //   bankHolderName: event.target.value.toUpperCase(),
                          // });
                        }}
                        error={!!errors?.bankHolderName}
                        helperText={errors?.bankHolderName?.message}
                        value={formValues?.bankHolderName}
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
                  name="bankNumber"
                  render={({ field }) => {
                    return (
                      <NumberFormat
                        type="text"
                        label={`${t(
                          translations.clubManagementConfirm.accountNumber,
                        )}*`}
                        customInput={TextField}
                        onChange={event => {
                          field.onChange(event);
                          setFormValues({
                            ...formValues,
                            bankNumber: event.target.value,
                          });
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
          </Grid>
        }
      />
    </Card>
  );
};
