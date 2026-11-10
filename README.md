# 摳門製研所（comer food factory）官方網站

Next.js（App Router、TypeScript）＋ Tailwind CSS v3 ＋ Lucide React。單頁、錨點導覽，桌機與手機共用同一份內容。

## 本機開發

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

需要 Node 18.18 以上。

## 更新內容

所有店家資料、菜單、價格、連結、FAQ 都在 `lib/data.ts`，修改後重新部署即可。
色票在 `tailwind.config.ts`（`brand`、`paper`、`oat`、`accent`、`ink`、`leaf`），元件只使用色票名稱。

## 菜色詳細頁（SEO / AEO）

- 13 道餐點的資料在 `lib/dishes.ts`；價格從 `lib/data.ts` 的 `MENU` 自動取得，改價格只要改 `MENU`。
- 詳細頁：`/menu/[slug]`（`app/menu/[slug]/page.tsx`），以 `generateStaticParams` 靜態預先生成，`dynamicParams = false`。
- 菜單總表：`/menu`；`/sitemap.xml` 與 `/robots.txt` 由 `app/sitemap.ts`、`app/robots.ts` 產生。
- 每頁含 `Product`（offers）、`FAQPage`、`BreadcrumbList` 結構化資料。Product 的 `image` 目前是 Logo，有實拍照後請在該頁改成餐點照片網址。
- 「下載團訂菜單」連到 `public/menu.jpg`（店家提供的菜單圖）。若有 PDF 版本，放進 `public/` 並修改該連結。
- 新增餐點：在 `MENU` 加品項，再在 `lib/dishes.ts` 的 `SEEDS` 加一筆（slug 使用英文小寫與連字號）。

## 更換餐點照片

目前菜單卡片使用 4:3 佔位區塊（`components/TimeSlotMenu.tsx`）。換成實拍照的步驟：

1. 把照片放進 `public/menu/`，例如 `public/menu/yuzu-pork-onigiri.jpg`。
2. 在 `lib/data.ts` 的 `MenuItem` 型別加上 `image?: string`，並在對應餐點填入 `image: "/menu/yuzu-pork-onigiri.jpg"`。
3. 在 `TimeSlotMenu.tsx` 內，把佔位的 `<div className="flex aspect-[4/3] ...">` 換成：

```tsx
import Image from "next/image";

{item.image ? (
  <div className="relative aspect-[4/3]">
    <Image
      src={item.image}
      alt={item.name}
      fill
      sizes="(min-width: 768px) 25vw, 50vw"
      className="object-cover"
    />
  </div>
) : (
  /* 原本的佔位區塊 */
)}
```

`next/image` 預設就是 lazy loading。

## 自訂網域

1. Vercel 專案 → Settings → Domains，加入網域並依指示設定 DNS。
2. 在 Vercel 的 Environment Variables 新增 `NEXT_PUBLIC_SITE_URL`（例如 `https://你的網域`），重新部署。
   canonical、Open Graph 與 JSON-LD 的網址都會跟著更新。

## 成效追蹤（GA4）

在 Vercel → Settings → Environment Variables 新增 `NEXT_PUBLIC_GA_ID`（例如 `G-XXXXXXX`），重新部署即啟用。
會自動記錄三種轉換事件：`line_click`（LINE 連結）、`phone_click`（電話）、`menu_download`（下載團訂菜單）。

## 待老闆確認清單

- [ ] 自訂網域（目前使用 `comer-food-factory-dadz.vercel.app`）
- [ ] 門市精確座標（`SITE.geo` 為概略值，需以 Google 商家檔案校正）
- [ ] 餐點實拍照片（目前為 DM 示意圖與佔位區塊）
- [ ] 每道餐點的實際內容（配菜、醬料、份量）
