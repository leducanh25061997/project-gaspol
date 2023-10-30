import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, styled } from '@mui/material';
import { translations } from 'locales/translations';
import React, { memo, useEffect, useState } from 'react';
import { FieldError, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { ClubInformation, IndividualRequest } from 'types';

import { ApprovalDialog } from 'app/components/ApprovalDialog';
import { ClubMembershipInfo } from 'app/pages/ClubManagement/EditClub/components/ClubMembershipInfo';
import { Roles } from 'types/enums';

import { BankInfomation } from '../BankInfomation';
import { ClubGeneralInformation } from '../ClubGeneralInformation';
import { ClubLocation } from '../ClubLocation';
import { ClubManagements } from '../ClubManagements';
import { Documents } from '../Documents';

import { useClubManagementEditSlice } from '../../slice';
import { selectClubManagementEdit } from '../../slice/selectors';

interface Props {
  handleSubmitForm?: (value?: any) => void;
  clubId: string;
  individualInformation?: ClubInformation;
  setLoading?: Function;
}

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

export const FormRequest = memo(
  ({ handleSubmitForm, clubId, individualInformation, setLoading }: Props) => {
    const dispatch = useDispatch();
    const { actions } = useClubManagementEditSlice();
    const { t } = useTranslation();
    const [formData, setFormData] = React.useState<IndividualRequest>();
    const [approvalDialogOpen, setApprovalDialogOpen] =
      useState<boolean>(false);
    const [ownerUser, setOwnerUserUuid] = useState();
    const fetchFormData = useSelector(selectClubManagementEdit);
    const navigate = useNavigate();
    const [cancelEdit, setCancelEdit] = useState<boolean>(false);
    const [numberIsUnique, setNumberUnique] = React.useState<
      FieldError | undefined
    >();
    const [clubcodeIsUnique, setClubCodeUnique] = React.useState<
      FieldError | undefined
    >();
    const { clubMembersPageable } = fetchFormData;
    const [clubMangements, setClubManagements] = useState([
      {
        userUuid: '',
        role: Roles.ADMIN,
        title: `${t(translations.clubAssociationInformation.clubAdmin)}`,
        name: 'clubAdmin',
        fullName: '',
        phone: '',
        nikNumber: '',
        nikType: 'NIK',
      },
      {
        userUuid: '',
        role: Roles.FINANCE,
        title: `${t(translations.clubAssociationInformation.finance)}`,
        name: 'finance',
        fullName: '',
        phone: '',
        nikNumber: '',
        nikType: 'NIK',
      },
      {
        userUuid: '',
        role: Roles.PRESIDENT,
        title: `${t(translations.clubAssociationInformation.president)}`,
        name: 'president',
        fullName: '',
        phone: '',
        nikNumber: '',
        nikType: 'NIK',
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
      },
      {
        userUuid: '',
        role: Roles.SECRETARY,
        title: `${t(translations.clubAssociationInformation.secretary)}`,
        name: 'secretary',
        fullName: '',
        phone: '',
        nikNumber: '',
        nikType: 'NIK',
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
      },
    ]);
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
          key: '',
        },
      ],
      certDocuments: {
        file: null,
        url: '',
        name: '',
        nameFile: '',
      },
    });

    useEffect(() => {
      if (clubMembersPageable) {
        const member = clubMembersPageable.data[0];
        const _member: any[] = [];
        const _clubMangements = [...clubMangements];
        const _roles = clubMembersPageable.data;

        _roles &&
          _roles?.length > 0 &&
          _roles[0]?.roles?.map((item: any) => {
            if (item.role === 'ADMIN') {
              _clubMangements.splice(0, 1);
              _clubMangements.splice(0, 0, {
                userUuid: member.userUuid || '',
                role: Roles.ADMIN,
                title: `${t(
                  translations.clubAssociationInformation.clubAdmin,
                )}*`,
                name: 'clubAdmin',
                fullName: member?.fullName || '',
                phone: member?.phone || '',
                nikNumber: member?.ktaNumber || '',
                nikType: 'NIK',
              });
            } else if (item.role === 'FINANCE') {
              _clubMangements.splice(1, 1);
              _clubMangements.splice(1, 0, {
                userUuid: member.userUuid || '',
                role: Roles.FINANCE,
                title: `${t(translations.clubAssociationInformation.finance)}*`,
                name: 'finance',
                fullName: member?.fullName || '',
                phone: member?.phone || '',
                nikNumber: member?.ktaNumber || '',
                nikType: 'NIK',
              });
            } else if (item.role === 'PRESIDENT') {
              _clubMangements.splice(2, 1);
              _clubMangements.splice(2, 0, {
                userUuid: member.userUuid || '',
                role: Roles.PRESIDENT,
                title: `${t(
                  translations.clubAssociationInformation.president,
                )}*`,
                name: 'president',
                fullName: member?.fullName || '',
                phone: member?.phone || '',
                nikNumber: member?.ktaNumber || '',
                nikType: 'NIK',
              });
            } else if (item.role === 'VICE_PRESIDENT') {
              _clubMangements.splice(3, 1);
              _clubMangements.splice(3, 0, {
                userUuid: member.userUuid || '',
                role: Roles.VICE_PRESIDENT,
                title: `${t(
                  translations.clubAssociationInformation.vicePresident,
                )}`,
                name: 'vicePresident',
                fullName: member?.fullName || '',
                phone: member?.phone || '',
                nikNumber: member?.ktaNumber || '',
                nikType: 'NIK',
              });
            } else if (item.role === 'SECRETARY') {
              _clubMangements.splice(4, 1);
              _clubMangements.splice(4, 0, {
                userUuid: member.userUuid || '',
                role: Roles.SECRETARY,
                title: `${t(
                  translations.clubAssociationInformation.secretary,
                )}*`,
                name: 'secretary',
                fullName: member?.fullName || '',
                phone: member?.phone || '',
                nikNumber: member?.ktaNumber || '',
                nikType: 'NIK',
              });
            } else if (item.role === 'HUMAN_RESOURCE') {
              _clubMangements.splice(5, 1);
              _clubMangements.splice(5, 0, {
                userUuid: member.userUuid || '',
                role: Roles.HUMAN_RESOURCE,
                title: `${t(
                  translations.clubAssociationInformation.humanResource,
                )}`,
                name: 'humanResource',
                fullName: member?.fullName || '',
                phone: member?.phone || '',
                nikNumber: member?.ktaNumber || '',
                nikType: 'NIK',
              });
            }
            setClubManagements(_clubMangements);
          });
      }
    }, [clubMembersPageable]);

    const convertsAdditionalDocuments = (
      documents: any[],
      additionalDocumentsKeyS3: any[],
    ) => {
      if (documents && documents.length > 0) {
        const array: any[] = [];
        for (let i = 0; i < documents.length; i++) {
          array.push(
            documents.reduce((acc, val) => {
              acc['file'] = null;
              acc['url'] = val;
              acc['name'] = '';
              acc['nameFile'] = '';
              acc['key'] = additionalDocumentsKeyS3[i];
              return acc;
            }, {}),
          );
        }
        return array;
      } else {
        return [
          {
            file: null,
            url: '',
            name: '',
            nameFile: '',
            key: '',
          },
        ];
      }
    };

    React.useEffect(() => {
      if (individualInformation) {
        const newAdditionalDocuments = convertsAdditionalDocuments(
          individualInformation?.additionalDocuments || [],
          individualInformation?.additionalDocumentsKeyS3 || [],
        );
        setImages({
          ...images,
          artDocuments: {
            file: null,
            url:
              individualInformation?.artDocuments &&
              individualInformation?.artDocuments.length > 0
                ? individualInformation?.artDocuments[0]
                : '',
            name: '',
            nameFile: '',
          },
          certDocuments: {
            file: null,
            url:
              individualInformation?.certDocuments &&
              individualInformation?.certDocuments.length > 0
                ? individualInformation?.certDocuments[0]
                : '',
            name: '',
            nameFile: '',
          },
          additionalDocuments: newAdditionalDocuments,
          clubPicture: {
            file: null,
            url: individualInformation?.avatarUrl || '',
            name: '',
            nameFile: '',
          },
        });
      }
    }, [individualInformation]);

    const formRequestSchema = yup.object().shape({
      // provinceName: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // clubName: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .max(255, t(translations.createClubError.clubNameCharacter)),
      // clubCode: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .max(255, t(translations.createClubError.pleaseEnterRequiredFields)),
      // description: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .max(500, t(translations.common.descriptionMax)),
      // address: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .max(255, t(translations.createClubError.maxAddressCharacter)),
      // rtRwNumber: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .max(255, t(translations.createClubError.maxAddressCharacter)),
      // // postCode: yup
      // //   .string()
      // //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      // //   .max(255, t(translations.createClubError.maxAddressCharacter)),
      // city: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // district: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // ward: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // // certNumber: yup
      // //   .string()
      // //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      // //   .nullable(),
      // clubCategory: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // bankNumber: yup
      //   .string()
      //   .matches(numberRegex, t(translations.createClubError.numberError))
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   // .min(16, t(translations.createClubError.bankNumberCharacter)),
      //   .max(16, t(translations.createClubError.bankNumberCharacter)),
      // bankHolderName: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .matches(
      //     lettersAndSpaceRegex,
      //     t(translations.createClubError.bankHolderCharacter),
      //   )
      //   .max(255, t(translations.createClubError.maxBankHolderNameCharacter)),
      // bankName: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .max(255, t(translations.createClubError.maxBankNameCharacter))
      //   .nullable(),
      // clubPrivacy: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .max(255, t(translations.createClubError.maxBankNameCharacter))
      //   .nullable(),
      // clubAdmin: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // president: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // secretary: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // finance: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // expireDate: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // artDocuments: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
      // certDocuments: yup
      //   .string()
      //   .required(t(translations.createClubError.pleaseEnterRequiredFields))
      //   .nullable(),
    });

    const methods = useForm<IndividualRequest>({
      defaultValues: { city: '', district: '', ward: '' },
      resolver: yupResolver(formRequestSchema),
    });

    const onSubmit = (data: IndividualRequest) => {
      if (!numberIsUnique && !clubcodeIsUnique) {
        setApprovalDialogOpen(true);
        setFormData(data);
      }
    };

    const handleCancel = () => {
      navigate(-1);
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

      clubMangements.map((item: any) => {
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
          fetchFormData?.clubCategories?.find(
            (value: any) => value.name === item,
          )?.id,
        );
      });

      dispatch(
        actions.updateClub({
          clubMembershipId: clubId,
          formRequest: {
            ...formData,
            additionalDocuments: images?.additionalDocuments
              ?.map(document => document.url)
              .filter(url => url),
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
            fileNames: newFileNames.filter(ele => ele !== ''),
          },
          images,
          membersRequest: members,
          navigate,
        }),
      );
    };

    return (
      <RootStyle>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <ClubMembershipInfo
              info={individualInformation}
              setClubCodeUnique={setClubCodeUnique}
              clubcodeIsUnique={clubcodeIsUnique}
            />
            <ClubGeneralInformation
              info={individualInformation}
              images={images}
              setImages={setImages}
              setNumberUnique={setNumberUnique}
              numberIsUnique={numberIsUnique}
            />
            <BankInfomation info={individualInformation} />
            <ClubLocation
              info={individualInformation}
              setNumberUnique={setNumberUnique}
            />
            <ClubManagements
              clubMangements={clubMangements}
              setClubManagements={setClubManagements}
              setOwnerUserUuid={setOwnerUserUuid}
            />
            <Documents
              info={individualInformation}
              images={images}
              setImages={setImages}
            />

            <Grid sx={{ mt: 5, textAlign: 'end' }}>
              <LoadingButton
                sx={{
                  backgroundColor: '#FF6B00',
                  color: 'white',
                  width: '120px',
                  fontSize: '16px',
                  '&:hover': {
                    backgroundColor: '#FF6B00',
                    opacity: '0.6',
                  },
                }}
                // variant="contained"
                onClick={handleCancel}
              >
                {t(translations.common.cancel)}
              </LoadingButton>
              <LoadingButton
                sx={{
                  marginLeft: '10px',
                  width: '120px',
                  height: '2.48rem',
                }}
                variant="contained"
                type="submit"
              >
                {t(translations.common.update)}
              </LoadingButton>
            </Grid>
          </FormProvider>
        </form>
        <ApprovalDialog
          isConfirmDialog
          open={approvalDialogOpen}
          title={t(translations.common.confirmApprove)}
          description={
            <div>{t(translations.claimClubList.approveUpdateClub)}</div>
          }
          onCancel={() => setApprovalDialogOpen(false)}
          onApprove={handleApprove}
        />
        <ApprovalDialog
          isConfirmDialog
          open={cancelEdit}
          title={t(translations.common.confirmApprove)}
          description={
            <div>
              {t(translations.common.areYouSureYouWantToCancelThisClub)}
            </div>
          }
          onCancel={() => setCancelEdit(false)}
          onApprove={() => navigate(`/clubs/${clubId}`)}
        />
      </RootStyle>
    );
  },
);
