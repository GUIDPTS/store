type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

interface SeoOptions {
  title: string;
  description?: string;
  keywords?: string[];
  url?: string;
  image?: {
    url?: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  siteName?: string;
  twitterCard?: string;
  type?: string;
  robots?: string;
  structuredData?: Json;
}

interface SeoDefaults {
  description: string;
  keywords: string[];
  baseUrl: string;
  defaultImage: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  siteName: string;
  twitterCard: string;
  type: string;
}

export const useSeo = (options: SeoOptions) => {
  const config = useRuntimeConfig();
  const defaults = config.public.seoDefaults as SeoDefaults;

  const title = options.title;
  const description = options.description ?? defaults.description;
  const keywords = options.keywords ?? defaults.keywords;
  const url = options.url ?? defaults.baseUrl;
  const image = options.image ?? defaults.defaultImage;
  const siteName = options.siteName ?? defaults.siteName;
  const twitterCard = options.twitterCard ?? defaults.twitterCard;
  const type = options.type ?? defaults.type;
  const robots = options.robots ?? "index, follow";

  const metaTags = [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "description",
      content: description,
    },
    {
      name: "keywords",
      content: keywords.join(", "),
    },
    { name: "robots", content: robots },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:url",
      content: url,
    },
    {
      property: "og:site_name",
      content: siteName,
    },
    {
      property: "og:type",
      content: type,
    },
    {
      name: "twitter:card",
      content: twitterCard,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
  ];

  if (image?.url) {
    metaTags.push({
      property: "og:image",
      content: image.url,
    });
    metaTags.push({
      name: "twitter:image",
      content: image.url,
    });
    if (image.width)
      metaTags.push({
        property: "og:image:width",
        content: image.width.toString(),
      });
    if (image.height)
      metaTags.push({
        property: "og:image:height",
        content: image.height.toString(),
      });
    if (image.alt)
      metaTags.push({
        property: "og:image:alt",
        content: image.alt,
      });
  }

  const structuredData: Json = options.structuredData ?? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: url,
  };

  useHead({
    title,
    titleTemplate: `%s | ${siteName}`,
    meta: metaTags,
    link: url
      ? [
          {
            rel: "canonical",
            href: url,
          },
        ]
      : [],
    script: [
      {
        type: "application/ld+json",
        textContent: JSON.stringify(structuredData),
      },
    ],
  });
};
