import { SnackbarKey, VariantType } from 'notistack';
/* --- STATE --- */
export interface NotifierState {
  notifications: Notification[];
}

export interface NotifyAction {
  label: string;
  callback: () => void;
}

export interface Notification {
  key?: SnackbarKey;
  message?: string;
  messageId?: string;
  variant?: VariantType;
  actions?: NotifyAction[];
  dismissed?: boolean;
}
