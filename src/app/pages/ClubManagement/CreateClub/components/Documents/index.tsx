import { memo, useEffect, useState, useMemo } from 'react';
import {
  Grid,
  Card,
  Stack,
  TextField,
  styled,
  IconButton,
  Button,
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddIcon from '@mui/icons-material/Add';
import { ClubInformation } from 'types';
import { translations } from 'locales/translations';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import NestedList from 'app/components/Collapse';
import { FileCard } from 'app/components/UploadFile';
import { UploadFiles } from 'app/components/UploadFiles';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  images: any;
  setImages: any;
}

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
    '& .Mui-disabled': {
      background: '#E8E8E8',
      borderRadius: '10px',
    },
    '& .MuiInputLabel-root': {
      background: '#FFFFFF',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(168, 70, 0, 1) !important',
  },
});

const CustomButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  padding: '6px 12px',
  lineHeight: '20px',
  backgroundColor: '#FFFFFF',
  borderColor: '#0063cc',
  color: '#838383',
  '&:hover': {
    backgroundColor: '#FFFFFF',
    border: 'none',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#FFFFFF',
    border: 'none',
  },
  '&:focus': {
    border: 'none',
  },
});

interface documentType {
  file: string | null;
  url: string | '';
  name: string | '';
  nameFile: string | '';
}

export const Documents = ({ images, setImages }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);
  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };
  const [formValues, setFormValues] = useState({
    certNumber: '',
  });

  const convertsAdditionalDocuments = (documents: any[]) => {
    if (documents && documents.length > 0) {
      const array: any[] = [];
      for (let i = 0; i < documents.length; i++) {
        array.push(
          documents.reduce((acc, val) => {
            acc['file'] = null;
            acc['url'] = val;
            acc['name'] = '';
            acc['nameFile'] = '';
            return acc;
          }, {}),
        );
      }
      return array;
    } else {
      return [];
    }
  };

  const handleAddMoreDocument = () => {
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

  useEffect(() => {
    if (
      (errors.artDocuments || errors.certNumber || errors.certDocuments) &&
      !openCollapse
    ) {
      setOpenCollapse(true);
    }
  }, [errors]);

  return (
    <Card sx={{ marginTop: 3 }}>
      <NestedList
        openCollapse={openCollapse}
        handleOpenCollapse={handleOpenCollapse}
        title={`${t(translations.common.documents)}`}
        description={
          <Grid container spacing={2} mt={1}>
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
                    translations.clubManagementConfirm.aDARTDocument,
                  )}*`}
                />
              </Stack>
              <Stack sx={{ mt: 2 }}>
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
                    translations.clubManagementConfirm.certificateDocument,
                  )}`}
                />
              </Stack>
              <Stack sx={{ mt: 2 }}>
                <Controller
                  control={control}
                  name="certNumber"
                  render={({ field }) => (
                    <RenderInput>
                      <TextField
                        {...field}
                        label={`${t(
                          translations.clubManagementConfirm
                            .certificateDocumentNumber,
                        )}`}
                        value={formValues?.certNumber}
                        error={!!errors?.certNumber}
                        helperText={errors?.certNumber?.message}
                        onChange={(e: any) => {
                          setFormValues({
                            ...formValues,
                            certNumber: e.target.value,
                          });
                          field.onChange(e);
                        }}
                      />
                    </RenderInput>
                  )}
                />
              </Stack>
            </Grid>
            {images.additionalDocuments &&
              images.additionalDocuments.length > 0 &&
              images.additionalDocuments.map(
                (item: documentType, index: number) => {
                  if (index > 0) {
                    return (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={
                          (index > 0 && index === 1) || index === 2
                            ? { mt: -2 }
                            : { mt: 2 }
                        }
                      >
                        <Stack key={index}>
                          <UploadFiles
                            errors={errors}
                            index={index}
                            image={item}
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
                    );
                  }
                },
              )}
            <Grid item xs={12} md={12} mt={1}>
              <CustomButton
                startIcon={<ControlPointIcon />}
                onClick={handleAddMoreDocument}
              >
                Add More Document
              </CustomButton>
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
};
