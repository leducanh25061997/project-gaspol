/**
 *
 * NewKis
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Divider,
  Grid,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import { DialogTitle } from 'app/components/DialogTitle';
import { Key, KV, Row } from 'app/components/KeyValue';
import NumberFormatInput from 'app/components/NumberFormatInput';
import { translations } from 'locales/translations';
import { KisInfo } from 'types';
import { KisStatus } from 'types/enums';
import {
  lettersNumbersSpaceRegex,
  lettersAndNumbersDashUnderscoreRegex,
} from 'utils/helpers/regex';
import { withLoading } from 'app/components/HOC/WithLoading';
import { useLoading } from 'app/hooks';

import { useKisManagementSlice } from '../slice';
import { selectKisManagement } from '../slice/selectors';

interface Props {
  id?: number;
  open: boolean;
  onClose?: () => void;
  isView?: boolean;
}

export const NewKis = withLoading(
  memo((props: Props) => {
    const { id, open, onClose, isView } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { kisInformation } = useSelector(selectKisManagement);
    const { actions } = useKisManagementSlice();
    const { showLoading, hideLoading } = useLoading(props);

    const isEdit = React.useMemo(() => !!id, [id]);

    const kisTypes = React.useMemo(
      () => [
        { value: 'CAR', label: t(translations.common.car) },
        { value: 'MOTOR', label: t(translations.common.motor) },
      ],
      [t],
    );

    const KisSchema = yup.object().shape(
      {
        kisId: yup
          .string()
          .required(t(translations.kisInformation.kisIdRequired))
          .matches(
            lettersAndNumbersDashUnderscoreRegex,
            t(translations.kisInformation.kisIdNotAllowSpecificCharacter),
          ),
        kisType: yup.object(),
        kisName: yup
          .string()
          .required(t(translations.kisInformation.kisNameRequired)),
        minPrice: yup
          .number()
          .min(0)
          .when('maxPrice', (maxPrice?: number) => {
            const max = maxPrice ? maxPrice : Number.MAX_SAFE_INTEGER;
            return yup
              .number()
              .required(t(translations.kisInformation.minPriceRequired))
              .max(
                max,
                t(translations.kisInformation.minPriceLessThanMaxPrice, {
                  max,
                }),
              );
          }),
        maxPrice: yup
          .number()
          .max(Number.MAX_SAFE_INTEGER)
          .when('minPrice', (minPrice?: number) => {
            const min = minPrice ? minPrice : 0;
            return yup
              .number()
              .required(t(translations.kisInformation.maxPriceRequired))
              .min(
                min,
                t(translations.kisInformation.maxPriceGreaterThanMinPrice, {
                  min,
                }),
              );
          }),
        description: yup
          .string()
          .required(t(translations.common.descriptionRequired))
          .max(1000),
      },
      [['minPrice', 'maxPrice']],
    );

    const {
      handleSubmit,
      control,
      reset,
      formState: { errors, isSubmitting },
      clearErrors,
    } = useForm({
      resolver: yupResolver(KisSchema),
    });

    React.useEffect(() => {
      if (id) {
        dispatch(actions.getIMIKisInformation({ id }));
      }
    }, [dispatch, actions, id]);

    React.useEffect(() => {
      if (!open) {
        reset();
        return;
      }
      const type = isEdit
        ? kisTypes.find(kis => kis.value === kisInformation?.kisType) ||
          kisTypes[0]
        : kisTypes[0];
      const defaultValues = {
        kisId: '',
        kisType: kisTypes[0],
        kisName: '',
        minPrice: 0,
        maxPrice: 0,
        description: '',
      };
      const initialKIS = {
        ...(isEdit ? kisInformation : defaultValues),
        kisType: type,
      };
      reset(initialKIS);
    }, [isEdit, kisInformation, kisTypes, reset, open]);

    const onSubmit = (data: any) => {
      const params = {
        ...omit(data, ['createdDate', 'modifiedDate']),
        kisType: data.kisType.value,
        status: isEdit ? kisInformation?.status : KisStatus.DISABLE,
      };
      showLoading();
      if (isEdit && id) {
        dispatch(
          actions.updateIMIKisInformation(
            {
              id,
              ...params,
            },
            (updatedKis?: KisInfo) => {
              hideLoading();
              if (updatedKis && onClose) {
                onClose();
              }
            },
          ),
        );
        return;
      }
      dispatch(
        actions.createKisInformation(params, (newKIS?: KisInfo) => {
          hideLoading();
          if (newKIS && onClose) {
            onClose();
          }
        }),
      );
    };

    return (
      <form>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" onClose={onClose}>
            {t(translations.kisInformation.kisInfo)}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ padding: 2 }}>
            <KV>
              <Row>
                <Key>{t(translations.kisInformation.kisID)}*</Key>
                <Controller
                  name="kisId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      disabled={isView}
                      error={!!errors?.kisId}
                      helperText={errors?.kisId?.message}
                      placeholder={t(translations.kisInformation.kisID)}
                      inputProps={{
                        maxLength: 255,
                      }}
                    />
                  )}
                />
              </Row>
              <Row>
                <Key>{t(translations.kisInformation.kisType)}*</Key>
                <Controller
                  name="kisType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      disabled={isView}
                      renderValue={item => item.label}
                    >
                      {kisTypes.map((item, index) => (
                        <MenuItem key={index} value={item as any}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Row>
              <Row>
                <Key>{t(translations.kisInformation.kisName)}*</Key>
                <Controller
                  name="kisName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      disabled={isView}
                      error={!!errors?.kisName}
                      helperText={errors?.kisName?.message}
                      placeholder={t(translations.kisInformation.kisName)}
                      inputProps={{
                        maxLength: 255,
                      }}
                    />
                  )}
                />
              </Row>
              <Row>
                <Key>{t(translations.kisInformation.minMaxPrice)}*</Key>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Controller
                      name="minPrice"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          disabled={isView}
                          error={!!errors?.minPrice}
                          helperText={errors?.minPrice?.message}
                          placeholder={t(translations.kisInformation.minPrice)}
                          onChange={e => {
                            field.onChange(e);
                            if (
                              (errors?.maxPrice?.type === 'min' &&
                                !errors.minPrice) ||
                              errors?.minPrice?.type === 'max'
                            ) {
                              clearErrors('maxPrice');
                            }
                          }}
                          InputProps={{
                            inputComponent: NumberFormatInput as any,
                          }}
                          inputProps={{
                            maxLength: 20,
                            prefix: 'RP ',
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Box sx={{ width: '10px', textAlign: 'center' }}>-</Box>
                  <Grid item xs>
                    <Controller
                      name="maxPrice"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          disabled={isView}
                          error={!!errors?.maxPrice}
                          helperText={errors?.maxPrice?.message}
                          placeholder={t(translations.kisInformation.maxPrice)}
                          onChange={e => {
                            field.onChange(e);
                            if (
                              (errors?.minPrice?.type === 'max' &&
                                !errors.maxPrice) ||
                              errors?.maxPrice?.type === 'min'
                            ) {
                              clearErrors('minPrice');
                            }
                          }}
                          InputProps={{
                            inputComponent: NumberFormatInput as any,
                          }}
                          inputProps={{
                            maxLength: 20,
                            prefix: 'RP ',
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Row>
              <Grid container direction="column">
                <Grid item sx={{ mb: 1 }}>
                  <Key>{t(translations.common.description)}*</Key>
                </Grid>
                <Grid item>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        rows={5}
                        multiline
                        fullWidth
                        disabled={isView}
                        error={!!errors?.description}
                        helperText={errors?.description?.message}
                        placeholder={t(translations.common.description)}
                        inputProps={{
                          maxLength: 1000,
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </KV>
          </DialogContent>
          <Divider />
          {!isView && (
            <DialogActions
              sx={{
                padding: '12px 16px',
              }}
            >
              <LoadingButton
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                variant="contained"
              >
                {t(
                  isEdit ? translations.common.update : translations.common.add,
                )}
              </LoadingButton>
            </DialogActions>
          )}
        </Dialog>
      </form>
    );
  }),
);
