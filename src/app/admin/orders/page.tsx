'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
    sampleOrders,
    statusLabels,
    statusColors,
    type OrderStatus,
} from '@/lib/data';
import { getCommodity } from '@/lib/ledger';

export default function OrdersPage() {
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

    // Filter orders by status
    const filteredOrders = statusFilter === 'all'
        ? sampleOrders
        : sampleOrders.filter(o => o.status === statusFilter);

    const statusFilters: (OrderStatus | 'all')[] = ['all', 'pending_payment', 'paid', 'preparing', 'shipped', 'delivered'];

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
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Pedidos</h1>
                    <p className="text-slate-600">Gestiona los pedidos de clientes</p>
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {statusFilters.map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === s
                                    ? 'bg-slate-800 text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                        >
                            {s === 'all' ? 'Todos' : statusLabels[s]}
                            {s !== 'all' && (
                                <span className="ml-1 text-xs opacity-60">
                                    ({sampleOrders.filter(o => o.status === s).length})
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Pedido</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Cliente</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Productos</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Total</th>
                                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">Estado</th>
                                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-800">{order.orderNumber}</p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(order.createdAt).toLocaleDateString('es-MX', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-slate-700">{order.customerName}</p>
                                        <p className="text-xs text-slate-500">{order.customerPhone}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600">
                                            {order.items.map((item, i) => (
                                                <span key={i}>
                                                    {item.quantity} {getCommodity(item.commodityCode)?.nameEs.split(' / ')[0] || item.commodityCode}
                                                    {i < order.items.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-slate-800">${order.total.toLocaleString('es-MX')}</p>
                                        <p className="text-xs text-slate-500">IVA ${order.iva.toLocaleString('es-MX')}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                                            {statusLabels[order.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link
                                                href={`/admin/orders/${order.id}/`}
                                                className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors"
                                            >
                                                Ver
                                            </Link>
                                            {order.status === 'pending_payment' && (
                                                <button className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors">
                                                    Confirmar Pago
                                                </button>
                                            )}
                                            {order.status === 'paid' && (
                                                <button className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-200 transition-colors">
                                                    Preparar
                                                </button>
                                            )}
                                            {order.status === 'preparing' && (
                                                <button className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-lg hover:bg-purple-200 transition-colors">
                                                    Enviar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12">
                            <span className="text-4xl mb-4 block">📋</span>
                            <p className="text-slate-600">No hay pedidos con este estado</p>
                        </div>
                    )}
                </div>

                {/* Order Workflow Legend */}
                <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-4">Flujo de Pedidos (Prepago)</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">1</span>
                            <span className="text-slate-600">Cliente hace pedido</span>
                        </div>
                        <span className="text-slate-300">→</span>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">2</span>
                            <span className="text-slate-600">Confirmar pago</span>
                        </div>
                        <span className="text-slate-300">→</span>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">3</span>
                            <span className="text-slate-600">Preparar pedido</span>
                        </div>
                        <span className="text-slate-300">→</span>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">4</span>
                            <span className="text-slate-600">Enviar</span>
                        </div>
                        <span className="text-slate-300">→</span>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">5</span>
                            <span className="text-slate-600">Entregado</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
