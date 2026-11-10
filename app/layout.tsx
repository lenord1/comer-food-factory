import type { Metadata, Viewport } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { DELIVERY_RULE_SHORT, DELIVERY_TIERS, MENU, SITE } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: SITE.seoTitle,
  description: SITE.seoDescription,
  alternates: { canonical: "/" },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: SITE.fullName,
    title: SITE.seoTitle,
    description: SITE.seoDescription,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${SITE.nameZh}：會議餐盒、三角御結、日式炒麵` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.seoTitle,
    description: SITE.seoDescription,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#A8312D",
};

const price = (id: string) => MENU.find((c) => c.id === id)?.items[0].price;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "LocalBusiness"],
  "@id": `${SITE.siteUrl}/#restaurant`,
  name: SITE.fullName,
  alternateName: [SITE.nameZh, SITE.nameEn],
  description: SITE.seoDescription,
  url: SITE.siteUrl,
  telephone: SITE.phoneIntl,
  priceRange: SITE.priceRange,
  servesCuisine: ["日式", "御結", "日式炒麵", "便當"],
  logo: `${SITE.siteUrl}/logo.jpg`,
  image: [
    `${SITE.siteUrl}/og.jpg`,
    `${SITE.siteUrl}/menu/bento.jpg`,
    `${SITE.siteUrl}/menu/onigiri.jpg`,
    `${SITE.siteUrl}/logo.jpg`,
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.addressDetail.street,
    addressLocality: SITE.addressDetail.locality,
    addressRegion: SITE.addressDetail.region,
    addressCountry: SITE.addressDetail.country,
  },
  // TODO(待確認)：概略座標，需以 Google Maps 校正。
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SITE.openDays,
      opens: SITE.opens,
      closes: SITE.closes,
    },
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "台北市大同區" },
    { "@type": "AdministrativeArea", name: "台北市中山區" },
  ],
  hasMap: SITE.googleBusinessUrl,
  hasMenu: `${SITE.siteUrl}/menu`,
  sameAs: [SITE.instagramUrl, SITE.googleBusinessUrl],
  makesOffer: [
    {
      "@type": "Offer",
      name: "三角御結（均一價）",
      price: String(price("onigiri")),
      priceCurrency: "TWD",
    },
    {
      "@type": "Offer",
      name: "日式炒麵（均一價）",
      price: String(price("noodle")),
      priceCurrency: "TWD",
    },
    {
      "@type": "Offer",
      name: "御食餐盒（均一價，適合會議商務訂購）",
      price: String(price("bento")),
      priceCurrency: "TWD",
    },
  ],
  // 外帶與外送
  potentialAction: {
    "@type": "OrderAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: SITE.lineUrl,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    deliveryMethod: [
      "http://purl.org/goodrelations/v1#DeliveryModePickUp",
      "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    ],
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "takeaway", value: true },
    {
      "@type": "PropertyValue",
      name: "delivery",
      value: `${DELIVERY_RULE_SHORT}滿額外送：${DELIVERY_TIERS.map((t) => `${t.range}滿 $${t.minimum}`).join("、")}`,
    },
    { "@type": "PropertyValue", name: "nearbyLandmark", value: "馬偕紀念醫院" },
  ],
};

// 將 < 轉義，避免 JSON 內容被誤解析為 HTML
const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
