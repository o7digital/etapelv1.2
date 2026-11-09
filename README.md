# Etapel v1.2

Primera base Astro para la nueva versión del sitio Etapel.

## Vista local

Instala dependencias y ejecuta el servidor de desarrollo.

```sh
npm install
npm run dev
```

Luego visita `http://localhost:4321`.

## Etapel Studio

El sitio está conectado a su propio CMS Directus y PostgreSQL en Railway. El equipo puede editar páginas, fotografías, productos, familias y marcas en [Etapel Studio](https://studio-production-f1a3.up.railway.app), también desde [/admin/](https://etapelv1-2.vercel.app/admin/).

Consulta [el acceso, la publicación y la operación del CMS](cms/README.md). El proyecto `etapel-cms` es independiente de Nathalie y de la demo ecommerce. `npm test` ejecuta las verificaciones; `npm run build` prepara el contenido y genera el sitio estático.
