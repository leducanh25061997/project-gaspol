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
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';
import { IndividualInformation } from 'types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { ClaimList } from 'types/ClaimList';
import PreviewImage from 'app/components/PreviewImage';
import { useSelector } from 'react-redux';

import { selectClaimDetail } from '../../slice/selectors';

interface Props {
  info?: ClaimList;
}

export const ClaimPhotos = memo((props: Props) => {
  const { info } = props;
  const { t } = useTranslation();
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [img, setImg] = useState<any>('');
  const { loading } = useSelector(selectClaimDetail);
  const imagePlaceholderUrl =
    'https://via.placeholder.com/300x300.png?text=No+Image';

  return (
    <Box
      sx={{
        marginTop: '24px',
      }}
    >
      <Card>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <CardActionArea
              sx={{
                borderRadius: '8px',
                objectFit: 'contain',
              }}
            >
              <CardMedia
                onClick={() => {
                  setImg(info?.ktaPicture);
                  setOpenPreview(true);
                }}
                component="img"
                alt={t(translations.common.oldKTACardPicture)}
                height="160"
                image={info?.ktaPicture || imagePlaceholderUrl}
                sx={{ borderRadius: '10px', objectFit: 'contain' }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {t(translations.common.oldKTACardPicture)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>

          <Grid item md={4}>
            <CardActionArea
              sx={{
                borderRadius: '8px',
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
                    setImg(info?.nikPicture);
                    setOpenPreview(true);
                  }}
                  component="img"
                  alt={t(translations.common.nikPicture)}
                  height="160"
                  image={info?.nikPicture || imagePlaceholderUrl}
                  sx={{ borderRadius: '10px', objectFit: 'contain' }}
                />
              )}
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {t(translations.common.nikPicture)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>
        </Grid>
      </Card>
      <PreviewImage open={openPreview} setOpen={setOpenPreview} img={img} />
    </Box>
  );
});
