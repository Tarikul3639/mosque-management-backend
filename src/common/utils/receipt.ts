export class ReceiptNoGenerator {
    static generate(prefix: string, serial: number): string {
        const year = new Date().getFullYear();
        const sequence = serial.toString().padStart(6, '0');
        return `${prefix}-${year}-${sequence}`;
    }
}