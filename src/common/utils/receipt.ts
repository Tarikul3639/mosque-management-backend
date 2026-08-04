export class ReceiptNoGenerator {
  static generate(paymentId: string, paidAt: Date): string {
    const year = paidAt.getFullYear();
    const month = String(paidAt.getMonth() + 1).padStart(2, '0');
    const unique = paymentId.replace(/-/g, '').slice(-6).toUpperCase();

    return `MSJ-${year}${month}-${unique}`;
  }
}
