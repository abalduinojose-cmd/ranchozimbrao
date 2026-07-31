import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { site } from '@/content/site';

export const alt = `${site.name} | ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Exigido pela exportação estática da prévia (output: 'export').
export const dynamic = 'force-static';

/**
 * Cartão de compartilhamento. Mesma gramática do site: preto da marca,
 * filete dourado e a frase em escala grande.
 */
export default async function OpengraphImage() {
  const photo = await readFile(path.join(process.cwd(), 'public', 'img', 'pampa-preta-conformacao.jpg'));
  const background = `data:image/jpeg;base64,${photo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#0B0B0C',
          color: '#F6F4F0',
        }}
      >
        <img
          src={background}
          alt=""
          width={1200}
          height={1200}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.5,
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 68,
            width: '100%',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 56, height: 1, backgroundColor: '#C79A54' }} />
            <div
              style={{
                fontSize: 22,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: '#C79A54',
              }}
            >
              Rancho Zimbrão
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ fontSize: 82, lineHeight: 1.02, letterSpacing: -2, maxWidth: 900 }}>
              {site.tagline}
            </div>
            <div style={{ fontSize: 27, color: '#A9A69F', maxWidth: 780 }}>
              {`Criatório de ${site.breed}`}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(246,244,240,0.22)',
              paddingTop: 26,
              fontSize: 21,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#A9A69F',
            }}
          >
            <div>{site.whatsapp.display}</div>
            <div>{site.social.instagram.label}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
