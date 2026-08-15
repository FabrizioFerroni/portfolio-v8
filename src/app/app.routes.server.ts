import { RenderMode, ServerRoute } from '@angular/ssr';

const API_URL = process.env['API_URL_INTERNAL'];
if (!API_URL) {
  throw new Error('API_URL no está definida — requerida para getPrerenderParams');
}
const API_KEY = process.env['API_KEY'];
if (!API_KEY) {
  throw new Error('API_KEY no está definida — requerida para getPrerenderParams');
}

async function obtenerTodosLosSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  const limit = 100;

  while (true) {
    const res = await fetch(`${API_URL}/api/projects?page=${page}&limit=${limit}`, {
      headers: { 'x-api-key': API_KEY },
    });

    if (!res.ok) {
      throw new Error(`No se pudo obtener slugs para prerender (page ${page}): ${res.status}`);
    }

    const body = await res.json();
    slugs.push(...body.data.projects.map((p: { slug: string }) => p.slug));

    if (body.data.projects.length < limit) break;
    page++;
  }

  console.log(`[prerender] ${slugs.length} slugs obtenidos para proyecto/:slug`);
  return slugs;
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'proyecto/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const slugs = await obtenerTodosLosSlugs();
      return slugs.map(slug => ({ slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
