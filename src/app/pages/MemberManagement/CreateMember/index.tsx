/**
 *
 * CreateMember
 *
 */
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
import { useForm, FormProvider, FieldError } from 'react-hook-form';
import { IndividualRequest, Province, Transaction } from 'types';
import moment from 'moment';
import { translations } from 'locales/translations';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';

import { addressRegex } from 'utils/helpers/regex';

import { omit } from 'lodash';

import { MainContent } from 'app/components/HOC/WithTitle';
import { ApprovalDialog } from 'app/components/ApprovalDialog';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import Page from '../../../components/Page';

import { Footer } from './components/Footer';
import { Fee } from './components/Fee';
import { selectCreateMember } from './slice/selectors';
import { MemberInputForm } from './components/MemberInputForm';
import { useCreateMemberSlice } from './slice';
import { Header } from './components/Header/index';
import { MemberAddressForm } from './components/MemberAddressForm';
import { ClubInformationForm } from './components/ClubInformationForm';

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
  '& #packageName': {
    background: '#E8E8E8',
    borderRadius: '8px',
  },
  '& .react-tel-input .special-label': {
    color: '#637381',
    fontSize: '12px',
    fontFamily: 'Public Sans,sans-serif',
  },
  '& .react-tel-input .onFocus': {
    color: '#00AB55',
  },
  '& .react-tel-input .fullWidth': {
    width: '100%',
    borderRadius: '8px',
    borderColor: '#dce0e4',
    '&:focus': {
      border: '2px solid #00AB55',
      borderRadius: '8px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#00AB55',
      },
    },
    '&:hover': {
      borderColor: '#000',
    },
    '&:focus ~ .react-tel-input .special-label': {
      color: '#00AB55',
    },
  },
});

interface Props {}

export const CreateMember = memo((props: Props, { control }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isApprove, setIsApprove] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [formData, setFormdata] = useState<IndividualRequest>({});
  const [fileData, setFileData] = useState<any | undefined>();
  const fetchFormData = useSelector(selectCreateMember);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = useSelector(selectAuth);
  const { userInformation } = fetchData;

  const { actions } = useCreateMemberSlice();
  const handleSubmitForm = (data: any) => {
    setFormdata(data);
    setIsApprove(true);
  };

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [numberIsUnique, setNumberUnique] = React.useState<
    FieldError | undefined
  >();

  const validateForm = yup.object().shape({
    fullName: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .matches(
        /^(?!\s+$)[a-zA-Z ]+$/,
        t(translations.createNewMemberPage.fullnameMatchRegex),
      )
      .max(255, t(translations.createNewMemberPage.fullNameMaxCharacter)),
    address: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .matches(addressRegex, t(translations.createClubError.invalidAddress))
      .max(255, t(translations.createNewMemberPage.addressMax)),
    bloodType: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField)),
    phone: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .matches(/^[0-9]+$/, t(translations.createNewMemberPage.phoneIsNumber))
      .min(6, t(translations.createNewMemberPage.phoneNumberToShort))
      .max(13, t(translations.createNewMemberPage.phoneNumberToLong)),
    packageId: yup
      .number()
      .typeError(t(translations.createNewMemberPage.commonRequiredField))
      .required(t(translations.createNewMemberPage.commonRequiredField)),
    gender: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField)),
    province: yup
      .object()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .nullable(),
    birthPlace: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .nullable(),
    profilePicture: yup
      .string()
      .required(
        t(translations.createNewMemberPage.profilePictureFileIsRequired),
      ),
    nikPicture: yup
      .string()
      .required(
        t(translations.createNewMemberPage.identificationPictureRequired),
      ),
    nikNumber: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .matches(/^[0-9]+$/, t(translations.createNewMemberPage.nikNumber)),
    birthday: yup
      .date()
      .nullable()
      .transform((currentValue, originValue) =>
        originValue === '' ? null : currentValue,
      )
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .min(
        new Date(1900, 1, 1),
        t(translations.createNewMemberPage.dateOfBirthInvalid),
      )
      .max(
        new Date(Date.now() - 86400000),
        t(translations.createNewMemberPage.dateOfBirthInvalid),
      )
      .typeError(t(translations.createNewMemberPage.dateOfBirthInvalid)),
    email: yup
      .string()
      .email(t(translations.createNewMemberPage.emailisValid))
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .max(255, t(translations.createNewMemberPage.emailMaxCharacter)),
    nationality: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField)),
    rtRwNumber: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField)),
    city: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .nullable(),
    district: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .nullable(),
    ward: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .nullable(),
    provinceClub: yup
      .object()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .nullable(),
    club: yup
      .object()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .nullable(),
    // postCode: yup
    //   .string()
    //   .required(t(translations.createNewMemberPage.commonRequiredField))
    //   .nullable(),
    hobby: yup
      .string()
      .required(t(translations.createNewMemberPage.commonRequiredField))
      .nullable(),
  });

  const [fee, setFee] = useState({
    initFee: 0,
    annualFee: 0,
    processingFee: 0,
  });

  const [images, setImages] = useState({
    profilePicture: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    nikPicture: {
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
    dispatch(actions.fetchProvinceRequests());
    dispatch(actions.packagesRequest());
    dispatch(actions.packageProRequest());
    dispatch(actions.fetchCategories());
    dispatch(actions.fetchBirthPlaceCity({ name: '' }));
  }, []);

  const onSubmit = (inputData: IndividualRequest) => {
    if (!numberIsUnique) {
      const formInputs = omit(inputData, ['sim', 'simPicture']);
      // formInputs.phone = `62${
      //   inputData.phone?.search('0') === 0
      //     ? inputData.phone?.slice(1)
      //     : inputData.phone
      // }`;
      formInputs.birthday = moment(formInputs.birthday).format('DD/MM/YYYY');
      formInputs.name = inputData.name?.trim();
      formInputs.address = inputData.address?.trim();
      formInputs.nikType = inputData?.nikType;
      setFormdata(formInputs);
      setOpenConfirmModal(true);
    }
  };

  useEffect(() => {
    if (formData && fileData && isApprove) {
      dispatch(
        actions.createMemberRequest({
          files: {
            fileNames: [
              fileData?.profilePicture?.nameFile,
              fileData?.nikPicture?.nameFile,
            ],
          },
          formData: {
            ...formData,
            // nikType: formData?.nikType,
            clubId: formData?.club?.id,
            provinceId: formData?.province?.id,
            cityId: fetchFormData?.city?.find(
              value => value.name === formData?.city,
            )?.id,
            districtId: fetchFormData?.district?.find(
              value => value.name === formData?.district,
            )?.id,
            wardId: fetchFormData?.ward?.find(
              value => value.name === formData?.ward,
            )?.id,
            // provinceName: formData?.province?.name,
          },
          fileData,
          navigate,
          // userUuid: fetchFormData?.profile && fetchFormData?.profile[0]?.uuid,
        }),
      );
    }
    setIsApprove(false);
    setLoading(false);
  }, [isApprove]);

  React.useEffect(() => {
    if (methods.getValues('province')) {
      dispatch(
        actions.fetchCity({
          provinceId: methods.getValues('province')?.id,
        }),
      );
    }
  }, [methods.watch(['province']) && methods.getValues('province')]);

  React.useEffect(() => {
    if (methods.getValues('city')) {
      dispatch(
        actions.fetchDistrict({
          cityId: fetchFormData?.city?.find(
            value => value.name === methods.getValues('city'),
          )?.id,
        }),
      );
    }
  }, [methods.watch(['city']) && methods.getValues('city')]);

  React.useEffect(() => {
    if (methods.getValues('district')) {
      dispatch(
        actions.fetchWard({
          districtId: fetchFormData?.district?.find(
            value => value.name === methods.getValues('district'),
          )?.id,
        }),
      );
    }
  }, [methods.watch(['district']) && methods.getValues('district')]);

  React.useEffect(() => {
    if (methods.getValues('provinceClub')) {
      dispatch(
        actions.clubsRequest({
          provinceId: methods.getValues('provinceClub')?.id,
          size: methods.getValues('provinceClub')?.clubNumber,
        }),
      );
    }
  }, [methods.watch(['provinceClub']) && methods.getValues('provinceClub')]);

  React.useEffect(() => {
    setFee({
      initFee: fetchFormData?.packageProRequest?.initFee as number,
      annualFee: fetchFormData?.packageProRequest?.annualFee as number,
      processingFee: fetchFormData?.packageProRequest?.processingFee as number,
    });
  }, [fetchFormData?.packageProRequest]);

  return (
    <Page title={t(translations.createNewMemberPage.createNewMember)}>
      <MainContent>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <Header />
            <RootStyle>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <GeneralImageDetail images={images} setImages={setImages} />
                  <MemberInputForm
                    setNumberUnique={setNumberUnique}
                    numberIsUnique={numberIsUnique}
                    packagePro={fetchFormData?.packageProRequest}
                  />
                  <MemberAddressForm userInformation={userInformation} />
                  <ClubInformationForm />
                  <Fee
                    transaction={
                      {
                        ...fee,
                        taxPercent: 0,
                      } as Transaction & { taxPercent: number }
                    }
                    methods={methods}
                    user={userInformation}
                  />
                  <Footer handleSubmit={methods.handleSubmit(onSubmit)} />
                </form>
              </FormProvider>
            </RootStyle>
            {/* <CreateDialog
              open={openConfirmModal}
              title={t(translations.common.confirmCreate)}
              description={
                <KV>
                  <Row>
                    <Key>{t(translations.common.package)}: </Key>
                    <Typography>
                      {
                        fetchFormData?.packagesRequest?.filter(
                          value =>
                            Number(value.id) === Number(formData?.packageId),
                        )?.[0]?.name
                      }
                    </Typography>
                  </Row>
                  <Row>
                    <Key>{t(translations.common.name)}: </Key>
                    <Typography>{formData?.name}</Typography>
                  </Row>
                  <Row>
                    <Key>{t(translations.common.expirationDate)}: </Key>
                    <Typography>
                      {moment(Date.now() + 31536000000).format('DD/MM/YYYY')}
                    </Typography>
                  </Row>
                </KV>
              }
              onCancel={() => setOpenConfirmModal(false)}
              onCreate={() => {
                setFileData(images);
                handleSubmitForm(formData);
              }}
            /> */}
            <ApprovalDialog
              title={t(translations.common.confirmation)}
              description={t(translations.common.areYouWantCreateMember)}
              open={openConfirmModal}
              isConfirmDialog
              onCancel={() => setOpenConfirmModal(false)}
              onApprove={() => {
                setFileData(images);
                handleSubmitForm(formData);
                setLoading(true);
              }}
              loading={loading}
            />
          </Grid>
        </Grid>
      </MainContent>
    </Page>
  );
});
