import React, { memo } from 'react';
import {
  Grid,
  Card,
  Stack,
  TextField,
  styled,
  Autocomplete,
} from '@mui/material';

import { translations } from 'locales/translations';

import { useTranslation } from 'react-i18next';
import NestedList from 'app/components/Collapse';

import { Controller } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';

import { selectClubManagementEdit } from '../../EditClub/slice/selectors';

interface Props {
  setValue: any;
  getValues: any;
  control: any;
  watch?: any;
  errors: any;
}

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(168, 70, 0, 1) !important',
  },
});

export const ClubInformation = (props: Props) => {
  const { setValue, getValues, control, errors } = props;
  const { t } = useTranslation();
  const fetchFormData = useSelector(selectClubManagementEdit);
  const { clubCategories } = fetchFormData;

  return (
    <Card sx={{ marginTop: 3 }}>
      <NestedList
        title={`${t(translations.clubInformation.clubInformation)}`}
        description={
          <Grid container spacing={2} justifyContent="center" mt={1}>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        // error={!!errors.name}
                        label={`${t(
                          translations.clubManagementConfirm.clubName,
                        )}*`}
                        helperText={errors?.name?.message}
                      />
                      {errors &&
                        Object.keys(errors).length > 0 &&
                        !errors.name && <div style={{ height: 23 }}></div>}
                    </RenderInput>
                  )}
                />
              </Stack>
              <Stack mt={5}>
                <Controller
                  control={control}
                  name="clubPrivacy"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        freeSolo
                        options={clubCategories || []}
                        getOptionLabel={option => option.name || ''}
                        onChange={(_, data) => {
                          field.onChange(data);
                        }}
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(
                                translations.clubManagementConfirm.clubPrivacy,
                              )}*`}
                              // error={!!errors?.clubCategories}
                              helperText={(errors?.clubPrivacy as any)?.message}
                            />
                            {errors &&
                              Object.keys(errors).length > 0 &&
                              !errors.clubPrivacy && (
                                <div style={{ height: 23 }}></div>
                              )}
                          </RenderInput>
                        )}
                      />
                    );
                  }}
                />
              </Stack>
              <Stack mt={5}>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        // error={!!errors.description}
                        label={`${t(
                          translations.clubManagementConfirm.description,
                        )}*`}
                        helperText={errors?.description?.message}
                      />
                      {errors &&
                        Object.keys(errors).length > 0 &&
                        !errors.description && (
                          <div style={{ height: 23 }}></div>
                        )}
                    </RenderInput>
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  control={control}
                  // defaultValue={[]}
                  name="clubCategories"
                  render={({ field }) => {
                    console.log(clubCategories);
                    return (
                      <Autocomplete
                        // multiple
                        {...field}
                        freeSolo
                        options={clubCategories || []}
                        getOptionLabel={option => option.name || ''}
                        onChange={(_, data) => {
                          field.onChange(data);
                        }}
                        renderInput={params => (
                          <RenderInput>
                            <TextField
                              {...params}
                              label={`${t(
                                translations.clubManagementConfirm
                                  .clubCategories,
                              )}*`}
                              // error={!!errors?.clubCategories}
                              helperText={
                                (errors?.clubCategories as any)?.message
                              }
                            />
                            {errors &&
                              Object.keys(errors).length > 0 &&
                              !errors.clubCategories && (
                                <div style={{ height: 23 }}></div>
                              )}
                          </RenderInput>
                        )}
                      />
                    );
                  }}
                />
              </Stack>
              <Stack mt={5}>
                <Controller
                  control={control}
                  name="clubExternalLink"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        // error={!!errors.clubExternalLink}
                        label={`${t(
                          translations.clubManagementConfirm.clubExternalLink,
                        )}`}
                        // helperText={errors?.clubExternalLink?.message}
                      />
                    </RenderInput>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
};
