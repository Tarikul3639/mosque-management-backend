// src/modules/search/search-query.builder.ts

import { Prisma } from '../../lib/prisma//client';

const insensitive = (searchTerm: string) => ({
  contains: searchTerm,
  mode: Prisma.QueryMode.insensitive,
});

export class SearchQueryBuilder {
  static userWhere(searchTerm: string): Prisma.UserWhereInput {
    return {
      OR: [
        { name: insensitive(searchTerm) },
        { email: insensitive(searchTerm) },
        { phone: insensitive(searchTerm) },
      ],
    };
  }

  static familyWhere(searchTerm: string): Prisma.FamilyWhereInput {
    return {
      OR: [
        { familyNo: insensitive(searchTerm) },
        { headName: insensitive(searchTerm) },
        { phone: insensitive(searchTerm) },
        { email: insensitive(searchTerm) },
        { address: insensitive(searchTerm) },
      ],
    };
  }

  static donorWhere(searchTerm: string): Prisma.DonorWhereInput {
    return {
      OR: [
        { name: insensitive(searchTerm) },
        { phone: insensitive(searchTerm) },
        { email: insensitive(searchTerm) },
        { address: insensitive(searchTerm) },
      ],
    };
  }

  static committeeMemberWhere(
    searchTerm: string,
  ): Prisma.CommitteeMemberWhereInput {
    return {
      OR: [
        { name: insensitive(searchTerm) },
        { phone: insensitive(searchTerm) },
        { email: insensitive(searchTerm) },
        { address: insensitive(searchTerm) },
      ],
    };
  }

  static projectWhere(searchTerm: string): Prisma.ProjectWhereInput {
    return {
      OR: [
        { title: insensitive(searchTerm) },
        { description: insensitive(searchTerm) },
      ],
    };
  }

  static donationWhere(searchTerm: string): Prisma.DonationWhereInput {
    return {
      OR: [
        { receiptNo: insensitive(searchTerm) },
        { purpose: insensitive(searchTerm) },
        { transactionReference: insensitive(searchTerm) },
        { donor: { is: { name: insensitive(searchTerm) } } },
      ],
    };
  }

  static expenseWhere(searchTerm: string): Prisma.ExpenseWhereInput {
    return {
      OR: [
        { title: insensitive(searchTerm) },
        { note: insensitive(searchTerm) },
      ],
    };
  }

  static paymentWhere(searchTerm: string): Prisma.PaymentWhereInput {
    return {
      OR: [
        { reference: insensitive(searchTerm) },
        { note: insensitive(searchTerm) },
        { family: { is: { headName: insensitive(searchTerm) } } },
        { family: { is: { familyNo: insensitive(searchTerm) } } },
      ],
    };
  }

  static galleryWhere(searchTerm: string): Prisma.GalleryWhereInput {
    return {
      OR: [
        { title: insensitive(searchTerm) },
        { description: insensitive(searchTerm) },
      ],
    };
  }
}
