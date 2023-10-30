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
  Clubdata,
  Profile,
  PhoneNumberRequest,
  Category,
  Address,
  AddressRequest,
  Bank,
} from 'types';
import { UserPackageType, AddressField } from 'types/enums';
import {
  AssociationInformationType,
  ClubAssociationInformationType,
  EditAssociationRequest,
} from 'types/AssociationManagement';

import path from 'app/routes/path';
import { PayloadAction } from '@reduxjs/toolkit';

import { Status } from './types';

import { editAssociationActions } from '.';

function* provinceRequest() {
  try {
    const result: Province[] = yield call(MemberService.fetchProvince);
    yield put(editAssociationActions.fetchProvinceRequestsSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchAssociationInformation(action: PayloadAction<string>) {
  try {
    const result: AssociationInformationType = yield call(
      AssociationService.fetchAssociationInformation,
      action.payload,
    );
    yield put(
      editAssociationActions.fetchAssociationInformationSuccess(result),
    );
  } catch (error) {
    console.log(error);
  }
}

function* updateClub(action: PayloadAction<any>) {
  try {
    yield call(AssociationService.addClubAssociation, action.payload);
    if (action.payload.body.status === Status.REJECTED) {
      yield put(editAssociationActions.approveRemoveClubSuccess());
    } else {
      yield put(editAssociationActions.approveAddClubSuccess());
    }
  } catch (error) {
    yield put(editAssociationActions.approveUpdateClubFails());
    Notifier.addNotifyError({
      messageId: 'clubAssociationInformation.addClubFailed',
    });
  }
}

function* editAssociationRequest(action: PayloadAction<any>) {
  try {
    if (
      action.payload?.files?.fileNames &&
      action.payload?.files?.fileNames.length > 0
    ) {
      const result: FileUpload[] = yield call(
        MemberService.fetchUrlImages,
        action.payload.files,
      );
      yield put(editAssociationActions.fetchUrlFileRequestsSuccess(result));
      if (result.length > 0) {
        const fileUrlData: any[] = [];
        fileUrlData.push({
          name: action.payload.images?.associationPicture?.name,
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
        // result?.map((value, index) => {
        //   urldata.push({
        //     url: value.url,
        //     key: value.key,
        //     name: fileUrlData[index].name,
        //     files: fileUrlData[index].files,
        //   });
        // });
        fileUrlData.map((value, index) => {
          if (value.name === 'artDocuments') {
            urldata.push({
              url: result[1].url,
              key: result[1].key,
              name: fileUrlData[1].name,
              files: fileUrlData[1].files,
            });
          } else if (value.name === 'associationPicture') {
            urldata.push({
              url: result[0].url,
              key: result[0].key,
              name: fileUrlData[0].name,
              files: fileUrlData[0].files,
            });
          } else if (value.name === 'certDocuments') {
            urldata.push({
              url: result[2].url,
              key: result[2].key,
              name: fileUrlData[2].name,
              files: fileUrlData[2].files,
            });
          } else if (value.name === 'additionalDocuments') {
            result?.map((value, i) => {
              urldata.push({
                url: value.url,
                key: value.key,
                name: fileUrlData[index].name,
                files: fileUrlData[index].files,
              });
            });
          }
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
          if (resultUrlData?.find(a => a.name === 'associationPicture')) {
            formData.avatarUrl = resultUrlData.filter(
              (value, index) => value.name === 'associationPicture',
            )[0]?.key;
          }
          if (resultUrlData?.find(a => a.name === 'additionalDocuments')) {
            formData.additionalDocuments = [];
            action.payload.additionalDocumentsKeyS3.map((item: any) => {
              formData.additionalDocuments.push(item);
            });
            resultUrlData.map((item: any) => {
              if (item.name === 'additionalDocuments') {
                formData.additionalDocuments.push(item.key);
              }
            });
          }
          const data = {
            id: action?.payload?.id,
            body: formData,
          };
          const resultMember: EditAssociationRequest = yield call(
            AssociationService.updateAssociation,
            data,
          );
          yield put(
            editAssociationActions.editAssociationRequestSuccess(resultMember),
          );
          const { navigate } = action.payload;
          Notifier.addNotifySuccess({
            messageId: 'clubAssociationInformation.updateSuccess',
          });
          navigate(`/associations/club-associations/${action?.payload?.id}`);
        }
      }
    } else {
      const formData = { ...action.payload.formRequest };
      formData.additionalDocuments = [];
      action.payload.images.additionalDocuments.map((item: any) => {
        if (item.url !== '') {
          formData.additionalDocuments.push(item.url);
        }
      });
      if (action.payload.images?.artDocuments?.url === '') {
        formData.artDocuments = [];
      }
      if (action.payload.images?.certDocuments?.url === '') {
        formData.certDocuments = [];
      }
      const data = {
        id: action?.payload?.id,
        body: formData,
      };
      const resultMember: EditAssociationRequest = yield call(
        AssociationService.updateAssociation,
        data,
      );
      yield put(
        editAssociationActions.editAssociationRequestSuccess(resultMember),
      );
      const { navigate } = action.payload;
      Notifier.addNotifySuccess({
        messageId: 'clubAssociationInformation.updateSuccess',
      });
      navigate(`/associations/club-associations/${action?.payload?.id}`);
    }
  } catch (err: any) {
    yield put(editAssociationActions.editAssociationRequestFailed(err));
    if (err.response.status === 500) {
      Notifier.addNotifyError({
        messageId: 'clubAssociationInformation.updateFailed',
      });
    } else {
      Notifier.addNotifyError({ messageId: err.response.data.messages[0] });
    }
  }
}

function* fetchClubAssociationInformation(action: PayloadAction<any>) {
  try {
    const result: Pageable<ClubAssociationInformationType> = yield call(
      AssociationService.fetchClubAssociationInformation,
      action.payload,
    );
    yield put(
      editAssociationActions.fetchClubAssociationInformationSuccess(result),
    );
  } catch (error) {
    console.log(error);
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
      yield put(editAssociationActions.packagesRequestSuccess(resultPackages));
    }
  } catch (error) {
    console.log(error);
  }
}

function* checkAssociationName(action: PayloadAction<string>) {
  try {
    const result: Profile[] = yield call(
      AssociationService.checkAssociationName,
      action.payload,
    );
    yield put(editAssociationActions.checkAssociationNameSuccess(result));
  } catch (error) {
    yield put(editAssociationActions.checkAssociationNameFails(error));
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
    yield put(editAssociationActions.clubsRequestSuccess(newResult));
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
    yield put(editAssociationActions.checkPhoneNumberRequestSuccess(result));
  } catch (error) {
    yield put(editAssociationActions.checkPhoneNumberRequestFailed(error));
    console.log(error);
  }
}

function* fetchListBanks() {
  try {
    const result: Bank[] = yield call(BankService.fetchListBanks);
    yield put(editAssociationActions.fetchBankSuccess(result));
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
      editAssociationActions.fetchCategoriesSuccess(resultClubCategories),
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
    yield put(editAssociationActions.fetchCitySuccess(resultCity));
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
    yield put(editAssociationActions.fetchDistrictSuccess(resultDistrict));
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
    yield put(editAssociationActions.fetchWardSuccess(resultWard));
  } catch (error) {
    console.log(error);
  }
}

export default function* editAssociationSaga() {
  yield takeLatest(
    editAssociationActions.fetchProvinceRequests,
    provinceRequest,
  );
  yield takeLatest(
    editAssociationActions.editAssociationRequest.type,
    editAssociationRequest,
  );
  yield takeLatest(
    editAssociationActions.fetchAssociationInformation.type,
    fetchAssociationInformation,
  );
  yield takeLatest(editAssociationActions.fetchCity.type, fetchCity);
  yield takeLatest(editAssociationActions.fetchDistrict.type, fetchDistrict);
  yield takeLatest(editAssociationActions.fetchWard.type, fetchWard);
  yield takeLatest(editAssociationActions.packagesRequest, packagesRequest);
  yield takeLatest(editAssociationActions.clubsRequest.type, fetchClubs);
  yield takeLatest(
    editAssociationActions.checkPhoneNumberRequest.type,
    checkPhoneNumberUnique,
  );
  yield takeLatest(
    editAssociationActions.fetchCategories.type,
    fetchCategories,
  );
  yield takeLatest(editAssociationActions.fetchBank.type, fetchListBanks);
  yield takeLatest(
    editAssociationActions.fetchClubAssociationInformation,
    fetchClubAssociationInformation,
  );
  yield takeLatest(editAssociationActions.approveUpdateClub.type, updateClub);
  yield takeLatest(
    editAssociationActions.checkAssociationName.type,
    checkAssociationName,
  );
}
