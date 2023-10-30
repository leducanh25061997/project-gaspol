import {
  TextField,
  FormHelperText,
  Typography,
  styled,
  FormControl,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { get, set } from 'lodash';
import { useEffect, useState } from 'react';
import { CustomEllipsisText } from 'app/components/CustomEllipsisText';

interface Props {
  images: any;
  errors: any;
  setImages: any;
  control: any;
  name: string;
  path: string;
  label: string;
  [prop: string]: any;
}

const CustomFileCard = styled('div')({
  padding: '17px',
  border: '0.5px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  height: '55px',
  marginBottom: '0.5rem',
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

export const FileCard = (props: Props) => {
  const { errors, images, setImages, control, name, path, label, rest } = props;
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

  const handleRemove = (event: any, field: any) => {
    const newData = { ...images };
    set(newData, `${path}.url`, '');
    set(newData, `${path}.file`, '');
    set(newData, `${path}.name`, '');
    set(newData, `${path}.nameFile`, '');
    setImages(newData);
    field.onChange(undefined);
  };

  return imageData && imageData?.url ? (
    <FormControl fullWidth sx={{ mt: '0rem' }}>
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              {...rest}
              label={label}
              type="text"
              value={imageData?.nameFile ? imageData?.nameFile : imageData?.url}
              InputProps={{
                endAdornment: (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={(e: any) => {
                      handleRemove(e, field);
                    }}
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
    <FileCardRoot>
      <CustomFileCard>
        <Controller
          name={name}
          render={({ field }) => {
            return (
              <TextField
                id={name}
                sx={{ display: 'none' }}
                {...field}
                {...rest}
                type="file"
                value={get(imageData, `${path}.url`)}
                // inputProps={{ accept: 'image/*' }}
                onChange={(e: any) => {
                  handleOnChange(e, field);
                }}
              />
            );
          }}
          control={control}
        />
        <label htmlFor={name}></label>
        <label htmlFor={!imageData?.url ? name : undefined}>
          {!imageData?.url && (
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
      {get(errors, path) ? (
        <FormHelperText sx={{ color: 'red' }}>
          {get(errors, `${path}.message`)}
        </FormHelperText>
      ) : (
        <div style={{ height: 23 }}></div>
      )}
    </FileCardRoot>
  );
};
