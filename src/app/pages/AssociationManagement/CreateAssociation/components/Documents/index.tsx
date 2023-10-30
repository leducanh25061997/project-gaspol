import { memo, useState } from 'react';
import {
  Grid,
  Card,
  TextField,
  FormControl,
  IconButton,
  styled,
  Stack,
  Box,
  Collapse,
} from '@mui/material';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

import AddIcon from '@mui/icons-material/Add';

import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { FileCard } from 'app/components/UploadFile';
import { UploadFiles } from 'app/components/UploadFiles';

interface Props {
  images: any;
  setImages: any;
}

interface documentType {
  name: string;
}
const AssignText = styled('div')({
  color: '#00AB55',
  marginLeft: '10px',
});

export const Documents = memo(({ images, setImages }: Props) => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(true);
  const [otherDocument, setOtherDocument] = useState<
    documentType[] | undefined
  >();
  const [checkDC, setCheckDC] = useState<boolean>(false);

  const handleRemove = (indexFile: number) => {
    const newData = { ...images };
    if (newData.additionalDocuments.length > 1) {
      newData.additionalDocuments.splice(indexFile, 1);
    } else {
      newData.additionalDocuments.map((item: any) => {
        item.url = '';
        return item;
      });
    }
    setImages(newData);
    // field.onChange(event);
  };

  const handleOnChange = (event: any, field: any, indexFile: number) => {
    if (event.target.files.length !== 0) {
      const newData = { ...images };
      if (indexFile > 0) {
        newData.additionalDocuments.map((item: any, i: number) => {
          if (i > 0 && i === indexFile) {
            item.url = URL.createObjectURL(event.target.files[0]);
            item.file = event.target.files[0];
            item.name = 'additionalDocuments';
            item.nameFile = event.target.files[0].name;
          }
          return item;
        });
      } else {
        newData.additionalDocuments.map((item: any, i: number) => {
          if (i === 0) {
            item.url = URL.createObjectURL(event.target.files[0]);
            item.file = event.target.files[0];
            item.name = 'additionalDocuments';
            item.nameFile = event.target.files[0].name;
          }
          return item;
        });
      }
      setImages(newData);
      field.onChange(event);
    }
  };

  const addDocument = () => {
    setImages({
      ...images,
      additionalDocuments: [
        ...images.additionalDocuments,
        {
          file: null,
          url: '',
          name: '',
          nameFile: '',
        },
      ],
    });
    setCheckDC(!checkDC);
  };

  return (
    <Card sx={{ mt: 3, padding: '1rem' }}>
      <Stack
        onClick={() => setCollapse(!collapse)}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            fontWeight: 700,
            fontSize: '18px',
            color: '#777777',
          }}
        >
          {t(translations.clubAssociationInformation.documents)}
        </Box>
        {collapse ? (
          <ArrowDropDown sx={{ color: '#777777', marginLeft: 2 }} />
        ) : (
          <ArrowRight sx={{ color: '#777777', marginLeft: 2 }} />
        )}
      </Stack>
      <Collapse in={collapse} timeout="auto" unmountOnExit>
        <Grid container spacing={2} sx={{ marginTop: '0' }}>
          <Grid item xs={12} md={6}>
            <Stack>
              <FileCard
                errors={errors}
                images={images}
                setImages={setImages}
                name="artDocuments"
                path="artDocuments"
                control={control}
                label={`${t(
                  translations.clubAssociationInformation.adArtDocument,
                )}*`}
              />
            </Stack>
            <Stack sx={{ mt: 1 }}>
              <UploadFiles
                errors={errors}
                index={0}
                image={images.additionalDocuments[0]}
                images={images}
                setImages={setImages}
                name={'additionalDocuments0'}
                path={'additionalDocuments0'}
                control={control}
                handleOnChange={handleOnChange}
                handleRemove={handleRemove}
                label={`${t(
                  translations.clubManagementConfirm.otherDocuments,
                )}`}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <FileCard
                errors={errors}
                images={images}
                setImages={setImages}
                name="certDocuments"
                path="certDocuments"
                control={control}
                label={`${t(
                  translations.clubAssociationInformation.certDocument,
                )}`}
              />
            </Stack>
            <FormControl fullWidth sx={{ marginTop: '0.5rem!important' }}>
              <Controller
                name="certNumber"
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!errors?.certNumber}
                      helperText={errors?.certNumber?.message}
                      label={`${t(
                        translations.clubAssociationInformation
                          .certDocumentNumber,
                      )}`}
                      type="text"
                      onChange={(e: any) => {
                        field.onChange(e);
                      }}
                    />
                  );
                }}
                control={control}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {images.additionalDocuments &&
            images.additionalDocuments.length >= 0 &&
            images.additionalDocuments.map(
              (res: any, index: number) =>
                index > 0 && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={index > 2 ? { mt: 2 } : { mt: 0 }}
                  >
                    <Stack key={index}>
                      <UploadFiles
                        errors={errors}
                        index={index}
                        image={res}
                        images={images}
                        setImages={setImages}
                        name={'additionalDocuments' + `${index}`}
                        path={'additionalDocuments' + `${index}`}
                        handleOnChange={handleOnChange}
                        handleRemove={handleRemove}
                        control={control}
                        label={`${t(
                          translations.clubManagementConfirm.otherDocuments,
                        )}`}
                      />
                    </Stack>
                  </Grid>
                ),
            )}
        </Grid>
        <Grid
          sx={
            images && images.additionalDocuments.length > 1
              ? { display: 'flex', mt: 2 }
              : { display: 'flex', mt: 2 }
          }
          mb={2}
        >
          <IconButton
            component="span"
            children={<AddIcon />}
            sx={{ borderRadius: '50%', border: '1px solid', padding: 0 }}
            onClick={addDocument}
          />
          <AssignText>
            {t(translations.clubAssociationInformation.addMoreDocument)}
          </AssignText>
        </Grid>
      </Collapse>
    </Card>
  );
});
