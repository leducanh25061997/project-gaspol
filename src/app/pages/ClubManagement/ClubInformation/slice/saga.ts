import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CategoriesService, ClubService, MemberService } from 'services';
import {
  FilterParams,
  ClubInformation,
  Pageable,
  RequestJoinClubList,
  ClubDocumentSubmit,
  FileUpload,
  ParamsUrl,
  CreateClubFormRequest,
  UpdateClubFormRequest,
  FormParams,
  IndividualInformation,
  Category,
} from 'types';
import { UserPackageType } from 'types/enums';

import Notifier from 'app/pages/Notifier';

import { clubInformationActions as actions } from '.';

function* fetchClubInformation(action: PayloadAction<string>) {
  try {
    const result: ClubInformation = yield call(
      ClubService.fetchClubInformation,
      action.payload,
    );
    yield put(actions.fetchClubInformationSuccess(result));
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

function* submitApprovalCubDocuments(
  action: PayloadAction<
    IndividualInformation,
    string,
    (submitClubDocument?: IndividualInformation) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: IndividualInformation = yield call(
      ClubService.approvalDocumentbRequest,
      action.payload,
    );

    if (meta) {
      meta(result);
    }
    yield put(actions.submitApprovalCubDocumentsSuccess(result));
    Notifier.addNotifySuccess({
      messageId: 'clubInformation.updateADDRTDocumentSuccess',
    });
  } catch (error) {
    if (meta) {
      meta(undefined);
    }
    Notifier.addNotifyError({ messageId: 'kisInformation.updateKISFailed' });
  }
}

function* submitClubDocuments(action: PayloadAction<ClubDocumentSubmit>) {
  try {
    const form: FormParams[] = [];
    if (action.payload.forms) {
      form.push(
        ...Object.keys(action.payload.forms).map(key => {
          return {
            key: `club.${key}`,
            values: [action.payload.forms[key]],
          };
        }),
      );
    }
    const uploadDocuments = action.payload.documents!.filter(item => item.name);
    if (uploadDocuments.length > 0) {
      const data = {
        fileNames: uploadDocuments.map(item => item.name),
      };
      const result: FileUpload[] = yield call(
        MemberService.fetchUrlImages,
        data,
      );
      if (result.length > 0) {
        const urldata: ParamsUrl[] = [];
        result?.map((value, index) => {
          urldata.push({
            url: value.url,
            key: value.key,
            name: uploadDocuments[index].name || '',
            files: uploadDocuments[index].file || undefined,
          });
        });
        const resultUrlData: ParamsUrl[] = yield call(
          MemberService.getUrlImageData,
          urldata,
        );

        if (resultUrlData.length > 0) {
          const values: any[] = [
            ...resultUrlData.map(item => item.key),
            ...action.payload
              .documents!.filter(item => item.uploadedUrl)
              .map(item => item.uploadedUrl),
          ];
          if (action.payload.key) {
            form.push({
              key: `club.${action.payload.key}`,
              values,
            });
          }
        }
      }
    }

    const params: CreateClubFormRequest = {
      membershipType: UserPackageType.TKT,
      forms: form,
      userUuid: action.payload.club?.personInCharge,
      userPackageId: action.payload.club?.userPackageId,
      packageId: action.payload.club?.packageId,
    };
    yield call(ClubService.createClubRequest, params);
    yield put(actions.submitClubDocumentSuccess('success'));
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
  } catch (error) {
    console.log(error);
  }
}

export function* clubInformationSaga() {
  yield takeLatest(actions.fetchClubInformation.type, fetchClubInformation);
  yield takeLatest(actions.fetchListMemberOfClub.type, fetchListMemberOfClub);
  yield takeLatest(actions.fetchCategories.type, fetchCategories);
  yield takeLatest(actions.submitClubDocuments.type, submitClubDocuments);
  yield takeLatest(
    actions.submitApprovalCubDocuments.type,
    submitApprovalCubDocuments,
  );
}
