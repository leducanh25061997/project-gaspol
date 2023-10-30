/**
 *
 * Photos
 *
 */
import { memo } from 'react';
import {
  Grid,
  Typography,
  Card,
  TextField,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  IconButton,
  FormHelperText,
  Icon,
  Stack,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface Props {
  images: any;
  setImages: (value: any) => void;
}

export const MemberDocumentForm = memo(({ images, setImages }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Box>
      <Card>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <CardActionArea>
              <Controller
                name="profilePicture"
                render={({ field }) => {
                  return (
                    <TextField
                      id="profile-upload"
                      sx={{ display: 'none' }}
                      {...field}
                      type="file"
                      inputProps={{ accept: 'image/*' }}
                      onChange={(event: any) => {
                        if (event.target.files.length !== 0) {
                          const newData = { ...images };
                          newData.profilePicture.url = URL.createObjectURL(
                            event.target.files[0],
                          );
                          newData.profilePicture.file = event.target.files[0];
                          newData.profilePicture.name = 'profilePicture';
                          newData.profilePicture.nameFile =
                            event.target.files[0].name;
                          setImages(newData);
                          field.onChange(event);
                        }
                      }}
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
              <label htmlFor="profile-upload">
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton
                    sx={{
                      position: 'relative',
                      top: 40,
                      bgcolor: 'white',
                    }}
                    component="span"
                    children={
                      images?.profilePicture?.url ? <CameraAltIcon /> : <div />
                    }
                  />
                </Stack>
              </label>
              <label
                htmlFor={
                  !images?.profilePicture?.url ? 'profile-upload' : undefined
                }
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="160"
                  image={
                    images?.profilePicture?.url
                      ? images?.profilePicture?.url
                      : window.location.origin + '/images/defaultCamera.png'
                  }
                  sx={
                    images?.profilePicture?.url
                      ? {}
                      : { ':hover': { cursor: 'pointer' } }
                  }
                />
              </label>
              {errors?.profilePicture && (
                <FormHelperText sx={{ color: 'red' }}>
                  {errors?.profilePicture?.message}
                </FormHelperText>
              )}
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {`${t(translations.common.profilePicture)}*`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>

          <Grid item md={4}>
            <CardActionArea>
              <Controller
                name="nikPicture"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      id="ktp-image"
                      type="file"
                      inputProps={{ accept: 'image/*' }}
                      sx={{ display: 'none' }}
                      onChange={(event: any) => {
                        if (event.target.files.length !== 0) {
                          const newData = { ...images };
                          newData.nikPicture.url = URL.createObjectURL(
                            event.target.files[0],
                          );
                          field.onChange(event);
                          newData.nikPicture.name = 'nikPicture';
                          newData.nikPicture.file = event.target.files[0];
                          newData.nikPicture.nameFile =
                            event.target.files[0].name;

                          setImages(newData);
                        }
                      }}
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
              <label htmlFor="ktp-image">
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton
                    sx={{
                      position: 'relative',
                      top: 40,
                      bgcolor: 'white',
                    }}
                    component="span"
                    children={
                      images?.nikPicture?.url ? <CameraAltIcon /> : <div />
                    }
                  />
                </Stack>
              </label>
              <label
                htmlFor={!images?.nikPicture?.url ? 'ktp-image' : undefined}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="160"
                  image={
                    images?.nikPicture?.url
                      ? images?.nikPicture?.url
                      : window.location.origin + '/images/defaultCamera.png'
                  }
                  sx={
                    images?.nikPicture?.url
                      ? {}
                      : { ':hover': { cursor: 'pointer' } }
                  }
                />
              </label>
              {errors?.nikPicture && (
                <FormHelperText sx={{ color: 'red' }}>
                  {errors?.nikPicture?.message}
                </FormHelperText>
              )}

              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {`${t(translations.common.identificationPicture)}*`}
                </Typography>
                <Controller
                  name="nikNumber"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        size="small"
                        error={!!errors.nikNumber}
                        helperText={
                          errors.nikNumber ? errors.nikNumber.message : ''
                        }
                        onChange={(event: any) => {
                          field.onChange(event);
                        }}
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
              </CardContent>
            </CardActionArea>
          </Grid>
          <Grid item md={4}>
            <CardActionArea>
              <Controller
                name="simPicture"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      id="driver-license-image"
                      type="file"
                      inputProps={{ accept: 'image/*' }}
                      sx={{ display: 'none' }}
                      onChange={(event: any) => {
                        if (event.target.files.length !== 0) {
                          const newData = { ...images };
                          newData.simPicture.url = URL.createObjectURL(
                            event.target.files[0],
                          );
                          field.onChange(event);
                          newData.simPicture.name = 'simPicture';
                          newData.simPicture.file = event.target.files[0];
                          newData.simPicture.nameFile =
                            event.target.files[0].name;
                          setImages(newData);
                        }
                      }}
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
              <label htmlFor="driver-license-image">
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton
                    sx={{
                      position: 'relative',
                      top: 40,
                      bgcolor: 'white',
                    }}
                    component="span"
                    children={
                      images?.simPicture?.url ? <CameraAltIcon /> : <div />
                    }
                  />
                </Stack>
              </label>
              <label
                htmlFor={
                  !images?.simPicture?.url ? 'driver-license-image' : undefined
                }
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="160"
                  image={
                    images?.simPicture?.url
                      ? images?.simPicture?.url
                      : window.location.origin + '/images/defaultCamera.png'
                  }
                  sx={
                    images?.simPicture?.url
                      ? {}
                      : { ':hover': { cursor: 'pointer' } }
                  }
                />
              </label>
              {errors?.simPicture && (
                <FormHelperText>{errors?.simPicture?.message}</FormHelperText>
              )}
              <CardContent>
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
                        helperText={errors.sim ? errors.sim.message : ''}
                        size="small"
                        onChange={(event: any) => {
                          field.onChange(event);
                        }}
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
              </CardContent>
            </CardActionArea>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
});
