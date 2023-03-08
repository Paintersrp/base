import React from "react";
import { Helmet } from "react-helmet-async";

const SEOHeader = (props) => {
  const { title, description, keywords, image, url } = props;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEOHeader;
