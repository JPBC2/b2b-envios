import Link from 'next/link';
import {
    getOrderStats,
    getInventoryValue,
    getLowStockItems,
    sampleOrders,
    statusLabels,
    statusColors,
} from '@/lib/data';
import { commodities, getCommodity } from '@/lib/ledger';

export default function AdminDashboard() {
    const stats = getOrderStats();
    const inventoryValue = getInventoryValue();
    const lowStockItems = getLowStockItems();
    const recentOrders = sampleOrders.slice(0, 5);

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
                            <Link href="/admin" className="text-white font-medium">Dashboard</Link>
                            <Link href="/admin/orders" className="text-slate-300 hover:text-white">Pedidos</Link>
                            <Link href="/admin/inventory" className="text-slate-300 hover:text-white">Inventario</Link>
                            <Link href="/admin/purchases" className="text-slate-300 hover:text-white">Compras</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                    <p className="text-slate-600">Resumen de operaciones</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Pedidos Hoy</p>
                                <p className="text-3xl font-bold text-slate-800">{stats.totalOrders}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📋</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Pendientes de Pago</p>
                                <p className="text-3xl font-bold text-yellow-600">{stats.pendingPayment}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">⏳</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Por Enviar</p>
                                <p className="text-3xl font-bold text-blue-600">{stats.toShip}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🚚</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Ingresos</p>
                                <p className="text-3xl font-bold text-green-600">
                                    ${stats.totalRevenue.toLocaleString('es-MX')}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
                        <div className="p-6 border-b border-slate-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-slate-800">Pedidos Recientes</h2>
                                <Link href="/admin/orders" className="text-amber-600 hover:text-amber-700 font-medium text-sm">
                                    Ver todos →
                                </Link>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-slate-800">{order.orderNumber}</p>
                                            <p className="text-sm text-slate-500">{order.customerName}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-800">
                                                ${order.total.toLocaleString('es-MX')}
                                            </p>
                                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                                                {statusLabels[order.status]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Inventory Alerts */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                        <div className="p-6 border-b border-slate-200">
                            <h2 className="text-lg font-bold text-slate-800">Inventario</h2>
                            <p className="text-sm text-slate-500">
                                Valor total: <span className="font-semibold text-slate-700">${inventoryValue.toLocaleString('es-MX')}</span>
                            </p>
                        </div>
                        <div className="p-6">
                            {lowStockItems.length > 0 ? (
                                <>
                                    <p className="text-sm text-red-600 font-medium mb-4">
                                        ⚠️ {lowStockItems.length} producto(s) con stock bajo
                                    </p>
                                    <div className="space-y-3">
                                        {lowStockItems.map((item) => {
                                            const product = getCommodity(item.commodityCode);
                                            return (
                                                <div key={item.commodityCode} className="flex justify-between items-center">
                                                    <span className="text-sm text-slate-600">
                                                        {product?.nameEs.split(' / ')[0] || item.commodityCode}
                                                    </span>
                                                    <span className="text-sm font-bold text-red-600">
                                                        {item.quantity} unidades
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-green-600">✅ Todos los productos con stock suficiente</p>
                            )}
                            <Link
                                href="/admin/inventory"
                                className="mt-4 block text-center bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                            >
                                Ver Inventario Completo
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                    <Link
                        href="/admin/orders?status=pending_payment"
                        className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 hover:bg-yellow-100 transition-colors"
                    >
                        <h3 className="font-bold text-yellow-800">Confirmar Pagos</h3>
                        <p className="text-sm text-yellow-600">{stats.pendingPayment} pedidos esperando confirmación</p>
                    </Link>
                    <Link
                        href="/admin/orders?status=paid"
                        className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:bg-blue-100 transition-colors"
                    >
                        <h3 className="font-bold text-blue-800">Preparar Envíos</h3>
                        <p className="text-sm text-blue-600">{stats.toShip} pedidos listos para enviar</p>
                    </Link>
                    <Link
                        href="/admin/purchases/new"
                        className="bg-green-50 border border-green-200 rounded-xl p-6 hover:bg-green-100 transition-colors"
                    >
                        <h3 className="font-bold text-green-800">Nueva Compra</h3>
                        <p className="text-sm text-green-600">Crear orden de compra a proveedor</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
