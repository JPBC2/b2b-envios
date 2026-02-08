import Link from 'next/link';
import { samplePurchaseOrders } from '@/lib/data';
import { getCommodity } from '@/lib/ledger';

const poStatusLabels = {
    draft: 'Borrador',
    sent: 'Enviada',
    received: 'Recibida',
    cancelled: 'Cancelada',
};

const poStatusColors = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    received: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function PurchasesPage() {
    return (
        <div className="min-h-screen bg-slate-100">
            {/* Admin Header */}
            <header className="bg-slate-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">📦</span>
                                </div>
                                <span className="font-bold">B2B Envíos</span>
                            </Link>
                            <span className="text-slate-400">|</span>
                            <span className="text-amber-400 font-semibold">Admin</span>
                        </div>
                        <nav className="flex items-center gap-6">
                            <Link href="/admin" className="text-slate-300 hover:text-white">Dashboard</Link>
                            <Link href="/admin/orders" className="text-slate-300 hover:text-white">Pedidos</Link>
                            <Link href="/admin/inventory" className="text-slate-300 hover:text-white">Inventario</Link>
                            <Link href="/admin/purchases" className="text-white font-medium">Compras</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Órdenes de Compra</h1>
                        <p className="text-slate-600">Compras a proveedores</p>
                    </div>
                    <Link
                        href="/admin/purchases/new"
                        className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                    >
                        + Nueva Orden de Compra
                    </Link>
                </div>

                {/* Purchase Orders List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Orden</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Proveedor</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Productos</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Total</th>
                                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">Estado</th>
                                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {samplePurchaseOrders.map((po) => (
                                <tr key={po.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-800">{po.poNumber}</p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(po.createdAt).toLocaleDateString('es-MX', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-slate-700">{po.supplierName}</p>
                                        <p className="text-xs text-slate-500">{po.supplierId}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600">
                                            {po.items.map((item, i) => (
                                                <span key={i}>
                                                    {item.quantity} {getCommodity(item.commodityCode)?.nameEs.split(' / ')[0] || item.commodityCode}
                                                    {i < po.items.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-slate-800">${po.total.toLocaleString('es-MX')}</p>
                                        <p className="text-xs text-slate-500">IVA ${po.iva.toLocaleString('es-MX')}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${poStatusColors[po.status]}`}>
                                            {poStatusLabels[po.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            {po.status === 'sent' && (
                                                <button className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors">
                                                    Marcar Recibida
                                                </button>
                                            )}
                                            {po.status === 'draft' && (
                                                <button className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-200 transition-colors">
                                                    Enviar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {samplePurchaseOrders.length === 0 && (
                        <div className="text-center py-12">
                            <span className="text-4xl mb-4 block">📦</span>
                            <p className="text-slate-600">No hay órdenes de compra</p>
                            <Link
                                href="/admin/purchases/new"
                                className="mt-4 inline-block text-amber-600 font-medium hover:text-amber-700"
                            >
                                Crear primera orden →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Purchase Workflow */}
                <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-4">Flujo de Compras</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">1</span>
                            <span className="text-slate-600">Crear OC</span>
                        </div>
                        <span className="text-slate-300">→</span>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">2</span>
                            <span className="text-slate-600">Enviar a proveedor</span>
                        </div>
                        <span className="text-slate-300">→</span>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">3</span>
                            <span className="text-slate-600">Recibir mercancía</span>
                        </div>
                        <span className="text-slate-300">→</span>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">4</span>
                            <span className="text-slate-600">Actualiza inventario</span>
                        </div>
                    </div>
                </div>

                {/* Accounting Note */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-blue-800 mb-2">📊 Asiento Contable de Compra</h3>
                    <div className="text-sm text-blue-700 font-mono bg-blue-100 p-4 rounded-lg mt-2">
                        <p>DR 1300 Inventario (PLAYO × 500) ........ $125,000.00</p>
                        <p>DR 1400 IVA Acreditable .................. $20,000.00</p>
                        <p className="mt-1">    CR 2100 Proveedores .................. $145,000.00</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
