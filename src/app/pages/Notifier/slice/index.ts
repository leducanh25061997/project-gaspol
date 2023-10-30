import { SnackbarKey } from 'notistack';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';

import { Notification, NotifierState } from './types';

export const initialState: NotifierState = {
  notifications: [],
};

const slice = createSlice({
  name: 'notifier',
  initialState,
  reducers: {
    enqueueSnackbar(state, action: PayloadAction<Notification>) {
      const key = Date.now() + Math.random();
      const notification = { key, ...action.payload };
      state.notifications.push(notification);
    },
    closeSnackbar(state, action: PayloadAction<SnackbarKey>) {
      state.notifications = state.notifications.map(notify =>
        notify.key === action.payload
          ? { ...notify, dismissed: true }
          : { ...notify },
      );
    },
    removeSnackbar(state, action: PayloadAction<SnackbarKey>) {
      state.notifications = state.notifications.filter(
        notification => notification.key !== action.payload,
      );
    },
  },
});

export const { actions: notifierActions } = slice;

export const useNotifierSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useNotifierSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
