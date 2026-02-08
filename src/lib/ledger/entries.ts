/**
 * Journal Entry Helpers for E-commerce Transactions
 * 
 * Pre-built entry templates for common B2B wholesale operations.
 * These generate entry objects that can be used with the full
 * @openbancor/ledger library once it's built.
 */

import {
    AccountCode,
    Amount,
    ledgerConfig,
    type JournalEntry,
    type JournalLine
} from './config';

const IVA_RATE = ledgerConfig.ivaRate;

/**
 * Generate a unique ID
 */
function generateId(): string {
    return `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a purchase entry (buying from supplier)
 */
export function createPurchaseEntry(params: {
    supplierId: string;
    commodity: string;
    quantity: number;
    unitPrice: number;
    warehouse: string;
    documentNumber: string;
    date: string;
    description?: string;
}): JournalEntry {
    const subtotal = params.quantity * params.unitPrice;
    const iva = subtotal * IVA_RATE;
    const total = subtotal + iva;

    const lines: JournalLine[] = [
        {
            lineNumber: 1,
            accountCode: AccountCode('1300'), // Inventario
            debit: Amount(subtotal.toFixed(2)),
            credit: Amount('0.00'),
            commodity: params.commodity,
            price: params.unitPrice.toFixed(2),
            priceCommodity: 'MXN',
            quantity: params.quantity.toString(),
            dimensions: { almacen: params.warehouse },
            partyCode: params.supplierId,
            partyType: 'supplier',
        },
        {
            lineNumber: 2,
            accountCode: AccountCode('1400'), // IVA Acreditable
            debit: Amount(iva.toFixed(2)),
            credit: Amount('0.00'),
            description: 'IVA 16%',
        },
        {
            lineNumber: 3,
            accountCode: AccountCode('2100'), // Proveedores
            debit: Amount('0.00'),
            credit: Amount(total.toFixed(2)),
            partyCode: params.supplierId,
            partyType: 'supplier',
        },
    ];

    return {
        id: generateId(),
        ledgerId: ledgerConfig.ledgerId,
        documentType: 'standard',
        documentNumber: params.documentNumber,
        documentDate: params.date,
        postingDate: params.date,
        description: params.description || `Compra ${params.commodity} de ${params.supplierId}`,
        status: 'draft',
        lines,
        createdAt: new Date().toISOString(),
    };
}

/**
 * Create a sale entry (selling to customer)
 */
export function createSaleEntry(params: {
    customerId: string;
    commodity: string;
    quantity: number;
    unitCost: number;
    salePrice: number;
    warehouse: string;
    invoiceNumber: string;
    date: string;
    description?: string;
}): { sale: JournalEntry; cogs: JournalEntry } {
    const saleSubtotal = params.quantity * params.salePrice;
    const iva = saleSubtotal * IVA_RATE;
    const total = saleSubtotal + iva;
    const costTotal = params.quantity * params.unitCost;

    // Sale entry
    const saleLines: JournalLine[] = [
        {
            lineNumber: 1,
            accountCode: AccountCode('1200'), // Clientes
            debit: Amount(total.toFixed(2)),
            credit: Amount('0.00'),
            partyCode: params.customerId,
            partyType: 'customer',
        },
        {
            lineNumber: 2,
            accountCode: AccountCode('4100'), // Ventas
            debit: Amount('0.00'),
            credit: Amount(saleSubtotal.toFixed(2)),
            quantity: params.quantity.toString(),
        },
        {
            lineNumber: 3,
            accountCode: AccountCode('2200'), // IVA Trasladado
            debit: Amount('0.00'),
            credit: Amount(iva.toFixed(2)),
            description: 'IVA 16%',
        },
    ];

    const sale: JournalEntry = {
        id: generateId(),
        ledgerId: ledgerConfig.ledgerId,
        documentType: 'standard',
        documentNumber: params.invoiceNumber,
        documentDate: params.date,
        postingDate: params.date,
        description: params.description || `Venta ${params.commodity} a ${params.customerId}`,
        status: 'draft',
        lines: saleLines,
        createdAt: new Date().toISOString(),
    };

    // Cost of goods sold entry
    const cogsLines: JournalLine[] = [
        {
            lineNumber: 1,
            accountCode: AccountCode('5100'), // Costo de Mercancía Vendida
            debit: Amount(costTotal.toFixed(2)),
            credit: Amount('0.00'),
            quantity: params.quantity.toString(),
        },
        {
            lineNumber: 2,
            accountCode: AccountCode('1300'), // Inventario
            debit: Amount('0.00'),
            credit: Amount(costTotal.toFixed(2)),
            commodity: params.commodity,
            quantity: params.quantity.toString(),
            dimensions: { almacen: params.warehouse },
        },
    ];

    const cogs: JournalEntry = {
        id: generateId(),
        ledgerId: ledgerConfig.ledgerId,
        documentType: 'standard',
        documentNumber: `COGS-${params.invoiceNumber}`,
        documentDate: params.date,
        postingDate: params.date,
        description: `Costo de venta ${params.invoiceNumber}`,
        status: 'draft',
        lines: cogsLines,
        createdAt: new Date().toISOString(),
    };

    return { sale, cogs };
}

/**
 * Record customer payment
 */
export function createPaymentEntry(params: {
    customerId: string;
    amount: number;
    bankParty: string;
    referenceNumber: string;
    date: string;
    description?: string;
}): JournalEntry {
    const lines: JournalLine[] = [
        {
            lineNumber: 1,
            accountCode: AccountCode('1101'), // Bancos MXN
            debit: Amount(params.amount.toFixed(2)),
            credit: Amount('0.00'),
            partyCode: params.bankParty,
            partyType: 'bank',
        },
        {
            lineNumber: 2,
            accountCode: AccountCode('1200'), // Clientes
            debit: Amount('0.00'),
            credit: Amount(params.amount.toFixed(2)),
            partyCode: params.customerId,
            partyType: 'customer',
        },
    ];

    return {
        id: generateId(),
        ledgerId: ledgerConfig.ledgerId,
        documentType: 'standard',
        documentNumber: params.referenceNumber,
        documentDate: params.date,
        postingDate: params.date,
        description: params.description || `Cobro de ${params.customerId}`,
        status: 'draft',
        lines,
        createdAt: new Date().toISOString(),
    };
}

/**
 * Record supplier payment
 */
export function createSupplierPaymentEntry(params: {
    supplierId: string;
    amount: number;
    bankParty: string;
    referenceNumber: string;
    date: string;
    description?: string;
}): JournalEntry {
    const lines: JournalLine[] = [
        {
            lineNumber: 1,
            accountCode: AccountCode('2100'), // Proveedores
            debit: Amount(params.amount.toFixed(2)),
            credit: Amount('0.00'),
            partyCode: params.supplierId,
            partyType: 'supplier',
        },
        {
            lineNumber: 2,
            accountCode: AccountCode('1101'), // Bancos MXN
            debit: Amount('0.00'),
            credit: Amount(params.amount.toFixed(2)),
            partyCode: params.bankParty,
            partyType: 'bank',
        },
    ];

    return {
        id: generateId(),
        ledgerId: ledgerConfig.ledgerId,
        documentType: 'standard',
        documentNumber: params.referenceNumber,
        documentDate: params.date,
        postingDate: params.date,
        description: params.description || `Pago a ${params.supplierId}`,
        status: 'draft',
        lines,
        createdAt: new Date().toISOString(),
    };
}
