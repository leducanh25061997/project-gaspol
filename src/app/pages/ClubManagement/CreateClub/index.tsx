import React, { memo, useEffect } from 'react';

import { Grid, Button, styled } from '@mui/material';

import Page from 'app/components/Page';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

import {
  ClubFormRequest,
  Category,
  Province,
  Transaction,
  Profile,
} from 'types';

import { withLoading } from 'app/components/HOC/WithLoading';

import { TitlePage } from 'app/components/Label';
import { MainContent } from 'app/components/HOC/WithTitle';

import { FileCard } from 'app/components/UploadFile';

import { FormRequest } from './components/FormRequest';

// import { GeneralClubManagement } from 'app/components/GeneralClubManagement';

// import { PhoneNumberInput } from 'app/components/PhoneNumberInput';

// import { ClubLocation } from '../Components/ClubLocation';

import { Header } from './components/Header';

// import { selectClubManagementCreate } from './slice/selectors';
// import { useClubManagementCreateSlice } from './slice';

interface Props {
  setLoading?: Function;
}
interface FormInputs {
  name: string;
  bankName: string;
  selectBank: string;
  accountNumber: string;
  accountName: string;
  clubCategories?: Category[];
  fullAddress: string;
  city?: string;
  district?: string;
  ward?: string;
  province?: Province;
  imiPaid?: boolean;
  rtRW: string;
  postalCode: string;
  clubAdmin: string;
  president: string;
  secretary: string;
  finance: string;
  vicePresident?: string;
  humanResource?: string;
  certificateDocumentNumber?: string;
  description: string;
  clubPrivacy: string;
  clubExternalLink?: string;
  personInCharge?: string;
  fullName: string;
}

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

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(168, 70, 0, 1) !important',
  },
});

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

export const CreateClub = withLoading(
  memo((props: Props) => {
    const { t } = useTranslation();

    return (
      <Page title={t(translations.clubManagementConfirm.title)}>
        <MainContent>
          <Header />
          <Grid container spacing={0}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12}>
                <RootStyle>
                  <FormRequest />
                </RootStyle>
              </Grid>
            </Grid>
          </Grid>
        </MainContent>
      </Page>
    );
  }),
);

// import React, { memo, useEffect } from 'react';
// import {
//   Grid,
//   Box,
//   Card,
//   Stack,
//   TextField,
//   Button,
//   Container,
//   CardHeader,
//   Typography,
//   FormControl,
//   Autocomplete,
//   Checkbox,
// } from '@mui/material';
// import Page from 'app/components/Page';
// import { translations } from 'locales/translations';
// import { useTranslation } from 'react-i18next';
// import { useForm, Controller, NestedValue, FieldError } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import {
//   ClubFormRequest,
//   Member,
//   Transaction,
//   Province,
//   Category,
//   Profile,
//   Address,
// } from 'types';

// import { useLoading } from 'app/hooks';

// import { useNavigate } from 'react-router';

// import { UserPackageType, MemberRoles } from 'types/enums';
// import { ApprovalDialog } from 'app/components/ApprovalDialog';
// import { Key, KV, Row, Value } from 'app/components/KeyValue';
// import { useDispatch, useSelector } from 'react-redux';
// import { get } from 'lodash';

// import path from 'app/routes/path';
// import { withLoading } from 'app/components/HOC/WithLoading';
// import NumberFormat from 'react-number-format';

// import {
//   lettersAndSpaceRegex,
//   numberRegex,
//   addressRegex,
// } from 'utils/helpers/regex';
// import { LoadingButton } from '@mui/lab';

// import { MainContent } from 'app/components/HOC/WithTitle';

// import { PhoneNumberInput } from '../../../components/PhoneNumberInput';
// import Notifier from '../../Notifier';

// import { selectClubManagementCreate } from './slice/selectors';
// import { useClubManagementCreateSlice } from './slice';

// import { Fee } from './components/Fee';
// import { Header } from './components/Header';

// interface Props {
//   setLoading?: Function;
// }

// interface FormInputs {
//   province?: Province;
//   name: string;
//   clubCategories?: Category[];
//   personInCharge?: string;
//   bankName: string;
//   bankNumber: string;
//   bankHolderName: string;
//   imiPaid?: boolean;
//   address?: string;
//   rtRwNumber?: string;
//   city?: string;
//   district?: string;
//   ward?: string;
// }

// export const CreateClub = withLoading(
//   memo((props: Props) => {
//     const { t } = useTranslation();
//     const dispatch = useDispatch();
//     const { actions } = useClubManagementCreateSlice();
//     const fetchFormData = useSelector(selectClubManagementCreate);
//     const provinces = fetchFormData?.province;
//     const packages = fetchFormData?.package;
//     const clubCategoriesData = fetchFormData?.clubCategories;
//     const { profiles } = useSelector(selectClubManagementCreate);

//     const formRequestSchema = yup
//       .object({
//         province: yup
//           .object()
//           .shape({
//             id: yup
//               .string()
//               .required(t(translations.createNewMemberPage.provinceIsRequired)),
//             name: yup
//               .string()
//               .required(t(translations.createNewMemberPage.provinceIsRequired)),
//           })
//           .required(t(translations.createNewMemberPage.provinceIsRequired))
//           .nullable(),
//         name: yup
//           .string()
//           .required(t(translations.createClubError.clubNameRequired))
//           .max(255, t(translations.createClubError.maxNameCharacter)),
//         address: yup
//           .string()
//           .required(t(translations.createClubError.addressDetailRequired))
//           .max(255, t(translations.createClubError.maxAddressCharacter)),
//         city: yup
//           .string()
//           .required(t(translations.createClubError.cityError))
//           .nullable(),
//         district: yup
//           .string()
//           .required(t(translations.createClubError.districtError))
//           .nullable(),
//         ward: yup
//           .string()
//           .required(t(translations.createClubError.wardError))
//           .nullable(),
//         rtRwNumber: yup
//           .string()
//           .required(t(translations.createNewMemberPage.rtRwNumberError)),
//         clubCategories: yup
//           .array()
//           .min(1, t(translations.createClubError.clubCategoriesRequired))
//           .nullable(),
//         personInCharge: yup
//           .string()
//           .matches(numberRegex, t(translations.createClubError.numberError))
//           .required(t(translations.createClubError.clubPicRequired))
//           .min(6, t(translations.createClubError.minPicCharacter))
//           .max(14, t(translations.createClubError.maxPicCharacter)),
//         bankNumber: yup
//           .string()
//           .matches(numberRegex, t(translations.createClubError.numberError))
//           .required(t(translations.createClubError.bankAccountNumber))
//           .min(16, t(translations.createClubError.bankNumberCharacter))
//           .max(16, t(translations.createClubError.bankNumberCharacter)),
//         bankHolderName: yup
//           .string()
//           .required(t(translations.createClubError.bankHolderNameRequired))
//           .matches(
//             lettersAndSpaceRegex,
//             t(translations.createClubError.bankHolderCharacter),
//           )
//           .max(255, t(translations.createClubError.maxBankHolderNameCharacter)),
//         bankName: yup
//           .string()
//           .required(t(translations.createClubError.bankNameRequired))
//           .max(255, t(translations.createClubError.maxBankNameCharacter))
//           .nullable(),
//       })
//       .required();

//     const {
//       register,
//       handleSubmit,
//       reset,
//       control,
//       setValue,
//       getValues,
//       watch,
//       formState: { errors },
//     } = useForm<FormInputs>({
//       defaultValues: { imiPaid: false, city: '', district: '', ward: '' },
//       resolver: yupResolver(formRequestSchema),
//     });

//     const navigate = useNavigate();

//     const [formData, setFormData] = React.useState<FormInputs>();
//     const [approvalDialogOpen, setApprovalDialogOpen] = React.useState(false);

//     const [fee, setFee] = React.useState({
//       initFee: 0,
//       annualFee: 0,
//       processingFee: 0,
//       packageName: '',
//       transactionId: '',
//     });

//     const onSubmit = (data: ClubFormRequest) => {
//       if (!phoneNumberError) {
//         setFormData(data);
//         setApprovalDialogOpen(true);
//       }
//     };

//     const { showLoading, hideLoading } = useLoading(props);

//     const handleApprove = () => {
//       if (formData) {
//         showLoading();
//         const formRequest = {
//           ...formData,
//           province: formData?.province?.id?.toString(),
//           city: fetchFormData?.city
//             ?.find(value => value.name === formData?.city)
//             ?.id?.toString(),
//           district: fetchFormData?.district
//             ?.find(value => value.name === formData?.district)
//             ?.id?.toString(),
//           ward: fetchFormData?.ward
//             ?.find(value => value.name === formData?.ward)
//             ?.id?.toString(),
//           clubCategories: formData?.clubCategories
//             ?.map(item => item.id)
//             .join(','),
//           personInCharge: profiles && profiles.length > 0 && profiles[0].uuid,
//           name: formData?.name?.trim(),
//           address: formData?.address?.trim(),
//           bankHolderName: formData?.bankHolderName?.trim(),
//         };
//         const formParams = Object.keys(formRequest).map((key: string) => {
//           return {
//             key: `club.${key}`,
//             values: [get(formRequest, key)],
//           };
//         });
//         const params = {
//           membershipType: UserPackageType.TKT,
//           packageId: packages?.[0]?.id,
//           forms: formParams,
//           userUuid: formRequest.personInCharge,
//           members: [
//             {
//               userUuid: formRequest.personInCharge,
//               phone: getValues('personInCharge'),
//               ktaNumber: '',
//               name: '',
//               nikNumber: '',
//             },
//           ],
//         };
//         dispatch(
//           actions.createClub(params, (err?: any) => {
//             hideLoading();
//             if (!err) {
//               Notifier.addNotifySuccess({
//                 messageId: t(translations.clubManagementConfirm.createSuccess),
//               });
//               navigate(path.clubManagement);
//             } else {
//               Notifier.addNotifyError({
//                 messageId: t(translations.clubManagementConfirm.createFailed),
//               });
//               setApprovalDialogOpen(false);
//             }
//           }),
//         );
//       }
//     };

//     const [phoneNumberError, setPhoneNumberError] = React.useState<
//       FieldError | undefined
//     >();

//     const isValidPhoneNumber = (profile: Profile) =>
//       profile.status === 'not_existed' ||
//       !profile.isEnable ||
//       profile.isClubPic ||
//       profile.isImiClubStandard;

//     React.useEffect(() => {
//       if (profiles && profiles.length > 0) {
//         if (isValidPhoneNumber(profiles[0])) {
//           setPhoneNumberError({
//             type: 'existed_Number',
//             message: t(translations.createClubError.phoneRequestError),
//           });
//         } else setPhoneNumberError(undefined);
//       }
//     }, [profiles]);

//     React.useEffect(() => {
//       dispatch(actions.fetchCategories());
//       dispatch(actions.fetchPackages());
//       dispatch(actions.fetchProvinces());
//       dispatch(actions.fetchBank());
//     }, []);

//     React.useEffect(() => {
//       if (getValues('province')) {
//         dispatch(
//           actions.fetchCity({
//             provinceId: getValues('province')?.id,
//           }),
//         );
//       }
//     }, [watch(['province']) && getValues('province')]);

//     React.useEffect(() => {
//       if (getValues('city')) {
//         dispatch(
//           actions.fetchDistrict({
//             cityId: fetchFormData?.city?.find(
//               value => value.name === getValues('city'),
//             )?.id,
//           }),
//         );
//       }
//     }, [watch(['city']) && getValues('city')]);

//     React.useEffect(() => {
//       if (getValues('district')) {
//         dispatch(
//           actions.fetchWard({
//             districtId: fetchFormData?.district?.find(
//               value => value.name === getValues('district'),
//             )?.id,
//           }),
//         );
//       }
//     }, [watch(['district']) && getValues('district')]);

//     return (
//       <Page title={t(translations.clubManagementConfirm.title)}>
//         <MainContent>
//           <Header />
//           <Grid container spacing={0} justifyContent="center">
//             <Grid item xs={12}>
//               <Box>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <Card>
//                     <Grid container spacing={10} justifyContent="space-between">
//                       <Grid item xs={12} md={6}>
//                         <Stack>
//                           <Controller
//                             control={control}
//                             name="name"
//                             render={({ field }) => (
//                               <TextField
//                                 {...field}
//                                 error={!!errors.name}
//                                 label={`${t(
//                                   translations.clubManagementConfirm.clubName,
//                                 )}*`}
//                                 helperText={errors?.name?.message}
//                               />
//                             )}
//                           />
//                         </Stack>
//                         <Stack mt={5}>
//                           <PhoneNumberInput
//                             errors={
//                               phoneNumberError
//                                 ? {
//                                     ...phoneNumberError,
//                                     ...errors?.personInCharge,
//                                   }
//                                 : errors?.personInCharge
//                             }
//                             control={control}
//                             fieldName="personInCharge"
//                             requestPhoneNumber={actions.checkPhoneNumberRequest}
//                             phoneRequestType={UserPackageType.TKT}
//                             label={`${t(translations.common.clubAdmin)} (${t(
//                               translations.createClubError.phoneNumber,
//                             )})*`}
//                           />
//                         </Stack>
//                         <Stack mt={5}>
//                           <Controller
//                             control={control}
//                             name="bankName"
//                             render={({ field }) => (
//                               <Autocomplete
//                                 {...field}
//                                 options={
//                                   fetchFormData?.banks?.map(
//                                     item => item.name,
//                                   ) || []
//                                 }
//                                 onChange={(_, data) => {
//                                   field.onChange(data);
//                                 }}
//                                 renderInput={params => (
//                                   <TextField
//                                     {...params}
//                                     label={`${t(
//                                       translations.clubManagementConfirm
//                                         .bankName,
//                                     )}*`}
//                                     error={!!errors.bankName}
//                                     helperText={errors?.bankName?.message}
//                                   />
//                                 )}
//                               />
//                             )}
//                           />
//                         </Stack>
//                         <Stack mt={5}>
//                           <Controller
//                             control={control}
//                             name="bankNumber"
//                             render={({ field }) => (
//                               <TextField
//                                 {...field}
//                                 type="number"
//                                 error={!!errors.bankNumber}
//                                 label={`${t(
//                                   translations.clubManagementConfirm
//                                     .bankAccountNumber,
//                                 )}*`}
//                                 helperText={errors?.bankNumber?.message}
//                               />
//                             )}
//                           />
//                         </Stack>
//                         <Stack mt={5}>
//                           <Controller
//                             control={control}
//                             name="bankHolderName"
//                             render={({ field }) => (
//                               <TextField
//                                 {...field}
//                                 error={!!errors.bankHolderName}
//                                 inputProps={{
//                                   style: { textTransform: 'uppercase' },
//                                 }}
//                                 label={`${t(
//                                   translations.clubManagementConfirm
//                                     .bankHolderName,
//                                 )}*`}
//                                 helperText={errors?.bankHolderName?.message}
//                               />
//                             )}
//                           />
//                         </Stack>
//                         <Stack mt={5}>
//                           <Controller
//                             control={control}
//                             defaultValue={[]}
//                             name="clubCategories"
//                             render={({ field }) => {
//                               return (
//                                 <Autocomplete
//                                   multiple
//                                   {...field}
//                                   freeSolo
//                                   options={clubCategoriesData || []}
//                                   getOptionLabel={option => option.name || ''}
//                                   onChange={(_, data) => {
//                                     field.onChange(data);
//                                   }}
//                                   renderInput={params => (
//                                     <TextField
//                                       {...params}
//                                       label={`${t(
//                                         translations.clubManagementConfirm
//                                           .clubCategories,
//                                       )}*`}
//                                       error={!!errors?.clubCategories}
//                                       helperText={
//                                         (errors?.clubCategories as any)?.message
//                                       }
//                                     />
//                                   )}
//                                 />
//                               );
//                             }}
//                           />
//                         </Stack>
//                       </Grid>
//                       <Grid item xs={12} md={6}>
//                         <Stack>
//                           <Controller
//                             control={control}
//                             name="address"
//                             render={({ field }) => (
//                               <TextField
//                                 {...field}
//                                 error={!!errors.address}
//                                 label={`${t(
//                                   translations.common.addressDetail,
//                                 )}*`}
//                                 helperText={errors?.address?.message}
//                                 onChange={event => field.onChange(event)}
//                               />
//                             )}
//                           />
//                         </Stack>
//                         <Stack mt={5}>
//                           <Controller
//                             control={control}
//                             name="rtRwNumber"
//                             render={({ field }) => (
//                               <NumberFormat
//                                 format="###/###"
//                                 type="text"
//                                 label={`${t(
//                                   translations.createNewMemberPage.rtRwNumber,
//                                 )}*`}
//                                 customInput={TextField}
//                                 onChange={event => {
//                                   field.onChange(event);
//                                 }}
//                                 helperText={errors?.rtRwNumber?.message}
//                                 error={!!errors?.rtRwNumber}
//                               />
//                             )}
//                           />
//                         </Stack>
//                         <Stack mt={5}>
//                           <Controller
//                             control={control}
//                             name="province"
//                             render={({ field }) => {
//                               return (
//                                 <Autocomplete
//                                   {...field}
//                                   options={provinces || []}
//                                   getOptionLabel={option => option.name || ''}
//                                   onChange={(_, data) => {
//                                     field.onChange(data);
//                                     setValue('city', '');
//                                     setValue('district', '');
//                                     setValue('ward', '');
//                                   }}
//                                   renderInput={params => (
//                                     <TextField
//                                       {...params}
//                                       label={`${t(
//                                         translations.clubManagementConfirm
//                                           .province,
//                                       )}*`}
//                                       error={!!errors.province}
//                                       helperText={
//                                         errors?.province?.name?.message
//                                       }
//                                     />
//                                   )}
//                                 />
//                               );
//                             }}
//                           />
//                         </Stack>
//                         <Stack mt={5}>
//                           <Controller
//                             control={control}
//                             name="city"
//                             render={({ field }) => {
//                               return (
//                                 <Autocomplete
//                                   {...field}
//                                   options={
//                                     fetchFormData?.city?.map(
//                                       item => item.name,
//                                     ) || []
//                                   }
//                                   onChange={(_, data) => {
//                                     field.onChange(data);
//                                     setValue('district', '');
//                                     setValue('ward', '');
//                                   }}
//                                   disabled={!getValues('province')}
//                                   renderInput={params => (
//                                     <TextField
//                                       {...params}
//                                       label={`${t(translations.common.city)}*`}
//                                       error={!!errors.city}
//                                       helperText={errors?.city?.message}
//                                     />
//                                   )}
//                                 />
//                               );
//                             }}
//                           />
//                         </Stack>
//                         <Stack mt={5}>
//                           <Controller
//                             control={control}
//                             name="district"
//                             render={({ field }) => {
//                               return (
//                                 <Autocomplete
//                                   {...field}
//                                   options={
//                                     fetchFormData?.district?.map(
//                                       item => item.name,
//                                     ) || []
//                                   }
//                                   onChange={(_, data) => {
//                                     field.onChange(data);
//                                     setValue('ward', '');
//                                   }}
//                                   disabled={
//                                     !(
//                                       getValues('province') && getValues('city')
//                                     )
//                                   }
//                                   renderInput={params => (
//                                     <TextField
//                                       {...params}
//                                       label={`${t(
//                                         translations.common.district,
//                                       )}*`}
//                                       error={!!errors.district}
//                                       helperText={errors?.district?.message}
//                                     />
//                                   )}
//                                 />
//                               );
//                             }}
//                           />
//                         </Stack>
//                         <Stack mt={5}>
//                           <Controller
//                             control={control}
//                             name="ward"
//                             render={({ field }) => {
//                               return (
//                                 <Autocomplete
//                                   {...field}
//                                   options={
//                                     fetchFormData?.ward?.map(
//                                       item => item.name,
//                                     ) || []
//                                   }
//                                   onChange={(_, data) => {
//                                     field.onChange(data);
//                                   }}
//                                   disabled={
//                                     !(
//                                       getValues('province') &&
//                                       getValues('city') &&
//                                       getValues('district')
//                                     )
//                                   }
//                                   renderInput={params => (
//                                     <TextField
//                                       {...params}
//                                       label={`${t(translations.common.ward)}*`}
//                                       error={!!errors.ward}
//                                       helperText={errors?.ward?.message}
//                                     />
//                                   )}
//                                 />
//                               );
//                             }}
//                           />
//                         </Stack>
//                       </Grid>
//                     </Grid>
//                     <Grid sx={{ mt: 5 }}>
//                       <Fee
//                         transaction={
//                           {
//                             ...fee,
//                             taxPercent: 0.1,
//                           } as Transaction & { taxPercent: number }
//                         }
//                       />
//                       <Box style={{ display: 'flex', alignItems: 'center' }}>
//                         <Controller
//                           name="imiPaid"
//                           control={control}
//                           render={({ field }) => {
//                             return (
//                               <Box
//                                 sx={{ display: 'flex', alignItems: 'center' }}
//                               >
//                                 <Checkbox {...field} />
//                                 <Typography sx={{ fontWeight: 700 }}>
//                                   {t(translations.common.imiPaid)}
//                                 </Typography>
//                               </Box>
//                             );
//                           }}
//                         />
//                       </Box>
//                     </Grid>
//                     <Grid sx={{ mt: 5, textAlign: 'end' }}>
//                       <LoadingButton variant="contained" type="submit">
//                         {t(translations.clubManagementConfirm.createButton)}
//                       </LoadingButton>
//                     </Grid>
//                   </Card>
//                 </form>
//               </Box>
//             </Grid>
//           </Grid>
//           <ApprovalDialog
//             open={approvalDialogOpen}
//             title={t(translations.common.confirmApprove)}
//             description={
//               <KV>
//                 <Row>
//                   <Key>{t(translations.clubManagementConfirm.province)}</Key>
//                   <Value>: {formData?.province?.name}</Value>
//                 </Row>
//                 <Row>
//                   <Key>{t(translations.clubManagementConfirm.clubName)}:</Key>
//                   <Value>{formData?.name}</Value>
//                 </Row>
//                 <Row>
//                   <Key>{t(translations.common.picPhoneNumber)}</Key>
//                   <Value>{formData?.personInCharge}</Value>
//                 </Row>
//                 <Row>
//                   <Key>
//                     {t(translations.clubManagementConfirm.clubCategories)}:
//                   </Key>
//                   <Value>
//                     {formData?.clubCategories
//                       ?.map(value => value.name)
//                       .join(', ')}
//                   </Value>
//                 </Row>
//               </KV>
//             }
//             onCancel={() => setApprovalDialogOpen(false)}
//             onApprove={handleApprove}
//           />
//         </MainContent>
//       </Page>
//     );
//   }),
// );
