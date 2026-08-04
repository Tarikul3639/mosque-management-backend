// src/modules/payments/utils/generate-payment-receipt-pdf.ts

import { ReceiptResponseDto } from '../dto/responses/receipt-response.dto';
import PDFDocument from 'pdfkit';

export async function generatePaymentReceiptPdf(
  receipt: ReceiptResponseDto,
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
      .text('Official Monthly Payment Receipt', {
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

    doc.text(`Receipt No : ${receipt.receiptNo}`);
    doc.text(`Date       : ${new Date(receipt.paidAt).toLocaleString()}`);
    doc.text(`Billing    : Month ${receipt.month}, ${receipt.year}`);
    doc.text(
      `Paid Amt   : BDT ${Number(receipt.paymentAmount).toLocaleString('en-BD', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    );
    doc.text(`Status     : ${receipt.status}`);
    doc.text(`Method     : ${receipt.method}`);

    if (receipt.reference) {
      doc.text(`Reference  : ${receipt.reference}`);
    }

    doc.moveDown();

    // =========================
    // Family / Member Information
    // =========================

    doc.font('Helvetica-Bold').fontSize(16).text('Family Information');

    doc.moveDown(0.5);

    doc.font('Helvetica').fontSize(11);

    doc.text(`Family No  : ${receipt.familyNo}`);
    doc.text(`Head Name  : ${receipt.headName}`);
    doc.text(`Phone      : ${receipt.phone ?? '-'}`);
    doc.text(`Address    : ${receipt.address ?? '-'}`);

    doc.moveDown();

    // =========================
    // Note
    // =========================

    if (receipt.note) {
      doc.font('Helvetica-Bold').fontSize(16).text('Note');

      doc.moveDown(0.5);

      doc.font('Helvetica').fontSize(11).text(receipt.note);

      doc.moveDown();
    }

    // =========================
    // Thank You Box
    // =========================

    doc.roundedRect(50, doc.y, 495, 70, 6).stroke('#cccccc');

    doc.moveDown();

    doc
      .font('Helvetica-Bold')
      .fontSize(13)
      .text('May Allah accept your contribution.', {
        align: 'center',
      });

    doc.moveDown(0.5);

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#555')
      .text(
        'Jazakallahu Khairan for fulfilling your monthly commitment.',
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