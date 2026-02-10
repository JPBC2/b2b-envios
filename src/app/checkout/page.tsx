'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

type Step = 'info' | 'confirm' | 'done';

export default function CheckoutPage() {
    const { items, subtotal, iva, total, itemCount, clearCart } = useCart();
    const [step, setStep] = useState<Step>('info');
    const [orderId] = useState(() => `ORD-${Date.now().toString(36).toUpperCase()}`);

    // Customer form state
    const [form, setForm] = useState({
        company: '',
        rfc: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        city: 'Ciudad de México',
        notes: '',
    });

    const updateForm = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const isFormValid = form.company && form.name && form.email && form.phone && form.address;

    if (itemCount === 0 && step !== 'done') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="text-8xl mb-6">🛒</div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">No hay productos en tu carrito</h1>
                <p className="text-slate-600 mb-8">Agrega productos antes de proceder al pago.</p>
                <Link
                    href="/productos/"
                    className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold"
                >
                    Ver Productos
                </Link>
            </div>
        );
    }

    if (step === 'done') {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <div className="bg-emerald-50 rounded-3xl p-12 border border-emerald-200">
                    <div className="text-7xl mb-6">✅</div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">¡Pedido Registrado!</h1>
                    <p className="text-lg text-slate-600 mb-6">
                        Tu pedido ha sido registrado exitosamente.
                    </p>

                    <div className="bg-white rounded-xl p-6 mb-8 text-left max-w-md mx-auto shadow-sm border border-slate-100">
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Número de pedido</span>
                                <span className="font-mono font-bold text-amber-600">{orderId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Empresa</span>
                                <span className="font-medium">{form.company}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Total</span>
                                <span className="font-bold text-lg">${total.toFixed(2)} MXN</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Estado</span>
                                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">
                                    ⏳ Pendiente de Pago
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-4 mb-8 border border-amber-200 max-w-md mx-auto">
                        <p className="text-amber-800 text-sm font-medium">
                            💳 <strong>Modelo Prepago:</strong> Recibirás instrucciones de pago por correo electrónico a <strong>{form.email}</strong>.
                            Tu pedido será procesado una vez confirmado el pago.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
                        >
                            Volver al Inicio
                        </Link>
                        <Link
                            href="/productos/"
                            className="border border-slate-300 text-slate-700 px-8 py-3 rounded-full font-semibold hover:bg-slate-50 transition-all"
                        >
                            Seguir Comprando
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                <Link href="/" className="hover:text-amber-600">Inicio</Link>
                <span>/</span>
                <Link href="/carrito/" className="hover:text-amber-600">Carrito</Link>
                <span>/</span>
                <span className="text-slate-800 font-medium">Checkout</span>
            </nav>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-10">
                <div className={`flex items-center gap-2 ${step === 'info' ? 'text-amber-600' : 'text-emerald-600'}`}>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 'info' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
                        {step === 'info' ? '1' : '✓'}
                    </span>
                    <span className="font-medium text-sm">Datos</span>
                </div>
                <div className="w-12 h-0.5 bg-slate-300" />
                <div className={`flex items-center gap-2 ${step === 'confirm' ? 'text-amber-600' : 'text-slate-400'}`}>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 'confirm' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        2
                    </span>
                    <span className="font-medium text-sm">Confirmar</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form / Confirmation */}
                <div className="lg:col-span-2">
                    {step === 'info' && (
                        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">📋 Datos del Cliente</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Empresa / Razón Social *</label>
                                    <input
                                        type="text"
                                        value={form.company}
                                        onChange={(e) => updateForm('company', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="Mi Empresa S.A. de C.V."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">RFC</label>
                                    <input
                                        type="text"
                                        value={form.rfc}
                                        onChange={(e) => updateForm('rfc', e.target.value.toUpperCase())}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono"
                                        placeholder="XXXX000000XXX"
                                        maxLength={13}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de Contacto *</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => updateForm('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="Juan Pérez"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico *</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => updateForm('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="compras@miempresa.mx"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono *</label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => updateForm('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="(55) 1234-5678"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Dirección de Entrega *</label>
                                    <input
                                        type="text"
                                        value={form.address}
                                        onChange={(e) => updateForm('address', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                        placeholder="Calle, Número, Colonia, Delegación"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Ciudad</label>
                                    <input
                                        type="text"
                                        value={form.city}
                                        onChange={(e) => updateForm('city', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Notas adicionales</label>
                                    <textarea
                                        value={form.notes}
                                        onChange={(e) => updateForm('notes', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                                        rows={3}
                                        placeholder="Instrucciones de entrega, horario preferido, etc."
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => isFormValid && setStep('confirm')}
                                disabled={!isFormValid}
                                className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all ${isFormValid
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                Revisar Pedido →
                            </button>
                        </div>
                    )}

                    {step === 'confirm' && (
                        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">✅ Confirmar Pedido</h2>

                            {/* Customer Summary */}
                            <div className="bg-slate-50 rounded-lg p-5 mb-6">
                                <h3 className="font-semibold text-slate-900 mb-3">Datos del Cliente</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-slate-500">Empresa:</span>
                                    <span className="font-medium">{form.company}</span>
                                    {form.rfc && <><span className="text-slate-500">RFC:</span>
                                        <span className="font-mono">{form.rfc}</span></>}
                                    <span className="text-slate-500">Contacto:</span>
                                    <span>{form.name}</span>
                                    <span className="text-slate-500">Email:</span>
                                    <span>{form.email}</span>
                                    <span className="text-slate-500">Teléfono:</span>
                                    <span>{form.phone}</span>
                                    <span className="text-slate-500">Dirección:</span>
                                    <span>{form.address}, {form.city}</span>
                                </div>
                                <button
                                    onClick={() => setStep('info')}
                                    className="text-amber-600 hover:text-amber-700 text-sm font-medium mt-3"
                                >
                                    ✏️ Editar datos
                                </button>
                            </div>

                            {/* Items Summary */}
                            <div className="bg-slate-50 rounded-lg p-5 mb-6">
                                <h3 className="font-semibold text-slate-900 mb-3">Productos ({itemCount})</h3>
                                <div className="space-y-2">
                                    {items.map(item => (
                                        <div key={item.commodityCode} className="flex justify-between text-sm">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span className="font-medium">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Prepaid notice */}
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                                <p className="text-amber-800 text-sm">
                                    💳 <strong>Modelo Prepago:</strong> Al confirmar, recibirás instrucciones de pago por correo.
                                    Tu pedido será procesado una vez confirmado el pago.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep('info')}
                                    className="flex-1 py-4 rounded-xl font-bold text-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
                                >
                                    ← Regresar
                                </button>
                                <button
                                    onClick={() => {
                                        clearCart();
                                        setStep('done');
                                    }}
                                    className="flex-1 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-lg transition-all"
                                >
                                    Confirmar Pedido ✓
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                {(
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Resumen</h2>

                            <div className="space-y-2 text-sm mb-4">
                                {items.map(item => (
                                    <div key={item.commodityCode} className="flex justify-between text-slate-600">
                                        <span className="truncate mr-2">{item.quantity}x {item.name}</span>
                                        <span className="whitespace-nowrap">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-slate-200 mb-3" />

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>IVA (16%)</span>
                                    <span>${iva.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)} MXN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
