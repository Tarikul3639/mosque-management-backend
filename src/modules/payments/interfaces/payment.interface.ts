import { PaymentMethod } from '../../../lib/prisma/client';

export interface PaymentSearchResult {
  id: string;
  receiptNo: string;
  familyId: string;
  familyNo: string;
  headName: string;
  monthlyChargeId: string;
  amount: number;
  method: PaymentMethod;
  reference: string | null;
  note: string | null;
  paidAt: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentSummary {
  totalPayments: number;
  totalCollection: number;
  todayCollection: number;
  thisMonthCollection: number;
  thisYearCollection: number;
  averagePayment: number;
}

export interface FamilyLedgerSummary {
  totalCharge: number;
  totalPaid: number;
  totalDue: number;
}
