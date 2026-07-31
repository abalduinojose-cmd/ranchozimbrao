type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Dado estruturado. Server component: o JSON sai direto no HTML,
 * sem custo de JavaScript no cliente.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo é montado pelo próprio site, não vem de input do usuário.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
