import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { translations } from 'locales/translations';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClubInformation, Document } from 'types';
import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import { Label } from 'app/components/Label';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  info?: ClubInformation;
  title: string;
  buttonName: string;
  filesUrls?: string[];
  filePaths?: string[];
  onSave: (documents: Document[]) => void;
  extra?: any;
  isHeader?: boolean;
}

export const ClubDocument = memo((props: Props) => {
  const { t, i18n } = useTranslation();

  const {
    info,
    title,
    buttonName,
    filesUrls,
    filePaths,
    onSave,
    extra,
    isHeader,
  } = props;

  const [files, setFiles] = useState<Document[]>(
    filesUrls
      ? filesUrls.map((item, index) => {
          return {
            url: item,
            uploadedUrl: filePaths ? filePaths[index] : '',
          };
        })
      : [],
  );

  useEffect(() => {
    setFiles(pre => {
      return filesUrls
        ? [
            ...filesUrls.map((item, index) => {
              return {
                url: item,
                uploadedUrl: filePaths ? filePaths[index] : '',
              };
            }),
          ]
        : pre;
    });
  }, [filesUrls, filePaths]);

  const handleRemove = (file: Document) => {
    setFiles(prev => {
      return prev.filter(item => item !== file);
    });
  };
  return (
    <Card sx={isHeader ? { mt: 0 } : { mt: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <Label>{title}</Label>
        <label htmlFor={title}>
          <IconButton component="span" children={<AddIcon />} />
        </label>
      </Grid>

      <Grid sx={{ mt: 3 }}>
        <TextField
          id={title}
          sx={{ display: 'none' }}
          type="file"
          onChange={(event: any) => {
            const fileAdded = event.target.files[0];
            setFiles(prev => {
              return [
                ...prev,
                {
                  name: fileAdded?.name,
                  url: URL.createObjectURL(event.target.files[0]),
                  file: fileAdded,
                  type: fileAdded.type,
                },
              ];
            });
          }}
        />
      </Grid>
      <Grid container spacing={1}>
        {files?.map(item => {
          if (!item.type || item?.type?.includes('image')) {
            return (
              <Grid item style={{ position: 'relative' }}>
                <img
                  src={item.url}
                  width={100}
                  height={100}
                  alt=""
                  style={{
                    backgroundImage: `url(${window.location.origin}/images/defaultCamera.png)`,
                    backgroundSize: '100% 100%',
                  }}
                />
                <CloseIcon
                  onClick={() => handleRemove(item)}
                  style={{
                    position: 'absolute',
                    right: 4,
                    top: 5,
                    fill: '#aaa',
                  }}
                />
              </Grid>
            );
          } else {
            return (
              <Grid item style={{ position: 'relative' }}>
                <img
                  src={`${window.location.origin}/images/defaultDocument.png`}
                  width={100}
                  height={100}
                  alt=""
                />
                <CloseIcon
                  onClick={() => handleRemove(item)}
                  style={{
                    position: 'absolute',
                    right: 4,
                    top: 5,
                    fill: '#aaa',
                  }}
                />
              </Grid>
            );
          }
        })}
      </Grid>
      <Grid container spacing={1} style={{ margin: 8 }}>
        {extra}
      </Grid>
      <Grid container justifyContent={'flex-end'}>
        <LoadingButton
          variant="contained"
          onClick={() => {
            onSave(files);
          }}
        >
          {buttonName}
        </LoadingButton>
      </Grid>
    </Card>
  );
});
