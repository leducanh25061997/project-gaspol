import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  ClubService,
  ProvinceService,
  MembershipService,
  PackageService,
  CategoriesService,
  ProfileService,
  BankService,
  MemberService,
} from 'services';

import {
  CreateClubFormRequest,
  Membership,
  Province,
  Package,
  Category,
  Profile,
  PhoneNumberRequest,
  Address,
  AddressRequest,
  Bank,
  FileUpload,
  ParamsUrl,
} from 'types';

import { UserPackageType, AddressField } from 'types/enums';
import Notifier from 'app/pages/Notifier';
import { ClubNameRequest, ClubNameResponse } from 'types/ClubManagement';

import { clubManagementCreateActions as actions } from '.';

function* clubCreate(action: PayloadAction<any>) {
  try {
    const result: FileUpload[] = yield call(
      MemberService.fetchUrlImages,
      action.payload.files,
    );
    yield put(actions.fetchUrlFileRequestsSuccess(result));
    if (result.length > 0) {
      const fileUrlData: any[] = [];
      if (action.payload.images?.artDocuments?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.artDocuments?.name,
          files: action.payload.images?.artDocuments?.file,
        });
      }
      if (action.payload.images?.certDocuments?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.certDocuments?.name,
          files: action.payload.images?.certDocuments?.file,
        });
      }
      if (action.payload.images?.clubPicture?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.clubPicture?.name,
          files: action.payload.images?.clubPicture?.file,
        });
      }
      action.payload.images.additionalDocuments.map(
        (additionalDocument: any, index: number) => {
          if (additionalDocument.file != null) {
            fileUrlData.push({
              name: additionalDocument.name,
              files: additionalDocument.file,
            });
          }
        },
      );
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
        const formData = { ...action.payload.formRequest };
        formData.members = action.payload.membersRequest;
        formData.clubCategory =
          action.payload.formRequest.clubCategory.toUpperCase();
        // formData.ClubCategory = action.payload.formRequest.clubCategory;
        if (resultUrlData?.find(a => a.name === 'artDocuments')) {
          formData.artDocuments = [];
          formData.artDocuments.push(
            resultUrlData.filter(
              (value, index) => value.name === 'artDocuments',
            )[0]?.key,
          );
        }
        if (resultUrlData?.find(a => a.name === 'certDocuments')) {
          formData.certDocuments = [];
          formData.certDocuments.push(
            resultUrlData.filter(
              (value, index) => value.name === 'certDocuments',
            )[0]?.key,
          );
        }
        if (resultUrlData?.find(a => a.name === 'clubPicture')) {
          formData.avatarUrl = resultUrlData.filter(
            (value, index) => value.name === 'clubPicture',
          )[0]?.key;
        }
        if (resultUrlData?.find(a => a.name === 'additionalDocuments')) {
          formData.additionalDocuments = [];
          resultUrlData.map((item: any) => {
            if (item.name === 'additionalDocuments') {
              formData.additionalDocuments.push(item.key);
            }
          });
        }
        const data = {
          requestCheckout: !formData.imiPaid,
          packageId: action.payload.packageId,
          ownerUserUuid: action.payload.ownerUserUuid,
          tkt: formData,
        };
        const resultMember: CreateClubFormRequest = yield call(
          ClubService.createClubRequest,
          data,
        );
        const { navigate } = action.payload;
        Notifier.addNotifySuccess({
          messageId: 'User has been created successfully',
        });
        navigate(`/clubs/list`);
      }
    }
    // yield call(ClubService.createClubRequest, action.payload);
    // yield put(actions.createClubSuccess());
    // action.meta();
  } catch (error: any) {
    Notifier.addNotifyError({ messageId: error.response.data.messages[0] });
  }
}

function* fetchProvinces() {
  try {
    const resultProvince: Province[] = yield call(
      ProvinceService.fetchProvince,
    );
    yield put(actions.fetchProvinceSuccess(resultProvince));
  } catch (error) {
    console.log(error);
  }
}

function* fetchListBanks() {
  try {
    const result: Bank[] = yield call(BankService.fetchListBanks);
    yield put(actions.fetchBankSuccess(result));
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
    yield put(actions.fetchCitySuccess(resultCity));
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
    yield put(actions.fetchDistrictSuccess(resultDistrict));
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
    yield put(actions.fetchWardSuccess(resultWard));
  } catch (error) {
    console.log(error);
  }
}

function* fetchPackages() {
  try {
    const resultMembership: Membership[] = yield call(
      MembershipService.fetchMembership,
    );
    yield put(actions.fetchMembershipSuccess(resultMembership));

    if (resultMembership.length > 0) {
      const membershipId = resultMembership.find(
        (value, index) => value.code === UserPackageType.TKT,
      )?.id;

      const packageResult: Package = yield call(
        PackageService.fetchPackages,
        Number(membershipId),
      );

      yield put(actions.fetchPackagesSuccess(packageResult));
    }
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
    yield put(actions.fetchClubCategoriesSuccess(resultClubCategories));
    const resultKisCategories: Category[] = yield call(
      CategoriesService.fetchCategories,
      'KIS',
    );
    yield put(actions.fetchKisCategoriesSuccess(resultKisCategories));
  } catch (error) {
    console.log(error);
  }
}
function* checkPhoneNumberUnique(action: PayloadAction<PhoneNumberRequest>) {
  try {
    const result: Profile[] = yield call(
      ProfileService.findUserByPhone,
      action.payload,
    );
    yield put(actions.checkPhoneNumberRequestSuccess(result));
  } catch (error) {
    yield put(actions.checkPhoneNumberRequestFailed(error));
  }
}

function* packageProRequest() {
  try {
    const resultPackages: Package[] = yield call(
      MemberService.fetchProPackage,
      'IMI_CLUB',
    );
    yield put(actions.packageProRequestSuccess(resultPackages));
  } catch (error) {
    console.log(error);
  }
}

function* checkClubnameUnique(
  action: PayloadAction<
    ClubNameRequest,
    string,
    (clubNameResponse?: ClubNameResponse) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: ClubNameResponse = yield call(
      ProfileService.findClubname,
      action.payload,
    );
    yield put(actions.checkClubnameRequestSuccess(result));
    if (meta) {
      meta(result);
    }
  } catch (error) {
    if (meta) {
      meta(undefined);
    }
    console.log(error);
  }
}

function* resetDataProfile(action: PayloadAction<ClubNameRequest>) {
  yield put(actions.resetProfileSucess());
}

export function* clubManagementCreateSaga() {
  yield takeLatest(actions.createClub.type, clubCreate);
  yield takeLatest(actions.fetchCategories.type, fetchCategories);
  yield takeLatest(actions.fetchPackages.type, fetchPackages);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(
    actions.checkPhoneNumberRequest.type,
    checkPhoneNumberUnique,
  );
  yield takeLatest(actions.checkClubnameRequest.type, checkClubnameUnique);
  yield takeLatest(actions.fetchCity.type, fetchCity);
  yield takeLatest(actions.fetchDistrict.type, fetchDistrict);
  yield takeLatest(actions.fetchWard.type, fetchWard);
  yield takeLatest(actions.fetchBank.type, fetchListBanks);
  yield takeLatest(actions.packageProRequest, packageProRequest);
  yield takeLatest(actions.resetProfile.type, resetDataProfile);
}
