import Notifier from 'app/pages/Notifier';

export function numberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function showError(error: any) {
  Notifier.addNotifyError({ message: error.response?.data?.messages[0] });
}

export function showSuccess(message: string) {
  Notifier.addNotifySuccess({ message });
}
