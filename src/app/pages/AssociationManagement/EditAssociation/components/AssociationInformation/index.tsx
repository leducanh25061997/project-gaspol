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
  Typography,
  CardContent,
} from '@mui/material';

import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { TitlePage } from 'app/components/Label';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { AssociationInformationType } from 'types/AssociationManagement';

import { MemberStatusLowerCase, PackageStatusLowerCase } from 'types/enums';

import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { ImageCard } from 'app/components/ImageCard.tsx';

import { useEditAssociationSlice } from '../../slice';
import { selectAssociation } from '../../slice/selectors';

interface Props {
  images: any;
  setImages: (value: any) => void;
  info?: AssociationInformationType;
}

const CharacterNumber = styled('div')({
  textAlignLast: 'right',
  color: 'rgba(134, 134, 134, 1)',
});

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

const defaultCategories = [
  { name: 'Racing', value: 'RACING' },
  { name: 'Hobby', value: 'HOBBY' },
  { name: 'Open', value: 'OPEN' },
];

export const AssociationInformation = memo((props: Props) => {
  const { info, images, setImages } = props;
  const {
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useEditAssociationSlice();
  const { clubCategories, checkAssociation } = useSelector(selectAssociation);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [textNumber, setTextNumber] = useState<number>(0);
  const [formValues, setFormValues] = useState<any>({
    associationName: '',
    description: '',
    associationStatus: '',
    contentPreference: [],
  });

  function capitalizeFirstLetter(data: any) {
    if (data) {
      const convertString = data.toLowerCase();
      return convertString.charAt(0).toUpperCase() + convertString.slice(1);
    }
    return '';
  }

  useEffect(() => {
    const contentPre: any[] = [];
    info?.contentPreference.map(res => {
      const newContentPre = clubCategories?.find(
        (value: any) => value.id === res,
      )?.name;
      contentPre.push(newContentPre);
    });
    setTextNumber(info?.description ? info?.description.length : 0);
    setFormValues({
      ...formValues,
      associationCategory:
        capitalizeFirstLetter(info?.associationCategory) || '',
      externalLink: info?.externalLink || '',
      associationName: info?.associationName || '',
      description: info?.description || '',
      contentPreference: contentPre || [],
      associationStatus: info?.associationStatus
        ? get(MemberStatusLowerCase, `${info.associationStatus}`)
        : '',
    });
    setValue('associationCategory', info?.associationCategory || '');
    setValue('externalLink', info?.externalLink || '');
    setValue('associationName', info?.associationName || '');
    setValue('contentPreference', contentPre || []);
    setValue('description', info?.description || '');
    setValue(
      'associationStatus',
      info?.associationStatus
        ? get(MemberStatusLowerCase, `${info.associationStatus}`)
        : '',
    );
  }, [info]);

  const checkAssociationNameExist = (data: any) => {
    if (data) {
      dispatch(actions.checkAssociationName(data));
    }
  };

  useEffect(() => {
    if (checkAssociation && !checkAssociation.isNameValid) {
      setError('associationName', {
        type: 'manual',
        message: t(translations.error.associationIsExist),
      });
    } else {
      setError('associationName', {});
    }
  }, [checkAssociation]);

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
          {t(translations.clubAssociationInformation.associationInfo)}
        </Box>
        {collapse ? (
          <ArrowDropDown sx={{ color: '#777777', marginLeft: 2 }} />
        ) : (
          <ArrowRight sx={{ color: '#777777', marginLeft: 2 }} />
        )}
      </Stack>
      <Collapse in={collapse} timeout="auto" unmountOnExit>
        <Grid item xs={12} md={6} sx={{ mt: 3 }}>
          <ImageCard
            title={`* ${t(
              translations.clubAssociationInformation.associationProfile,
            )}`}
            errors={errors}
            images={images}
            setImages={setImages}
            name="associationPicture"
            path="associationPicture"
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
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Controller
                name="associationStatus"
                render={({ field }) => {
                  return (
                    <RenderInput>
                      <TextField
                        {...field}
                        disabled
                        error={!!errors?.associationStatus}
                        helperText={errors?.associationStatus?.message}
                        label={`${t(
                          translations.clubAssociationInformation
                            .associationStatus,
                        )}`}
                        type="text"
                        onChange={(e: any) => {
                          field.onChange(e);
                        }}
                        value={formValues?.associationStatus}
                      />
                    </RenderInput>
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="associationName"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!errors?.associationName}
                      helperText={errors?.associationName?.message}
                      label={`${t(
                        translations.clubAssociationInformation.associationName,
                      )}*`}
                      type="text"
                      onChange={(e: any) => {
                        field.onChange(e);
                        setFormValues({
                          ...formValues,
                          associationName: e.target.value,
                        });
                      }}
                      onBlur={(e: any) => {
                        checkAssociationNameExist(e.target.value);
                      }}
                      value={formValues?.associationName}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="associationCategory"
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={defaultCategories.map(value => value.name)}
                      onChange={(_, data: any) => {
                        if (data) {
                          setFormValues({
                            ...formValues,
                            associationCategory: data,
                          });
                          field.onChange(data.toUpperCase());
                        }
                      }}
                      value={formValues?.associationCategory || ''}
                      renderInput={params => (
                        <RenderInput>
                          <TextField
                            {...params}
                            label={`${t(
                              translations.clubAssociationInformation
                                .associationCategory,
                            )}*`}
                            error={!!errors?.associationCategory}
                            helperText={
                              (errors?.associationCategory as any)?.message
                            }
                          />
                        </RenderInput>
                      )}
                    />
                  );
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="contentPreference"
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    {...field}
                    options={
                      clubCategories?.length
                        ? clubCategories.map(item => item.name)
                        : []
                    }
                    limitTags={4}
                    getOptionLabel={option => option || ''}
                    value={formValues?.contentPreference || []}
                    onChange={(_, data: any) => {
                      if (data) {
                        const _contentPreference = [] as string[];
                        data.map((option: any) => {
                          if (_contentPreference.indexOf(option) === -1) {
                            _contentPreference.push(option);
                          } else {
                            const index = _contentPreference.indexOf(option);
                            _contentPreference.splice(index, 1);
                          }
                        });
                        field.onChange(_contentPreference);
                        setFormValues({
                          ...formValues,
                          contentPreference: _contentPreference,
                        });
                      }
                      // setCheckHobby(false);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={`${t(
                          translations.clubAssociationInformation
                            .associationCategory,
                        )}*`}
                        error={!!errors.contentPreference}
                        helperText={errors?.contentPreference?.message}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="externalLink"
                render={({ field }) => (
                  <RenderInput>
                    <TextField
                      {...field}
                      label={`${t(
                        translations.clubAssociationInformation
                          .associationExternalLink,
                      )}`}
                      helperText={errors?.externalLink?.message}
                      onChange={(e: any) => {
                        field.onChange(e);
                        setFormValues({
                          ...formValues,
                          externalLink: e.target.value,
                        });
                      }}
                      value={formValues?.externalLink || ''}
                    />
                  </RenderInput>
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                name="description"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      multiline
                      error={!!errors?.description}
                      helperText={errors?.description?.message}
                      label={`${t(
                        translations.clubAssociationInformation.description,
                      )}*`}
                      type="text"
                      value={formValues?.description}
                      onChange={(e: any) => {
                        const data = e.target.value;
                        if (textNumber < 500) {
                          setTextNumber(data ? data.length : 0);
                          field.onChange(e);
                        }
                        setFormValues({
                          ...formValues,
                          description: data,
                        });
                      }}
                    />
                  );
                }}
                control={control}
              />
              <CharacterNumber>{textNumber}/500</CharacterNumber>
            </FormControl>
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
});
