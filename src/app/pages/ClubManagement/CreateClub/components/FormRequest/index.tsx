import React, { memo, useState, useEffect } from 'react';
import { Grid, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { translations } from 'locales/translations';
import { LoadingButton } from '@mui/lab';
import {
  useForm,
  FormProvider,
  Controller,
  useFormContext,
  FieldError,
} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import {
  lettersAndSpaceRegex,
  numberRegex,
  addressRegex,
} from 'utils/helpers/regex';
import {
  Category,
  CreateClubRequestMembers,
  IndividualRequest,
  Profile,
  Province,
  Transaction,
} from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { Roles } from 'types/enums';

import { ApprovalDialog } from 'app/components/ApprovalDialog';

import { ClubInfomation } from '../ClubInfomation';
import { BankInfomation } from '../BankInfomation';
import { ClubLocation } from '../ClubLocation';
import { Documents } from '../Documents';
import { ClubManagements } from '../ClubManagements';

import { useClubManagementCreateSlice } from '../../slice';
import { selectClubManagementCreate } from '../../slice/selectors';
import { Fee } from '../Fee';

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
    borderColor: '#9d9d9d',
    '&:focus': {
      border: '2px solid #00AB55',
      borderRadius: '8px',
      boxShadow: 'none',
    },
    '&:hover': {
      borderColor: '#9d9d9d',
    },
    '&:focus ~ .react-tel-input .special-label': {
      color: '#00AB55',
    },
  },
});
interface MembersType {
  userUuid: string | '';
  role: string | '';
}

export const FormRequest = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState<IndividualRequest>();
  const [phoneNumberError, setPhoneNumberError] = React.useState<
    FieldError | undefined
  >();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useClubManagementCreateSlice();
  const fetchFormData = useSelector(selectClubManagementCreate);
  const { packageProRequest } = fetchFormData;
  const [images, setImages] = useState({
    clubPicture: {
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
  const [ownerUser, setOwnerUserUuid] = useState();
  const [clubMangements, setClubManagements] = useState([
    {
      userUuid: '',
      role: Roles.ADMIN,
      title: `${t(translations.clubAssociationInformation.clubAdmin)}*`,
      name: 'clubAdmin',
      fullName: '',
      phone: '',
      nikNumber: '',
      nikType: 'NIK',
      isFillData: false,
    },
    {
      userUuid: '',
      role: Roles.FINANCE,
      title: `${t(translations.clubAssociationInformation.finance)}*`,
      name: 'finance',
      fullName: '',
      phone: '',
      nikNumber: '',
      nikType: 'NIK',
      isFillData: false,
    },
    {
      userUuid: '',
      role: Roles.PRESIDENT,
      title: `${t(translations.clubAssociationInformation.president)}*`,
      name: 'president',
      fullName: '',
      phone: '',
      nikNumber: '',
      nikType: 'NIK',
      isFillData: false,
    },
    {
      userUuid: '',
      role: Roles.VICE_PRESIDENT,
      title: `${t(translations.clubAssociationInformation.vicePresident)}`,
      name: 'vicePresident',
      fullName: '',
      phone: '',
      nikNumber: '',
      nikType: 'NIK',
      isFillData: false,
    },
    {
      userUuid: '',
      role: Roles.SECRETARY,
      title: `${t(translations.clubAssociationInformation.secretary)}*`,
      name: 'secretary',
      fullName: '',
      phone: '',
      nikNumber: '',
      nikType: 'NIK',
      isFillData: false,
    },
    {
      userUuid: '',
      role: Roles.HUMAN_RESOURCE,
      title: `${t(translations.clubAssociationInformation.humanResource)}`,
      name: 'humanResource',
      fullName: '',
      phone: '',
      nikNumber: '',
      nikType: 'NIK',
      isFillData: false,
    },
  ]);

  const [numberIsUnique, setNumberUnique] = React.useState<
    FieldError | undefined
  >();
  const [approvalDialogOpen, setApprovalDialogOpen] = React.useState(false);
  const [fee, setFee] = useState({
    initFee: 0,
    annualFee: 0,
    processingFee: 0,
  });
  const isValidPhoneNumber = (profile: Profile) =>
    profile.status === 'not_existed' ||
    !profile.isEnable ||
    profile.isClubPic ||
    profile.isImiClubStandard;

  useEffect(() => {
    dispatch(actions.fetchCategories());
    dispatch(actions.fetchPackages());
    dispatch(actions.fetchProvinces());
    dispatch(actions.fetchBank());
    dispatch(actions.packageProRequest());
  }, []);

  React.useEffect(() => {
    setFee({
      initFee: fetchFormData?.packageProRequest?.initFee as number,
      annualFee: fetchFormData?.packageProRequest?.annualFee as number,
      processingFee: fetchFormData?.packageProRequest?.processingFee as number,
    });
  }, [fetchFormData?.packageProRequest]);

  const formRequestSchema = yup.object().shape({
    provinceName: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    clubName: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .max(255, t(translations.createClubError.clubNameCharacter)),
    contentPreference: yup
      .array()
      .required(t(translations.createClubError.pleaseEnterRequiredFields)),
    description: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .max(500, t(translations.createClubError.descriptionCharacter)),
    city: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    district: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    address: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .max(255, t(translations.createClubError.addressCharacter))
      .nullable(),
    ward: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    rtRwNumber: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields)),
    bankNumber: yup
      .string()
      .matches(numberRegex, t(translations.createClubError.numberError))
      .required(t(translations.createClubError.pleaseEnterRequiredFields)),
    // .min(16, t(translations.createClubError.bankNumberCharacter)),
    // .max(16, t(translations.createClubError.bankNumberCharacter)),
    bankHolderName: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .matches(
        lettersAndSpaceRegex,
        t(translations.createClubError.bankHolderCharacter),
      )
      .max(255, t(translations.createClubError.maxBankHolderNameCharacter)),
    bankName: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .max(255, t(translations.createClubError.maxBankNameCharacter))
      .nullable(),
    clubCategory: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .max(255, t(translations.createClubError.maxBankNameCharacter))
      .nullable(),
    clubPrivacy: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .max(255, t(translations.createClubError.maxBankNameCharacter))
      .nullable(),
    artDocuments: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    clubAdmin: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    president: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    secretary: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
    finance: yup
      .string()
      .required(t(translations.createClubError.pleaseEnterRequiredFields))
      .nullable(),
  });

  const methods = useForm<IndividualRequest>({
    defaultValues: { imiPaid: false, city: '', district: '', ward: '' },
    resolver: yupResolver(formRequestSchema),
  });

  const onSubmit = (data: IndividualRequest) => {
    if (!numberIsUnique) {
      setFormData(data);
      setApprovalDialogOpen(true);
    }
  };

  const handleApprove = () => {
    const newFileNames: string[] = [];
    if (images.artDocuments.nameFile) {
      newFileNames.push(images.artDocuments.nameFile);
    }
    if (images.certDocuments.nameFile) {
      newFileNames.push(images.certDocuments.nameFile);
    }
    if (images.clubPicture.nameFile) {
      newFileNames.push(images.clubPicture.nameFile);
    }
    if (images.additionalDocuments.length > 0) {
      images.additionalDocuments.map((item: any) => {
        if (item.nameFile) {
          newFileNames.push(item.nameFile);
        }
      });
    }

    const members: any[] = [];
    const _clubMangements: any[] = [...clubMangements];
    _clubMangements.map((item: any) => {
      if (item.fullName !== '') {
        if (item.nikType === 'NIK') {
          members.push({
            userUuid: item.userUuid,
            role: item.role,
            phone: item.phone,
            fullName: item.fullName,
            identification: {
              identifierNikNumber: item.nikNumber,
            },
          });
        } else {
          members.push({
            userUuid: item.userUuid,
            role: item.role,
            phone: item.phone,
            fullName: item.fullName,
            identification: {
              identifierKitasNumber: item.nikNumber,
            },
          });
        }
      }
    });

    const contentPreferences: any[] = [];
    formData?.contentPreference?.map((item: any) => {
      contentPreferences.push(
        fetchFormData?.clubCategories?.find((value: any) => value.name === item)
          ?.id,
      );
    });

    const packegeID = fetchFormData.package?.filter((item: any) =>
      formData?.imiPaid
        ? item.code === 'IMI_CLUB'
        : item.code === 'GASPOL_CLUB',
    )[0]?.id;

    dispatch(
      actions.createClub({
        formRequest: {
          ...formData,
          provinceId: fetchFormData?.provinces?.find(
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
            (value: any) => value.name === formData?.bankName,
          )?.id,
          contentPreference: contentPreferences,
        },
        files: {
          fileNames: newFileNames,
        },
        packageId: packegeID || '',
        images,
        ownerUserUuid: ownerUser,
        membersRequest: members,
        navigate,
      }),
    );
  };

  return (
    <RootStyle>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ClubInfomation
            setNumberUnique={setNumberUnique}
            numberIsUnique={numberIsUnique}
            images={images}
            setImages={setImages}
          />
          <BankInfomation />
          <ClubLocation setNumberUnique={setNumberUnique} />
          <ClubManagements
            clubMangements={clubMangements}
            setClubManagements={setClubManagements}
            setOwnerUserUuid={setOwnerUserUuid}
          />
          <Documents images={images} setImages={setImages} />
          <Fee
            transaction={
              {
                ...fee,
                taxPercent: 0,
              } as Transaction & { taxPercent: number }
            }
            methods={methods}
          />
          <Grid sx={{ mt: 5, textAlign: 'end' }}>
            <LoadingButton variant="contained" type="submit">
              {t(translations.common.create)}
            </LoadingButton>
          </Grid>
        </FormProvider>
      </form>
      <ApprovalDialog
        isConfirmDialog
        open={approvalDialogOpen}
        title={t(translations.common.confirmApprove)}
        description={<div>{'Are you sure you want to Create this club ?'}</div>}
        onCancel={() => setApprovalDialogOpen(false)}
        onApprove={handleApprove}
      />
    </RootStyle>
  );
};
