// src/modules/search/search.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { SearchResultDto } from './dto/search-result.dto';
import { SearchResultMapper } from './mappers/search-result.mapper';
import { SearchQueryBuilder } from './search-query.builder';

const RESULTS_PER_TYPE = 5;

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async globalSearch(query: string): Promise<SearchResultDto[]> {
    const searchTerm = query?.trim();

    if (!searchTerm) {
      return [];
    }

    const [
      users,
      families,
      donors,
      committeeMembers,
      projects,
      donations,
      expenses,
      payments,
      galleries,
    ] = await Promise.all([
      this.prisma.user.findMany({
        where: SearchQueryBuilder.userWhere(searchTerm),
        select: { id: true, name: true, email: true, phone: true },
        take: RESULTS_PER_TYPE,
      }),
      this.prisma.family.findMany({
        where: SearchQueryBuilder.familyWhere(searchTerm),
        select: { id: true, familyNo: true, headName: true, phone: true },
        take: RESULTS_PER_TYPE,
      }),
      this.prisma.donor.findMany({
        where: SearchQueryBuilder.donorWhere(searchTerm),
        select: { id: true, name: true, phone: true, email: true },
        take: RESULTS_PER_TYPE,
      }),
      this.prisma.committeeMember.findMany({
        where: SearchQueryBuilder.committeeMemberWhere(searchTerm),
        select: { id: true, name: true, designation: true, phone: true },
        take: RESULTS_PER_TYPE,
      }),
      this.prisma.project.findMany({
        where: SearchQueryBuilder.projectWhere(searchTerm),
        select: { id: true, title: true, status: true },
        take: RESULTS_PER_TYPE,
      }),
      this.prisma.donation.findMany({
        where: SearchQueryBuilder.donationWhere(searchTerm),
        select: {
          id: true,
          receiptNo: true,
          purpose: true,
          donor: { select: { name: true } },
        },
        take: RESULTS_PER_TYPE,
      }),
      this.prisma.expense.findMany({
        where: SearchQueryBuilder.expenseWhere(searchTerm),
        select: { id: true, title: true, category: true },
        take: RESULTS_PER_TYPE,
      }),
      this.prisma.payment.findMany({
        where: SearchQueryBuilder.paymentWhere(searchTerm),
        select: {
          id: true,
          reference: true,
          family: { select: { familyNo: true, headName: true } },
        },
        take: RESULTS_PER_TYPE,
      }),
      this.prisma.gallery.findMany({
        where: SearchQueryBuilder.galleryWhere(searchTerm),
        select: { id: true, title: true, description: true },
        take: RESULTS_PER_TYPE,
      }),
    ]);

    return [
      ...users.map(SearchResultMapper.mapUser),
      ...families.map(SearchResultMapper.mapFamily),
      ...donors.map(SearchResultMapper.mapDonor),
      ...committeeMembers.map(SearchResultMapper.mapCommitteeMember),
      ...projects.map(SearchResultMapper.mapProject),
      ...donations.map(SearchResultMapper.mapDonation),
      ...expenses.map(SearchResultMapper.mapExpense),
      ...payments.map(SearchResultMapper.mapPayment),
      ...galleries.map(SearchResultMapper.mapGallery),
    ];
  }
}
