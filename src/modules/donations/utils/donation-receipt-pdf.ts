// src/modules/donations/utils/donation-receipt-pdf.ts
import { DonationReceiptResponseDto } from '../dto/responses/donation-receipt-response.dto';

import PDFDocument from 'pdfkit';

export async function generateDonationReceiptPdf(
    donation: DonationReceiptResponseDto,
): Promise<Buffer> {
    return new Promise((resolve) => {
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50,
        });

        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));

        doc.on('end', () => {
            resolve(Buffer.concat(chunks));
        });

        // =========================
        // Header
        // =========================

        doc.fontSize(24).font('Helvetica-Bold').text('Baitul Aman Jame Mosque', {
            align: 'center',
        });

        doc
            .fontSize(12)
            .font('Helvetica')
            .fillColor('#666')
            .text('Official Donation Receipt', {
                align: 'center',
            });

        doc.moveDown();

        doc
            .strokeColor('#999')
            .lineWidth(1)
            .moveTo(50, doc.y)
            .lineTo(545, doc.y)
            .stroke();

        doc.moveDown();

        // =========================
        // Receipt Information
        // =========================

        doc
            .font('Helvetica-Bold')
            .fontSize(16)
            .fillColor('#000')
            .text('Receipt Information');

        doc.moveDown(0.5);

        doc.font('Helvetica').fontSize(11);

        doc.text(`Receipt No : ${donation.receiptNo}`);
        doc.text(`Date       : ${new Date(donation.donatedAt).toLocaleString()}`);
        doc.text(
            `Amount     : BDT ${Number(donation.amount).toLocaleString('en-BD', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
        );
        doc.text(`Purpose    : ${donation.purpose ?? '-'}`);
        doc.text(`Payment    : ${donation.paymentMethod}`);

        if (donation.transactionReference) {
            doc.text(`Reference  : ${donation.transactionReference}`);
        }

        doc.moveDown();

        // =========================
        // Donor Information
        // =========================

        doc.font('Helvetica-Bold').fontSize(16).text('Donor Information');

        doc.moveDown(0.5);

        doc.font('Helvetica').fontSize(11);

        if (donation.isAnonymous) {
            doc.text('Name       : Anonymous');
        } else {
            doc.text(`Name       : ${donation.donor?.name ?? '-'}`);

            doc.text(`Phone      : ${donation.donor?.phone ?? '-'}`);

            doc.text(`Email      : ${donation.donor?.email ?? '-'}`);

            doc.text(`Address    : ${donation.donor?.address ?? '-'}`);
        }

        doc.moveDown();

        // =========================
        // Note
        // =========================

        if (donation.note) {
            doc.font('Helvetica-Bold').fontSize(16).text('Note');

            doc.moveDown(0.5);

            doc.font('Helvetica').fontSize(11).text(donation.note);

            doc.moveDown();
        }

        // =========================
        // Thank You
        // =========================

        doc.roundedRect(50, doc.y, 495, 70, 6).stroke('#cccccc');

        doc.moveDown();

        doc
            .font('Helvetica-Bold')
            .fontSize(13)
            .text('May Allah accept your generous donation.', {
                align: 'center',
            });

        doc.moveDown(0.5);

        doc
            .font('Helvetica')
            .fontSize(10)
            .fillColor('#555')
            .text(
                'Jazakallahu Khairan for supporting the mosque and its activities.',
                {
                    align: 'center',
                },
            );

        doc.moveDown(4);

        // =========================
        // Signature
        // =========================

        const signatureY = doc.y;

        doc.moveTo(360, signatureY).lineTo(520, signatureY).stroke();

        doc.moveDown(0.3);

        doc.font('Helvetica').fontSize(10).text('Authorized Signature', 385);

        doc.moveDown(3);

        // =========================
        // Footer
        // =========================

        doc
            .fontSize(9)
            .fillColor('#777')
            .text('This is a computer-generated receipt. No signature is required.', {
                align: 'center',
            });

        doc.end();
    });
}
