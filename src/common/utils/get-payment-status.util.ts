import { PaymentStatus } from '@/common/enums/payment-status.enum';

export function getPaymentStatus(
  amount: number,
  paidAmount: number,
): PaymentStatus {
  if (paidAmount <= 0) {
    return PaymentStatus.DUE;
  }

  if (paidAmount >= amount) {
    return PaymentStatus.PAID;
  }

  return PaymentStatus.PARTIAL;
}
