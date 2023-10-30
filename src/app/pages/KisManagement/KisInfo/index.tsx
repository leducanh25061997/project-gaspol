/**
 *
 * KisInfo
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { DialogTitle } from 'app/components/DialogTitle';
import { translations } from 'locales/translations';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormatInput from 'app/components/NumberFormatInput';
import { Controller, useForm } from 'react-hook-form';
import { KisInfo as KisModel } from 'types';
import { currencyFormat } from 'utils/helpers/currency';
import { withLoading } from 'app/components/HOC/WithLoading';
import { useLoading } from 'app/hooks';
import { Key, Row, Value } from 'app/components/KeyValue';

import { useKisManagementSlice } from '../slice';
import { selectKisManagement } from '../slice/selectors';

interface Props {
  open: boolean;
  onClose?: () => void;
  id: number;
  isEdit?: boolean;
  setLoading?: Function;
}

export const KisInfo = withLoading(
  memo((props: Props) => {
    const { open, onClose, isEdit = false, id } = props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { kisInformation } = useSelector(selectKisManagement);
    const { actions } = useKisManagementSlice();
    const { showLoading, hideLoading } = useLoading(props);

    const minPrice = React.useMemo(
      () => kisInformation?.minPrice || 0,
      [kisInformation?.minPrice],
    );

    const maxPrice = React.useMemo(
      () => kisInformation?.maxPrice || Number.MAX_SAFE_INTEGER,
      [kisInformation?.maxPrice],
    );

    const KisSchema = yup.object().shape({
      provincePrice: yup
        .number()
        .required(t(translations.kisInformation.provincePriceRequired))
        .min(
          minPrice,
          t(translations.kisInformation.provincePriceMin, {
            min: currencyFormat(minPrice),
          }),
        )
        .max(
          maxPrice,
          t(translations.kisInformation.provincePriceMax, {
            max: currencyFormat(maxPrice),
          }),
        ),
    });

    const {
      handleSubmit,
      setValue,
      control,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(KisSchema),
    });

    React.useEffect(() => {
      if (id) {
        dispatch(actions.getProvinceKisInformation({ id }));
      }
    }, [dispatch, actions, id]);

    React.useEffect(() => {
      if (kisInformation) {
        setValue('provincePrice', kisInformation.provincePrice);
      }
    }, [kisInformation, setValue]);

    const onSubmit = (data: any) => {
      showLoading();
      dispatch(
        actions.updateProvinceKisInformation(
          {
            ...kisInformation,
            id,
            provincePrice: data.provincePrice,
          },
          (updatedKis?: KisModel) => {
            hideLoading();
            if (updatedKis && onClose) {
              onClose();
            }
          },
        ),
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
            {isEdit
              ? t(translations.kisInformation.updatePrice)
              : t(translations.kisInformation.kisInfo)}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ padding: 2 }}>
            <Row>
              <Key>{t(translations.kisInformation.kisID)}</Key>
              <Value>{kisInformation?.kisIdStr}</Value>
            </Row>
            <Row>
              <Key>{t(translations.kisInformation.kisType)}</Key>
              <Value>{kisInformation?.kisType}</Value>
            </Row>
            <Row>
              <Key>{t(translations.kisInformation.kisName)}</Key>
              <Value>{kisInformation?.kisName}</Value>
            </Row>
            <Row>
              <Key>{t(translations.kisInformation.minMaxPrice)}</Key>
              <Value>
                {currencyFormat(kisInformation?.minPrice)} -{' '}
                {currencyFormat(kisInformation?.maxPrice)}
              </Value>
            </Row>
            <Row>
              <Key>{t(translations.kisInformation.provincePrice)}</Key>

              {isEdit ? (
                <Controller
                  name="provincePrice"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors?.provincePrice}
                      helperText={errors?.provincePrice?.message}
                      placeholder={t(translations.kisInformation.provincePrice)}
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
              ) : (
                <Value>{currencyFormat(kisInformation?.provincePrice)}</Value>
              )}
            </Row>
            <Row>
              <Key>{t(translations.common.description)}</Key>
              <Value>{kisInformation?.description}</Value>
            </Row>
          </DialogContent>
          {isEdit && (
            <>
              <Divider />
              <DialogActions
                sx={{
                  padding: '12px 16px',
                }}
              >
                <LoadingButton
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                >
                  {t(translations.common.update)}
                </LoadingButton>
              </DialogActions>
            </>
          )}
        </Dialog>
      </form>
    );
  }),
);
