import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  noIndex?: boolean;
  schemaMarkup?: Record<string, unknown>;
  specificTitle?: boolean;
}

export const Seo = ({
  title,
  description,
  canonical,
  image,
  schemaMarkup,
  noIndex,
  specificTitle,
}: SeoProps) => (
  <Helmet>
    <title>{specificTitle ? title : `${title} | HSE EduPlay`}</title>

    <meta name="description" content={description} />
    <link rel="canonical" href={"https://hse-eduplay.ru" + canonical} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    {image && <meta property="og:image" content={image} />}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}

    {schemaMarkup && (
      <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
    )}
    {noIndex && <meta name="robots" content="noindex,nofollow" />}
  </Helmet>
);
