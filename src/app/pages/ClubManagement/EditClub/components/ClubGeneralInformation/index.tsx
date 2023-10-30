import { memo, useEffect, useState, useMemo } from 'react';
import {
  Grid,
  Card,
  Stack,
  TextField,
  styled,
  Autocomplete,
  CardContent,
  Typography,
} from '@mui/material';
import { ClubInformation } from 'types';
import { translations } from 'locales/translations';
import { Controller, useFormContext, FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ClubNameRequest, ClubNameResponse } from 'types/ClubManagement';

import NestedList from 'app/components/Collapse';
import { useDispatch, useSelector } from 'react-redux';

import { ImageCard } from 'app/pages/ClubManagement/Components/ImageCard.tsx';

import { selectClubManagementEdit } from '../../slice/selectors';
import { useClubManagementEditSlice } from '../../slice';
interface Props {
  info?: ClubInformation;
  images: any;
  setImages: (value: any) => void;
  setNumberUnique: (value?: FieldError) => void;
  numberIsUnique?: FieldError;
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

export const ClubGeneralInformation = memo(
  ({ info, images, setImages, setNumberUnique, numberIsUnique }: Props) => {
    const { t } = useTranslation();
    const {
      control,
      setValue,
      getValues,
      formState: { errors },
    } = useFormContext();
    const fetchFormData = useSelector(selectClubManagementEdit);
    const { clubCategories } = fetchFormData;
    const dispatch = useDispatch();
    const { actions } = useClubManagementEditSlice();
    const [countText, setCountText] = useState<number>(0);
    const [checkUnique, setCheckUnique] = useState<boolean>(false);
    const defaultClubPrivacy = useMemo(
      () => [
        { name: 'Public', value: 'PUBLIC' },
        { name: 'Private', value: 'PRIVATE' },
      ],
      [],
    );
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
    const [formValues, setFormValues] = useState({
      clubName: '',
      clubStatus: '',
      clubCategory: '',
      clubPrivacy: '',
      externalLink: '',
      description: '',
      contentPreference: [] as string[],
    });
    const [openCollapse, setOpenCollapse] = useState<boolean>(true);
    const handleOpenCollapse = () => {
      setOpenCollapse(!openCollapse);
    };

    useEffect(() => {
      const contentPreferences: any[] = [];
      info?.contentPreference &&
        info?.contentPreference.map((item: any) => {
          contentPreferences.push(
            fetchFormData?.clubCategories?.find(
              (value: any) => value.id === item,
            )?.name,
          );
        });
      setFormValues({
        ...formValues,
        clubName: info?.clubName || '',
        clubStatus: info?.clubStatus || '',
        clubCategory: info?.clubCategory || '',
        clubPrivacy: info?.clubPrivacy || '',
        externalLink: info?.externalLink || '',
        description: info?.description || '',
        contentPreference: contentPreferences,
      });
      setCountText(info?.description?.length || 0);
      setValue('clubName', info?.clubName || '');
      setValue('description', info?.description || '');
      setValue('clubName', info?.clubName || '');
      setValue('clubStatus', info?.clubStatus || '');
      setValue('clubCategory', info?.clubCategory || '');
      setValue('clubPrivacy', info?.clubPrivacy || '');
      setValue('externalLink', info?.externalLink || '');
      setValue('contentPreference', contentPreferences);
    }, [info || clubCategories]);

    const checkIsUniqueClubname = (valueClubname: any) => {
      if (valueClubname && checkUnique) {
        const request: ClubNameRequest = {
          provinceId:
            fetchFormData?.provinces?.find(
              (value: any) => value.name === getValues('provinceName'),
            )?.id || '',
          clubName: valueClubname.target.value,
          type: 'tkt',
          clubId: info?.id || null,
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
              setCheckUnique(false);
            },
          ),
        );
      }
    };

    return (
      <Card sx={{ marginTop: 3 }}>
        <NestedList
          openCollapse={openCollapse}
          handleOpenCollapse={handleOpenCollapse}
          title={`${t(translations.clubInformation.clubInformation)}`}
          description={
            <Grid container spacing={2} justifyContent="center" mt={1}>
              <Grid item xs={12} md={6} sx={{ mb: 2 }}>
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
                          {`${t(translations.common.identificationPicture)}`}
                        </Typography>
                      </CardContent>
                    }
                  />
                </Stack>
                <Stack sx={{ mt: 3 }}>
                  <Controller
                    name="clubStatus"
                    render={({ field }) => (
                      <RenderInput>
                        <TextField
                          {...field}
                          disabled
                          label={`${t(
                            translations.clubManagementConfirm.clubStatus,
                          )}`}
                          helperText={errors?.clubStatus?.message}
                          value={formValues?.clubStatus}
                        />
                      </RenderInput>
                    )}
                    control={control}
                  />
                </Stack>
                <Stack sx={{ mt: 1 }}>
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
                            )}`}
                            value={formValues?.clubName}
                            error={
                              numberIsUnique?.message
                                ? true
                                : !!errors?.clubName
                            }
                            helperText={
                              numberIsUnique?.message ||
                              errors?.clubName?.message
                            }
                            onChange={(e: any) => {
                              setCheckUnique(true);
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
                <Stack sx={{ mt: 1 }}>
                  <Controller
                    control={control}
                    name="clubPrivacy"
                    render={({ field }) => {
                      return (
                        <Autocomplete
                          {...field}
                          options={defaultClubPrivacy}
                          getOptionLabel={option => option.name}
                          onChange={(_, data) => {
                            if (data) {
                              setFormValues({
                                ...formValues,
                                clubPrivacy: data.value,
                              });
                            }
                            field.onChange(data?.value);
                          }}
                          value={
                            defaultClubPrivacy.find(
                              privacy =>
                                privacy.value === formValues?.clubPrivacy,
                            ) || null
                          }
                          renderInput={params => (
                            <RenderInput>
                              <TextField
                                {...params}
                                label={`${t(
                                  translations.clubManagementConfirm
                                    .clubPrivacy,
                                )}`}
                                value={
                                  info?.clubPrivacy ? info?.clubPrivacy : ''
                                }
                                error={!!errors?.clubPrivacy}
                                helperText={
                                  (errors?.clubPrivacy as any)?.message
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
                <Stack sx={{ mt: 1 }}>
                  <CustomAutocomplete>
                    <Controller
                      name="contentPreference"
                      render={({ field }) => {
                        return (
                          <Autocomplete
                            multiple
                            limitTags={2}
                            {...field}
                            options={
                              (clubCategories &&
                                clubCategories.length > 0 &&
                                clubCategories.map(value => value.name)) ||
                              []
                            }
                            getOptionLabel={option => option || ''}
                            onChange={(_, data) => {
                              if (data) {
                                const _contentPreference = data as string[];
                                setFormValues({
                                  ...formValues,
                                  contentPreference: _contentPreference,
                                });
                                field.onChange(_contentPreference);
                              }
                            }}
                            value={formValues?.contentPreference || []}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label={`${t(
                                  translations.createNewMemberPage
                                    .contentPreference,
                                )}`}
                                error={!!errors?.contentPreference}
                                helperText={errors?.contentPreference?.message}
                              />
                            )}
                          />
                        );
                      }}
                      control={control}
                    />
                  </CustomAutocomplete>
                </Stack>
                <Stack sx={{ mt: 1 }}>
                  <Controller
                    control={control}
                    name="clubCategory"
                    render={({ field }) => {
                      return (
                        <Autocomplete
                          {...field}
                          disableClearable
                          options={
                            (categories &&
                              categories.length > 0 &&
                              categories.map(value => value.name)) ||
                            []
                          }
                          onChange={(_, data) => {
                            if (data) {
                              setFormValues({
                                ...formValues,
                                clubCategory: data,
                              });
                              field.onChange(data);
                            }
                          }}
                          value={formValues?.clubCategory}
                          renderInput={params => (
                            <RenderInput>
                              <TextField
                                {...params}
                                label={`${t(
                                  translations.clubManagementConfirm
                                    .clubCategories,
                                )}`}
                                value={
                                  info?.clubCategory ? info?.clubCategory : ''
                                }
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
                <Stack sx={{ mt: 1 }}>
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
                <Stack sx={{ mt: 1 }}>
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
                            )}`}
                            value={formValues?.description}
                            error={!!errors?.description}
                            helperText={errors?.description?.message}
                            onChange={(e: any) => {
                              setFormValues({
                                ...formValues,
                                description: e.target.value,
                              });
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
            </Grid>
          }
        />
      </Card>
    );
  },
);
