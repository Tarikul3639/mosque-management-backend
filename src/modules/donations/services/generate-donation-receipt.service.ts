import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { DONATION_MESSAGES } from '../constants/donation.constants';
import { generateDonationReceiptPdf } from '../utils/donation-receipt-pdf';
import { DonationReceiptResponseDto } from '../dto/responses/donation-receipt-response.dto';

@Injectable()
export class GenerateDonationReceiptService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(id: string) {
        const donation = await this.prisma.donation.findUnique({
            where: {
                id,
            },
            include: {
                donor: true,
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                updatedBy: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!donation) {
            throw new NotFoundException(DONATION_MESSAGES.DONATION_NOT_FOUND);
        }

        const donationReceiptResponse: DonationReceiptResponseDto = {
            id: donation.id,
            receiptNo: donation.receiptNo,
            donatedAt: donation.donatedAt,
            amount: donation.amount.toNumber(),
            purpose: donation.purpose,
            paymentMethod: donation.paymentMethod,
            transactionReference: donation.transactionReference,
            isAnonymous: donation.isAnonymous,
            note: donation.note,
            donor: donation.donor,
            createdBy: donation.createdBy,
            updatedBy: donation.updatedBy,
            createdAt: donation.createdAt,
            updatedAt: donation.updatedAt,
        };

        const buffer = await generateDonationReceiptPdf(donationReceiptResponse);

        return {
            fileName: `${donation.receiptNo}.pdf`,
            buffer,
        };
    }
}