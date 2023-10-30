import React, { memo, useState } from 'react';
import { Typography, Checkbox, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { translations } from 'locales/translations';
import {
  useForm,
  FormProvider,
  Controller,
  useFormContext,
} from 'react-hook-form';

import { IndividualInformation, Member, Transaction } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';
import moment from 'moment';

import { selectEditIndividualMember } from '../../slice/selectors';
import { useEditIndividualMemberSlice } from '../../slice';
import { InputFieldsRequest } from '../InputFieldsRequest';
import { ClubStatusNote } from '../ClubStatusNote';
import { Footer } from '../Footer';

interface Props {
  handleSubmitForm: (value?: any) => void;
  setFileData: (value?: any) => void;
  memberId: string;
  individualInformation?: IndividualInformation;
}

export const FormRequest = memo(
  ({
    setFileData,
    handleSubmitForm,
    memberId,
    individualInformation,
  }: Props) => {
    const dispatch = useDispatch();
    const data = useSelector(selectEditIndividualMember);
    const { t } = useTranslation();
    const countryCodeNumber: string = '62';
    const formRequestErrors = yup.object().shape({
      name: yup
        .string()
        .required(t(translations.createNewMemberPage.fullnameIsRequired)),
      address: yup
        .string()
        .required(t(translations.createNewMemberPage.addressIsRequired)),
      bloodType: yup
        .string()
        .required(t(translations.createNewMemberPage.bloodTypeIsRequired)),
      gender: yup
        .string()
        .required(t(translations.createNewMemberPage.genderIsRequired)),
      province: yup
        .string()
        .required(t(translations.createNewMemberPage.provinceIsRequired))
        .nullable(),
      birthPlace: yup
        .string()
        .required(t(translations.createNewMemberPage.birthPlaceIsRequired))
        .nullable(),
      postalCode: yup
        .string()
        .required(t(translations.createNewMemberPage.postalCodeIsRequired)),
      nikNumber: yup
        .string()
        .required(t(translations.createNewMemberPage.nikNumberIsRequired))
        .matches(/^[0-9]+$/, t(translations.createNewMemberPage.nikNumber)),
      dob: yup
        .string()
        .required(t(translations.createNewMemberPage.dateOfBirthIsRequired))
        .nullable(),
      rtRwNumber: yup
        .string()
        .required(t(translations.createNewMemberPage.rtRwNumberError))
        .matches(
          /^[0-9]+$/,
          t(translations.createNewMemberPage.rtRwNumberMatch),
        ),
      email: yup
        .string()
        .email(t(translations.createNewMemberPage.emailisValid))
        .required(t(translations.createNewMemberPage.emailIsRequired)),
      nationality: yup
        .string()
        .required(t(translations.createNewMemberPage.nationalityIsRequired))
        .nullable(),
      note: yup
        .string()
        .required(t(translations.VerifyMembershipEdit.leaveNote)),
    });

    const [fee, setFee] = useState({
      annualFee: 0,
      initFee: 0,
      packageName: '',
      processingFee: 0,
      transactionId: '',
    });

    const { actions } = useEditIndividualMemberSlice();
    const { userPackage } = useSelector(selectEditIndividualMember);
    const [images, setImages] = useState({
      profilePicture: {
        file: null,
        url: individualInformation?.profilePicture
          ? individualInformation?.profilePicture
          : '',
        name: '',
        nameFile: '',
      },
      nikPicture: {
        file: null,
        url: individualInformation?.nikPicture
          ? individualInformation?.nikPicture
          : '',
        name: '',
        nameFile: '',
      },
      simCarPicture: {
        file: null,
        url: individualInformation?.simCarPicture
          ? individualInformation?.simCarPicture
          : '',
        name: '',
        nameFile: '',
      },
    });

    const methods = useForm<Member>({
      defaultValues: {},
      resolver: yupResolver(formRequestErrors),
    });

    const oneNextYearDate = () => new Date().getFullYear() + 1;

    const onSubmit = (data: any) => {
      setFileData(images);
      handleSubmitForm({
        ...data,
        phone: `${countryCodeNumber}${data?.phone}`,
        expiredDate: oneNextYearDate(),
      });
    };

    React.useEffect(() => {
      setImages({
        ...images,
        profilePicture: {
          ...images.profilePicture,
          url: individualInformation?.profilePicture || '',
        },
        nikPicture: {
          ...images.nikPicture,
          url: individualInformation?.nikPicture || '',
        },
        simCarPicture: {
          ...images.simCarPicture,
          url: individualInformation?.simCarPicture || '',
        },
      });
    }, [individualInformation?.profilePicture]);

    React.useEffect(() => {
      if (memberId) {
        dispatch(actions.fetchMembershipRequestDetail(memberId));
      }
    }, [memberId, dispatch, actions]);

    const isOver24Hours: boolean = React.useMemo(() => {
      const time = userPackage?.individualInfo?.registerTime || Date.now();
      return moment().diff(moment(time), 'hours') > 24;
    }, [userPackage?.individualInfo?.registerTime]);

    const currentStatus = React.useMemo(() => {
      if (isOver24Hours) {
        return 'Switch Club';
      }
      return 'Waiting Approve';
    }, [isOver24Hours]);

    return (
      <>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <GeneralImageDetail
              images={images}
              setImages={setImages}
              nikDriveNumber={[
                individualInformation?.nikNumber || '',
                individualInformation?.simCar || '',
              ]}
              info={individualInformation}
              enableDriverLicense
            />
            <InputFieldsRequest initialInfo={individualInformation} />
            <ClubStatusNote
              info={individualInformation}
              status={currentStatus}
            />
            <Footer />
          </form>
        </FormProvider>
      </>
    );
  },
);
