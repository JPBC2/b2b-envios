# Cloudflare Pages Deployment / Despliegue en Cloudflare Pages

**[English](#english) | [Español](#español)**

---

## English

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) (included with Node.js)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (Cloudflare's CLI tool)
- A [Cloudflare account](https://dash.cloudflare.com/sign-up)

### First-Time Setup

#### 1. Install Wrangler (if not installed)

```bash
npm install -g wrangler
```

#### 2. Log in to Cloudflare

```bash
npx wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

#### 3. Build the Project

```bash
npm install
npm run build
```

This generates the static files in the `out/` directory.

#### 4. Deploy to Cloudflare Pages

```bash
npx wrangler pages deploy out --project-name=b2b-envios
```

The first time you run this, Wrangler will create the Pages project automatically.  
After deployment, you'll see the URL: **https://b2b-envios.pages.dev**

### Redeploying After Changes

Every time you make changes and want to update the live site:

```bash
# 1. Build the updated project
npm run build

# 2. Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name=b2b-envios
```

**That's it!** Two commands to update your live site.

### Quick Deploy (One-Liner)

```bash
npm run build && npx wrangler pages deploy out --project-name=b2b-envios
```

### Adding a Custom Deploy Script

You can add a deploy script to `package.json` for convenience:

```json
{
  "scripts": {
    "deploy": "npm run build && npx wrangler pages deploy out --project-name=b2b-envios"
  }
}
```

Then deploy with:

```bash
npm run deploy
```

### Useful Commands

| Command | Description |
|---------|-------------|
| `npx wrangler pages list` | List all your Pages projects |
| `npx wrangler pages deployment list --project-name=b2b-envios` | List all deployments |
| `npx wrangler pages deployment tail --project-name=b2b-envios` | View real-time logs |

### Live URL

- **Production**: https://b2b-envios.pages.dev

---

## Español

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (herramienta CLI de Cloudflare)
- Una [cuenta de Cloudflare](https://dash.cloudflare.com/sign-up)

### Configuración Inicial

#### 1. Instalar Wrangler (si no está instalado)

```bash
npm install -g wrangler
```

#### 2. Iniciar sesión en Cloudflare

```bash
npx wrangler login
```

Esto abrirá una ventana del navegador para autenticarse con tu cuenta de Cloudflare.

#### 3. Construir el proyecto

```bash
npm install
npm run build
```

Esto genera los archivos estáticos en el directorio `out/`.

#### 4. Desplegar en Cloudflare Pages

```bash
npx wrangler pages deploy out --project-name=b2b-envios
```

La primera vez que ejecutes esto, Wrangler creará el proyecto de Pages automáticamente.  
Después del despliegue, verás la URL: **https://b2b-envios.pages.dev**

### Redesplegar Después de Cambios

Cada vez que hagas cambios y quieras actualizar el sitio en vivo:

```bash
# 1. Construir el proyecto actualizado
npm run build

# 2. Desplegar en Cloudflare Pages
npx wrangler pages deploy out --project-name=b2b-envios
```

**¡Eso es todo!** Dos comandos para actualizar tu sitio en vivo.

### Despliegue Rápido (Una sola línea)

```bash
npm run build && npx wrangler pages deploy out --project-name=b2b-envios
```

### Agregar un Script de Despliegue

Puedes agregar un script en `package.json` para mayor comodidad:

```json
{
  "scripts": {
    "deploy": "npm run build && npx wrangler pages deploy out --project-name=b2b-envios"
  }
}
```

Luego despliega con:

```bash
npm run deploy
```

### Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npx wrangler pages list` | Listar todos tus proyectos de Pages |
| `npx wrangler pages deployment list --project-name=b2b-envios` | Listar todos los despliegues |
| `npx wrangler pages deployment tail --project-name=b2b-envios` | Ver logs en tiempo real |

### URL en Vivo

- **Producción**: https://b2b-envios.pages.dev
