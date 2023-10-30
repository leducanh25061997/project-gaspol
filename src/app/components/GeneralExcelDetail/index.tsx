/**
 *
 * Photos
 *
 */
import { memo, useRef } from 'react';
import { Grid, Card, Box } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './Dropzone.css';

import { PromoterInformation } from 'types/PromoterManagement';

interface Props {
  info?: PromoterInformation;
}

export const GeneralExcelDetail = memo(({ info }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef<any>();

  const filesSelected = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const preventDefault = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragOver = (e: React.FormEvent<HTMLDivElement>) => {
    preventDefault(e);
  };

  const dragEnter = (e: React.FormEvent<HTMLDivElement>) => {
    preventDefault(e);
  };

  const dragLeave = (e: React.FormEvent<HTMLDivElement>) => {
    preventDefault(e);
  };

  const fileDrop = (e: React.FormEvent<HTMLDivElement>) => {
    preventDefault(e);
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  return (
    <Box mt={3}>
      <Card>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <div
              className="drop-container"
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}
              onClick={fileInputClicked}
            >
              <div className="drop-message">
                <div className="upload-icon"></div>
              </div>
              <input
                ref={fileInputRef}
                className="file-input"
                type="file"
                multiple
                onChange={filesSelected}
              />
            </div>
            <div className="drop-content"></div>
          </Grid>
          <Grid item md={6}>
            <div
              className="drop-container"
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}
              onClick={fileInputClicked}
            >
              <div className="drop-message">
                <div className="upload-icon"></div>
              </div>
              <input
                ref={fileInputRef}
                className="file-input"
                type="file"
                multiple
                onChange={filesSelected}
              />
            </div>
            <div className="drop-content"></div>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
});
