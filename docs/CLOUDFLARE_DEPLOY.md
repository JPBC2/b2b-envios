# Cloudflare Pages Deployment Guide / Guía de Despliegue

## English

### Deploy to Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Visit [https://dash.cloudflare.com](https://dash.cloudflare.com)
   - Sign in or create an account

2. **Create a new Pages project**
   - Click "Workers & Pages" in the sidebar
   - Click "Create" → "Pages" → "Connect to Git"

3. **Connect GitHub Repository**
   - Authorize Cloudflare to access your GitHub
   - Select repository: `JPBC2/b2b-envios`

4. **Configure Build Settings**
   | Setting | Value |
   |---------|-------|
   | Framework preset | Next.js |
   | Build command | `npm run build` |
   | Build output directory | `.next` |
   | Node.js version | 20 |

5. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be available at `https://b2b-envios.pages.dev`

### Automatic Deployments

After initial setup, every push to `main` branch will automatically trigger a new deployment.

---

## Español

### Desplegar en Cloudflare Pages

1. **Ir al Dashboard de Cloudflare**
   - Visita [https://dash.cloudflare.com](https://dash.cloudflare.com)
   - Inicia sesión o crea una cuenta

2. **Crear un nuevo proyecto de Pages**
   - Haz clic en "Workers & Pages" en la barra lateral
   - Haz clic en "Create" → "Pages" → "Connect to Git"

3. **Conectar Repositorio de GitHub**
   - Autoriza a Cloudflare para acceder a tu GitHub
   - Selecciona el repositorio: `JPBC2/b2b-envios`

4. **Configurar Ajustes de Build**
   | Configuración | Valor |
   |---------------|-------|
   | Framework preset | Next.js |
   | Build command | `npm run build` |
   | Build output directory | `.next` |
   | Node.js version | 20 |

5. **Desplegar**
   - Haz clic en "Save and Deploy"
   - Espera 2-3 minutos para que termine el build
   - Tu sitio estará disponible en `https://b2b-envios.pages.dev`

### Despliegues Automáticos

Después de la configuración inicial, cada push a la rama `main` activará automáticamente un nuevo despliegue.
