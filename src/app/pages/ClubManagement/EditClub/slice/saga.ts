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
  ClubInformation,
  Bank,
  EditClubFormRequest,
  FileUpload,
  ParamsUrl,
  UpdateClubFormRequest,
  FilterParams,
  RequestJoinClubList,
  Pageable,
} from 'types';

import { UserPackageType, AddressField } from 'types/enums';

import Notifier from 'app/pages/Notifier';

import { ClubNameRequest, ClubNameResponse } from 'types/ClubManagement';

import { clubManagementEditActions as actions } from '.';

function* clubCreate(
  action: PayloadAction<CreateClubFormRequest, string, (error?: any) => void>,
) {
  try {
    yield call(ClubService.createClubRequest, action.payload);
    yield put(actions.updateClubSuccess());
    action.meta();
  } catch (error: any) {
    Notifier.addNotifyError({ messageId: 'Update Club Failed' });
  }
}

function* updateClub(action: PayloadAction<any>) {
  try {
    if (action.payload.files.fileNames.length > 0) {
      const result: FileUpload[] = yield call(
        MemberService.fetchUrlImages,
        action.payload.files,
      );
      yield put(actions.fetchUrlFileRequestsSuccess(result));
      if (result.length > 0) {
        const fileUrlData: any[] = [];
        if (action.payload.images?.artDocuments?.file) {
          fileUrlData.push({
            name: action.payload.images?.artDocuments?.name,
            files: action.payload.images?.artDocuments?.file,
          });
        }
        if (action.payload.images?.certDocuments?.file) {
          fileUrlData.push({
            name: action.payload.images?.certDocuments?.name,
            files: action.payload.images?.certDocuments?.file,
          });
        }
        if (action.payload.images?.clubPicture?.file) {
          fileUrlData.push({
            name: action.payload.images?.clubPicture?.name,
            files: action.payload.images?.clubPicture?.file,
          });
        }
        action.payload.images.additionalDocuments.map(
          (additionalDocument: any, index: number) => {
            if (additionalDocument.file) {
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
          // console.log(formData, 'formData')
          formData.members = action.payload.membersRequest;
          formData.ClubCategory = action.payload.formRequest.clubCategory;
          if (resultUrlData?.find(a => a.name === 'artDocuments')) {
            formData.artDocuments = [];
            formData.artDocuments.push(
              resultUrlData.filter(
                (value, index) => value.name === 'artDocuments',
              )[0]?.key,
            );
          } else {
            formData.artDocuments = formData.artDocumentsKeyS3;
          }
          if (resultUrlData?.find(a => a.name === 'certDocuments')) {
            formData.certDocuments = [];
            formData.certDocuments.push(
              resultUrlData.filter(
                (value, index) => value.name === 'certDocuments',
              )[0]?.key,
            );
          } else {
            formData.certDocuments = formData.certDocumentsKeyS3 || [];
          }
          if (resultUrlData?.find(a => a.name === 'additionalDocuments')) {
            formData.additionalDocuments = [];
            resultUrlData.map((item: any) => {
              if (item.name === 'additionalDocuments') {
                formData.additionalDocuments.push(item.key);
              }
            });
            action.payload.images.additionalDocuments.map((item: any) => {
              if (item.key && item.key !== '') {
                formData.additionalDocuments.push(item.key);
              }
            });
          } else {
            formData.additionalDocuments =
              formData.additionalDocumentsKeyS3 || [];
          }
          if (resultUrlData?.find(a => a.name === 'clubPicture')) {
            formData.avatarUrl = resultUrlData.filter(
              (value, index) => value.name === 'clubPicture',
            )[0]?.key;
          } else {
            formData.avatarUrl = formData.avatarKeyS3;
          }
          const data = {
            clubMembershipId: action.payload.clubMembershipId,
            clubData: formData,
          };
          const resultMember: UpdateClubFormRequest = yield call(
            ClubService.updateClubRequest,
            data,
          );
          const { navigate } = action.payload;
          Notifier.addNotifySuccess({
            messageId: 'User has been updated successfully',
          });
          navigate(`/clubs/${action.payload.clubMembershipId}`);
        }
      }
    } else {
      const formData = { ...action.payload.formRequest };
      formData.members = action.payload.membersRequest;
      formData.certDocuments = formData.certDocuments
        ? formData.certDocumentsKeyS3
        : [];
      formData.artDocuments = formData.artDocuments
        ? formData.artDocumentsKeyS3
        : [];
      formData.ClubCategory = formData.clubCategory;
      delete formData.clubCategory;
      formData.bankHolderName =
        action.payload.formRequest.bankHolderName &&
        action.payload.formRequest.bankHolderName.toUpperCase();
      // console.log(formData, 'formData ----- 111');
      const data = {
        clubMembershipId: action.payload.clubMembershipId,
        clubData: formData,
      };
      const resultMember: UpdateClubFormRequest = yield call(
        ClubService.updateClubRequest,
        data,
      );
      const { navigate } = action.payload;
      Notifier.addNotifySuccess({
        messageId: 'User has been updated successfully',
      });
      navigate(`/clubs/${action.payload.clubMembershipId}`);
    }

    // yield call(ClubService.updateClubRequest, action.payload);
    // yield put(actions.updateClubSuccess());
  } catch (error: any) {
    Notifier.addNotifyError({ messageId: 'Update Club Failed' });
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

function* fetchClub(action: PayloadAction<string>) {
  try {
    const result: ClubInformation = yield call(
      ClubService.fetchClubInformation,
      action.payload,
    );
    yield put(actions.fetchClubSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchListMemberOfClub(action: PayloadAction<FilterParams>) {
  try {
    const result: Pageable<RequestJoinClubList> = yield call(
      ClubService.memberClubRequest,
      action.payload,
    );
    yield put(actions.fetchListMemberOfClubSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* resetDataProfile(action: PayloadAction<ClubNameRequest>) {
  yield put(actions.resetProfileSucess());
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

export function* clubManagementEditSaga() {
  yield takeLatest(actions.updateClub.type, updateClub);
  yield takeLatest(actions.fetchCategories.type, fetchCategories);
  yield takeLatest(actions.fetchPackages.type, fetchPackages);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(
    actions.checkPhoneNumberRequest.type,
    checkPhoneNumberUnique,
  );
  yield takeLatest(actions.fetchCity.type, fetchCity);
  yield takeLatest(actions.fetchDistrict.type, fetchDistrict);
  yield takeLatest(actions.fetchWard.type, fetchWard);
  yield takeLatest(actions.fetchClub.type, fetchClub);
  yield takeLatest(actions.fetchBank.type, fetchListBanks);
  yield takeLatest(actions.fetchListMemberOfClub.type, fetchListMemberOfClub);
  yield takeLatest(actions.resetProfile.type, resetDataProfile);
  yield takeLatest(actions.checkClubnameRequest.type, checkClubnameUnique);
}
