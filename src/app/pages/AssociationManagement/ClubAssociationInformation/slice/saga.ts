import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AssociationService, CategoriesService } from 'services';
import { Category, Pageable } from 'types';
import {
  AssociationInformationType,
  ClubAssociationInformationType,
} from 'types/AssociationManagement';

import { associationInformationActions as actions } from '.';

function* fetchAssociationInformation(action: PayloadAction<string>) {
  try {
    const result: AssociationInformationType = yield call(
      AssociationService.fetchAssociationInformation,
      action.payload,
    );
    yield put(actions.fetchAssociationInformationSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchClubAssociationInformation(action: PayloadAction<any>) {
  try {
    const result: Pageable<ClubAssociationInformationType> = yield call(
      AssociationService.fetchClubAssociationInformation,
      action.payload,
    );
    yield put(actions.fetchClubAssociationInformationSuccess(result));
  } catch (error) {
    console.log(error);
  }
}
function* approveDocuments(action: PayloadAction<any>) {
  try {
    const result: AssociationInformationType = yield call(
      AssociationService.approveAssociationRequest,
      action.payload,
    );
    yield put(actions.approveDocumentsSuccess(result));
    const { navigate } = action.payload;
    navigate(`/associations/club-associations/${action?.payload?.id}`);
    Notifier.addNotifySuccess({
      messageId: 'clubInformation.updateADDRTDocumentSuccess',
    });
  } catch (error) {}
}

function* fetchCategories() {
  try {
    const resultClubCategories: Category[] = yield call(
      CategoriesService.fetchCategories,
      'EMOJI',
    );
    yield put(actions.fetchCategoriesSuccess(resultClubCategories));
  } catch (error) {
    console.log(error);
  }
}

export function* associationInformationSaga() {
  yield takeLatest(
    actions.fetchAssociationInformation,
    fetchAssociationInformation,
  );
  yield takeLatest(
    actions.fetchClubAssociationInformation,
    fetchClubAssociationInformation,
  );
  yield takeLatest(actions.fetchCategories, fetchCategories);
  yield takeLatest(actions.approveDocuments, approveDocuments);
}
