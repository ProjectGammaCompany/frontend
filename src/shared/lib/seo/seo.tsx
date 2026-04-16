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

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

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
    <link rel="canonical" href={baseUrl + canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={baseUrl + canonical} />
    (
    <meta
      property="og:image"
      content={image ?? `${baseUrl}image/preview/preview.png`}
    />
    )
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
