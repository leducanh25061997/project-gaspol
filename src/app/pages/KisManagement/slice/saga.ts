import { call, put, takeLatest } from 'redux-saga/effects';
import { KisService, MemberService } from 'services';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  KisInfo,
  Pageable,
  FilterParams,
  Province,
  ResponseError,
} from 'types';
import Notifier from 'app/pages/Notifier';

import { ErrorCode } from 'types/enums';

import { kisManagementActions as actions } from '.';

function* fetchAllKIS(action: PayloadAction<FilterParams>) {
  try {
    const result: Pageable<KisInfo> = yield call(
      KisService.fetchKisRequest,
      action.payload,
    );
    yield put(actions.fetchKisDataSuccess(result));
  } catch (err) {
    console.log(err);
  }
}

function* kisManagementByProvince(action: PayloadAction<FilterParams>) {
  try {
    const result: Pageable<KisInfo> = yield call(
      KisService.fetchKisProvinceRequest,
      action.payload,
    );
    yield put(actions.fetchKisDataSuccess(result));
  } catch (err) {
    console.log(err);
  }
}

function* fetchProvinces() {
  try {
    const result: Province[] = yield call(MemberService.fetchProvince);
    yield put(actions.fetchProvinceRequestsSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* getKisProvinceInformation(action: PayloadAction<{ id: number }>) {
  try {
    const result: KisInfo = yield call(
      KisService.getKisProvinceDetail,
      action.payload.id,
    );
    yield put(actions.getProvinceKisInformationSuccess(result));
  } catch (error) {
    console.log(
      '🚀 ~ file: saga.ts ~ line 26 ~ function*getKisInformation ~ error',
      error,
    );
  }
}

function* updateKisProvinceInformation(
  action: PayloadAction<
    KisInfo,
    string,
    (updatedKis?: KisInfo) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: KisInfo = yield call(
      KisService.updateKisProvince,
      action.payload,
    );
    yield put(actions.updateProvinceKisInformationSuccess(result));
    Notifier.addNotifySuccess({
      messageId: 'kisInformation.updateProvinceKisSuccess',
    });
    if (meta) {
      meta(result);
    }
  } catch (error) {
    if (meta) {
      meta(undefined);
    }
    const errorResponse: ResponseError = { ...(error as {}) };
    if (errorResponse.response?.status === 400) {
      Notifier.addNotifyError({
        message: errorResponse.response.data.messages[0],
      });
      return;
    }
    Notifier.addNotifyError({
      messageId: 'kisInformation.updateProvinceKisFailed',
    });
  }
}

function* fetchImiKISDetail(action: PayloadAction<{ id: number }>) {
  try {
    const result: KisInfo = yield call(
      KisService.getKisDetail,
      action.payload.id,
    );
    yield put(actions.getIMIKisInformationSuccess(result));
  } catch (error) {}
}

function* createImiKIS(
  action: PayloadAction<KisInfo, string, (newKIS?: KisInfo) => void>,
) {
  try {
    const result: KisInfo = yield call(KisService.createKis, action.payload);
    Notifier.addNotifySuccess({ messageId: 'kisInformation.createKISSuccess' });
    action.meta(result);
    yield put(actions.fetchKisData({ page: 0, limit: 10 }));
  } catch (error: any) {
    action.meta(undefined);
    if (error?.response?.data?.code === ErrorCode.DATA_DUPLICATED) {
      Notifier.addNotifyError({ messageId: 'kisInformation.duplicateKisId' });
      return;
    }
    Notifier.addNotifyError({ messageId: 'kisInformation.createKISFailed' });
  }
}

function* updateImiKIS(
  action: PayloadAction<
    KisInfo,
    string,
    (updatedKIS?: KisInfo) => void | undefined
  >,
) {
  const { meta } = action;

  try {
    const result: KisInfo = yield call(KisService.updateImiKis, action.payload);
    if (meta) {
      meta(result);
    }
    yield put(actions.updateIMIKisSuccess(result));
    Notifier.addNotifySuccess({ messageId: 'kisInformation.updateKISSuccess' });
  } catch (error) {
    if (meta) {
      meta(undefined);
    }
    Notifier.addNotifyError({ messageId: 'kisInformation.updateKISFailed' });
  }
}

export function* kisManagementSaga() {
  yield takeLatest(actions.fetchKisByProvince, kisManagementByProvince);
  yield takeLatest(actions.fetchProvinces, fetchProvinces);
  yield takeLatest(actions.fetchKisData.type, fetchAllKIS);
  yield takeLatest(actions.createKisInformation.type, createImiKIS);
  yield takeLatest(actions.getIMIKisInformation.type, fetchImiKISDetail);
  yield takeLatest(actions.updateIMIKisInformation.type, updateImiKIS);
  yield takeLatest(
    actions.getProvinceKisInformation.type,
    getKisProvinceInformation,
  );
  yield takeLatest(
    actions.updateProvinceKisInformation,
    updateKisProvinceInformation,
  );
}
