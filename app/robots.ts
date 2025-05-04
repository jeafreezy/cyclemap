import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/public/"],
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
