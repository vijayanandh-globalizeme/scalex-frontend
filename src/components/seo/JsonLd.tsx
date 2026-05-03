type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Injects JSON-LD for rich results (serialized JSON only). */
export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
