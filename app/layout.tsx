import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MENU, SITE } from "@/lib/data";

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
    images: [{ url: "/logo.jpg", width: 891, height: 882, alt: `${SITE.nameZh} Logo` }],
  },
  twitter: {
    card: "summary",
    title: SITE.seoTitle,
    description: SITE.seoDescription,
    images: ["/logo.jpg"],
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
  image: [`${SITE.siteUrl}/logo.jpg`],
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
  // TODO(待確認)：營業星期暫以週一至週五計。
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SITE.openDays,
      opens: SITE.opens,
      closes: SITE.closes,
    },
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "中山區雙連站周邊" },
    { "@type": "AdministrativeArea", name: "大同區" },
  ],
  hasMap: SITE.mapLinkUrl,
  sameAs: [SITE.instagramUrl],
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
      value: "中山區雙連站周邊為主，實際可否配送請來電或 LINE 確認",
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
      </body>
    </html>
  );
}
