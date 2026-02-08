/**
 * Commodity Definitions for B2B Shipping Supplies
 * 
 * Each product is tracked as a commodity in the ledger.
 * This enables per-product inventory tracking, costing, and reporting.
 */

export interface ProductCommodity {
    code: string;
    nameEs: string;
    nameEn: string;
    unit: string;
    precision: number;
    category: 'packaging' | 'protection' | 'tape' | 'containers';
    description?: string;
}

/**
 * Product catalog as ledger commodities
 */
export const commodities: ProductCommodity[] = [
    // ═══════════════════════════════════════════════════════════════════
    // EMBALAJE (Packaging)
    // ═══════════════════════════════════════════════════════════════════
    {
        code: 'PLAYO',
        nameEs: 'Playo / Película Estirable',
        nameEn: 'Stretch Wrap',
        unit: 'ROLLO',
        precision: 0,
        category: 'packaging',
        description: 'Película plástica para embalaje de tarimas',
    },
    {
        code: 'BOLSA',
        nameEs: 'Bolsa de Plástico',
        nameEn: 'Plastic Bag',
        unit: 'PAQUETE',
        precision: 0,
        category: 'packaging',
        description: 'Bolsas de polietileno varios tamaños',
    },

    // ═══════════════════════════════════════════════════════════════════
    // PROTECCIÓN (Protection)
    // ═══════════════════════════════════════════════════════════════════
    {
        code: 'ESQUINERO',
        nameEs: 'Esquinero de Cartón',
        nameEn: 'Cardboard Corner Protector',
        unit: 'PZA',
        precision: 0,
        category: 'protection',
        description: 'Protectores de esquina para tarimas',
    },
    {
        code: 'LAMINA',
        nameEs: 'Lámina de Cartón',
        nameEn: 'Cardboard Sheet',
        unit: 'PZA',
        precision: 0,
        category: 'protection',
        description: 'Láminas de cartón corrugado',
    },

    // ═══════════════════════════════════════════════════════════════════
    // CINTAS (Tapes)
    // ═══════════════════════════════════════════════════════════════════
    {
        code: 'CINTA',
        nameEs: 'Cinta Adhesiva',
        nameEn: 'Packaging Tape',
        unit: 'ROLLO',
        precision: 0,
        category: 'tape',
        description: 'Cinta adhesiva transparente o café',
    },

    // ═══════════════════════════════════════════════════════════════════
    // CONTENEDORES (Containers)
    // ═══════════════════════════════════════════════════════════════════
    {
        code: 'CUBETA',
        nameEs: 'Cubeta de Plástico',
        nameEn: 'Plastic Bucket',
        unit: 'PZA',
        precision: 0,
        category: 'containers',
        description: 'Cubetas industriales de plástico',
    },
];

/**
 * Default currency for monetary transactions
 */
export const defaultCurrency = {
    code: 'MXN',
    name: 'Peso Mexicano',
    precision: 2,
};

/**
 * Get commodity by code
 */
export function getCommodity(code: string): ProductCommodity | undefined {
    return commodities.find(c => c.code === code);
}

/**
 * Get commodities by category
 */
export function getCommoditiesByCategory(category: ProductCommodity['category']): ProductCommodity[] {
    return commodities.filter(c => c.category === category);
}

/**
 * Category display names in Spanish
 */
export const categoryNames: Record<ProductCommodity['category'], string> = {
    packaging: 'Embalaje',
    protection: 'Protección',
    tape: 'Cintas',
    containers: 'Contenedores',
};
