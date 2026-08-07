// src/modules/search/interface/search-query-result.interface.ts

export interface UserSearchRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
}

export interface FamilySearchRow {
  id: string;
  familyNo: string;
  headName: string;
  phone: string | null;
}

export interface DonorSearchRow {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
}

export interface CommitteeMemberSearchRow {
  id: string;
  name: string;
  designation: string;
  phone: string | null;
}

export interface ProjectSearchRow {
  id: string;
  title: string;
  status: string;
}

export interface DonationSearchRow {
  id: string;
  receiptNo: string;
  purpose: string | null;
  donor: { name: string };
}

export interface ExpenseSearchRow {
  id: string;
  title: string;
  category: string;
}

export interface PaymentSearchRow {
  id: string;
  reference: string | null;
  family: { familyNo: string; headName: string };
}

export interface GallerySearchRow {
  id: string;
  title: string | null;
  description: string | null;
}
