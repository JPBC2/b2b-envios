import Link from "next/link";
import { commodities, categoryNames } from "@/lib/ledger";

// Group products by category for display
const categoryProducts = {
  packaging: commodities.filter(c => c.category === 'packaging'),
  protection: commodities.filter(c => c.category === 'protection'),
  tape: commodities.filter(c => c.category === 'tape'),
  containers: commodities.filter(c => c.category === 'containers'),
};

const categoryIcons: Record<string, string> = {
  packaging: '📦',
  protection: '🛡️',
  tape: '🎗️',
  containers: '🪣',
};

const categoryDescriptions: Record<string, string> = {
  packaging: 'Playo, películas y bolsas para proteger y agrupar productos',
  protection: 'Esquineros y láminas de cartón para protección en transporte',
  tape: 'Cintas adhesivas de alta resistencia para sellado',
  containers: 'Cubetas industriales y contenedores plásticos',
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                🚚 Entregas en CDMX y Área Metropolitana
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Materiales de
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"> Embalaje </span>
                al Mayoreo
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-lg">
                Todo lo que necesitas para el transporte y protección de tu mercancía.
                Precios especiales para empresas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Ver Catálogo
                </Link>
                <Link
                  href="/cotizar"
                  className="inline-flex items-center justify-center border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Solicitar Cotización
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {['📦', '🛡️', '🎗️', '🪣'].map((icon, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center card-hover">
                    <span className="text-5xl">{icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-amber-600">500+</p>
              <p className="text-slate-600">Clientes Activos</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600">24h</p>
              <p className="text-slate-600">Entrega Rápida</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600">100%</p>
              <p className="text-slate-600">Calidad Garantizada</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600">15+</p>
              <p className="text-slate-600">Años de Experiencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Nuestros Productos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Amplio catálogo de materiales para embalaje, protección y transporte de mercancías
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(categoryProducts).map(([category, products]) => (
              <Link
                key={category}
                href={`/productos?cat=${category}`}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 card-hover border border-slate-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{categoryIcons[category]}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {categoryNames[category as keyof typeof categoryNames]}
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  {categoryDescriptions[category]}
                </p>
                <ul className="space-y-1 text-sm text-slate-500">
                  {products.map(p => (
                    <li key={p.code}>• {p.nameEs.split(' / ')[0]}</li>
                  ))}
                </ul>
                <div className="mt-4 text-amber-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver productos <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Productos Destacados
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {commodities.slice(0, 3).map((product) => (
              <div key={product.code} className="bg-slate-50 rounded-2xl overflow-hidden card-hover border border-slate-100">
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <span className="text-6xl">{categoryIcons[product.category]}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                    {categoryNames[product.category]}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mt-2">
                    {product.nameEs.split(' / ')[0]}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2">
                    {product.description}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Unidad: {product.unit}
                  </p>
                  <Link
                    href={`/productos/${product.code.toLowerCase()}`}
                    className="mt-4 inline-block text-amber-600 font-semibold hover:text-amber-700"
                  >
                    Ver detalles →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center bg-slate-800 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-700 transition-colors"
            >
              Ver Todo el Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Necesitas materiales de embalaje?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Contáctanos para una cotización personalizada. Precios especiales por volumen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cotizar"
              className="inline-flex items-center justify-center bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
            >
              Solicitar Cotización
            </Link>
            <a
              href="tel:+525555555555"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
            >
              📞 Llamar Ahora
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
