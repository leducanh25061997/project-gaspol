/* eslint-disable no-nested-ternary */
import {
  TextField,
  CardActionArea,
  CardMedia,
  IconButton,
  FormHelperText,
  Stack,
  Card,
  CircularProgress,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { get, set } from 'lodash';
import { useEffect, useState } from 'react';
import { translations } from 'locales/translations';

import PreviewImage from '../PreviewImage';

interface Props {
  images: any;
  errors: any;
  setImages: any;
  control: any;
  name: string;
  path: string;
  label: string;
  extra?: any;
  loading?: boolean;
}

export const ImageCard = (props: Props) => {
  const {
    errors,
    images,
    setImages,
    control,
    name,
    path,
    label,
    extra,
    loading,
  } = props;
  const { t } = useTranslation();
  const [imageData, setImageData] = useState(get(images, path));
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [img, setImg] = useState<any>('');

  useEffect(() => {
    setImageData(get(images, path));
  }, [images]);

  const handleOnChange = (event: any, field: any) => {
    if (event.target.files.length !== 0) {
      const newData = { ...images };
      set(newData, `${path}.url`, URL.createObjectURL(event.target.files[0]));
      set(newData, `${path}.file`, event.target.files[0]);
      set(newData, `${path}.name`, name);
      set(newData, `${path}.nameFile`, event.target.files[0].name);
      setImages(newData);
      field.onChange(event);
    }
  };
  return (
    <div>
      <Card>
        <Controller
          name={name}
          render={({ field }) => {
            return (
              <TextField
                id={name}
                sx={{ display: 'none' }}
                {...field}
                type="file"
                value={get(imageData, `${path}.url`)}
                inputProps={{ accept: 'image/*' }}
                onChange={(e: any) => {
                  handleOnChange(e, field);
                }}
              />
            );
          }}
          control={control}
        />
        <label htmlFor={name}>
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
                bgcolor: 'white',
              }}
              component="span"
              children={imageData?.url ? <CameraAltIcon /> : <div />}
            />
          </Stack>
        </label>
        <label htmlFor={!imageData?.url ? name : undefined}>
          {loading ? (
            <Stack
              sx={{
                height: '150px',
              }}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <CircularProgress />
            </Stack>
          ) : !imageData?.url ? (
            <div
              style={{
                height: '150px',
                objectFit: 'cover',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {imageData?.url ? (
                <img
                  style={{ margin: 'auto', paddingTop: '30px', width: '50px' }}
                  src={imageData?.url}
                />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Icon
                    icon="ant-design:upload-outlined"
                    width={20}
                    height={20}
                  />
                </div>
              )}
              <div
                style={
                  imageData?.url
                    ? { display: 'none' }
                    : {
                        marginTop: '10px',
                        textAlign: 'center',
                        color: '#637381',
                      }
                }
              >
                {t(translations.common.uploadHere)}
              </div>
            </div>
          ) : (
            <CardMedia
              onClick={() => {
                setImg(imageData?.url);
                setOpenPreview(true);
              }}
              component="img"
              alt="green iguana"
              height="160"
              image={imageData?.url}
              sx={
                imageData?.url
                  ? { marginTop: '-40px' }
                  : { ':hover': { cursor: 'pointer', marginTop: '-40px' } }
              }
            />
          )}
        </label>
        {get(errors, path) && (
          <FormHelperText sx={{ color: 'red' }}>
            {get(errors, `${path}.message`)}
          </FormHelperText>
        )}
        <PreviewImage open={openPreview} setOpen={setOpenPreview} img={img} />
      </Card>
      {extra}
    </div>
  );
};
