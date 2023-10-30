/**
 *
 * CreateAssociation
 *
 */
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Grid,
  Container,
  Typography,
  Checkbox,
  Box,
  styled,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, Controller, FieldError } from 'react-hook-form';
import { Key, KV, Row } from 'app/components/KeyValue';
import { CreateDialog } from 'app/components/CreateDialog/index';
import { IndividualRequest, Province, Transaction } from 'types';
import moment from 'moment';
import { translations } from 'locales/translations';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';

import {
  addressRegex,
  lettersAndSpaceRegex,
  numberRegex,
} from 'utils/helpers/regex';

import { omit } from 'lodash';

import { MainContent } from 'app/components/HOC/WithTitle';
import { ApprovalDialog } from 'app/components/ApprovalDialog';
import { CreateAssociationRequest_taaAssociation_Members } from 'types/AssociationManagement';

import Page from '../../../components/Page';

import { AssociationInformation } from './components/AssociationInformation';
import { AssociationLocation } from './components/AssociationLocation';
import { Footer } from './components/Footer';
import { selectAssociation } from './slice/selectors';
import { useEditAssociationSlice } from './slice';
import { Header } from './components/Header/index';
import { BankInformation } from './components/BankInformation';
import { AssociationManagement } from './components/AssociationManagement';
import { Documents } from './components/Documents';
import { AssociationMembershipInfo } from './components/AssociationMembershipInfo';
import { AddClub } from './components/AddClub';

interface Props {}

export const RootStyle = styled('div')({
  '& .MuiInputLabel-root.Mui-error': {
    color: '#9D9D9D',
  },
  '& .MuiFormHelperText-root': {
    color: '#A84600',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: '#A84600',
  },
  '& .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: '#9D9D9D',
  },
  '& .MuiFormControl-root': {
    marginTop: 0,
    height: '87px',
  },
  '& #packageStatus': {
    background: '#E8E8E8',
    borderRadius: '8px',
  },
  '& #packageName': {
    background: '#E8E8E8',
    borderRadius: '8px',
  },
  '& #memberStatus': {
    background: '#E8E8E8',
    borderRadius: '8px',
  },
  '& #phoneNumber': {
    background: '#E8E8E8',
    borderRadius: '8px',
  },
});

export const EditAssociation = memo((props: Props, { control }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isApprove, setIsApprove] = useState<boolean | undefined>(false);
  const [formData, setFormData] = useState<any>({});
  const [fileData, setFileData] = useState<any | undefined>();
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const fetchFormData = useSelector(selectAssociation);
  const { isLoading } = fetchFormData;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const { actions } = useEditAssociationSlice();
  const handleSubmitForm = (data: any) => {
    setFormData(data);
    setIsApprove(true);
  };

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [numberIsUnique, setNumberUnique] = React.useState<
    FieldError | undefined
  >();
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [isBan, setIsBan] = useState<boolean>(true);
  const [clubsInfo, setClubs] = useState<any[]>([]);

  const validateForm = yup.object().shape({
    associationName: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField)),
    associationCode: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField)),
    expireDate: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .nullable(),
    contentPreference: yup
      .array()
      .required(t(translations.createClubError.pleaseEnterRequiredFields)),
    associationCategory: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields)),
    description: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .max(500, t(translations.createNewMemberPage.fullNameMaxCharacter)),
    bankHolderName: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .matches(
        lettersAndSpaceRegex,
        t(translations.createClubError.bankHolderCharacter),
      ),
    bankNumber: yup
      .string()
      .matches(numberRegex, t(translations.createClubError.numberError))
      .required(t(translations.clubAssociationInformation.commonRequiredField))
      .max(16, t(translations.createClubError.bankNumberCharacter)),
    bankName: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .matches(
        lettersAndSpaceRegex,
        t(translations.createClubError.bankHolderCharacter),
      )
      .max(255, t(translations.createClubError.maxBankHolderNameCharacter)),
    associationAdmin: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.createClubError.pleaseEnterRequiredFields))
            .nullable()
        : yup
            .object()
            .required(t(translations.createClubError.pleaseEnterRequiredFields))
            .nullable(),
    ),
    president: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.createClubError.pleaseEnterRequiredFields))
            .nullable()
        : yup
            .object()
            .required(t(translations.createClubError.pleaseEnterRequiredFields))
            .nullable(),
    ),
    secretary: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.createClubError.pleaseEnterRequiredFields))
            .nullable()
        : yup
            .object()
            .required(t(translations.createClubError.pleaseEnterRequiredFields))
            .nullable(),
    ),
    finance: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.createClubError.pleaseEnterRequiredFields))
            .nullable()
        : yup
            .object()
            .required(t(translations.createClubError.pleaseEnterRequiredFields))
            .nullable(),
    ),
    address: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .max(255, t(translations.createNewMemberPage.addressMax)),
    city: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    district: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    ward: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    rtRwNumber: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    artDocuments: yup.lazy(value =>
      typeof value === 'string'
        ? yup
            .string()
            .required(t(translations.createClubError.pleaseEnterRequiredFields))
            .nullable()
        : yup
            .array()
            .required(t(translations.createClubError.pleaseEnterRequiredFields))
            .nullable(),
    ),
  });

  const [associationMng, setAssociationMng] = useState<
    CreateAssociationRequest_taaAssociation_Members[]
  >([]);

  const [images, setImages] = useState({
    associationPicture: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    artDocuments: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    additionalDocuments: [
      {
        file: null,
        url: '',
        name: '',
        nameFile: '',
      },
    ],
    certDocuments: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
  });

  const methods = useForm<IndividualRequest>({
    defaultValues: { imiPaid: false, city: '', district: '', ward: '' },
    resolver: yupResolver(validateForm),
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    const idAssociation = id;
    dispatch(actions.fetchProvinceRequests());
    dispatch(actions.packagesRequest());
    dispatch(actions.fetchCategories());
    dispatch(actions.fetchBank());
    dispatch(actions.fetchAssociationInformation(id));
    dispatch(
      actions.fetchClubAssociationInformation({
        size: 20,
        page: 0,
        id: idAssociation,
      }),
    );
  }, []);

  const onSubmit = (inputData: any) => {
    const formInputs = omit(inputData);
    formInputs.fullName = inputData.fullName?.trim();
    formInputs.address = inputData.address?.trim();
    setFormData(formInputs);
    setOpenConfirmModal(true);
  };

  useEffect(() => {
    if (formData && fileData && isApprove) {
      const newFileNames: string[] = [];
      if (images.associationPicture.nameFile) {
        newFileNames.push(images.associationPicture.nameFile);
      }
      if (images.artDocuments.nameFile) {
        newFileNames.push(images.artDocuments.nameFile);
      }
      if (
        images.certDocuments.nameFile &&
        images.certDocuments.nameFile !== ''
      ) {
        newFileNames.push(images.certDocuments.nameFile);
      }
      if (images.additionalDocuments.length > 0) {
        images.additionalDocuments.map((item: any) => {
          if (item.nameFile && item.nameFile !== '')
            newFileNames.push(item.nameFile);
        });
      }
      const contentPre: any[] = [];
      formData?.contentPreference.map((res: any) => {
        const newContentPre = fetchFormData?.clubCategories?.find(
          (value: any) => value.name === res,
        )?.id;
        contentPre.push(newContentPre);
      });
      const idAssociation = id;
      dispatch(
        actions.editAssociationRequest({
          id: idAssociation,
          formRequest: {
            ...formData,
            provinceId: fetchFormData?.provinceRequests?.find(
              (value: any) => value.name === formData?.provinceName,
            )?.id,
            cityId: fetchFormData?.city?.find(
              (value: any) => value.name === formData?.city,
            )?.id,
            districtId: fetchFormData?.district?.find(
              (value: any) => value.name === formData?.district,
            )?.id,
            wardId: fetchFormData?.ward?.find(
              (value: any) => value.name === formData?.ward,
            )?.id,
            bankId: fetchFormData?.banks?.find(
              (value: any) => value.name === formData?.bankId,
            )?.id,
            contentPreference: contentPre,
            members: associationMng,
            clubs: clubsInfo,
          },
          files: {
            fileNames: newFileNames,
          },
          packageId:
            (fetchFormData?.packagesRequest &&
              fetchFormData?.packagesRequest?.id) ||
            '',
          images,
          additionalDocumentsKeyS3:
            fetchFormData?.associationInformation?.additionalDocumentsKeyS3 ||
            [],
          artDocumentsKeyS3:
            fetchFormData?.associationInformation?.artDocumentsKeyS3 || [],
          certDocumentsKeyS3:
            fetchFormData?.associationInformation?.certDocumentsKeyS3 || [],
          navigate,
        }),
      );
      setIsApprove(false);
      setLoading(false);
    }
  }, [isApprove]);

  useEffect(() => {
    if (!isLoading) {
      setOpenConfirmModal(false);
    }
  }, [isLoading]);

  return (
    <Page title={t(translations.sidebar.createMember)}>
      <MainContent>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <Header />
            <RootStyle>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <AssociationMembershipInfo
                    info={fetchFormData.associationInformation}
                  />
                  <AssociationInformation
                    info={fetchFormData.associationInformation}
                    images={images}
                    setImages={setImages}
                  />
                  <BankInformation
                    info={fetchFormData.associationInformation}
                  />
                  <AssociationLocation
                    info={fetchFormData.associationInformation}
                  />
                  <AssociationManagement
                    info={fetchFormData.associationInformation}
                    setAssociationMng={setAssociationMng}
                    associationMng={associationMng}
                  />
                  <Documents
                    info={fetchFormData.associationInformation}
                    images={images}
                    setImages={setImages}
                  />
                  <AddClub setClubs={setClubs} clubs={clubsInfo} id={id} />
                  <Footer
                    isBan={isBan}
                    handleUnban={() => setOpenConfirmDialog(true)}
                    handleBan={() => setOpenConfirmDialog(true)}
                    handleCancel={() =>
                      navigate(`/associations/club-associations/${id}`)
                    }
                    handleSubmit={methods.handleSubmit(onSubmit)}
                  />
                </form>
              </FormProvider>
            </RootStyle>
            <ApprovalDialog
              title={t(translations.common.confirmation)}
              description={
                isBan
                  ? t(translations.common.approveBanClub)
                  : t(translations.common.approveUnbanClub)
              }
              open={openConfirmDialog}
              isConfirmDialog
              onCancel={() => setOpenConfirmDialog(false)}
              onApprove={() => {
                setOpenConfirmDialog(false);
                setIsBan(!isBan);
              }}
            />
            <ApprovalDialog
              isConfirmDialog
              open={openConfirmModal}
              title={t(translations.common.update)}
              description={
                <div>
                  {t(translations.clubAssociationInformation.areYouSureUpdate)}
                </div>
              }
              onCancel={() => setOpenConfirmModal(false)}
              onApprove={() => {
                setFileData(images);
                handleSubmitForm(formData);
                setLoading(true);
              }}
              loading={isLoading}
            />
          </Grid>
        </Grid>
      </MainContent>
    </Page>
  );
});
