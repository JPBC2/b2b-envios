/**
 * Product pricing for B2B Wholesale
 * 
 * Prices are per unit in MXN before IVA.
 * Wholesale tiers can be added later.
 */

export interface ProductPrice {
    commodityCode: string;
    unitPrice: number;        // MXN per unit before IVA
    minOrder: number;         // Minimum order quantity
    bulkPrice?: number;       // Discounted price for large orders
    bulkMinOrder?: number;    // Minimum quantity for bulk price
}

export const productPrices: ProductPrice[] = [
    {
        commodityCode: 'PLAYO',
        unitPrice: 185.00,
        minOrder: 1,
        bulkPrice: 165.00,
        bulkMinOrder: 20,
    },
    {
        commodityCode: 'BOLSA',
        unitPrice: 95.00,
        minOrder: 1,
        bulkPrice: 80.00,
        bulkMinOrder: 50,
    },
    {
        commodityCode: 'ESQUINERO',
        unitPrice: 12.50,
        minOrder: 10,
        bulkPrice: 9.50,
        bulkMinOrder: 200,
    },
    {
        commodityCode: 'LAMINA',
        unitPrice: 18.00,
        minOrder: 10,
        bulkPrice: 14.50,
        bulkMinOrder: 100,
    },
    {
        commodityCode: 'CINTA',
        unitPrice: 45.00,
        minOrder: 1,
        bulkPrice: 38.00,
        bulkMinOrder: 24,
    },
    {
        commodityCode: 'CUBETA',
        unitPrice: 65.00,
        minOrder: 1,
        bulkPrice: 55.00,
        bulkMinOrder: 50,
    },
];

/**
 * Get price info for a product by commodity code
 */
export function getProductPrice(code: string): ProductPrice | undefined {
    return productPrices.find(p => p.commodityCode === code);
}

/**
 * Calculate effective unit price based on quantity
 */
export function getEffectivePrice(code: string, quantity: number): number {
    const price = getProductPrice(code);
    if (!price) return 0;
    if (price.bulkPrice && price.bulkMinOrder && quantity >= price.bulkMinOrder) {
        return price.bulkPrice;
    }
    return price.unitPrice;
}
