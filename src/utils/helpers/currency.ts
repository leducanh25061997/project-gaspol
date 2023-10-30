import { Transaction } from 'types';

export const useCurrency = (
  transaction?: Transaction & { taxPercent?: number },
): { subtotal: string; total: string; taxAmount: string } => {
  if (!transaction) return { subtotal: '0', total: '0', taxAmount: '0' };
  const {
    initFee = 0,
    annualFee = 0,
    processingFee = 0,
    taxPercent = 0,
  } = transaction;
  const subtotal = initFee + annualFee + processingFee;
  const taxAmount = taxPercent * subtotal;
  const total = subtotal + taxAmount;
  return {
    subtotal: currencyFormat(subtotal),
    total: currencyFormat(total),
    taxAmount: currencyFormat(taxAmount),
  };
};

export function currencyFormat(x?: number) {
  if (!x) {
    return '0';
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
