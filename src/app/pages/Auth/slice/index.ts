import { PayloadAction } from '@reduxjs/toolkit';
import { AuthParams, UserInfomation } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { authSaga } from './saga';
import { AuthState } from './types';

export const initialState: AuthState = {};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<any>) {},
    login: {
      reducer(state) {
        return state;
      },
      prepare(params: AuthParams, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    logoutSuccess() {},
    logout: {
      reducer(state) {
        return state;
      },
      prepare(params, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },

    fetchUserInformation: () => {},
    fetchUserInformationSuccess: (
      state,
      action: PayloadAction<UserInfomation>,
    ) => {
      state.userInformation = action.payload;
    },
  },
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};
