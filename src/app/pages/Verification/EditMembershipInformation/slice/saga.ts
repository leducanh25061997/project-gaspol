import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserPackageService, MembershipService, MemberService } from 'services';
import Notifier from 'app/pages/Notifier';
import {
  UserPackage,
  Province,
  FileUpload,
  ParamsUrl,
  MembershipsReponAblepage,
  IndividualInformation,
} from 'types';
import { get } from 'lodash';

import { editIndividualMemberActions as actions } from '.';

function* provinceRequest() {
  try {
    const result: Province[] = yield call(MemberService.fetchProvince);
    yield put(actions.fetchProvinceRequestsSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* editIndividualRequest(action: PayloadAction<any>) {
  try {
    if (action.payload.paramsRequest.length > 1) {
      const result: FileUpload[] = yield call(
        MemberService.fetchUrlImages,
        action.payload.files,
      );
      yield put(actions.fetchUrlFileRequestsSuccess(result));
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
      if (action.payload.fileData?.simPicture) {
        fileUrlData.push({
          name: action.payload.fileData?.simPicture?.name,
          files: action.payload.fileData?.simPicture?.file,
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
      if (resultUrlData.length >= 1) {
        const formData = { ...action.payload.formData };
        resultUrlData?.find(index => index.name === 'nikPicture') &&
          (formData.nikPicture = resultUrlData.filter(
            (value, index) => value.name === 'nikPicture',
          )[0].key);

        resultUrlData?.find(index => index.name === 'profilePicture') &&
          (formData.profilePicture = resultUrlData.filter(
            (value, index) => value.name === 'profilePicture',
          )[0].key);

        resultUrlData?.find(index => index.name === 'simPicture') &&
          (formData.simPicture = resultUrlData.filter(
            (value, index) => value.name === 'simPicture',
          )[0].key);

        const formParams = Object.keys(formData).map((key: string) => {
          return {
            key: `indi.${key}`,
            values: [get(formData, key)],
          };
        });
        const data = {
          forms: formParams,
        };
        const resultMember: MembershipsReponAblepage = yield call(
          MembershipService.editIndividualMember,
          formData,
        );
        const { navigate } = action.payload;
        Notifier.addNotifySuccess({
          messageId: action.payload.t(
            action.payload.translations.VerifyMembershipEdit.createSuccess,
          ),
        });
        navigate(`/verification/verify-individual-member/${action.payload.id}`);
      }
    } else {
      const resultMember: MembershipsReponAblepage = yield call(
        MembershipService.editIndividualMember,
        action.payload.formData,
      );
      Notifier.addNotifySuccess({
        messageId: action.payload.t(
          action.payload.translations.VerifyMembershipEdit.createSuccess,
        ),
      });
    }
  } catch (err) {
    const { navigate } = action.payload;
    Notifier.addNotifyError({
      messageId: 'Edit User has been failed',
    });
    navigate(`/verification/verify-individual-member/${action.payload.id}`);
  }
}

function* fetchIndividualInformation(action: PayloadAction<string>) {
  try {
    const result: IndividualInformation = yield call(
      MembershipService.fetchIndividualInformation,
      action.payload,
    );
    yield put(actions.fetchIndividualInformationSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchMembershipRequestDetail(action: PayloadAction<string>) {
  try {
    const result: UserPackage = yield call(
      UserPackageService.fetchUserPackageInfo,
      action.payload,
    );
    yield put(actions.fetchMembershipRequestDetailSuccess(result));
  } catch (error) {
    yield put(actions.fetchMembershipRequestDetailFailed());
    console.log(
      '🚀 ~ file: saga.ts ~ line 9 ~ function*fetchMembershipRequestDetail ~ error',
      error,
    );
  }
}

export function* editIndividualMemberSaga() {
  yield takeLatest(actions.fetchProvinceRequests, provinceRequest);
  yield takeLatest(actions.editIndividualRequest.type, editIndividualRequest);

  yield takeLatest(
    actions.fetchIndividualInformation.type,
    fetchIndividualInformation,
  );
  yield takeLatest(
    actions.fetchMembershipRequestDetail.type,
    fetchMembershipRequestDetail,
  );
}
