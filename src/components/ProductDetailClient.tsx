'use client';

import { useState } from 'react';
import Link from 'next/link';
import { commodities, categoryNames, type ProductCommodity } from '@/lib/ledger/commodities';
import { getProductPrice, getEffectivePrice, type ProductPrice } from '@/lib/ledger/prices';
import { useCart } from '@/lib/cart-context';

// Category icons mapping
const categoryIcons: Record<string, string> = {
    packaging: '📦',
    protection: '🛡️',
    tape: '🔗',
    containers: '🪣',
};

// Product images (gradient placeholders with icons)
const productImages: Record<string, { gradient: string; icon: string }> = {
    PLAYO: { gradient: 'from-blue-500 to-cyan-400', icon: '🎞️' },
    BOLSA: { gradient: 'from-emerald-500 to-green-400', icon: '🛍️' },
    ESQUINERO: { gradient: 'from-amber-500 to-yellow-400', icon: '📐' },
    LAMINA: { gradient: 'from-orange-500 to-red-400', icon: '📄' },
    CINTA: { gradient: 'from-purple-500 to-pink-400', icon: '🔗' },
    CUBETA: { gradient: 'from-sky-500 to-indigo-400', icon: '🪣' },
};

function ProductDetailClient({ commodity, price }: { commodity: ProductCommodity; price: ProductPrice | undefined }) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(price?.minOrder || 1);
    const [added, setAdded] = useState(false);

    const img = productImages[commodity.code] || { gradient: 'from-gray-500 to-gray-400', icon: '📦' };
    const effectivePrice = price ? getEffectivePrice(commodity.code, quantity) : 0;
    const isBulkPrice = price?.bulkPrice && price.bulkMinOrder && quantity >= price.bulkMinOrder;
    const subtotal = effectivePrice * quantity;
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    const handleAddToCart = () => {
        if (!price) return;
        addItem({
            commodityCode: commodity.code,
            name: commodity.nameEs,
            unitPrice: effectivePrice,
            unit: commodity.unit,
        }, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                <Link href="/" className="hover:text-amber-600">Inicio</Link>
                <span>/</span>
                <Link href="/productos/" className="hover:text-amber-600">Productos</Link>
                <span>/</span>
                <span className="text-slate-800 font-medium">{commodity.nameEs}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className={`bg-gradient-to-br ${img.gradient} rounded-2xl aspect-square flex items-center justify-center shadow-xl`}>
                    <span className="text-9xl drop-shadow-lg">{img.icon}</span>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-6">
                    {/* Category badge */}
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                            {categoryIcons[commodity.category]} {categoryNames[commodity.category]}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">COD: {commodity.code}</span>
                    </div>

                    {/* Name */}
                    <h1 className="text-4xl font-bold text-slate-900">{commodity.nameEs}</h1>
                    <p className="text-lg text-slate-500">{commodity.nameEn}</p>

                    {/* Description */}
                    <p className="text-slate-600 text-lg leading-relaxed">
                        {commodity.description}
                    </p>

                    {/* Pricing */}
                    {price && (
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-4xl font-bold text-slate-900">
                                    ${effectivePrice.toFixed(2)}
                                </span>
                                <span className="text-slate-500">MXN / {commodity.unit}</span>
                            </div>
                            {isBulkPrice && (
                                <p className="text-emerald-600 text-sm font-medium">
                                    ✅ Precio mayoreo aplicado (antes ${price.unitPrice.toFixed(2)})
                                </p>
                            )}
                            {price.bulkPrice && price.bulkMinOrder && !isBulkPrice && (
                                <p className="text-amber-600 text-sm">
                                    💡 Compra {price.bulkMinOrder}+ unidades y paga solo ${price.bulkPrice.toFixed(2)} c/u
                                </p>
                            )}
                            <p className="text-xs text-slate-400 mt-1">+ IVA (16%)</p>
                        </div>
                    )}

                    {/* Quantity Selector + Add to Cart */}
                    {price && (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium text-slate-700">Cantidad:</label>
                                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(price.minOrder, quantity - 1))}
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(price.minOrder, parseInt(e.target.value) || price.minOrder))}
                                        className="w-20 text-center py-2 text-lg font-semibold border-x border-slate-300 focus:outline-none"
                                        min={price.minOrder}
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-sm text-slate-500">Mín: {price.minOrder} {commodity.unit.toLowerCase()}(s)</span>
                            </div>

                            {/* Order summary */}
                            <div className="bg-slate-50 rounded-lg p-4 text-sm space-y-1">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal ({quantity} x ${effectivePrice.toFixed(2)})</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>IVA (16%)</span>
                                    <span>${iva.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-900 font-bold text-base pt-1 border-t border-slate-200">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)} MXN</span>
                                </div>
                            </div>

                            {/* Add to cart button */}
                            <button
                                onClick={handleAddToCart}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${added
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                                    }`}
                            >
                                {added ? '✅ Agregado al Carrito' : '🛒 Agregar al Carrito'}
                            </button>
                        </div>
                    )}

                    {/* Info badges */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <span className="block text-2xl mb-1">🚚</span>
                            <span className="text-xs text-slate-600 font-medium">Entrega en ZMCM</span>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 rounded-lg">
                            <span className="block text-2xl mb-1">💳</span>
                            <span className="text-xs text-slate-600 font-medium">Prepago Seguro</span>
                        </div>
                        <div className="text-center p-3 bg-amber-50 rounded-lg">
                            <span className="block text-2xl mb-1">🧾</span>
                            <span className="text-xs text-slate-600 font-medium">Factura CFDI</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Otros Productos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {commodities
                        .filter(c => c.code !== commodity.code)
                        .map(other => {
                            const otherImg = productImages[other.code] || { gradient: 'from-gray-500 to-gray-400', icon: '📦' };
                            const otherPrice = getProductPrice(other.code);
                            return (
                                <Link
                                    key={other.code}
                                    href={`/productos/${other.code.toLowerCase()}/`}
                                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100"
                                >
                                    <div className={`bg-gradient-to-br ${otherImg.gradient} aspect-square flex items-center justify-center group-hover:scale-105 transition-transform`}>
                                        <span className="text-4xl">{otherImg.icon}</span>
                                    </div>
                                    <div className="p-3">
                                        <p className="font-medium text-sm text-slate-800 truncate">{other.nameEs}</p>
                                        {otherPrice && (
                                            <p className="text-amber-600 font-bold text-sm">${otherPrice.unitPrice.toFixed(2)} / {other.unit}</p>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </section>
        </div>
    );
}

export default ProductDetailClient;
