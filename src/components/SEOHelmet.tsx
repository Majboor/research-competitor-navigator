
import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  ogType?: string;
  twitterCard?: string;
}

const SEOHelmet = ({
  title = 'CompetitorFinder - Find and Analyze Your Competition',
  description = 'Discover and analyze your competitors instantly. Get valuable insights into your market landscape with CompetitorFinder.',
  canonicalUrl = 'https://competitorfinder.com',
  ogImageUrl = 'https://i.ibb.co/Vp2vRt95/Screenshot-2025-03-21-at-4-38-49-PM.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
}: SEOHelmetProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
};

export default SEOHelmet;
