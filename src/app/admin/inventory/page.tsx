import Link from 'next/link';
import { sampleInventory, getInventoryValue } from '@/lib/data';
import { getCommodity, categoryNames } from '@/lib/ledger';

export default function InventoryPage() {
    const inventoryValue = getInventoryValue();

    // Group by category
    const inventoryWithProducts = sampleInventory.map(item => ({
        ...item,
        product: getCommodity(item.commodityCode),
    }));

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
                            <Link href="/admin/inventory" className="text-white font-medium">Inventario</Link>
                            <Link href="/admin/purchases" className="text-slate-300 hover:text-white">Compras</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Inventario</h1>
                        <p className="text-slate-600">Control de existencias</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500">Valor Total del Inventario</p>
                        <p className="text-2xl font-bold text-slate-800">
                            ${inventoryValue.toLocaleString('es-MX')} <span className="text-sm font-normal text-slate-500">MXN</span>
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <p className="text-sm text-slate-500">Productos</p>
                        <p className="text-2xl font-bold text-slate-800">{sampleInventory.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <p className="text-sm text-slate-500">Unidades Totales</p>
                        <p className="text-2xl font-bold text-slate-800">
                            {sampleInventory.reduce((sum, i) => sum + i.quantity, 0).toLocaleString('es-MX')}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <p className="text-sm text-slate-500">Stock Bajo</p>
                        <p className="text-2xl font-bold text-yellow-600">
                            {sampleInventory.filter(i => i.quantity < 200).length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <p className="text-sm text-slate-500">Almacén</p>
                        <p className="text-lg font-bold text-slate-800">CDMX-Principal</p>
                    </div>
                </div>

                {/* Inventory Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-800">Existencias</h2>
                        <Link
                            href="/admin/purchases/new"
                            className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                        >
                            + Nueva Compra
                        </Link>
                    </div>
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Código</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Producto</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Categoría</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Existencia</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Costo Unit.</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Valor Total</th>
                                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {inventoryWithProducts.map((item) => {
                                const isLowStock = item.quantity < 200;
                                return (
                                    <tr key={item.commodityCode} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">
                                                {item.commodityCode}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-slate-800">
                                                {item.product?.nameEs.split(' / ')[0] || item.commodityCode}
                                            </p>
                                            <p className="text-xs text-slate-500">{item.product?.description}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">
                                                {item.product ? categoryNames[item.product.category] : '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className={`font-bold ${isLowStock ? 'text-red-600' : 'text-slate-800'}`}>
                                                {item.quantity.toLocaleString('es-MX')}
                                            </p>
                                            <p className="text-xs text-slate-500">{item.product?.unit}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className="font-medium text-slate-700">
                                                ${item.unitCost.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className="font-bold text-slate-800">
                                                ${item.totalValue.toLocaleString('es-MX')}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {isLowStock ? (
                                                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                                    Stock Bajo
                                                </span>
                                            ) : (
                                                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                    OK
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot className="bg-slate-50 border-t border-slate-200">
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-right font-semibold text-slate-600">
                                    Total:
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-slate-800 text-lg">
                                    ${inventoryValue.toLocaleString('es-MX')}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Accounting Note */}
                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h3 className="font-bold text-amber-800 mb-2">💡 Contabilidad</h3>
                    <p className="text-sm text-amber-700">
                        El valor del inventario se registra en la cuenta <strong>1300 - Inventario</strong>.
                        Cada compra genera un asiento contable que aumenta el inventario y registra el IVA acreditable.
                    </p>
                </div>
            </main>
        </div>
    );
}
