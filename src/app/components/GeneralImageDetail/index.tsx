/**
 *
 * Photos
 *
 */
import { memo, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  TextField,
  CardContent,
  Box,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { IndividualInformation } from 'types';

import { selectEditMember } from 'app/pages/MemberManagement/EditMember/slice/selectors';
import { useSelector } from 'react-redux';

import { ImageCard } from './ImageCard';
interface Props {
  images: any;
  enableDriverLicense?: boolean;
  setImages: (value: any) => void;
  info?: IndividualInformation;
  nikDriveNumber?: string[];
  driverLicense?: string[];
}

export const GeneralImageDetail = memo(
  ({
    images,
    setImages,
    info,
    nikDriveNumber,
    driverLicense,
    enableDriverLicense,
  }: Props) => {
    const { t } = useTranslation();
    const {
      control,
      setValue,
      formState: { errors },
    } = useFormContext();
    const { loading } = useSelector(selectEditMember);
    useEffect(() => {
      setValue('nikNumber', nikDriveNumber ? nikDriveNumber[0] : '');
      setValue('sim', driverLicense ? driverLicense[0] : '');
      setValue('profilePicture', info?.profilePicture || '');
      setValue('nikPicture', info?.documents?.length ? info.documents[0] : '');
    }, [info]);

    return (
      <Box mt={3} sx={{ marginTop: '1rem' }}>
        <Card sx={{ padding: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <ImageCard
                errors={errors}
                images={images}
                setImages={setImages}
                loading={loading}
                name="profilePicture"
                path="profilePicture"
                control={control}
                label={t(translations.common.profilePicture)}
                extra={
                  <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {`${t(translations.common.profilePicture)}*`}
                    </Typography>
                  </CardContent>
                }
              />
            </Grid>

            <Grid item md={4}>
              <ImageCard
                errors={errors}
                images={images}
                setImages={setImages}
                loading={loading}
                name="nikPicture"
                path="nikPicture"
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
            {enableDriverLicense && (
              <Grid item md={4}>
                <ImageCard
                  errors={errors}
                  images={images}
                  setImages={setImages}
                  loading={loading}
                  name="simCarPicture"
                  path="simCarPicture"
                  control={control}
                  label={t(translations.common.simPicture)}
                  extra={
                    <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                      <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
                        {t(translations.common.simPicture)}
                      </Typography>
                      <Controller
                        name="sim"
                        render={({ field }) => {
                          return (
                            <TextField
                              {...field}
                              error={!!errors.sim}
                              helperText={errors.sim && errors.sim.message}
                              size="small"
                            />
                          );
                        }}
                        control={control}
                        defaultValue={driverLicense ? driverLicense[0] : ''}
                      />
                    </CardContent>
                  }
                />
              </Grid>
            )}
          </Grid>
        </Card>
      </Box>
    );
  },
);
