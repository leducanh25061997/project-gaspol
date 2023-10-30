/**
 *
 * EditMember
 *
 */
import { withTitle } from 'app/components/HOC/WithTitle';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import path from 'app/routes/path';
import { Grid, Stack, Typography, styled } from '@mui/material';
import { translations } from 'locales/translations';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { useLoading } from 'app/hooks';

import { MemberPhotos } from 'app/components/MemberPhotos';
import { LoadingButton } from '@mui/lab';

import { CreateDialog } from 'app/components/CreateDialog';
import { ClubRequestStatus } from 'types/enums';
import { withLoading } from 'app/components/HOC/WithLoading';
import Notifier from 'app/pages/Notifier';
import Page from 'app/components/Page';
import { Header } from 'app/components/Header';
import { FieldError, FormProvider, useForm } from 'react-hook-form';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';
import {
  IndividualInformation,
  IndividualInformationV2,
  IndividualRequest,
} from 'types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressRegex } from 'utils/helpers/regex';

import { ApprovalDialog } from 'app/components/ApprovalDialog';

import { useMemberInformationSlice } from '../MemberInformation/slice';

import { Footer } from './components/Footer';
import { MemberInputForm } from './components/MemberInputForm';
import { GeneralInformation } from './components/GeneralInformation';
import { selectEditMember, selectMemberInformation } from './slice/selectors';

import { useEditMemberSlice } from './slice';
import { FormRequest } from './components/FormRequest';

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

interface Props {}

const EditMember = withLoading(
  memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    // console.log(id);
    const [fileData, setFileData] = React.useState<any | undefined>();
    const [isApprove, setIsApprove] = React.useState<boolean | undefined>(
      false,
    );
    const [formData, setFormData] = React.useState<
      IndividualInformation | undefined
    >();

    // const [openConfirmModal, setOpenConfirmModal] = useState(false);

    const { actions } = useEditMemberSlice();
    const navigate = useNavigate();
    const memberInformation = useSelector(selectMemberInformation);

    const handleSubmitForm = (data: any) => {
      setFormData({ ...memberInformation, ...data, id });
      // setOpenConfirmModal(true);
      setIsApprove(true);
    };

    useEffect(() => {
      dispatch(actions.fetchProvinceRequests());
      dispatch(actions.fetchCategories());
      dispatch(actions.fetchBirthPlaceCity({ name: '' }));
    }, []);

    React.useEffect(() => {
      id && dispatch(actions.fetchIndividualInformation(id));
    }, []);

    React.useEffect(() => {
      if (formData && fileData && isApprove) {
        const newData = { ...fileData };

        const files = [];

        if (fileData?.profilePicture?.file) {
          files.push(fileData?.profilePicture?.nameFile);
        } else {
          delete newData?.profilePicture;
        }
        if (fileData?.nikPicture?.file) {
          files.push(fileData?.nikPicture?.nameFile);
        } else {
          delete newData?.nikPicture;
        }

        if (fileData?.simCarPicture?.file) {
          files.push(fileData?.simCarPicture?.nameFile);
        } else {
          delete newData?.simCarPicture;
        }
        dispatch(
          actions.editMemberRequest({
            files: {
              fileNames: files,
            },
            formData: {
              ...formData,
              provinceId: formData?.province?.id,
              cityId: formData?.cities?.id,
              districtId: formData?.districts?.id,
              wardId: formData?.wards?.id,
              hobbies: formData?.hobbies,
              identification: {
                identifierNikNumber:
                  formData?.nikType === 'NIK' ? formData.nikNumber : '',
                identifierKitasNumber:
                  formData?.nikType === 'KITAS' ? formData.nikNumber : '',
                identifierKtpNumber:
                  formData?.nikType === 'KTP' ? formData.nikNumber : '',
              },
            },
            fileData: newData,
            id,
            navigate,
            t,
            translations,
          }),
        );
      }
      setIsApprove(false);
      // setOpenConfirmModal(false);
    }, [isApprove]);

    const { showLoading, hideLoading } = useLoading({ setLoading: Function });

    return (
      <Page title={t(translations.editMember.title)}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <RootStyle>
              <FormRequest
                memberId={id || 'undefined'}
                handleSubmitForm={handleSubmitForm}
                setFileData={setFileData}
                individualInformation={memberInformation?.ktaMembershipInfor}
              />
              {/* <ApprovalDialog
                title={t(translations.common.confirmation)}
                description={t(translations.common.areYouWantCreateMember)}
                open={openConfirmModal}
                isConfirmDialog
                onCancel={() => setOpenConfirmModal(false)}
                onApprove={() => {
                  setIsApprove(true);
                }}
              /> */}
            </RootStyle>
          </Grid>
        </Grid>
      </Page>
    );
  }),
);

export default withTitle(EditMember, 'editMember.title');
