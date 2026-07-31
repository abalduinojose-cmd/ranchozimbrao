import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

// Exigido pela exportação estática da prévia (output: 'export').
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
