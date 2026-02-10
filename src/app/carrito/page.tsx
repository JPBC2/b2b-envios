'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function CarritoPage() {
    const { items, updateQuantity, removeItem, clearCart, subtotal, iva, total, itemCount } = useCart();

    if (itemCount === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="text-8xl mb-6">🛒</div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Tu carrito está vacío</h1>
                <p className="text-slate-600 mb-8">
                    Agrega productos de nuestro catálogo para comenzar tu pedido.
                </p>
                <Link
                    href="/productos/"
                    className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
                >
                    Ver Productos
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                <Link href="/" className="hover:text-amber-600">Inicio</Link>
                <span>/</span>
                <span className="text-slate-800 font-medium">Carrito</span>
            </nav>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-900">🛒 Carrito de Compras</h1>
                <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                    Vaciar carrito
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.commodityCode}
                            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-6"
                        >
                            {/* Product info */}
                            <div className="flex-1">
                                <Link
                                    href={`/productos/${item.commodityCode.toLowerCase()}/`}
                                    className="font-semibold text-lg text-slate-900 hover:text-amber-600 transition-colors"
                                >
                                    {item.name}
                                </Link>
                                <p className="text-slate-500 text-sm mt-1">
                                    ${item.unitPrice.toFixed(2)} MXN / {item.unit}
                                </p>
                            </div>

                            {/* Quantity controls */}
                            <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => updateQuantity(item.commodityCode, item.quantity - 1)}
                                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.commodityCode, parseInt(e.target.value) || 1)}
                                    className="w-16 text-center py-1.5 font-semibold border-x border-slate-300 focus:outline-none"
                                    min={1}
                                />
                                <button
                                    onClick={() => updateQuantity(item.commodityCode, item.quantity + 1)}
                                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                                >
                                    +
                                </button>
                            </div>

                            {/* Line total */}
                            <div className="text-right min-w-[100px]">
                                <p className="font-bold text-slate-900">
                                    ${(item.unitPrice * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-xs text-slate-400">MXN</p>
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() => removeItem(item.commodityCode)}
                                className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                aria-label={`Eliminar ${item.name}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                                    <path d="M18 6 6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-24">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Resumen del Pedido</h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Productos ({itemCount})</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>IVA (16%)</span>
                                <span>${iva.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Envío</span>
                                <span className="text-emerald-600 font-medium">Por cotizar</span>
                            </div>
                            <hr className="border-slate-200" />
                            <div className="flex justify-between text-lg font-bold text-slate-900">
                                <span>Total</span>
                                <span>${total.toFixed(2)} MXN</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout/"
                            className="mt-6 w-full block text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
                        >
                            Proceder al Pago
                        </Link>

                        <p className="text-xs text-slate-400 text-center mt-4">
                            💳 Modelo Prepago — Pago antes del envío
                        </p>

                        <Link
                            href="/productos/"
                            className="mt-4 w-full block text-center text-amber-600 hover:text-amber-700 font-medium text-sm"
                        >
                            ← Seguir comprando
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
