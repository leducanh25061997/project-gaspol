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
  CardContent,
  Typography,
} from '@mui/material';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ImageCard } from 'app/components/ImageCard.tsx';

import { selectAssociation } from '../../slice/selectors';
import { useCreateAssociationSlice } from '../../slice';

interface Props {
  images: any;
  setImages: (value: any) => void;
}

const CharacterNumber = styled('div')({
  float: 'right',
  color: 'rgba(134, 134, 134, 1)',
  marginTop: '-1rem',
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
  const { images, setImages } = props;
  const {
    control,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const { actions } = useCreateAssociationSlice();
  const { clubCategories } = useSelector(selectAssociation);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [textNumber, setTextNumber] = useState<number>(0);
  const { checkAssociation } = useSelector(selectAssociation);
  const dispatch = useDispatch();

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
          {t(translations.clubAssociationInformation.associationInfo)}
        </Box>
        {collapse ? (
          <ArrowDropDown sx={{ color: '#777777', marginLeft: 2 }} />
        ) : (
          <ArrowRight sx={{ color: '#777777', marginLeft: 2 }} />
        )}
      </Stack>
      <Collapse in={collapse} timeout="auto" unmountOnExit>
        {/* <Grid item xs={12} md={12} sx={{ mt: 2 }}>
          <Stack>
            <ImageCard
              title={`* ${t(
                translations.clubAssociationInformation.associationProfile,
              )}`}
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
        </Grid> */}
        <Grid container spacing={2} sx={{ marginTop: '0' }}>
          <Grid item xs={12} md={6}>
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
            <FormControl fullWidth sx={{ marginTop: '2rem!important' }}>
              <Controller
                name="associationName"
                render={({ field }) => {
                  return (
                    <RenderInput>
                      <TextField
                        {...field}
                        error={!!errors?.associationName}
                        helperText={errors?.associationName?.message}
                        label={`${t(
                          translations.clubAssociationInformation
                            .associationName,
                        )}*`}
                        type="text"
                        onChange={(e: any) => {
                          field.onChange(e);
                        }}
                        onBlur={(e: any) => {
                          checkAssociationNameExist(e.target.value);
                        }}
                      />
                    </RenderInput>
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
                      onChange={(_, data: string) => {
                        if (data) {
                          field.onChange(data.toUpperCase());
                        }
                      }}
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
          <Grid item xs={12} md={6} sx={{ marginTop: '1.58rem!important' }}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="contentPreference"
                render={({ field }) => (
                  <Autocomplete
                    limitTags={3}
                    multiple
                    {...field}
                    options={
                      clubCategories?.length
                        ? clubCategories.map(item => item.name)
                        : []
                    }
                    getOptionLabel={option => option || ''}
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
                      }
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={`${t(
                          translations.clubAssociationInformation
                            .associationContentPreference,
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
                      }}
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
                      error={!!errors?.description}
                      helperText={errors?.description?.message}
                      label={`${t(
                        translations.clubAssociationInformation.description,
                      )}*`}
                      type="text"
                      onChange={(e: any) => {
                        const data = e.target.value;
                        if (data && data.length > 500) {
                          setError('description', {
                            type: 'manual',
                            message: t(
                              translations.createClubError.descriptionCharacter,
                            ),
                          });
                        } else {
                          setError('description', {});
                        }
                        setTextNumber(data ? data.length : 0);
                        field.onChange(e);
                      }}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
            <CharacterNumber>{textNumber}/500</CharacterNumber>
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
});
