import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AssociationService, MemberService } from 'services';
import {
  FilterMemberParams,
  Pageable,
  Province,
  FilterAssociationParams,
} from 'types';
import {
  AssociationList,
  AssociationManagement,
} from 'types/AssociationManagement';

import { clubAssociationManagementActions as actions } from '.';

function* fetchProvinces() {
  try {
    const result: Province[] = yield call(MemberService.fetchProvince);
    yield put(actions.fetchProvinceSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchAssociationList(action: PayloadAction<FilterAssociationParams>) {
  try {
    const result: Pageable<AssociationList> = yield call(
      AssociationService.fetchAssociationList,
      action.payload,
    );
    yield put(actions.fetchAssociationSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* clubAssociationManagementSaga() {
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(actions.fetchAssociationList.type, fetchAssociationList);
}
