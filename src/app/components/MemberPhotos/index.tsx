/**
 *
 * Photos
 *
 */
import React, { memo, useState } from 'react';
import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  CardActionArea,
  CircularProgress,
  Stack,
} from '@mui/material';
import { IndividualInformation } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { useSelector } from 'react-redux';

import { selectMemberInformation } from 'app/pages/MemberManagement/MemberInformation/slice/selectors';

import PreviewImage from '../PreviewImage';

interface Props {
  info?: IndividualInformation;
}

export const MemberPhotos = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [img, setImg] = useState<any>('');
  const { loading } = useSelector(selectMemberInformation);
  const imagePlaceholderUrl =
    'https://via.placeholder.com/300x300.png?text=No+Image';

  return (
    <Box
      sx={{
        marginTop: '1rem',
      }}
    >
      <Card>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <CardActionArea
              sx={{
                borderRadius: '8px',
                cursor: 'default',
                '&:hover': {
                  background: '#fff',
                },
                padding: '8px',
              }}
            >
              {loading ? (
                <Stack
                  sx={{
                    height: '160px',
                    borderRadius: '8px',
                    boxShadow:
                      'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
                  }}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <CircularProgress />
                </Stack>
              ) : (
                <CardMedia
                  onClick={() => {
                    setImg(
                      info?.profilePictureLink ||
                        info?.profilePicture ||
                        imagePlaceholderUrl,
                    );
                    setOpenPreview(true);
                  }}
                  component="img"
                  alt={t(translations.common.profilePicture)}
                  height="160"
                  image={
                    info?.profilePictureLink ||
                    info?.profilePicture ||
                    imagePlaceholderUrl
                  }
                  sx={{ borderRadius: '10px', objectFit: 'contain' }}
                />
              )}
              <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Typography
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {t(translations.common.profilePicture)}*
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>

          <Grid item md={4}>
            <CardActionArea
              sx={{
                borderRadius: '8px',
                cursor: 'default',
                padding: '8px',
              }}
            >
              {loading ? (
                <Stack
                  sx={{
                    height: '160px',
                    borderRadius: '8px',
                    boxShadow:
                      'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
                  }}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <CircularProgress />
                </Stack>
              ) : (
                <CardMedia
                  onClick={() => {
                    setImg(
                      info?.nikPictureLink ||
                        (info?.documents?.length && info?.documents[0]) ||
                        imagePlaceholderUrl,
                    );
                    setOpenPreview(true);
                  }}
                  component="img"
                  alt={t(translations.common.nikPicture)}
                  height="160"
                  image={
                    info?.nikPictureLink ||
                    (info?.documents?.length && info?.documents[0]) ||
                    imagePlaceholderUrl
                  }
                  sx={{ borderRadius: '10px', objectFit: 'contain' }}
                />
              )}
              <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Typography
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {t(translations.common.nikPicture)}*
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  {info?.nikNumber}
                </Typography> */}
              </CardContent>
            </CardActionArea>
          </Grid>
          {info?.simCarPicture && (
            <Grid item md={4}>
              <CardActionArea
                sx={{
                  borderRadius: '8px',
                  cursor: 'default',
                }}
              >
                {loading ? (
                  <Stack
                    sx={{
                      height: '160px',
                      borderRadius: '8px',
                      boxShadow:
                        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
                    }}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <CircularProgress />
                  </Stack>
                ) : (
                  <CardMedia
                    component="img"
                    alt={t(translations.common.simPicture)}
                    height="160"
                    image={info?.simCarPicture || imagePlaceholderUrl}
                  />
                )}
                <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
                    {t(translations.common.simPicture)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {info?.simCar}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Grid>
          )}
        </Grid>
      </Card>
      <PreviewImage open={openPreview} setOpen={setOpenPreview} img={img} />
    </Box>
  );
});
