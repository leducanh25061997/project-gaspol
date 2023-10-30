/**
 *
 * DialogAssignManagement
 *
 */
import React, { memo, useEffect } from 'react';
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
  FormControl,
  InputAdornment,
  Checkbox,
  styled,
  Autocomplete,
  Paper,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import {
  Controller,
  FieldError,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';

import { DialogTitle } from 'app/components/DialogTitle';
import { Key, KV, Row } from 'app/components/KeyValue';
import NumberFormatInput from 'app/components/NumberFormatInput';
import { translations } from 'locales/translations';
import { IndividualRequest, KisInfo, Profile } from 'types';
import { KisStatus, UserPackageType } from 'types/enums';
import {
  lettersNumbersSpaceRegex,
  lettersAndNumbersDashUnderscoreRegex,
} from 'utils/helpers/regex';
import { CheckAssociationManagement } from 'types/AssociationManagement';
import { withLoading } from 'app/components/HOC/WithLoading';
import { useLoading } from 'app/hooks';
import { TitlePage } from 'app/components/Label';
import { PhoneNumberInput } from 'app/components/PhoneNumberInput';

import { useCreateAssociationSlice } from '../../slice';
import { selectAssociation } from '../../slice/selectors';

interface documentType {
  name?: string;
  value?: string;
}

interface Props {
  checkReset: boolean;
  setCheckReset: any;
  open: boolean;
  onClose?: () => void;
  onSubmit: (data: documentType) => void;
}

export const DialogAddClub = withLoading(
  memo((props: Props) => {
    const { setCheckReset, checkReset } = props;
    const { open, onClose, onSubmit } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { provinceRequests, clubsRequest } = useSelector(selectAssociation);
    const { actions } = useCreateAssociationSlice();

    const validateForm = yup.object().shape({
      provinceClub: yup
        .object()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .nullable(),
      club: yup
        .object()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .nullable(),
    });

    const {
      handleSubmit,
      control,
      reset,
      setValue,
      getValues,
      watch,
      formState: { errors, isSubmitting },
      clearErrors,
    } = useForm({
      resolver: yupResolver(validateForm),
    });

    React.useEffect(() => {
      if (getValues('provinceClub')) {
        dispatch(
          actions.clubsRequest({
            provinceId: getValues('provinceClub')?.id,
            typeIn: 'CLUB',
            size: getValues('provinceClub')?.clubNumber,
            paging: 'CURSOR',
          }),
        );
      }
    }, [watch(['provinceClub']) && getValues('provinceClub')]);

    const checkSubmit = (data: documentType) => {
      onSubmit(data);
    };

    useEffect(() => {
      if (checkReset) {
        reset();
        setCheckReset(false);
      }
    }, [checkReset]);

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
            <TitlePage>
              {t(translations.clubAssociationInformation.addClub)}
            </TitlePage>
          </DialogTitle>
          <DialogContent sx={{ padding: 2 }}>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Controller
                name="provinceClub"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={provinceRequests || []}
                      getOptionLabel={option =>
                        option.name +
                        ' ' +
                        '(' +
                        option.clubNumber +
                        ' ' +
                        t(translations.createNewMemberPage.club) +
                        ')'
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.provinceClub}
                          label={`${t(
                            translations.createNewMemberPage.provinceClub,
                          )}*`}
                          helperText={errors?.provinceClub?.message}
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
                        setValue('clubId', '');
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
                name="club"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={
                        clubsRequest?.data?.length ? clubsRequest.data : []
                      }
                      loading={clubsRequest?.data.length >= 0}
                      getOptionLabel={option =>
                        option.clubName +
                        (option?.clubCode ? ' (' + option.clubCode + ')' : '')
                      }
                      disabled={!getValues('provinceClub')}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.club}
                          label={`${t(translations.common.clubChoise)}*`}
                          helperText={errors?.club?.message}
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
          </DialogContent>
          <DialogActions
            sx={{
              padding: '12px 16px',
            }}
          >
            <LoadingButton
              sx={{ border: '1px solid #777777', color: '#777777' }}
              color="primary"
              variant="outlined"
              onClick={onClose}
            >
              {t(translations.common.cancel)}
            </LoadingButton>
            <LoadingButton
              variant="contained"
              loading={isSubmitting}
              onClick={handleSubmit(checkSubmit)}
            >
              {t(translations.common.add)}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </form>
    );
  }),
);
