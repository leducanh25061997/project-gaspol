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
import NumberFormat from 'react-number-format';

import NestedList from 'app/components/Collapse';
import { FileCard } from 'app/components/UploadFile';
import { UploadFiles } from 'app/components/UploadFiles';

interface Props {
  info?: ClubInformation;
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
  name: string;
}

export const Documents = memo(({ info, images, setImages }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const [formValues, setFormValues] = useState({
    certNumber: '',
  });
  const [otherDocument, setOtherDocument] = useState<
    documentType[] | undefined
  >();
  const [openCollapse, setOpenCollapse] = useState<boolean>(true);
  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      certNumber: info?.certNumber || '',
    });
    // const newAdditionalDocuments = convertsAdditionalDocuments(
    //   info?.additionalDocuments || [],
    //   info?.additionalDocumentsKeyS3 || [],
    // );
    // setImages({
    //   ...images,
    //   artDocuments: {
    //     file: null,
    //     url:
    //       info?.artDocuments && info?.artDocuments.length > 0
    //         ? info?.artDocuments[0]
    //         : '',
    //     name: '',
    //     nameFile: '',
    //   },
    //   certDocuments: {
    //     file: null,
    //     url:
    //       info?.certDocuments && info?.certDocuments.length > 0
    //         ? info?.certDocuments[0]
    //         : '',
    //     name: '',
    //     nameFile: '',
    //   },
    //   additionalDocuments: newAdditionalDocuments,
    // });
    setValue('certNumber', info?.certNumber || '');
    setValue(
      'artDocuments',
      (info?.artDocuments &&
        info?.artDocuments.length > 0 &&
        info?.artDocuments[0]) ||
        '',
    );
    setValue(
      'certDocuments',
      (info?.certDocuments &&
        info?.certDocuments.length > 0 &&
        info?.certDocuments[0]) ||
        '',
    );
    setValue('additionalDocumentsKeyS3', info?.additionalDocumentsKeyS3 || '');
    setValue('artDocumentsKeyS3', info?.artDocumentsKeyS3 || '');
    setValue('certDocumentsKeyS3', info?.certDocumentsKeyS3 || '');
    setValue('additionalDocuments', info?.additionalDocuments || '');
    setValue('clubPrivacy', info?.clubPrivacy || '');
  }, [info]);

  // const convertsAdditionalDocuments = (
  //   documents: any[],
  //   additionalDocumentsKeyS3: any[],
  // ) => {
  //   if (documents && documents.length > 0) {
  //     const array: any[] = [];
  //     for (let i = 0; i < documents.length; i++) {
  //       array.push(
  //         documents.reduce((acc, val) => {
  //           acc['file'] = null;
  //           acc['url'] = val;
  //           acc['name'] = '';
  //           acc['nameFile'] = '';
  //           acc['key'] = additionalDocumentsKeyS3[i];
  //           return acc;
  //         }, {}),
  //       );
  //     }
  //     return array;
  //   } else {
  //     return [];
  //   }
  // };

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
        item.key = '';
        return item;
      });
    }
    setImages(newData);
  };

  return (
    <Card sx={{ marginTop: 3 }}>
      <NestedList
        title={`${t(translations.common.documents)}`}
        openCollapse={openCollapse}
        handleOpenCollapse={handleOpenCollapse}
        description={
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={6}>
              <Stack>
                <FileCard
                  required
                  errors={errors}
                  images={images}
                  setImages={setImages}
                  name="artDocuments"
                  path="artDocuments"
                  control={control}
                  label={`${t(
                    translations.clubManagementConfirm.aDARTDocument,
                  )}`}
                />
              </Stack>
              <Stack mt={1}>
                {images.additionalDocuments &&
                  images.additionalDocuments.length > 0 && (
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
                  )}
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
              <Stack sx={{ mt: 1 }}>
                <Controller
                  control={control}
                  name="certNumber"
                  render={({ field }) => (
                    <RenderInput>
                      <NumberFormat
                        type="text"
                        label={`${t(
                          translations.clubManagementConfirm
                            .certificateDocumentNumber,
                        )}`}
                        customInput={TextField}
                        value={formValues?.certNumber}
                        onChange={event => {
                          field.onChange(event);
                          setFormValues({
                            ...formValues,
                            certNumber: event.target.value,
                          });
                        }}
                        error={!!errors?.certNumber}
                        helperText={errors?.certNumber?.message}
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
});
