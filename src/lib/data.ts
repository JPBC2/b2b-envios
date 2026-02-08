/**
 * Sample Data Store
 * 
 * In production, this would be a database. For demo purposes,
 * we use in-memory data that persists during the session.
 */

import { commodities } from './ledger';

// ═══════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════

export type OrderStatus = 'pending_payment' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'transfer' | 'card' | 'cash';

export interface OrderItem {
    commodityCode: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: OrderItem[];
    subtotal: number;
    iva: number;
    total: number;
    status: OrderStatus;
    paymentMethod?: PaymentMethod;
    paymentReference?: string;
    paidAt?: string;
    createdAt: string;
    updatedAt: string;
    notes?: string;
    deliveryAddress: string;
}

export interface InventoryItem {
    commodityCode: string;
    quantity: number;
    unitCost: number;
    totalValue: number;
    warehouse: string;
    lastUpdated: string;
}

export interface PurchaseOrder {
    id: string;
    poNumber: string;
    supplierId: string;
    supplierName: string;
    items: { commodityCode: string; quantity: number; unitCost: number }[];
    subtotal: number;
    iva: number;
    total: number;
    status: 'draft' | 'sent' | 'received' | 'cancelled';
    createdAt: string;
    receivedAt?: string;
}

// ═══════════════════════════════════════════════════════════════════
// Sample Data
// ═══════════════════════════════════════════════════════════════════

export const sampleOrders: Order[] = [
    {
        id: 'ord-001',
        orderNumber: 'PED-2026-0001',
        customerName: 'Logística del Norte S.A.',
        customerEmail: 'compras@logisticanorte.mx',
        customerPhone: '55 1234 5678',
        items: [
            { commodityCode: 'PLAYO', quantity: 50, unitPrice: 285, subtotal: 14250 },
            { commodityCode: 'CINTA', quantity: 100, unitPrice: 45, subtotal: 4500 },
        ],
        subtotal: 18750,
        iva: 3000,
        total: 21750,
        status: 'pending_payment',
        createdAt: '2026-02-08T10:30:00Z',
        updatedAt: '2026-02-08T10:30:00Z',
        deliveryAddress: 'Av. Industrial 123, Naucalpan, Estado de México',
    },
    {
        id: 'ord-002',
        orderNumber: 'PED-2026-0002',
        customerName: 'Empaques Rápidos',
        customerEmail: 'pedidos@empaquesrapidos.com',
        customerPhone: '55 8765 4321',
        items: [
            { commodityCode: 'ESQUINERO', quantity: 500, unitPrice: 8.50, subtotal: 4250 },
            { commodityCode: 'LAMINA', quantity: 200, unitPrice: 12, subtotal: 2400 },
        ],
        subtotal: 6650,
        iva: 1064,
        total: 7714,
        status: 'paid',
        paymentMethod: 'transfer',
        paymentReference: 'SPEI-20260208-001',
        paidAt: '2026-02-08T11:45:00Z',
        createdAt: '2026-02-08T09:00:00Z',
        updatedAt: '2026-02-08T11:45:00Z',
        deliveryAddress: 'Calle Comercio 456, Tlalnepantla, Estado de México',
    },
    {
        id: 'ord-003',
        orderNumber: 'PED-2026-0003',
        customerName: 'Distribuidora Central',
        customerEmail: 'compras@distcentral.mx',
        customerPhone: '55 2468 1357',
        items: [
            { commodityCode: 'CUBETA', quantity: 100, unitPrice: 65, subtotal: 6500 },
            { commodityCode: 'BOLSA', quantity: 50, unitPrice: 150, subtotal: 7500 },
        ],
        subtotal: 14000,
        iva: 2240,
        total: 16240,
        status: 'preparing',
        paymentMethod: 'card',
        paidAt: '2026-02-07T16:20:00Z',
        createdAt: '2026-02-07T15:00:00Z',
        updatedAt: '2026-02-08T08:00:00Z',
        deliveryAddress: 'Blvd. Ávila Camacho 789, Miguel Hidalgo, CDMX',
    },
    {
        id: 'ord-004',
        orderNumber: 'PED-2026-0004',
        customerName: 'Almacenes del Sur',
        customerEmail: 'operaciones@almacsur.mx',
        customerPhone: '55 1357 2468',
        items: [
            { commodityCode: 'PLAYO', quantity: 200, unitPrice: 285, subtotal: 57000 },
        ],
        subtotal: 57000,
        iva: 9120,
        total: 66120,
        status: 'shipped',
        paymentMethod: 'transfer',
        paymentReference: 'SPEI-20260207-003',
        paidAt: '2026-02-06T14:00:00Z',
        createdAt: '2026-02-06T10:00:00Z',
        updatedAt: '2026-02-08T07:30:00Z',
        deliveryAddress: 'Calz. de Tlalpan 1000, Coyoacán, CDMX',
    },
];

export const sampleInventory: InventoryItem[] = commodities.map((c, i) => ({
    commodityCode: c.code,
    quantity: [500, 300, 1000, 800, 200, 150][i] || 100,
    unitCost: [250, 120, 7, 10, 38, 55][i] || 50,
    totalValue: 0, // calculated below
    warehouse: 'CDMX-Principal',
    lastUpdated: '2026-02-08T00:00:00Z',
})).map(item => ({ ...item, totalValue: item.quantity * item.unitCost }));

export const samplePurchaseOrders: PurchaseOrder[] = [
    {
        id: 'po-001',
        poNumber: 'OC-2026-0001',
        supplierId: 'PROV-001',
        supplierName: 'Plásticos Industriales MX',
        items: [
            { commodityCode: 'PLAYO', quantity: 500, unitCost: 250 },
            { commodityCode: 'BOLSA', quantity: 200, unitCost: 120 },
        ],
        subtotal: 149000,
        iva: 23840,
        total: 172840,
        status: 'sent',
        createdAt: '2026-02-05T10:00:00Z',
    },
];

// ═══════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════

export function getOrdersByStatus(status: OrderStatus): Order[] {
    return sampleOrders.filter(o => o.status === status);
}

export function getOrderStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = sampleOrders.filter(o => o.createdAt.startsWith(today));

    return {
        totalOrders: sampleOrders.length,
        pendingPayment: sampleOrders.filter(o => o.status === 'pending_payment').length,
        toShip: sampleOrders.filter(o => o.status === 'paid' || o.status === 'preparing').length,
        shipped: sampleOrders.filter(o => o.status === 'shipped').length,
        todayRevenue: todayOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' && o.status !== 'pending_payment' ? o.total : 0), 0),
        totalRevenue: sampleOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' && o.status !== 'pending_payment' ? o.total : 0), 0),
    };
}

export function getInventoryValue(): number {
    return sampleInventory.reduce((sum, item) => sum + item.totalValue, 0);
}

export function getLowStockItems(threshold = 200): InventoryItem[] {
    return sampleInventory.filter(item => item.quantity < threshold);
}

export const statusLabels: Record<OrderStatus, string> = {
    pending_payment: 'Pendiente de Pago',
    paid: 'Pagado',
    preparing: 'Preparando',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
};

export const statusColors: Record<OrderStatus, string> = {
    pending_payment: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    preparing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
};
