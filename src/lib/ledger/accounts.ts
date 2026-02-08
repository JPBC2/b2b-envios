/**
 * Chart of Accounts for B2B Wholesale E-commerce
 * 
 * Based on Pattern C (Warehouse/Trading) + SAT Mexico structure.
 * See: ledger/spec/COOKBOOK.md
 */

import { AccountCode, type Account } from './config';

export const chartOfAccounts: Account[] = [
    // ═══════════════════════════════════════════════════════════════════
    // ACTIVO (Assets)
    // ═══════════════════════════════════════════════════════════════════
    {
        code: AccountCode('1000'),
        name: 'Activo',
        type: 'asset',
        normalBalance: 'debit',
        active: true,
    },
    {
        code: AccountCode('1100'),
        name: 'Bancos',
        type: 'asset',
        normalBalance: 'debit',
        parentCode: '1000',
        requiresParty: true,
        active: true,
    },
    {
        code: AccountCode('1101'),
        name: 'Bancos MXN',
        type: 'asset',
        normalBalance: 'debit',
        parentCode: '1100',
        requiresParty: true,
        active: true,
    },
    {
        code: AccountCode('1200'),
        name: 'Clientes',
        type: 'asset',
        normalBalance: 'debit',
        parentCode: '1000',
        requiresParty: true,
        active: true,
        description: 'Cuentas por cobrar a clientes',
    },
    {
        code: AccountCode('1300'),
        name: 'Inventario',
        type: 'asset',
        normalBalance: 'debit',
        parentCode: '1000',
        requiresCommodity: true,
        requiredDimensions: ['almacen'],
        active: true,
        description: 'Inventario de productos para venta',
    },
    {
        code: AccountCode('1400'),
        name: 'IVA Acreditable',
        type: 'asset',
        normalBalance: 'debit',
        parentCode: '1000',
        active: true,
        description: 'IVA pagado en compras (16%)',
    },

    // ═══════════════════════════════════════════════════════════════════
    // PASIVO (Liabilities)
    // ═══════════════════════════════════════════════════════════════════
    {
        code: AccountCode('2000'),
        name: 'Pasivo',
        type: 'liability',
        normalBalance: 'credit',
        active: true,
    },
    {
        code: AccountCode('2100'),
        name: 'Proveedores',
        type: 'liability',
        normalBalance: 'credit',
        parentCode: '2000',
        requiresParty: true,
        active: true,
        description: 'Cuentas por pagar a proveedores',
    },
    {
        code: AccountCode('2200'),
        name: 'IVA Trasladado',
        type: 'liability',
        normalBalance: 'credit',
        parentCode: '2000',
        active: true,
        description: 'IVA cobrado en ventas (16%)',
    },

    // ═══════════════════════════════════════════════════════════════════
    // CAPITAL (Equity)
    // ═══════════════════════════════════════════════════════════════════
    {
        code: AccountCode('3000'),
        name: 'Capital',
        type: 'equity',
        normalBalance: 'credit',
        active: true,
    },
    {
        code: AccountCode('3100'),
        name: 'Capital Social',
        type: 'equity',
        normalBalance: 'credit',
        parentCode: '3000',
        active: true,
    },

    // ═══════════════════════════════════════════════════════════════════
    // INGRESOS (Revenue)
    // ═══════════════════════════════════════════════════════════════════
    {
        code: AccountCode('4000'),
        name: 'Ingresos',
        type: 'revenue',
        normalBalance: 'credit',
        active: true,
    },
    {
        code: AccountCode('4100'),
        name: 'Ventas',
        type: 'revenue',
        normalBalance: 'credit',
        parentCode: '4000',
        active: true,
        description: 'Ingresos por venta de productos',
    },

    // ═══════════════════════════════════════════════════════════════════
    // COSTOS Y GASTOS (Expenses)
    // ═══════════════════════════════════════════════════════════════════
    {
        code: AccountCode('5000'),
        name: 'Costo de Ventas',
        type: 'expense',
        normalBalance: 'debit',
        active: true,
    },
    {
        code: AccountCode('5100'),
        name: 'Costo de Mercancía Vendida',
        type: 'expense',
        normalBalance: 'debit',
        parentCode: '5000',
        active: true,
    },
    {
        code: AccountCode('6000'),
        name: 'Gastos de Operación',
        type: 'expense',
        normalBalance: 'debit',
        active: true,
    },
    {
        code: AccountCode('6100'),
        name: 'Gastos de Administración',
        type: 'expense',
        normalBalance: 'debit',
        parentCode: '6000',
        active: true,
    },
];
