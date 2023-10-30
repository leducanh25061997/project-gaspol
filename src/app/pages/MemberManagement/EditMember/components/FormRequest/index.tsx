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
  FieldError,
} from 'react-hook-form';

import {
  IndividualInformation,
  IndividualRequest,
  Member,
  Transaction,
  Address,
} from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';
import { useNavigate } from 'react-router';

import { addressRegex } from 'utils/helpers/regex';

import { GeneralInformation } from '../GeneralInformation';
import { MemberInputForm } from '../MemberInputForm';

import { Footer } from '../Footer';

import { selectEditMember } from '../../slice/selectors';
import { useEditMemberSlice } from '../../slice';
import { MembershipForm } from '../MembershipForm';
import { AddressForm } from '../AddressForm';

interface Props {
  handleSubmitForm: (value?: any) => void;
  setFileData: (value?: any) => void;
  memberId: string;
  individualInformation?: IndividualInformation;
}

export const defaultCities: Address = {
  name: '',
  id: 0,
  path: '',
  parentId: 0,
};

export const defaultDistricts: Address = {
  name: '',
  id: 0,
  path: '',
  parentId: 0,
};

export const defaultWards: Address = {
  name: '',
  id: 0,
  path: '',
  parentId: 0,
};

export const FormRequest = memo(
  ({
    setFileData,
    handleSubmitForm,
    memberId,
    individualInformation,
  }: Props) => {
    const dispatch = useDispatch();
    const data = useSelector(selectEditMember);
    const fetchFormData = useSelector(selectEditMember);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { actions } = useEditMemberSlice();

    const [numberIsUnique, setNumberUnique] = React.useState<
      FieldError | undefined
    >();
    const [images, setImages] = useState({
      profilePicture: {
        file: null,
        url: individualInformation?.profilePicture
          ? individualInformation.profilePicture
          : '',
        name: '',
        nameFile: '',
      },
      nikPicture: {
        file: null,
        url: individualInformation?.documents?.length
          ? individualInformation?.documents[0]
          : '',
        name: '',
        nameFile: '',
      },
      simCarPicture: {
        file: null,
        url: individualInformation?.simCarPictureLink
          ? individualInformation?.simCarPictureLink
          : '',
        name: '',
        nameFile: '',
      },
    });

    const validateForm = yup.object().shape({
      expiredDate: yup
        .string()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .nullable(),
      fullName: yup
        .string()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .max(255, t(translations.editMember.fullNameMaxCharacter)),
      address: yup
        .string()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .max(255, t(translations.editMember.addressMax)),
      bloodType: yup
        .string()
        .required(t(translations.createNewMemberPage.commonRequiredField)),
      phone: yup
        .string()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .min(6, t(translations.editMember.phoneNumberToShort)),
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
      birthday: yup
        .string()
        .nullable()
        .required(t(translations.createNewMemberPage.commonRequiredField)),
      email: yup
        .string()
        .email(t(translations.editMember.emailisValid))
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .max(255, t(translations.editMember.emailMaxCharacter)),
      nationality: yup
        .string()
        .required(t(translations.createNewMemberPage.commonRequiredField)),
      rtRwNumber: yup
        .string()
        .required(t(translations.createNewMemberPage.commonRequiredField)),
      cities: yup
        .object()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .nullable(),
      districts: yup
        .object()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .nullable(),
      wards: yup
        .object()
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
      // postCode: yup
      //   .string()
      //   .required(t(translations.createNewMemberPage.commonRequiredField))
      //   .nullable(),
      ktaNumber: yup
        .string()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .max(10, t(translations.editMember.ktaNumberMaxCharacter))
        .nullable(),
      nikNumber: yup
        .string()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .nullable(),
      hobbies: yup
        .array()
        .required(t(translations.createNewMemberPage.commonRequiredField))
        .min(1, t(translations.createNewMemberPage.commonRequiredField))
        .nullable(),
    });

    const methods = useForm<IndividualRequest>({
      defaultValues: {
        imiPaid: false,
        cities: defaultCities,
        city: '',
        district: '',
        districts: defaultDistricts,
        ward: '',
        wards: defaultWards,
      },
      resolver: yupResolver(validateForm),
    });

    const oneNextYearDate = () => new Date().getFullYear() + 1;

    const onSubmit = (inputData: IndividualRequest) => {
      if (!numberIsUnique) {
        setFileData(images);
        // inputData.phone = `62${
        //   inputData.phone?.search('0') === 0
        //     ? inputData.phone?.slice(1)
        //     : inputData.phone
        // }`;
        handleSubmitForm({
          ...inputData,
        });
      }
    };

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
      if (methods.getValues('cities')) {
        dispatch(
          actions.fetchDistrict({
            cityId: fetchFormData?.city?.find(
              value => value.name === methods.getValues('cities')?.name,
            )?.id,
          }),
        );
      }
    }, [methods.watch(['cities']) && methods.getValues('cities')]);

    React.useEffect(() => {
      if (methods.getValues('districts')) {
        dispatch(
          actions.fetchWard({
            districtId: fetchFormData?.district?.find(
              value => value.name === methods.getValues('districts')?.name,
            )?.id,
          }),
        );
      }
    }, [methods.watch(['districts']) && methods.getValues('districts')]);

    React.useEffect(() => {
      setImages({
        ...images,
        profilePicture: {
          ...images.profilePicture,
          url: individualInformation?.profilePicture
            ? individualInformation?.profilePicture
            : '',
        },
        nikPicture: {
          ...images.nikPicture,
          url: individualInformation?.documents?.length
            ? individualInformation.documents[0]
            : '',
        },
        simCarPicture: {
          ...images.simCarPicture,
          url: individualInformation?.simCarPictureLink || '',
        },
      });
      // setImages({
      //   ...images,
      //   nikPicture: {
      //     ...images.nikPicture,
      //     url: individualInformation?.documents?.length
      //       ? individualInformation.documents[0]
      //       : '',
      //   },
      //   simCarPicture: {
      //     ...images.simCarPicture,
      //     url: individualInformation?.simCarPictureLink || '',
      //   },
      // });
    }, [individualInformation]);

    React.useEffect(() => {
      if (memberId) {
        dispatch(actions.fetchIndividualInformation(memberId));
      }
    }, [memberId, dispatch, actions]);
    return (
      <>
        <FormProvider {...methods}>
          <GeneralImageDetail
            images={images}
            setImages={setImages}
            nikDriveNumber={[
              individualInformation?.identification?.identifierNikNumber || '',
              individualInformation?.identification?.identifierKtpNumber || '',
              individualInformation?.identification?.identifierKitasNumber ||
                '',
              individualInformation?.simCar || '',
            ]}
            info={individualInformation}
          />
          <MembershipForm
            info={individualInformation}
            setNumberUnique={setNumberUnique}
            numberIsUnique={numberIsUnique}
          />
          <MemberInputForm info={individualInformation} />
          <AddressForm info={individualInformation} />
          <Footer
            handleSubmit={methods.handleSubmit(onSubmit)}
            handleCancel={() => navigate(`/memberships/${memberId}`)}
          />
        </FormProvider>
      </>
    );
  },
);
