import { Prisma } from '@/lib/prisma/client';

import { DonorResponseDto } from '../dto/responses/donor-response.dto';

type DonorWithAvatar = Prisma.DonorGetPayload<{
  include: {
    avatar: {
      select: {
        id: true;
        url: true;
      };
    };
  };
}>;

export class DonorMapper {
  static toResponse(donor: DonorWithAvatar): DonorResponseDto {
    return {
      id: donor.id,
      name: donor.name,
      phone: donor.phone,
      email: donor.email,
      address: donor.address,

      avatar: donor.avatar
        ? {
          id: donor.avatar.id,
          url: donor.avatar.url,
        }
        : null,

      isActive: donor.isActive,

      createdAt: donor.createdAt,
      updatedAt: donor.updatedAt,
    };
  }

  static toResponseList(donors: DonorWithAvatar[]): DonorResponseDto[] {
    return donors.map((donor) => DonorMapper.toResponse(donor));
  }
}
