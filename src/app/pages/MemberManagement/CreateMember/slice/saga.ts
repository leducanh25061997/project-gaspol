import { takeLatest, put, call } from 'redux-saga/effects';
import {
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
} from 'types';
import { UserPackageType, AddressField } from 'types/enums';

import path from 'app/routes/path';
import { PayloadAction } from '@reduxjs/toolkit';

import { createMemberActions } from '.';

function* provinceRequest() {
  try {
    const result: Province[] = yield call(MemberService.fetchProvince);
    yield put(createMemberActions.fetchProvinceRequestsSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* createNewMemberRequest(action: PayloadAction<any>) {
  try {
    const result: FileUpload[] = yield call(
      MemberService.fetchUrlImages,
      action.payload.files,
    );
    yield put(createMemberActions.fetchUrlFileRequestsSuccess(result));
    if (result.length > 1) {
      const fileUrlData: any[] = [];
      fileUrlData.push({
        name: action.payload.fileData?.profilePicture?.name,
        files: action.payload.fileData?.profilePicture?.file,
      });
      fileUrlData.push({
        name: action.payload.fileData?.nikPicture?.name,
        files: action.payload.fileData?.nikPicture?.file,
      });
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
      if (resultUrlData.length > 1) {
        const formData = { ...action.payload.formData };
        formData.nikPicture = resultUrlData.filter(
          (value, index) => value.name === 'nikPicture',
        )[0].key;
        formData.profilePicture = resultUrlData.filter(
          (value, index) => value.name === 'profilePicture',
        )[0].key;
        if (resultUrlData?.find(a => a.name === 'simPicture')) {
          formData.simPicture = resultUrlData.filter(
            (value, index) => value.name === 'simPicture',
          )[0].key;
        }
        // formData.cityId = Number(formData.city);
        // formData.clubId = formData?.club?.id;
        // formData.districtId = Number(formData?.district);
        // formData.provinceId = Number(formData?.province);
        // formData.wardId = Number(formData?.ward);
        // console.log(formData?.nikNumber);
        formData.identification = {};
        formData.identification.identifierNikNumber =
          formData?.nikType === 'NIK' ? formData?.nikNumber : '';
        formData.identification.identifierKitasNumber =
          formData?.nikType === 'KITAS' ? formData?.nikNumber : '';
        formData.identification.identifierKtpNumber =
          formData?.nikType === 'KTP' ? formData?.nikNumber : '';

        formData.hobbies = formData?.hobby?.split(',');
        formData.documents = [];
        formData.documents.push(formData?.nikPicture);
        delete formData.packageId;
        delete formData.birthDay;
        delete formData.nikNumber;
        delete formData.club;
        delete formData.district;
        delete formData.city;
        delete formData.province;
        delete formData.ward;
        delete formData.provinceClub;
        delete formData.imiPaid;
        delete formData.hobby;
        delete formData.provinceName;
        delete formData.packageName;
        delete formData.nikPicture;
        delete formData.nikType;

        const data = {
          requestCheckout: !action.payload.formData?.imiPaid,
          packageId: action.payload.formData?.packageId as number,
          kta: formData,
        };
        // console.log(data);
        const resultMember: MembershipsReponAblepage = yield call(
          MemberService.createNewmember,
          data,
        );
        const { navigate } = action.payload;
        Notifier.addNotifySuccess({
          messageId: 'User has been created successfully',
        });
        if (action.payload.formData.imiPaid) {
          navigate(path.memberManagement);
        } else {
          navigate(`/memberships/list`);
        }
      }
    }
  } catch (err) {
    console.log(err);
    Notifier.addNotifyError({ messageId: 'Create User has been failed' });
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
      yield put(createMemberActions.packagesRequestSuccess(resultPackages));
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
    newResult.provinceId = action.payload.provinceId;
    yield put(createMemberActions.clubsRequestSuccess(newResult));
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
    yield put(createMemberActions.checkPhoneNumberRequestSuccess(result));
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
    yield put(createMemberActions.fetchCategoriesSuccess(resultClubCategories));
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
    yield put(createMemberActions.fetchCitySuccess(resultCity));
  } catch (error) {
    console.log(error);
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
      createMemberActions.fetchBirthPlaceCitySuccess(resultBirthPlaceCity),
    );
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
    yield put(createMemberActions.fetchDistrictSuccess(resultDistrict));
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
    yield put(createMemberActions.fetchWardSuccess(resultWard));
  } catch (error) {
    console.log(error);
  }
}

function* packageProRequest() {
  try {
    const resultPackages: Package[] = yield call(
      MemberService.fetchProPackage,
      'KTA_PRO',
    );
    yield put(createMemberActions.packageProRequestSuccess(resultPackages));
  } catch (error) {
    console.log(error);
  }
}

export default function* createMemberSaga() {
  yield takeLatest(createMemberActions.fetchProvinceRequests, provinceRequest);
  yield takeLatest(
    createMemberActions.createMemberRequest.type,
    createNewMemberRequest,
  );
  yield takeLatest(createMemberActions.fetchCity.type, fetchCity);
  yield takeLatest(createMemberActions.fetchDistrict.type, fetchDistrict);
  yield takeLatest(createMemberActions.fetchWard.type, fetchWard);
  yield takeLatest(createMemberActions.packagesRequest, packagesRequest);
  yield takeLatest(createMemberActions.packageProRequest, packageProRequest);
  yield takeLatest(createMemberActions.clubsRequest.type, fetchClubs);
  yield takeLatest(
    createMemberActions.checkPhoneNumberRequest.type,
    checkPhoneNumberUnique,
  );
  yield takeLatest(createMemberActions.fetchCategories.type, fetchCategories);
  yield takeLatest(
    createMemberActions.fetchBirthPlaceCity.type,
    fetchBirthPlaceCity,
  );
}
