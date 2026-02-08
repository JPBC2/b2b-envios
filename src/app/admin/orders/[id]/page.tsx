import Link from 'next/link';
import { sampleOrders, statusLabels, statusColors, type Order } from '@/lib/data';
import { getCommodity } from '@/lib/ledger';

// Get order by ID
function getOrderById(id: string): Order | undefined {
    return sampleOrders.find(o => o.id === id);
}

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const order = getOrderById(id);

    if (!order) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Pedido no encontrado</h1>
                    <Link href="/admin/orders" className="text-amber-600 hover:text-amber-700">
                        ← Volver a pedidos
                    </Link>
                </div>
            </div>
        );
    }

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
                            <Link href="/admin/orders" className="text-white font-medium">Pedidos</Link>
                            <Link href="/admin/inventory" className="text-slate-300 hover:text-white">Inventario</Link>
                            <Link href="/admin/purchases" className="text-slate-300 hover:text-white">Compras</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-slate-500 mb-6">
                    <Link href="/admin/orders" className="hover:text-slate-700">Pedidos</Link>
                    <span className="mx-2">›</span>
                    <span className="text-slate-800">{order.orderNumber}</span>
                </nav>

                {/* Order Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-bold text-slate-800">{order.orderNumber}</h1>
                            <span className={`inline-block px-4 py-1.5 text-sm font-medium rounded-full ${statusColors[order.status]}`}>
                                {statusLabels[order.status]}
                            </span>
                        </div>
                        <p className="text-slate-600 mt-1">
                            Creado el {new Date(order.createdAt).toLocaleDateString('es-MX', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {order.status === 'pending_payment' && (
                            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                                ✓ Confirmar Pago
                            </button>
                        )}
                        {order.status === 'paid' && (
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                📦 Preparar Pedido
                            </button>
                        )}
                        {order.status === 'preparing' && (
                            <button className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                                🚚 Marcar Enviado
                            </button>
                        )}
                        {order.status === 'shipped' && (
                            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                                ✓ Confirmar Entrega
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Products */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-lg font-bold text-slate-800">Productos</h2>
                            </div>
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">Producto</th>
                                        <th className="text-right px-6 py-3 text-sm font-semibold text-slate-600">Cantidad</th>
                                        <th className="text-right px-6 py-3 text-sm font-semibold text-slate-600">Precio Unit.</th>
                                        <th className="text-right px-6 py-3 text-sm font-semibold text-slate-600">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {order.items.map((item, i) => {
                                        const product = getCommodity(item.commodityCode);
                                        return (
                                            <tr key={i}>
                                                <td className="px-6 py-4">
                                                    <p className="font-medium text-slate-800">{product?.nameEs.split(' / ')[0] || item.commodityCode}</p>
                                                    <code className="text-xs text-slate-500">{item.commodityCode}</code>
                                                </td>
                                                <td className="px-6 py-4 text-right font-medium text-slate-700">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 text-right text-slate-700">
                                                    ${item.unitPrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-slate-800">
                                                    ${item.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot className="bg-slate-50">
                                    <tr className="border-t border-slate-200">
                                        <td colSpan={3} className="px-6 py-3 text-right text-slate-600">Subtotal:</td>
                                        <td className="px-6 py-3 text-right font-medium text-slate-700">
                                            ${order.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className="px-6 py-3 text-right text-slate-600">IVA (16%):</td>
                                        <td className="px-6 py-3 text-right font-medium text-slate-700">
                                            ${order.iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-200">
                                        <td colSpan={3} className="px-6 py-4 text-right font-semibold text-slate-800">Total:</td>
                                        <td className="px-6 py-4 text-right font-bold text-xl text-slate-800">
                                            ${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Accounting Entry Preview */}
                        {order.status !== 'pending_payment' && order.status !== 'cancelled' && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                <h3 className="font-bold text-green-800 mb-2">📊 Asiento Contable Generado</h3>
                                <div className="text-sm text-green-700 font-mono bg-green-100 p-4 rounded-lg">
                                    <p>DR 1101 Bancos MXN .................. ${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
                                    <p className="mt-1">    CR 4100 Ventas ...................... ${order.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
                                    <p>    CR 2200 IVA Trasladado .............. ${order.iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Cliente</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-slate-500">Nombre</p>
                                    <p className="font-medium text-slate-800">{order.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Email</p>
                                    <p className="font-medium text-slate-800">{order.customerEmail}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Teléfono</p>
                                    <p className="font-medium text-slate-800">{order.customerPhone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Entrega</h3>
                            <p className="text-slate-700">{order.deliveryAddress}</p>
                        </div>

                        {/* Payment Info */}
                        {order.paidAt && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 className="font-bold text-slate-800 mb-4">Pago</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-slate-500">Método</p>
                                        <p className="font-medium text-slate-800">
                                            {order.paymentMethod === 'transfer' ? 'Transferencia' :
                                                order.paymentMethod === 'card' ? 'Tarjeta' : 'Efectivo'}
                                        </p>
                                    </div>
                                    {order.paymentReference && (
                                        <div>
                                            <p className="text-sm text-slate-500">Referencia</p>
                                            <p className="font-mono text-sm text-slate-800">{order.paymentReference}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm text-slate-500">Fecha de Pago</p>
                                        <p className="font-medium text-slate-800">
                                            {new Date(order.paidAt).toLocaleDateString('es-MX', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Timeline */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Historial</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">Pedido creado</p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(order.createdAt).toLocaleDateString('es-MX', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                {order.paidAt && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-800">Pago confirmado</p>
                                            <p className="text-xs text-slate-500">
                                                {new Date(order.paidAt).toLocaleDateString('es-MX', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
