import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";
import { DISHES } from "@/lib/dishes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.siteUrl}/meeting-bento`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE.siteUrl}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...DISHES.map((d) => ({
      url: `${SITE.siteUrl}/menu/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
