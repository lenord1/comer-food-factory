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

## 待老闆確認清單

- [ ] 營業星期（目前暫以週一至週五放入 JSON-LD）
- [ ] 正式網域（`SITE.siteUrl` 目前為暫定值）
- [ ] 門市精確座標（`SITE.geo` 為概略值，需以 Google Maps 校正）
- [ ] 餐點實拍照片（目前為佔位區塊）
- [ ] 外送免運條件與可預約天數（網站目前只寫「請來電或 LINE 確認」）
- [ ] 菜單圖片上的飲品只有桂花烏龍與復刻紅茶，網站另列「鳳梨梅釀冰茶 $50」，請確認是否仍供應

程式碼中標示 `TODO(待確認)` 的位置即為上述項目。
