import { DonationResponseDto } from '../dto/responses/donation-response.dto';

export class DonationMapper {
  static toResponse(donation: any): DonationResponseDto {
    return {
      id: donation.id,
      amount: Number(donation.amount),
      purpose: donation.purpose,
      isAnonymous: donation.isAnonymous,
      receiptNo: donation.receiptNo,
      paymentMethod: donation.paymentMethod,
      transactionReference: donation.transactionReference,
      note: donation.note,
      donatedAt: donation.donatedAt,
      donor: {
        id: donation.donor.id,
        name: donation.donor.name,
        phone: donation.donor.phone,
        email: donation.donor.email,
        address: donation.donor.address,
      },
      createdBy: donation.createdBy
        ? {
            id: donation.createdBy.id,
            name: donation.createdBy.name,
          }
        : null,
      updatedBy: donation.updatedBy
        ? {
            id: donation.updatedBy.id,
            name: donation.updatedBy.name,
          }
        : null,
      createdAt: donation.createdAt,
      updatedAt: donation.updatedAt,
    };
  }

  static toResponseList(donations: any[]): DonationResponseDto[] {
    return donations.map((donation) => this.toResponse(donation));
  }
}