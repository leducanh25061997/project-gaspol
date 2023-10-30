import { takeLatest, put, call } from 'redux-saga/effects';
import {
  CategoriesService,
  ClubService,
  MemberService,
  MembershipService,
  ProfileService,
  ProvinceService,
} from 'services';
import { get, isNaN } from 'lodash';
import Notifier from 'app/pages/Notifier';
import {
  Province,
  Pageable,
  FileUpload,
  ClubParams,
  ParamsUrl,
  Package,
  Memberships,
  PageableClub,
  MembershipsReponAblepage,
  Clubdata,
  Profile,
  PhoneNumberRequest,
  Category,
  Address,
  AddressRequest,
  IndividualInformation,
  FormParams,
  CreateClubFormRequest,
  ClubDocumentSubmit,
  IndividualInformationV2,
  KtaNumberRequest,
} from 'types';
import { UserPackageType, AddressField } from 'types/enums';

import path from 'app/routes/path';
import { PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { editMemberActions } from '.';

function* provinceRequest() {
  try {
    const result: Province[] = yield call(MemberService.fetchProvince);
    yield put(editMemberActions.fetchProvinceRequestsSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* submitClubDocuments(action: PayloadAction<CreateClubFormRequest>) {
  try {
    const form: FormParams[] = [];
    if (action.payload.forms) {
      form.push(
        ...Object.keys(action.payload.forms).map(key => {
          return {
            key: `indi.${key}`,
            values: [get(action.payload.forms, key)],
          };
        }),
      );
      const params: CreateClubFormRequest = {
        membershipType: UserPackageType.TKT,
        forms: form,
        userUuid: action.payload.userUuid,
      };
      yield call(ClubService.createClubRequest, params);
      yield put(editMemberActions.editMemberRequestsSuccess('success'));
    }
  } catch (error) {
    console.log(error);
  }
}

function* editMemberRequest(action: PayloadAction<any>) {
  try {
    if (
      action.payload?.files?.fileNames &&
      action.payload?.files?.fileNames.length > 0
    ) {
      const result: FileUpload[] = yield call(
        MemberService.fetchUrlImages,
        action.payload.files,
      );
      yield put(editMemberActions.fetchUrlFileRequestsSuccess(result));
      if (result.length > 0) {
        const fileUrlData: any[] = [];
        if (action.payload.fileData?.profilePicture) {
          fileUrlData.push({
            name: action.payload.fileData?.profilePicture?.name,
            files: action.payload.fileData?.profilePicture?.file,
          });
        }
        if (action.payload.fileData?.nikPicture) {
          fileUrlData.push({
            name: action.payload.fileData?.nikPicture?.name,
            files: action.payload.fileData?.nikPicture?.file,
          });
        }
        if (action.payload.fileData?.simCarPicture) {
          fileUrlData.push({
            name: action.payload.fileData?.simCarPicture?.name,
            files: action.payload.fileData?.simCarPicture?.file,
          });
        }

        const urldata: ParamsUrl[] = [];
        result?.map((value, index) => {
          urldata.push({
            url: value.url,
            key: value.key,
            name: fileUrlData[index].name,
            files: fileUrlData[index].files,
          });
        });
        const resultUrlData: ParamsUrl[] = yield call(
          MemberService.getUrlImageData,
          urldata,
        );
        if (resultUrlData.length > 0) {
          const formData = { ...action.payload.formData };
          if (resultUrlData?.find(a => a.name === 'nikPicture')) {
            formData.documents = [];
            formData.documents.push(
              resultUrlData.filter(
                (value, index) => value.name === 'nikPicture',
              )[0]?.key,
            );
          }
          if (resultUrlData?.find(a => a.name === 'profilePicture')) {
            formData.profilePicture = resultUrlData.filter(
              (value, index) => value.name === 'profilePicture',
            )[0]?.key;
          }
          if (resultUrlData?.find(a => a.name === 'simCarPicture')) {
            formData.simCarPicture = resultUrlData.filter(
              (value, index) => value.name === 'simCarPicture',
            )[0].key;
          }
          const birthdayMoment = moment(formData.birthday);
          if (birthdayMoment.isValid()) {
            formData.birthday = moment(formData.birthday).format('DD/MM/YYYY');
          } else {
            if (!isNaN(+formData.birthday)) {
              formData.birthday = moment(+formData.birthday).format(
                'DD/MM/YYYY',
              );
            }
          }
          delete formData.phone;
          delete formData.memberStatus;
          delete formData.status;
          const data = {
            packageId:
              action.payload.formData?.ktaMembershipInfor?.subscribingPackage
                ?.id,
            kta: formData,
            id: action.payload.formData?.ktaMembershipInfor?.id,
          };
          // console.log(data);
          const resultMember: MembershipsReponAblepage = yield call(
            MembershipService.editIndividualMember,
            data,
          );
          const { navigate } = action.payload;
          Notifier.addNotifySuccess({
            messageId: 'User has been updated successfully',
          });
          navigate(`/memberships/${action.payload.id}`);
        }
      }
    } else {
      const { navigate } = action.payload;
      const formData = { ...action.payload.formData };
      delete formData.phone;
      delete formData.memberStatus;
      delete formData.status;
      delete formData.profilePicture;
      const birthdayMoment = moment(formData.birthday);
      if (birthdayMoment.isValid()) {
        formData.birthday = moment(formData.birthday).format('DD/MM/YYYY');
      } else {
        if (!isNaN(+formData.birthday)) {
          formData.birthday = moment(+formData.birthday).format('DD/MM/YYYY');
        }
      }
      const data = {
        packageId:
          action.payload.formData?.ktaMembershipInfor?.subscribingPackage?.id,
        kta: formData,
        id: action.payload.formData?.ktaMembershipInfor?.id,
      };
      // console.log(data);
      const resultMember: MembershipsReponAblepage = yield call(
        MembershipService.editIndividualMember,
        data,
      );
      Notifier.addNotifySuccess({
        messageId: action.payload.t(
          action.payload.translations.VerifyMembershipEdit.createSuccess,
        ),
      });
      navigate(`/memberships/${action.payload.id}`);
    }
  } catch (err) {
    Notifier.addNotifyError({ messageId: 'Update User has been failed' });
  }
}

function* packagesRequest() {
  try {
    const result: Memberships[] = yield call(MemberService.fetchMemberShip);
    if (result.length > 0) {
      const memberShipId = result.filter(
        (value, index) => value.type === UserPackageType.KTA,
      )[0]?.id;
      const resultPackages: Package[] = yield call(
        MemberService.fetchPackages,
        Number(memberShipId),
      );
      yield put(editMemberActions.packagesRequestSuccess(resultPackages));
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchClubs(action: PayloadAction<ClubParams>) {
  try {
    const result: PageableClub<Clubdata> = yield call(
      MemberService.fetchClubs,
      action.payload,
    );
    const newResult: ClubParams = { ...result };
    newResult.change = action.payload.change;
    newResult.isLastItem = action.payload.isLastItem;
    newResult.size = action.payload.size;
    newResult.isScroll = action.payload.isScroll;
    yield put(editMemberActions.clubsRequestSuccess(newResult));
  } catch (err) {
    console.log(err);
  }
}

function* checkPhoneNumberUnique(action: PayloadAction<PhoneNumberRequest>) {
  try {
    const result: Profile[] = yield call(
      ProfileService.findMemberByPhone,
      action.payload,
    );
    yield put(editMemberActions.checkPhoneNumberRequestSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* checkKtaNumberUnique(action: PayloadAction<KtaNumberRequest>) {
  try {
    const result: Profile[] = yield call(
      MembershipService.checkKtaNumber,
      action.payload,
    );
    yield put(editMemberActions.checkKtaNumberRequestSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchCategories() {
  try {
    const resultClubCategories: Category[] = yield call(
      CategoriesService.fetchCategories,
      'EMOJI',
    );
    yield put(editMemberActions.fetchCategoriesSuccess(resultClubCategories));
  } catch (error) {
    console.log(error);
  }
}

function* fetchCity(action: PayloadAction<AddressRequest>) {
  try {
    const resultCity: Address[] = yield call(ProvinceService.fetchAddress, {
      id: action.payload.provinceId,
      type: AddressField.CITY,
    });
    yield put(editMemberActions.fetchCitySuccess(resultCity));
  } catch (error) {
    console.log(error);
  }
}

function* fetchDistrict(action: PayloadAction<AddressRequest>) {
  try {
    const resultDistrict: Address[] = yield call(ProvinceService.fetchAddress, {
      id: action.payload.cityId,
      type: AddressField.DISTRICT,
    });
    yield put(editMemberActions.fetchDistrictSuccess(resultDistrict));
  } catch (error) {
    console.log(error);
  }
}

function* fetchWard(action: PayloadAction<AddressRequest>) {
  try {
    const resultWard: Address[] = yield call(ProvinceService.fetchAddress, {
      id: action.payload.districtId,
      type: AddressField.WARD,
    });
    yield put(editMemberActions.fetchWardSuccess(resultWard));
  } catch (error) {
    console.log(error);
  }
}

function* fetchIndividualInformation(action: PayloadAction<string>) {
  try {
    yield put(editMemberActions.updateLoading(true));
    const result: IndividualInformationV2 = yield call(
      MembershipService.fetchIndividualInformation,
      action.payload,
    );
    yield put(editMemberActions.fetchIndividualInformationSuccess(result));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(editMemberActions.updateLoading(false));
  }
}

function* fetchBirthPlaceCity(action: PayloadAction<AddressRequest>) {
  try {
    const resultBirthPlaceCity: Address[] = yield call(
      ProvinceService.fetchBirthPlaceCity,
      {
        name: action.payload.name,
        type: AddressField.CITY,
      },
    );
    yield put(
      editMemberActions.fetchBirthPlaceCitySuccess(resultBirthPlaceCity),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* editMemberSaga() {
  yield takeLatest(
    editMemberActions.fetchIndividualInformation.type,
    fetchIndividualInformation,
  );
  yield takeLatest(editMemberActions.fetchProvinceRequests, provinceRequest);
  yield takeLatest(editMemberActions.editMemberRequest.type, editMemberRequest);
  yield takeLatest(editMemberActions.submitClubDocuments, submitClubDocuments);
  yield takeLatest(editMemberActions.fetchCity.type, fetchCity);
  yield takeLatest(editMemberActions.fetchDistrict.type, fetchDistrict);
  yield takeLatest(editMemberActions.fetchWard.type, fetchWard);
  yield takeLatest(editMemberActions.packagesRequest, packagesRequest);
  yield takeLatest(editMemberActions.clubsRequest.type, fetchClubs);
  yield takeLatest(
    editMemberActions.checkPhoneNumberRequest.type,
    checkPhoneNumberUnique,
  );
  yield takeLatest(
    editMemberActions.checkKtaNumberUnique,
    checkKtaNumberUnique,
  );
  yield takeLatest(editMemberActions.fetchCategories.type, fetchCategories);
  yield takeLatest(
    editMemberActions.fetchBirthPlaceCity.type,
    fetchBirthPlaceCity,
  );
}
