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

  // 优先从 site store 读取站点名称
  const site = useSiteStore();
  const resolvedSiteName = computed(() =>
    options.siteName || (site.settings.site_name as string) || defaults.siteName || "NodeLoc"
  );
  const resolvedDescription = computed(() =>
    options.description || (site.settings.site_description as string) || defaults.description
  );

  const title = options.title;
  const keywords = options.keywords ?? defaults.keywords;
  const url = options.url ?? defaults.baseUrl;
  const image = options.image ?? defaults.defaultImage;
  const twitterCard = options.twitterCard ?? defaults.twitterCard;
  const type = options.type ?? defaults.type;
  const robots = options.robots ?? "index, follow";

  useHead({
    title,
    titleTemplate: (t) => t ? `${t} | ${resolvedSiteName.value}` : resolvedSiteName.value,
    meta: computed(() => [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: resolvedDescription.value },
      { name: "keywords", content: keywords.join(", ") },
      { name: "robots", content: robots },
      { property: "og:title", content: title },
      { property: "og:description", content: resolvedDescription.value },
      { property: "og:url", content: url },
      { property: "og:site_name", content: resolvedSiteName.value },
      { property: "og:type", content: type },
      { name: "twitter:card", content: twitterCard },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: resolvedDescription.value },
      ...(image?.url ? [
        { property: "og:image", content: image.url },
        { name: "twitter:image", content: image.url },
        ...(image.width ? [{ property: "og:image:width", content: String(image.width) }] : []),
        ...(image.height ? [{ property: "og:image:height", content: String(image.height) }] : []),
        ...(image.alt ? [{ property: "og:image:alt", content: image.alt }] : []),
      ] : []),
    ]),
    link: url ? [{ rel: "canonical", href: url }] : [],
    script: [{
      type: "application/ld+json",
      textContent: JSON.stringify(options.structuredData ?? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: resolvedSiteName.value,
        url,
      }),
    }],
  });
};
