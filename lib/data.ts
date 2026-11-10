/**
 * 全站常數與菜單。要更新菜單、價格、連結，只需修改此檔。
 * 標示 TODO 的項目為「待老闆確認」，請勿當成已確認的事實。
 */

export const SITE = {
  nameZh: "摳門製研所",
  nameEn: "comer food factory",
  fullName: "摳門製研所（comer food factory）",
  // 目前的正式網址（Vercel）。之後換自訂網域時，改這裡或在 Vercel 設定 NEXT_PUBLIC_SITE_URL。
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://comer-food-factory-dadz.vercel.app",
  phoneDisplay: "02-2799-0735",
  phoneHref: "tel:+886227990735",
  phoneIntl: "+886-2-2799-0735",
  address: "台北市大同區雙連街55號",
  addressDetail: {
    country: "TW",
    region: "台北市",
    locality: "大同區",
    street: "雙連街55號",
  },
  transit: [
    "雙連捷運站 2 號出口步行 4 分鐘",
    "馬偕紀念醫院旁步行 3 分鐘",
  ],
  lineUrl: "https://lin.ee/xAdQuww",
  instagramUrl: "https://www.instagram.com/comer.food.factory/",
  // Google 商家檔案（地圖導航、評論）
  googleBusinessUrl: "https://maps.app.goo.gl/16KjN31VZYaENarL9",
  priceRange: "$$",
  // TODO(待確認)：以下為雙連街55號附近的概略座標，請以 Google Maps 校正後更新。
  geo: { latitude: 25.0577, longitude: 121.5207 },
  openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
  openDaysLabel: "週一至週五營業（週六、日公休）",
  opens: "08:10",
  closes: "17:00",
  deliveryNote:
    "外送需前一天預約（不接受當天預約外送），依距離設滿額門檻：1 公里內滿 $1,000、1–3 公里滿 $1,500、3–5 公里滿 $2,000、5 公里以上滿 $2,500，達門檻免運費。",
  // 品牌理念：每行一句，網站以換行顯示（與 Instagram 簡介一致）
  philosophy:
    "comer，西班牙語的「吃」\n摳門，是老闆們對自己嚴謹的初心\n秉持著「對自己摳門，但對客人大方」的態度\n服務每一位摳門的人們",
  heroTitle: "雙連站日式職人手作｜馬偕醫院上班族首選會議餐盒・三角御結飯糰",
  heroSub:
    "對自己摳門，對客人大方。週一至週五 08:10–17:00，早上三角御結、中午炒麵與會議餐盒，LINE 預約到店免排隊。",
  seoTitle:
    "摳門製研所｜雙連站・馬偕醫院旁 會議餐盒、三角御結、日式炒麵（台北大同區）",
  seoDescription:
    "雙連捷運站、馬偕醫院旁的日式職人手作。三角御結 $70、日式炒麵 $130、會議餐盒 $150 均一價，可開收據／發票。週一至週五 08:10–17:00，LINE 預約免排隊，會議餐盒前一天預約可外送。",
  // 地圖：嵌入以店名＋地址查詢（不需 API 金鑰）；導航連到 Google 商家檔案
  mapEmbedUrl:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("摳門製研所 台北市大同區雙連街55號") +
    "&hl=zh-TW&z=17&output=embed",
  mapLinkUrl: "https://maps.app.goo.gl/16KjN31VZYaENarL9",
} as const;

export type TagKey = "vegan" | "veg-friendly" | "spicy";

export const TAGS: Record<TagKey, { label: string; tone: "leaf" | "brand" }> = {
  vegan: { label: "全素／蛋奶素可食", tone: "leaf" },
  "veg-friendly": { label: "素食友善", tone: "leaf" },
  spicy: { label: "辣", tone: "brand" },
};

export type MenuItem = {
  name: string;
  price: number;
  tags?: TagKey[];
};

export type MenuCategory = {
  id: "onigiri" | "noodle" | "bento" | "drinks";
  title: string;
  /** 均一價說明；飲品無均一價 */
  badge?: string;
  note?: string;
  items: MenuItem[];
  addons?: { name: string; price: number }[];
};

export const MENU: MenuCategory[] = [
  {
    id: "onigiri",
    title: "三角御結",
    badge: "均一價 $70",
    items: [
      { name: "炙燒豚肉飯糰", price: 70 },
      { name: "柚香豚肉飯糰", price: 70 },
      { name: "明太子厚蛋飯糰", price: 70 },
      { name: "照燒雞飯糰", price: 70 },
      { name: "辣味豚肉飯糰", price: 70, tags: ["spicy"] },
      { name: "日式烤素排飯糰", price: 70, tags: ["vegan"] },
    ],
  },
  {
    id: "noodle",
    title: "日式炒麵",
    badge: "均一價 $130",
    items: [
      { name: "柚香炙燒豚肉炒麵", price: 130 },
      { name: "味噌奶油明太子豚肉炒麵", price: 130 },
    ],
    addons: [
      { name: "炙燒起司", price: 20 },
      { name: "加豬肉", price: 30 },
    ],
  },
  {
    id: "bento",
    title: "御食餐盒",
    badge: "均一價 $150・好請款",
    note: "會議商務首選，均一價好請款",
    items: [
      { name: "柚香炙燒豚御食盒", price: 150 },
      { name: "味噌照燒雞御食盒", price: 150 },
      { name: "檸檬蜜汁豚御食盒", price: 150 },
      { name: "七味照燒雞御食盒", price: 150, tags: ["spicy"] },
      { name: "日式烤素排御食盒", price: 150, tags: ["veg-friendly"] },
    ],
  },
  {
    id: "drinks",
    title: "飲品",
    items: [
      { name: "桂花烏龍（無糖）", price: 40 },
      { name: "復刻紅茶", price: 30 },
    ],
  },
];

// ───── 餐點照片 ─────
// 照片取自店家 DM（菜單）。DM 只有每個品類的代表照，所以：
// - 御結、炒麵、餐盒：同品類共用一張示意圖；
// - 素食品項不使用（代表照是葷食，避免誤導）；
// - 飲品只有桂花烏龍與復刻紅茶有照片。
// 之後有各品項實拍照，直接在這裡對應品名即可。
const CATEGORY_PHOTO: Partial<Record<MenuCategory["id"], string>> = {
  onigiri: "/menu/onigiri.jpg",
  noodle: "/menu/yakisoba.jpg",
  bento: "/menu/bento.jpg",
};

const DRINK_PHOTO: Record<string, string> = {
  "桂花烏龍（無糖）": "/menu/drink-osmanthus-oolong.jpg",
  復刻紅茶: "/menu/drink-classic-black-tea.jpg",
};

export function photoFor(categoryId: MenuCategory["id"], item: MenuItem): string | undefined {
  if (categoryId === "drinks") return DRINK_PHOTO[item.name];
  if (item.tags?.includes("vegan") || item.tags?.includes("veg-friendly")) return undefined;
  return CATEGORY_PHOTO[categoryId];
}

export type SlotId = "morning" | "noon" | "afternoon";

export type TimeSlot = {
  id: SlotId;
  label: string;
  timeLabel: string;
  /** 以午夜起算的分鐘數（Asia/Taipei） */
  startMin: number;
  endMin: number;
  summary: string;
  categories: MenuCategory["id"][];
  note?: string;
};

export const SLOTS: TimeSlot[] = [
  {
    id: "morning",
    label: "晨間快取",
    timeLabel: "08:10–10:30",
    startMin: 8 * 60 + 10,
    endMin: 10 * 60 + 30,
    summary: "三角御結、飲品",
    categories: ["onigiri", "drinks"],
  },
  {
    id: "noon",
    label: "午間飽足",
    timeLabel: "11:40–14:00",
    startMin: 11 * 60 + 40,
    endMin: 14 * 60,
    summary: "日式炒麵、御食餐盒、飲品",
    categories: ["noodle", "bento", "drinks"],
  },
  {
    id: "afternoon",
    label: "午後充電",
    timeLabel: "14:00–17:00",
    startMin: 14 * 60,
    endMin: 17 * 60,
    summary: "三角御結、飲品",
    categories: ["onigiri", "drinks"],
    note: "餐點最晚供應至 16:30",
  },
];

/** 外送滿額門檻（依送餐地點與門市距離） */
export const DELIVERY_TIERS = [
  { range: "1 公里內", minimum: 1000 },
  { range: "1–3 公里", minimum: 1500 },
  { range: "3–5 公里", minimum: 2000 },
  { range: "5 公里以上", minimum: 2500 },
];

export const DELIVERY_RULE_SHORT = "外送需前一天預約，不接受當天預約外送；達門檻免運費。";

export const BUSINESS_POINTS = [
  {
    title: "均一價 $150，報帳免煩惱",
    body: "御食餐盒一律均一價，團訂金額一目了然，行政與財務核銷都省事。",
  },
  {
    title: "葷素皆備",
    body: "有豚肉、雞肉，以及鍋邊素的日式烤素排餐盒，開會時不同飲食需求都能照顧到。",
  },
  {
    title: "前一天預約，滿額外送",
    body: "外送需前一天預約。1 公里內滿 $1,000 即可外送，達門檻免運費，距離越遠門檻越高，可加購桂花烏龍、復刻紅茶。",
  },
  {
    title: "可開立收據／發票",
    body: "企業行號、機關團體訂購，可開立收據或發票，方便報帳。",
  },
];

// FAQ 只寫店家確認過的條件；未確認的事一律請客人來電或 LINE 詢問。
export const FAQ = [
  {
    q: "會議便當可以外送嗎？外送門檻是多少？",
    a: "可以。外送依送餐地點與門市的距離設滿額門檻：1 公里內滿 $1,000、1–3 公里滿 $1,500、3–5 公里滿 $2,000、5 公里以上滿 $2,500。達門檻不另收運費。請透過官方 LINE 或電話 02-2799-0735 告知地址與數量。",
  },
  {
    q: "會議餐盒需要提前幾天預約？",
    a: "外送需前一天預約，不接受當天預約外送。到店外帶可透過官方 LINE 預約取餐時間。",
  },
  {
    q: "可以指定葷素或客製餐點嗎？",
    a: "御食餐盒有豚肉、雞肉，以及鍋邊素的日式烤素排御食盒可選。訂購時請告知人數與葷素需求，其他客製需求也歡迎來電或 LINE 洽詢，由店家評估是否可行。",
  },
  {
    q: "可以開發票或收據嗎？可以加購茶飲嗎？",
    a: "可以，企業行號訂購可開立收據／發票，請訂購時告知抬頭與統一編號。茶飲可與餐盒一起加購，品項與價格請見上方菜單。",
  },
];

export const QUICK_STEPS = [
  { title: "官方 LINE 點餐", body: "選好餐點與取餐時間，直接在 LINE 傳給我們。" },
  { title: "依約到店", body: "從雙連站或馬偕紀念醫院步行即到。" },
  { title: "雙連街免排隊秒取", body: "報上姓名，拿了就走。" },
];

export const OPENING_HOURS = SLOTS.map((s) => ({
  label: s.label,
  time: s.timeLabel,
  items: s.summary,
  note: s.note,
}));

/** 待老闆確認清單（同步寫在 README） */
export const PENDING_CONFIRMATION = [
  "自訂網域（目前使用 Vercel 網址）",
  "門市精確座標（目前為概略值，需以 Google 商家檔案校正）",
  "地址寫法統一（網站「台北市」、DM「臺北市…雙連里」，請以 Google 商家檔案為準）",
  "餐點實拍照片（目前為 DM 示意圖與佔位區塊）",
];
