import {
  TextField,
  CardActionArea,
  CardMedia,
  IconButton,
  FormHelperText,
  Stack,
  Card,
  Button,
  styled,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { translations } from 'locales/translations';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { get, set } from 'lodash';

import { useEffect, useState } from 'react';

import club_icon from '../../../../../assets/images/club.svg';

interface Props {
  images: any;
  errors: any;
  setImages: any;
  control: any;
  name: string;
  path: string;
  label: string;
  extra?: any;
}

export const ImageCardRoot = styled('div')({
  display: 'flex',
  '& .club-picture': {
    height: '80px',
    width: '80px',
    borderRadius: '50%',
    background: '#E7E7E7',
    display: 'flex',
    '& img': {
      borderRadius: '50%',
      width: '100%',
      height: '100%',
    },
  },
  '& .button-upload': {
    objectFit: 'cover',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '170px',
    background: '#00AB55',
    borderRadius: '10px',
    color: '#FFFFFF',
    padding: '10px 13px',
    '& .title-upload': {
      marginLeft: '10px',
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 400,
    },
  },
});

export const ImageCard = (props: Props) => {
  const { errors, images, setImages, control, name, path, label, extra } =
    props;
  const { t } = useTranslation();
  const [imageData, setImageData] = useState(get(images, path));
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
    <ImageCardRoot>
      <div className="club-picture">
        <img src={imageData?.url || club_icon} />
      </div>
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
      <div style={{ marginLeft: 15 }}>
        <label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>
          <div className="button-upload">
            <div style={{ textAlign: 'center' }}>
              <Icon icon="ant-design:upload-outlined" width={20} height={20} />
            </div>
            <div className="title-upload">
              {`* ${t(translations.common.setClubPhoto)}`}
            </div>
          </div>
        </label>
        <div
          style={{
            fontWeight: 400,
            fontSize: '12px',
            color: '#777777',
            marginTop: 15,
          }}
        >
          {`* ${t(translations.clubManagementConfirm.clubProfile)}`}
        </div>
      </div>
      {get(errors, path) && (
        <FormHelperText sx={{ color: 'red' }}>
          {get(errors, `${path}.message`)}
        </FormHelperText>
      )}

      {/* {extra} */}
    </ImageCardRoot>
  );
};
