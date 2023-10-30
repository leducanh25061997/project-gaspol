import { memo, useEffect, useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import {
  Grid,
  Card,
  Stack,
  TextField,
  styled,
  Autocomplete,
  Typography,
  CardContent,
} from '@mui/material';
import { translations } from 'locales/translations';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NestedList from 'app/components/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import { ClubNameRequest, ClubNameResponse } from 'types/ClubManagement';
import { ImageCard } from 'app/pages/ClubManagement/Components/ImageCard.tsx';

import { selectClubManagementCreate } from '../../slice/selectors';
import { useClubManagementCreateSlice } from '../../slice';

interface Props {
  setNumberUnique: (value?: FieldError) => void;
  numberIsUnique?: FieldError;
  images: any;
  setImages: (value: any) => void;
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

const CustomTextField = styled('div')({
  '& .MuiFormControl-root': {
    height: '60px',
  },
  '& .MuiTypography-root': {
    textAlign: 'right',
    color: '#868686 !impotant',
    lineHeight: '12px',
    fontWeight: 400,
    fontSize: '10px',
  },
});

const CustomAutocomplete = styled('div')({
  '& .MuiAutocomplete-root': {
    '& .MuiInputLabel-root': {
      zIndex: '11',
    },
    '& .MuiInputBase-root': {
      zIndex: '10',
      background: '#FFFFFF',
    },
  },
});

export const ClubInfomation = ({
  setNumberUnique,
  numberIsUnique,
  images,
  setImages,
}: Props) => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const fetchFormData = useSelector(selectClubManagementCreate);
  const { actions } = useClubManagementCreateSlice();
  const { clubCategories } = fetchFormData;
  const [countText, setCountText] = useState<number>(0);
  const dispatch = useDispatch();
  const defaultClubPrivacy = useMemo(
    () => [
      { name: 'PUBLIC', value: 'PUBLIC' },
      { name: 'PRIVATE', value: 'PRIVATE' },
    ],
    [],
  );
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);
  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };
  const [formValues, setFormValues] = useState({
    clubName: '',
    clubStatus: '',
    clubCategory: '',
    clubPrivacy: '',
    externalLink: '',
    description: '',
  });

  const categories = [
    {
      id: 'HOBBY',
      name: 'Hobby',
    },
    {
      id: 'RACING',
      name: 'Racing',
    },
    {
      id: 'OPEN',
      name: 'Open',
    },
  ];

  const checkIsUniqueClubname = (valueClubname: any) => {
    if (valueClubname) {
      const request: ClubNameRequest = {
        provinceId:
          fetchFormData?.provinces?.find(
            (value: any) => value.name === getValues('provinceName'),
          )?.id || '',
        clubName: valueClubname.target.value,
        type: 'tkt',
      };

      dispatch(
        actions.checkClubnameRequest(
          request,
          (clubNameResponse?: ClubNameResponse) => {
            if (clubNameResponse?.duplicateName) {
              setNumberUnique({
                type: 'duplicateName',
                message: t(translations.common.clubNameHasBeenDuplicated),
              });
            } else {
              setNumberUnique(undefined);
            }
          },
        ),
      );
    }
  };

  useEffect(() => {
    if (
      (errors.clubName ||
        errors.clubPrivacy ||
        errors.description ||
        errors.clubCategory ||
        errors.bloodType ||
        errors.fullName ||
        errors.nationality ||
        errors.email ||
        errors.birthPlace) &&
      !openCollapse
    ) {
      setOpenCollapse(true);
    }
  }, [errors]);

  return (
    <Card sx={{ marginTop: 3 }}>
      <NestedList
        title={`${t(translations.clubInformation.clubInformation)}`}
        openCollapse={openCollapse}
        handleOpenCollapse={handleOpenCollapse}
        description={
          <Grid container spacing={2} justifyContent="center" mt={1}>
            <Grid item xs={12} md={12} sx={{ mb: 2 }}>
              <Stack>
                <ImageCard
                  errors={errors}
                  images={images}
                  setImages={setImages}
                  name="clubPicture"
                  path="clubPicture"
                  control={control}
                  label={t(translations.common.identificationPicture)}
                  extra={
                    <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                      <Typography
                        gutterBottom
                        sx={{
                          fontWeight: 'bold',
                        }}
                      >
                        {`${t(translations.common.identificationPicture)}*`}
                      </Typography>
                    </CardContent>
                  }
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  control={control}
                  name="clubName"
                  render={({ field }) => {
                    return (
                      <RenderInput>
                        <TextField
                          {...field}
                          label={`${t(
                            translations.clubManagementConfirm.clubName,
                          )}*`}
                          value={formValues?.clubName}
                          error={
                            numberIsUnique?.message ? true : !!errors?.clubName
                          }
                          helperText={
                            numberIsUnique?.message || errors?.clubName?.message
                          }
                          onChange={(e: any) => {
                            setFormValues({
                              ...formValues,
                              clubName: e.target.value,
                            });
                            field.onChange(e);
                          }}
                          onBlur={checkIsUniqueClubname}
                        />
                      </RenderInput>
                    );
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  name="contentPreference"
                  render={({ field }) => {
                    return (
                      <CustomAutocomplete>
                        <Autocomplete
                          multiple
                          limitTags={3}
                          {...field}
                          options={
                            (clubCategories &&
                              clubCategories.length > 0 &&
                              clubCategories.map(value => value.name)) ||
                            []
                          }
                          onChange={(_, data) => {
                            field.onChange(data);
                          }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              label={`${t(
                                translations.createNewMemberPage
                                  .contentPreference,
                              )}*`}
                              error={!!errors?.contentPreference}
                              helperText={errors?.contentPreference?.message}
                            />
                          )}
                        />
                      </CustomAutocomplete>
                    );
                  }}
                  control={control}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  control={control}
                  name="clubPrivacy"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        options={
                          defaultClubPrivacy.map(value => value.name) || []
                        }
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
                              error={!!errors?.clubPrivacy}
                              helperText={(errors?.clubPrivacy as any)?.message}
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
                  control={control}
                  name="clubCategory"
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        options={
                          (categories &&
                            categories.length > 0 &&
                            categories.map(value => value.name)) ||
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
                                translations.clubManagementConfirm
                                  .clubCategories,
                              )}*`}
                              error={!!errors?.clubCategory}
                              helperText={
                                (errors?.clubCategory as any)?.message
                              }
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
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <RenderInput>
                      <CustomTextField>
                        <TextField
                          {...field}
                          label={`${t(
                            translations.clubManagementConfirm.description,
                          )}*`}
                          value={formValues?.description}
                          error={!!errors?.description}
                          helperText={errors?.description?.message}
                          onChange={(e: any) => {
                            setFormValues({
                              ...formValues,
                              description: e.target.value,
                            });
                            setCountText(e.target.value.length);
                            field.onChange(e);
                          }}
                        />
                        <Typography>{`${countText}/500`}</Typography>
                      </CustomTextField>
                    </RenderInput>
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <Controller
                  control={control}
                  name="externalLink"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        label={`${t(
                          translations.clubManagementConfirm.clubExternalLink,
                        )}`}
                        value={formValues?.externalLink}
                        helperText={errors?.externalLink?.message}
                        onChange={(e: any) => {
                          setFormValues({
                            ...formValues,
                            externalLink: e.target.value,
                          });
                          field.onChange(e);
                        }}
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
