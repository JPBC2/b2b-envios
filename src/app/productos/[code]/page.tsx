import { commodities } from '@/lib/ledger/commodities';
import { getProductPrice } from '@/lib/ledger/prices';
import ProductDetailClient from '@/components/ProductDetailClient';

// Generate static pages for all products
export function generateStaticParams() {
    return commodities.map((c) => ({
        code: c.code.toLowerCase(),
    }));
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ code: string }>;
}) {
    const { code } = await params;
    const commodity = commodities.find(c => c.code.toLowerCase() === code.toLowerCase());

    if (!commodity) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Producto no encontrado</h1>
                <p className="text-slate-600">El producto que buscas no existe.</p>
            </div>
        );
    }

    const price = getProductPrice(commodity.code);

    return <ProductDetailClient commodity={commodity} price={price} />;
}
