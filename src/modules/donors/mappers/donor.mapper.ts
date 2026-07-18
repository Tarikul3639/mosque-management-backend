import { Donor } from '@/lib/prisma/client';
import { DonorResponseDto } from '../dto/responses/donor-response.dto';

export class DonorMapper {
  static toResponse(
    donor: Donor,
  ): DonorResponseDto {
    return {
      id: donor.id,
      fullName: donor.fullName,
      phone: donor.phone,
      email: donor.email,
      avatar: donor.avatar,
      isActive: donor.isActive,
      address: donor.address,
      createdAt: donor.createdAt,
      updatedAt: donor.updatedAt,
    };
  }

  static toResponseList(
    donors: Donor[],
  ): DonorResponseDto[] {
    return donors.map(this.toResponse);
  }
}