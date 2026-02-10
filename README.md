# B2B Envíos

**[Español](#español) | [English](#english)**

---

## Español

### 📦 E-commerce B2B Mayorista de Materiales de Envío

Plataforma de comercio electrónico B2B (negocio a negocio) mayorista para venta de materiales de embalaje y transporte en la Zona Metropolitana de la Ciudad de México.

### 🎯 Objetivos del Proyecto

1. **Vender materiales de envío en línea** — Playo, esquineros, cinta, bolsas, cubetas
2. **Enfoque B2B** — Diseñado para clientes empresariales con pedidos prepagados
3. **Contabilidad integrada** — Usa [@openbancor/ledger](https://github.com/openbancor/ledger) para contabilidad de partida doble
4. **Cumplimiento SAT México** — Catálogo de cuentas sigue estándares del SAT
5. **Diseño responsivo** — Funciona en todos los dispositivos

### 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 16 + TypeScript |
| Estilos | Tailwind CSS |
| Contabilidad | @openbancor/ledger |
| Hosting | Cloudflare Pages |

### 📋 Etapas de Desarrollo

#### ✅ Fase 1: Fundamentos (Completada)
- [x] Configuración del proyecto (Next.js, TypeScript, Tailwind)
- [x] Integración contable (catálogo de cuentas, commodities)
- [x] UI del catálogo de productos
- [x] Panel de administración (dashboard, pedidos, inventario)

#### 🔄 Fase 2: Funciones de E-commerce (En Progreso)
- [ ] Carrito de compras
- [ ] Checkout con confirmación de pago
- [ ] Generación de facturas

#### ⏳ Fase 3: Reportes Financieros
- [ ] Balanza de comprobación
- [ ] Estado de resultados
- [ ] Balance general
- [ ] Exportación XBRL-GL para SAT

#### ⏳ Fase 4: Listo para Producción
- [ ] Autenticación de usuarios
- [ ] Integración con base de datos (SQLite)
- [ ] Integración de facturación CFDI

### 🚀 Cómo Empezar

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

### 📂 Estructura del Proyecto

```
src/
├── app/                    # Páginas con App Router de Next.js
│   ├── admin/              # Panel de administración
│   │   ├── orders/         # Gestión de pedidos
│   │   ├── inventory/      # Control de inventario
│   │   └── purchases/      # Órdenes a proveedores
│   ├── productos/          # Catálogo de productos
│   └── page.tsx            # Página principal
├── lib/
│   ├── ledger/             # Integración contable
│   │   ├── accounts.ts     # Catálogo de cuentas
│   │   ├── commodities.ts  # Definiciones de productos
│   │   ├── entries.ts      # Funciones para asientos
│   │   └── config.ts       # Configuración del ledger
│   └── data.ts             # Datos de ejemplo
└── ...
```

### 🏪 Productos

| Código | Producto | Categoría |
|--------|----------|-----------|
| PLAYO | Playo / Película Estirable | Embalaje |
| BOLSA | Bolsas de Plástico | Embalaje |
| ESQUINERO | Esquineros de Cartón | Protección |
| LAMINA | Láminas de Cartón | Protección |
| CINTA | Cinta de Empaque | Cintas |
| CUBETA | Cubetas de Plástico | Contenedores |

### 💼 Flujo de Pedidos (Prepago)

```
1. Cliente hace pedido → "Pendiente de Pago"
2. Se confirma pago → "Pagado"  
3. Se prepara pedido → "Preparando"
4. Se envía → "Enviado"
5. Se entrega → "Entregado"
```

### 📄 Licencia

MIT

---

## English

### 📦 B2B Wholesale E-commerce for Shipping Materials

A B2B (business-to-business) wholesale e-commerce platform for selling packaging and shipping materials in Mexico City Metropolitan Area.

### 🎯 Project Goals

1. **Sell shipping materials online** — Stretch wrap, corner protectors, tape, bags, buckets
2. **B2B focused** — Designed for business customers with prepaid orders
3. **Accounting integrated** — Uses [@openbancor/ledger](https://github.com/openbancor/ledger) for double-entry accounting
4. **SAT Mexico compliant** — Chart of accounts follows Mexican tax authority standards
5. **Mobile-friendly** — Responsive design works on all devices

### 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 + TypeScript |
| Styling | Tailwind CSS |
| Accounting | @openbancor/ledger |
| Hosting | Cloudflare Pages |

### 📋 Development Stages

#### ✅ Phase 1: Foundation (Complete)
- [x] Project setup (Next.js, TypeScript, Tailwind)
- [x] Accounting integration (chart of accounts, commodities)
- [x] Product catalog UI
- [x] Admin panel (dashboard, orders, inventory)

#### 🔄 Phase 2: E-commerce Features (In Progress)
- [ ] Shopping cart
- [ ] Order checkout with payment confirmation
- [ ] Invoice generation

#### ⏳ Phase 3: Financial Reports
- [ ] Trial balance
- [ ] Income statement
- [ ] Balance sheet
- [ ] XBRL-GL export for SAT

#### ⏳ Phase 4: Production Ready
- [ ] User authentication
- [ ] Database integration (SQLite)
- [ ] CFDI invoice integration

### 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin panel
│   │   ├── orders/         # Order management
│   │   ├── inventory/      # Stock control
│   │   └── purchases/      # Supplier orders
│   ├── productos/          # Product catalog
│   └── page.tsx            # Homepage
├── lib/
│   ├── ledger/             # Accounting integration
│   │   ├── accounts.ts     # Chart of accounts
│   │   ├── commodities.ts  # Product definitions
│   │   ├── entries.ts      # Journal entry helpers
│   │   └── config.ts       # Ledger configuration
│   └── data.ts             # Sample data store
└── ...
```

### 📄 License

MIT
