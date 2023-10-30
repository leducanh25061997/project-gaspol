import {
  TextField,
  FormHelperText,
  Typography,
  styled,
  FormControl,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { get, set } from 'lodash';
import { useEffect, useState, memo } from 'react';
import { CustomEllipsisText } from 'app/components/CustomEllipsisText';
interface Props {
  images: any;
  errors?: any;
  setImages: any;
  control: any;
  name: string;
  path: string;
  label: string;
  image: any;
  index: number;
  handleOnChange?: (event: any, field: any, indexFile: number) => void;
  handleRemove?: (indexFile: number) => void;
}

const CustomFileCard = styled('div')({
  padding: '17px',
  border: '0.5px solid rgba(0, 0, 0, 0.2)',
  height: '55px',
  marginBottom: '0.5rem',
  borderRadius: '10px',
  '& .MuiTypography-root': {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

const FileCardRoot = styled('div')({
  '& .MuiFormHelperText-root': {
    marginLeft: '14px',
    color: 'rgba(168, 70, 0, 1)',
  },
});

export const UploadFiles = (props: Props) => {
  const {
    errors,
    images,
    setImages,
    control,
    name,
    path,
    label,
    image,
    index,
    handleOnChange,
    handleRemove,
  } = props;

  return image && image?.url ? (
    <FormControl fullWidth sx={{ mt: '0rem' }}>
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label={label}
              type="text"
              value={image?.nameFile ? image?.nameFile : image?.url}
              InputProps={{
                endAdornment: (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={
                      handleRemove ? () => handleRemove(index) : () => null
                    }
                  >
                    <img
                      style={{ width: '16px' }}
                      src={window.location.origin + '/images/delete.svg'}
                    />
                  </span>
                ),
              }}
            />
          );
        }}
      />
    </FormControl>
  ) : (
    <FileCardRoot key={index}>
      <CustomFileCard>
        <Controller
          name={name}
          render={({ field }) => {
            return (
              <TextField
                id={name}
                sx={{ display: 'none' }}
                {...field}
                type="file"
                value={''}
                // inputProps={{ accept: 'image/*' }}
                onChange={(e: any) => {
                  handleOnChange && handleOnChange(e, field, index);
                }}
              />
            );
          }}
          control={control}
        />
        <label htmlFor={name}></label>
        <label htmlFor={image && !image.url ? name : undefined}>
          {image && !image?.url && (
            <div
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{label}</Typography>
              <img
                style={{ width: '16px' }}
                src={window.location.origin + '/images/upload_file.svg'}
              />
            </div>
          )}
        </label>
      </CustomFileCard>
    </FileCardRoot>
  );
};
