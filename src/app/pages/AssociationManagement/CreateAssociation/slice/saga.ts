import { takeLatest, put, call } from 'redux-saga/effects';
import {
  AssociationService,
  BankService,
  CategoriesService,
  MemberService,
  ProfileService,
  ProvinceService,
} from 'services';
import { get } from 'lodash';
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
  Bank,
} from 'types';
import { UserPackageType, AddressField } from 'types/enums';
import { CreateAssociationRequest } from 'types/AssociationManagement';
import path from 'app/routes/path';
import { PayloadAction } from '@reduxjs/toolkit';

import { createAssociationActions } from '.';

function* provinceRequest() {
  try {
    const result: Province[] = yield call(MemberService.fetchProvince);
    yield put(createAssociationActions.fetchProvinceRequestsSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* createNewAssociationRequest(action: PayloadAction<any>) {
  try {
    if (
      action.payload?.files?.fileNames &&
      action.payload?.files?.fileNames.length > 0
    ) {
      const result: FileUpload[] = yield call(
        MemberService.fetchUrlImages,
        action.payload.files,
      );
      yield put(createAssociationActions.fetchUrlFileRequestsSuccess(result));
      if (result.length > 0) {
        const fileUrlData: any[] = [];
        fileUrlData.push({
          name: action.payload.images?.associationPicture.name,
          files: action.payload.images?.associationPicture.file,
        });
        fileUrlData.push({
          name: action.payload.images?.artDocuments?.name,
          files: action.payload.images?.artDocuments?.file,
        });
        fileUrlData.push({
          name: action.payload.images?.certDocuments?.name,
          files: action.payload.images?.certDocuments?.file,
        });
        action.payload.images.additionalDocuments.map(
          (additionalDocument: any, index: number) => {
            fileUrlData.push({
              name: additionalDocument.name,
              files: additionalDocument.file,
            });
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
          // formData.associationCategory = 'RACING';
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
          if (resultUrlData?.find(a => a.name === 'additionalDocuments')) {
            formData.additionalDocuments = [];
            resultUrlData.map((item: any) => {
              if (item.name === 'additionalDocuments') {
                formData.additionalDocuments.push(item.key);
              }
            });
          }
          if (resultUrlData?.find(a => a.name === 'associationPicture')) {
            formData.avatarUrl = resultUrlData.filter(
              (value, index) => value.name === 'associationPicture',
            )[0]?.key;
          }
          const data = {
            requestCheckout: !action?.payload?.formRequest?.imiPaid,
            packageId: action.payload.packageId,
            taaAssocication: formData,
          };
          const resultMember: CreateAssociationRequest = yield call(
            AssociationService.createAssociation,
            data,
          );
          const { navigate } = action.payload;
          yield put(
            createAssociationActions.createAssociationRequestsSuccess(
              resultMember,
            ),
          );
          Notifier.addNotifySuccess({
            messageId: 'clubAssociationInformation.createSuccess',
          });
          navigate(`/associations/club-association-list`);
        }
      }
    } else {
      const formData = { ...action.payload.formRequest };
      formData.artDocuments = [];
      formData.additionalDocuments = [];
      formData.certDocuments = [];
      const data = {
        requestCheckout: action?.payload?.formRequest?.imiPaid,
        packageId: action.payload.packageId,
        taaAssocication: formData,
      };
      const { response, error } = yield call(
        AssociationService.createAssociation,
        data,
      );
      yield put(
        createAssociationActions.createAssociationRequestsSuccess(response),
      );
      const { navigate } = action.payload;
      Notifier.addNotifySuccess({
        messageId: 'clubAssociationInformation.createSuccess',
      });
      navigate(`/associations/club-association-list`);
    }
  } catch (err: any) {
    if (err.response.status === 500) {
      Notifier.addNotifyError({
        messageId: 'clubAssociationInformation.createFailed',
      });
    } else {
      Notifier.addNotifyError({ messageId: err.response.data.messages[0] });
    }
    yield put(createAssociationActions.createAssociationRequestsFailed(err));
  }
}

function* packagesRequest() {
  try {
    const resultPackages: Package[] = yield call(
      MemberService.fetchProPackage,
      'ASSOCIATION',
    );
    yield put(createAssociationActions.packagesRequestSuccess(resultPackages));
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
    newResult.provinceId = action.payload.provinceId;
    yield put(createAssociationActions.clubsRequestSuccess(newResult));
  } catch (err) {
    console.log(err);
  }
}

function* checkPhoneNumberUnique(action: PayloadAction<PhoneNumberRequest>) {
  try {
    const result: Profile[] = yield call(
      ProfileService.findUserByPhone,
      action.payload,
    );
    yield put(createAssociationActions.checkPhoneNumberRequestSuccess(result));
  } catch (error) {
    yield put(createAssociationActions.checkPhoneNumberRequestFailed(error));
    console.log(error);
  }
}

function* checkAssociationName(action: PayloadAction<string>) {
  try {
    const result: Profile[] = yield call(
      AssociationService.checkAssociationName,
      action.payload,
    );
    yield put(createAssociationActions.checkAssociationNameSuccess(result));
  } catch (error) {
    yield put(createAssociationActions.checkAssociationNameFails(error));
    console.log(error);
  }
}

function* fetchListBanks() {
  try {
    const result: Bank[] = yield call(BankService.fetchListBanks);
    yield put(createAssociationActions.fetchBankSuccess(result));
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
    yield put(
      createAssociationActions.fetchCategoriesSuccess(resultClubCategories),
    );
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
    yield put(createAssociationActions.fetchCitySuccess(resultCity));
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
    yield put(createAssociationActions.fetchDistrictSuccess(resultDistrict));
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
    yield put(createAssociationActions.fetchWardSuccess(resultWard));
  } catch (error) {
    console.log(error);
  }
}

export default function* createMemberSaga() {
  yield takeLatest(
    createAssociationActions.fetchProvinceRequests,
    provinceRequest,
  );
  yield takeLatest(
    createAssociationActions.createAssociationRequest.type,
    createNewAssociationRequest,
  );
  yield takeLatest(createAssociationActions.fetchCity.type, fetchCity);
  yield takeLatest(createAssociationActions.fetchDistrict.type, fetchDistrict);
  yield takeLatest(createAssociationActions.fetchWard.type, fetchWard);
  yield takeLatest(createAssociationActions.packagesRequest, packagesRequest);
  yield takeLatest(createAssociationActions.clubsRequest.type, fetchClubs);
  yield takeLatest(
    createAssociationActions.checkPhoneNumberRequest.type,
    checkPhoneNumberUnique,
  );
  yield takeLatest(
    createAssociationActions.fetchCategories.type,
    fetchCategories,
  );
  yield takeLatest(createAssociationActions.fetchBank.type, fetchListBanks);
  yield takeLatest(
    createAssociationActions.checkAssociationName.type,
    checkAssociationName,
  );
}
