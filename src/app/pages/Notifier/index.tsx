import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar, SnackbarKey, SnackbarOrigin } from 'notistack';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

import { store } from '../../../';

import { useNotifierSlice, notifierActions } from './slice';
import { selectNotifier } from './slice/selectors';
import { Notification } from './slice/types';

let displayed: SnackbarKey[] = [];

const Notifier = () => {
  const { notifications } = useSelector(selectNotifier);
  const { actions } = useNotifierSlice();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = useCallback((id: SnackbarKey) => {
    displayed = [...displayed, id];
  }, []);

  const removeDisplayed = useCallback((id: SnackbarKey) => {
    displayed = [...displayed.filter(key => id !== key)];
  }, []);

  const renderButtonClose = useCallback(
    (key?: SnackbarKey) => {
      const onPress = () => {
        if (key) dispatch(actions.closeSnackbar(key));
      };
      return (
        <IconButton onClick={onPress} size="small" sx={{ color: 'white' }}>
          <Icon icon="mdi:close" color="white" width={24} />
        </IconButton>
      );
    },
    [actions, dispatch],
  );

  useEffect(() => {
    notifications.forEach(
      ({ key, message, messageId, variant, dismissed = false }) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }
        if (key && displayed.includes(key)) return;
        enqueueSnackbar(message || t(messageId || 'error.anErrorOccurred'), {
          key,
          variant,
          action: renderButtonClose(key),
          onExited: (event, myKey) => {
            dispatch(actions.closeSnackbar(myKey));
            removeDisplayed(myKey);
          },
        });
        if (key) {
          storeDisplayed(key);
        }
      },
    );
  }, [
    actions,
    closeSnackbar,
    dispatch,
    enqueueSnackbar,
    notifications,
    removeDisplayed,
    renderButtonClose,
    storeDisplayed,
    t,
  ]);

  return null;
};

Notifier.anchorOrigin = {
  vertical: 'top',
  horizontal: 'right',
} as SnackbarOrigin;

Notifier.addNotify = (notify: Notification) => {
  store.dispatch(
    notifierActions.enqueueSnackbar({ ...notify, variant: 'default' }),
  );
};

Notifier.addNotifySuccess = (notify: Notification) => {
  store.dispatch(
    notifierActions.enqueueSnackbar({ ...notify, variant: 'success' }),
  );
};

Notifier.addNotifyWarning = (notify: Notification) => {
  store.dispatch(
    notifierActions.enqueueSnackbar({ ...notify, variant: 'warning' }),
  );
};

Notifier.addNotifyError = (notify: Notification) => {
  store.dispatch(
    notifierActions.enqueueSnackbar({ ...notify, variant: 'error' }),
  );
};

Notifier.addNotifyInfo = (notify: Notification) => {
  store.dispatch(
    notifierActions.enqueueSnackbar({ ...notify, variant: 'info' }),
  );
};

export default Notifier;
