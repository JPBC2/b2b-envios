import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CartProvider } from "@/lib/cart-context";
import CartIcon from "@/components/CartIcon";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B2B Envíos | Materiales de Embalaje y Transporte",
  description: "Venta mayorista de materiales para embalaje y transporte de mercancías en la Zona Metropolitana de la Ciudad de México. Playo, esquineros, cintas, bolsas y más.",
  keywords: ["embalaje", "playo", "stretch wrap", "esquineros", "cintas", "CDMX", "mayoreo"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50`}>
        <CartProvider>
          {/* Navigation */}
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">📦</span>
                  </div>
                  <span className="font-bold text-xl text-slate-800">B2B Envíos</span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                  <Link href="/productos/" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">
                    Productos
                  </Link>
                  <Link href="/nosotros/" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">
                    Nosotros
                  </Link>
                  <Link href="/contacto/" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">
                    Contacto
                  </Link>
                </nav>

                {/* Cart & CTA */}
                <div className="flex items-center gap-4">
                  <CartIcon />
                  <Link
                    href="/carrito/"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
                  >
                    Solicitar Cotización
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-slate-800 text-slate-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">B2B Envíos</h3>
                  <p className="text-sm">Materiales de embalaje y transporte para la Zona Metropolitana de la Ciudad de México.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Productos</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/productos/" className="hover:text-amber-400">Playo y Embalaje</Link></li>
                    <li><Link href="/productos/" className="hover:text-amber-400">Esquineros y Protección</Link></li>
                    <li><Link href="/productos/" className="hover:text-amber-400">Cintas Adhesivas</Link></li>
                    <li><Link href="/productos/" className="hover:text-amber-400">Cubetas y Contenedores</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Contacto</h4>
                  <ul className="space-y-2 text-sm">
                    <li>📍 CDMX, México</li>
                    <li>📞 (55) XXXX-XXXX</li>
                    <li>✉️ ventas@b2benvios.mx</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Horario</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Lunes - Viernes: 9:00 - 18:00</li>
                    <li>Sábado: 9:00 - 14:00</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
                <p>&copy; 2026 B2B Envíos. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
