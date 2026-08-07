// src/modules/search/mappers/search-result.mapper.ts

import { SearchResultDto, SearchResultType } from '../dto/search-result.dto';
import {
  UserSearchRow,
  FamilySearchRow,
  DonorSearchRow,
  CommitteeMemberSearchRow,
  ProjectSearchRow,
  DonationSearchRow,
  ExpenseSearchRow,
  PaymentSearchRow,
  GallerySearchRow,
} from '../interface/search-query-result.interface';

export class SearchResultMapper {
  static mapUser(row: UserSearchRow): SearchResultDto {
    return {
      id: row.id,
      type: SearchResultType.USER,
      title: row.name,
      subtitle: row.email ?? row.phone ?? undefined,
      url: `/users/${row.id}`,
    };
  }

  static mapFamily(row: FamilySearchRow): SearchResultDto {
    return {
      id: row.id,
      type: SearchResultType.FAMILY,
      title: `${row.familyNo} - ${row.headName}`,
      subtitle: row.phone ?? undefined,
      url: `/families/${row.id}`,
    };
  }

  static mapDonor(row: DonorSearchRow): SearchResultDto {
    return {
      id: row.id,
      type: SearchResultType.DONOR,
      title: row.name,
      subtitle: row.email ?? row.phone ?? undefined,
      url: `/donors/${row.id}`,
    };
  }

  static mapCommitteeMember(row: CommitteeMemberSearchRow): SearchResultDto {
    return {
      id: row.id,
      type: SearchResultType.COMMITTEE,
      title: row.name,
      subtitle: `${row.designation.replaceAll('_', ' ')}${
        row.phone ? ` - ${row.phone}` : ''
      }`,
      url: `/committee/${row.id}`,
    };
  }

  static mapProject(row: ProjectSearchRow): SearchResultDto {
    return {
      id: row.id,
      type: SearchResultType.PROJECT,
      title: row.title,
      subtitle: row.status.replaceAll('_', ' '),
      url: `/projects/${row.id}`,
    };
  }

  static mapDonation(row: DonationSearchRow): SearchResultDto {
    return {
      id: row.id,
      type: SearchResultType.DONATION,
      title: `Receipt ${row.receiptNo}`,
      subtitle: row.purpose ?? row.donor.name,
      url: `/donations/${row.id}`,
    };
  }

  static mapExpense(row: ExpenseSearchRow): SearchResultDto {
    return {
      id: row.id,
      type: SearchResultType.EXPENSE,
      title: row.title,
      subtitle: row.category.replaceAll('_', ' '),
      url: `/expenses/${row.id}`,
    };
  }

  static mapPayment(row: PaymentSearchRow): SearchResultDto {
    return {
      id: row.id,
      type: SearchResultType.PAYMENT,
      title: row.reference
        ? `Payment ${row.reference}`
        : `Payment - ${row.family.familyNo}`,
      subtitle: row.family.headName,
      url: `/payments/${row.id}`,
    };
  }

  static mapGallery(row: GallerySearchRow): SearchResultDto {
    return {
      id: row.id,
      type: SearchResultType.GALLERY,
      title: row.title ?? 'Untitled gallery',
      subtitle: row.description ?? undefined,
      url: `/galleries/${row.id}`,
    };
  }
}
