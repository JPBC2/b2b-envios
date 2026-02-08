import Link from "next/link";
import { commodities, categoryNames, type ProductCommodity } from "@/lib/ledger";

const categoryIcons: Record<string, string> = {
    packaging: '📦',
    protection: '🛡️',
    tape: '🎗️',
    containers: '🪣',
};

// Sample prices for demo (in production, these would come from database)
const samplePrices: Record<string, { price: number; unit: string }> = {
    PLAYO: { price: 285, unit: 'rollo' },
    BOLSA: { price: 150, unit: 'paquete' },
    ESQUINERO: { price: 8.50, unit: 'pieza' },
    LAMINA: { price: 12, unit: 'pieza' },
    CINTA: { price: 45, unit: 'rollo' },
    CUBETA: { price: 65, unit: 'pieza' },
};

interface ProductCardProps {
    product: ProductCommodity;
}

function ProductCard({ product }: ProductCardProps) {
    const priceInfo = samplePrices[product.code];

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover border border-slate-100 group">
            {/* Product Image */}
            <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[product.category]}
                </span>
                <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Mayoreo
                </span>
            </div>

            {/* Product Info */}
            <div className="p-6">
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                    {categoryNames[product.category]}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mt-2 mb-2">
                    {product.nameEs.split(' / ')[0]}
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                    {product.description}
                </p>

                {/* Price */}
                {priceInfo && (
                    <div className="mb-4">
                        <span className="text-2xl font-bold text-slate-800">
                            ${priceInfo.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-slate-500 text-sm"> MXN / {priceInfo.unit}</span>
                    </div>
                )}

                {/* Specs */}
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                        📦 Unidad: {product.unit}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Link
                        href={`/productos/${product.code.toLowerCase()}`}
                        className="flex-1 text-center bg-slate-100 text-slate-700 px-4 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                    >
                        Ver detalles
                    </Link>
                    <button
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-colors"
                    >
                        Cotizar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProductosPage({
    searchParams,
}: {
    searchParams: Promise<{ cat?: string }>;
}) {
    // This is a server component, we can await searchParams
    return <ProductosContent searchParamsPromise={searchParams} />;
}

async function ProductosContent({ searchParamsPromise }: { searchParamsPromise: Promise<{ cat?: string }> }) {
    const { cat } = await searchParamsPromise;

    // Filter products by category if specified
    const filteredProducts = cat
        ? commodities.filter(c => c.category === cat)
        : commodities;

    const categories = ['all', 'packaging', 'protection', 'tape', 'containers'];

    return (
        <>
            {/* Header */}
            <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="text-sm text-slate-400 mb-4">
                        <Link href="/" className="hover:text-white">Inicio</Link>
                        <span className="mx-2">›</span>
                        <span className="text-white">Productos</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Catálogo de Productos
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl">
                        Materiales de embalaje y transporte de alta calidad para tu negocio
                    </p>
                </div>
            </section>

            {/* Filters and Products */}
            <section className="py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href={category === 'all' ? '/productos' : `/productos?cat=${category}`}
                                className={`px-5 py-2.5 rounded-full font-medium transition-all ${(category === 'all' && !cat) || cat === category
                                        ? 'bg-amber-500 text-white shadow-md'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                {category === 'all' ? 'Todos' : (
                                    <>
                                        <span className="mr-1">{categoryIcons[category]}</span>
                                        {categoryNames[category as keyof typeof categoryNames]}
                                    </>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Results count */}
                    <p className="text-slate-600 mb-6">
                        Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                    </p>

                    {/* Products Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.code} product={product} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-16">
                            <span className="text-6xl mb-4 block">📦</span>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                No hay productos en esta categoría
                            </h3>
                            <p className="text-slate-600 mb-4">
                                Intenta seleccionar otra categoría
                            </p>
                            <Link
                                href="/productos"
                                className="text-amber-600 font-semibold hover:text-amber-700"
                            >
                                Ver todos los productos
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                        ¿No encuentras lo que buscas?
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Contáctanos para productos especiales o pedidos personalizados
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:from-amber-600 hover:to-orange-600 transition-colors shadow-lg"
                    >
                        Contactar Ventas
                    </Link>
                </div>
            </section>
        </>
    );
}
