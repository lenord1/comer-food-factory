/**
 * 13 道餐點的詳細頁資料。價格一律從 lib/data.ts 的 MENU 取得（單一來源），
 * 要改價格請改 MENU，詳細頁、結構化資料會一併更新。
 *
 * 內容原則：只寫菜單上看得到的資訊（品名、價格、時段、素食標示），
 * 不編造食材來源、熱量、份量或過敏原保證；不確定的事一律請客人來電或 LINE 確認。
 */
import { MENU, SITE, SLOTS, photoFor, type SlotId } from "@/lib/data";

export type DishCategoryId = "bento" | "onigiri" | "yakisoba";

export type Faq = { q: string; a: string };

export type Dish = {
  slug: string;
  name: string;
  category: DishCategoryId;
  categoryLabel: string;
  price: number;
  timeSlots: SlotId[];
  /** 例：「11:40–14:00」或「08:10–10:30、14:00–17:00」 */
  timeLabel: string;
  timeNote?: string;
  description: string;
  /** 重點速答第一段（一句話直接回答價格、時段、地點） */
  answerLead: string;
  /** 重點速答「主打」一行（品類定位） */
  highlight: string;
  /** 風味特色（一句話，供直接解答卡片使用） */
  flavor: string;
  /** 食材特點（取自品名） */
  features: string[];
  /** 葷素類別，例：「豚肉」「雞肉」「素食」 */
  proteinLabel: string;
  isVegetarian: boolean;
  vegetarianLabel?: string;
  suitableFor: string[];
  /** 示意照片路徑；素食品項沒有（代表照為葷食） */
  photo?: string;
  addons?: { name: string; price: number }[];
  faqs: Faq[];
  seoTitle: string;
  seoDescription: string;
};

type Seed = {
  slug: string;
  name: string;
  category: DishCategoryId;
  flavor: string;
  features: string[];
  proteinLabel: string;
  isVegetarian?: boolean;
  vegetarianLabel?: string;
  /** 第 1 題 FAQ：該餐點專屬問題 */
  faq: Faq;
};

const MENU_CATEGORY_ID = {
  bento: "bento",
  onigiri: "onigiri",
  yakisoba: "noodle",
} as const;

const CATEGORY_LABEL: Record<DishCategoryId, string> = {
  bento: "御食餐盒",
  onigiri: "三角御結",
  yakisoba: "日式炒麵",
};

const CATEGORY_SLOTS: Record<DishCategoryId, SlotId[]> = {
  bento: ["noon"],
  onigiri: ["morning", "afternoon"],
  yakisoba: ["noon"],
};

const CATEGORY_SUITABLE: Record<DishCategoryId, string[]> = {
  bento: ["公司會議午餐", "部門聚餐與商務訂餐", "馬偕醫院周邊上班族與醫護午餐"],
  onigiri: ["馬偕醫院周邊外帶早餐", "雙連站通勤族拿了就走", "會議點心與下午加餐"],
  yakisoba: ["午間想吃飽的上班族", "雙連街周邊外帶午餐", "與飲品搭配的單人套餐"],
};

/** 從 MENU 取價格；找不到就丟錯，避免詳細頁與菜單價格不一致。 */
function menuEntry(name: string) {
  for (const cat of MENU) {
    const item = cat.items.find((i) => i.name === name);
    if (item) return { cat, item };
  }
  throw new Error(`MENU 找不到餐點：${name}`);
}

function priceOf(name: string): number {
  return menuEntry(name).item.price;
}

function timeLabelOf(slots: SlotId[]): string {
  return slots
    .map((id) => SLOTS.find((s) => s.id === id)?.timeLabel)
    .filter((t): t is string => Boolean(t))
    .join("、");
}

function addonsOf(category: DishCategoryId) {
  return MENU.find((c) => c.id === MENU_CATEGORY_ID[category])?.addons;
}

const DELIVERY_FAQ_ANSWER =
  "外送需前一天預約（不接受當天預約外送），依距離設滿額門檻：1 公里內滿 $1,000、1–3 公里滿 $1,500、3–5 公里滿 $2,000、5 公里以上滿 $2,500，達門檻免運費。請透過官方 LINE 或電話 02-2799-0735 告知地址與數量。";

function build(seed: Seed): Dish {
  const { category, name } = seed;
  const label = CATEGORY_LABEL[category];
  const { cat: menuCat, item: menuItem } = menuEntry(name);
  const price = menuItem.price;
  const timeSlots = CATEGORY_SLOTS[category];
  const timeLabel = timeLabelOf(timeSlots);
  const addons = addonsOf(category);
  const timeNote = category === "onigiri" ? "午後時段最晚供應至 16:30" : undefined;

  let seoTitle: string;
  let seoDescription: string;
  let faqs: Faq[];

  if (category === "bento") {
    seoTitle = `${name}｜$${price} 台北會議餐盒外送・雙連街55號馬偕醫院旁｜摳門製研所`;
    seoDescription = `${name}均一價 $${price}，${timeLabel}供應。位於雙連街55號、馬偕醫院旁，適合台北會議餐盒與商務餐盒外送，可開立收據／發票，官方 LINE 預訂，外送範圍請來電確認。`;
    faqs = [
      seed.faq,
      {
        q: `${name}多少錢？幾點可以訂？`,
        a: `${name}是御食餐盒，均一價 $${price}，供應時段為 ${timeLabel}。御食餐盒全品項同價，團訂時金額好計算。`,
      },
      {
        q: `${name}可以訂來開會嗎？外送怎麼確認？`,
        a: `可以。御食餐盒是會議商務首選，可開立收據／發票，方便報帳。${DELIVERY_FAQ_ANSWER}`,
      },
    ];
  } else if (category === "onigiri") {
    seoTitle = `${name}｜$${price} 馬偕醫院外帶早餐・雙連站拿了就走｜摳門製研所`;
    seoDescription = `${name}均一價 $${price}，${timeLabel}供應（午後最晚至 16:30）。早餐、下午茶首選，帶了就走、方便快速。雙連街55號、馬偕醫院旁，官方 LINE 預先點餐免排隊，也適合會議點心餐盒。`;
    faqs = [
      seed.faq,
      {
        q: `${name}多少錢？什麼時段有賣？`,
        a: `${name}是三角御結，均一價 $${price}。供應時段為晨間快取 08:10–10:30 與午後充電 14:00–17:00，午後時段最晚供應至 16:30。`,
      },
      {
        q: `想外帶${name}，怎麼取餐最快？`,
        a: "先用官方 LINE 點餐並約好取餐時間，再到雙連街55號報上姓名即可取餐，不用排隊。從雙連捷運站 2 號出口步行約 4 分鐘，馬偕紀念醫院旁步行約 3 分鐘。",
      },
    ];
  } else {
    seoTitle = `${name}｜$${price} 日式炒麵外帶・雙連站馬偕醫院旁｜摳門製研所`;
    seoDescription = `${name}均一價 $${price}，${timeLabel}供應，可加購炙燒起司 +$20、加豬肉 +$30。雙連街55號、馬偕醫院旁，官方 LINE 預先點餐，外帶拿了就走。`;
    faqs = [
      seed.faq,
      {
        q: `${name}多少錢？可以加購什麼？`,
        a: `${name}均一價 $${price}，供應時段為 ${timeLabel}。可加購炙燒起司 +$20、加豬肉 +$30，也能搭配飲品：復刻紅茶 $30、桂花烏龍（無糖）$40。`,
      },
      {
        q: `${name}可以外帶或外送嗎？`,
        a: `可以外帶，建議先用官方 LINE 點餐、約好取餐時間，到店免排隊取餐。${DELIVERY_FAQ_ANSWER}`,
      },
    ];
  }

  const address = "台北市大同區雙連街55號，雙連捷運站 2 號出口步行約 4 分鐘、馬偕紀念醫院旁步行約 3 分鐘";
  let answerLead: string;
  let highlight: string;
  if (category === "bento") {
    answerLead = `摳門製研所的「${name}」是會議餐盒，御食餐盒均一價 $${price}，${timeLabel}供應。店址在${address}。`;
    highlight = "台北會議餐盒首選，均一價好請款，可開立收據／發票";
  } else if (category === "onigiri") {
    answerLead = `摳門製研所的「${name}」是三角御結，均一價 $${price}，適合當早餐、下午茶，${timeLabel}供應，帶了就走、方便快速。店址在${address}。`;
    highlight = "歸類在早餐、下午茶，主打「帶了就走、方便快速」";
  } else {
    answerLead = `摳門製研所的「${name}」是日式炒麵，均一價 $${price}，${timeLabel}供應。店址在${address}。`;
    highlight =
      "不是用米飯當主食，因為我們的炒麵「很。好。吃」，也給大家不同的便當主食選擇";
  }

  const description = `${name}是摳門製研所的${label}。${seed.flavor}均一價 $${price}，${timeLabel}供應，店址在台北市大同區雙連街55號，雙連捷運站 2 號出口步行約 4 分鐘、馬偕紀念醫院旁步行約 3 分鐘。`;

  return {
    slug: seed.slug,
    name,
    category,
    categoryLabel: label,
    price,
    timeSlots,
    timeLabel,
    timeNote,
    description,
    answerLead,
    highlight,
    flavor: seed.flavor,
    features: seed.features,
    proteinLabel: seed.proteinLabel,
    isVegetarian: Boolean(seed.isVegetarian),
    vegetarianLabel: seed.vegetarianLabel,
    suitableFor: CATEGORY_SUITABLE[category],
    photo: photoFor(menuCat.id, menuItem),
    addons,
    faqs,
    seoTitle,
    seoDescription,
  };
}

const SEEDS: Seed[] = [
  // ───── 御食餐盒（均一價，11:40–14:00）─────
  {
    slug: "yuzu-pork-bento",
    name: "柚香炙燒豚御食盒",
    category: "bento",
    flavor: "以柚香搭配炙燒豚肉，是柚香系列的餐盒版本。",
    features: ["柚香風味", "炙燒豚肉", "御食餐盒"],
    proteinLabel: "豚肉",
    faq: {
      q: "柚香炙燒豚御食盒是什麼口味？",
      a: "主要風味是柚香與炙燒豚肉。實際調味與搭配內容，歡迎訂購前來電或透過官方 LINE 詢問。",
    },
  },
  {
    slug: "miso-teriyaki-chicken-bento",
    name: "味噌照燒雞御食盒",
    category: "bento",
    flavor: "以味噌與照燒風味調味雞肉，適合偏好雞肉的人。",
    features: ["味噌風味", "照燒雞肉", "御食餐盒"],
    proteinLabel: "雞肉",
    faq: {
      q: "味噌照燒雞御食盒適合不吃豬肉的人嗎？",
      a: "這個品項主要蛋白質是雞肉。若有宗教或個人飲食禁忌、過敏需求，請在訂購時告知店家確認。",
    },
  },
  {
    slug: "lemon-honey-pork-bento",
    name: "檸檬蜜汁豚御食盒",
    category: "bento",
    flavor: "以檸檬與蜜汁風味搭配豚肉，酸甜取向。",
    features: ["檸檬風味", "蜜汁調味", "豚肉"],
    proteinLabel: "豚肉",
    faq: {
      q: "檸檬蜜汁豚御食盒是什麼口味？",
      a: "品名即風味方向：檸檬搭配蜜汁調味的豚肉，偏酸甜。細節歡迎來電或 LINE 詢問。",
    },
  },
  {
    slug: "shichimi-teriyaki-chicken-bento",
    name: "七味照燒雞御食盒",
    category: "bento",
    flavor: "照燒雞肉加上七味辛香，菜單標示為辣味品項。",
    features: ["七味辛香", "照燒雞肉", "辣味標示"],
    proteinLabel: "雞肉",
    faq: {
      q: "七味照燒雞御食盒會辣嗎？",
      a: "菜單上標示為辣味品項。辣度與是否能調整，請訂購前來電或透過官方 LINE 詢問，由店家回覆。",
    },
  },
  {
    slug: "vegetarian-patty-bento",
    name: "日式烤素排御食盒",
    category: "bento",
    flavor: "素食款為鍋邊素，是會議餐盒裡兼顧素食同事的選擇。",
    features: ["鍋邊素", "素食友善", "御食餐盒"],
    proteinLabel: "素食",
    isVegetarian: true,
    vegetarianLabel: "素食友善",
    faq: {
      q: "日式烤素排御食盒是素食嗎？是全素嗎？",
      a: "150 元的素食會議餐盒為鍋邊素，菜單標示為「素食友善」。實際素別（例如是否全素、是否含蛋奶或五辛）請在訂購前來電或 LINE 向店家確認。",
    },
  },

  // ───── 三角御結（均一價，晨間與午後）─────
  {
    slug: "aburi-pork-onigiri",
    name: "炙燒豚肉飯糰",
    category: "onigiri",
    flavor: "炙燒豚肉做成的三角御結，單手就能吃。",
    features: ["炙燒豚肉", "三角御結", "單手即食"],
    proteinLabel: "豚肉",
    faq: {
      q: "炙燒豚肉飯糰適合當早餐嗎？",
      a: "適合。三角御結在 08:10–10:30 晨間快取時段供應，可單手食用，通勤或到馬偕醫院上班前外帶都方便。",
    },
  },
  {
    slug: "yuzu-pork-onigiri",
    name: "柚香豚肉飯糰",
    category: "onigiri",
    flavor: "柚香搭配豚肉的三角御結。",
    features: ["柚香風味", "豚肉", "三角御結"],
    proteinLabel: "豚肉",
    faq: {
      q: "柚香豚肉飯糰和炙燒豚肉飯糰差在哪？",
      a: "兩者都是豚肉飯糰，柚香豚肉飯糰以柚香為風味重點，炙燒豚肉飯糰則強調炙燒。價格都是 $70。",
    },
  },
  {
    slug: "mentaiko-tamago-onigiri",
    name: "明太子厚蛋飯糰",
    category: "onigiri",
    flavor: "明太子搭配厚蛋的三角御結。",
    features: ["明太子", "厚蛋", "三角御結"],
    proteinLabel: "蛋與明太子",
    faq: {
      q: "明太子厚蛋飯糰含有蛋嗎？有過敏需注意的嗎？",
      a: "品名即含厚蛋與明太子。若有蛋類、海鮮或其他過敏需求，請訂購前來電或 LINE 詢問店家。",
    },
  },
  {
    slug: "teriyaki-chicken-onigiri",
    name: "照燒雞飯糰",
    category: "onigiri",
    flavor: "照燒雞肉做成的三角御結，口味取向容易被接受。",
    features: ["照燒雞肉", "三角御結"],
    proteinLabel: "雞肉",
    faq: {
      q: "照燒雞飯糰可以當會議點心嗎？",
      a: "可以。三角御結 $70 均一價、拿取方便，適合當會議點心或下午加餐。多份外送需前一天預約，1 公里內滿 $1,000 即可外送。",
    },
  },
  {
    slug: "spicy-pork-onigiri",
    name: "辣味豚肉飯糰",
    category: "onigiri",
    flavor: "辣味調味的豚肉三角御結，菜單標示為辣味品項。",
    features: ["辣味", "豚肉", "三角御結"],
    proteinLabel: "豚肉",
    faq: {
      q: "辣味豚肉飯糰會很辣嗎？",
      a: "菜單標示為辣味品項。辣度因人而異，想確認辣的程度，請訂購前來電或透過官方 LINE 詢問。",
    },
  },
  {
    slug: "vegetarian-patty-onigiri",
    name: "日式烤素排飯糰",
    category: "onigiri",
    flavor: "以日式烤素排做成的三角御結，菜單標示「全素／蛋奶素可食」。",
    features: ["日式烤素排", "三角御結", "素食"],
    proteinLabel: "素食",
    isVegetarian: true,
    vegetarianLabel: "全素／蛋奶素可食",
    faq: {
      q: "日式烤素排飯糰是全素嗎？",
      a: "菜單標示為「全素／蛋奶素可食」，全素與蛋奶素的人都可以吃。若有五辛或其他飲食限制，請訂購前來電或 LINE 向店家確認。",
    },
  },

  // ───── 日式炒麵（均一價 $130，11:40–14:00）─────
  {
    slug: "yuzu-aburi-pork-yakisoba",
    name: "柚香炙燒豚肉炒麵",
    category: "yakisoba",
    flavor: "柚香搭配炙燒豚肉的日式炒麵。",
    features: ["柚香風味", "炙燒豚肉", "日式炒麵"],
    proteinLabel: "豚肉",
    faq: {
      q: "柚香炙燒豚肉炒麵適合午餐吃嗎？",
      a: "適合。日式炒麵在 11:40–14:00 午間飽足時段供應，想吃得飽一點的人可以加購豬肉 +$30 或炙燒起司 +$20。",
    },
  },
  {
    slug: "miso-butter-mentaiko-yakisoba",
    name: "味噌奶油明太子豚肉炒麵",
    category: "yakisoba",
    flavor: "味噌、奶油與明太子搭配豚肉的日式炒麵。",
    features: ["味噌風味", "奶油", "明太子", "豚肉"],
    proteinLabel: "豚肉",
    faq: {
      q: "味噌奶油明太子豚肉炒麵有哪些過敏原要注意？",
      a: "品名含奶油與明太子。若有乳製品、海鮮或其他過敏需求，請訂購前來電或 LINE 向店家確認，不建議自行判斷。",
    },
  },
];

export const DISHES: Dish[] = SEEDS.map(build);

export const DISH_CATEGORIES: { id: DishCategoryId; label: string; blurb: string }[] = [
  { id: "bento", label: "御食餐盒", blurb: "均一價 $150，會議商務首選，11:40–14:00 供應" },
  { id: "onigiri", label: "三角御結", blurb: "均一價 $70，晨間快取與午後充電，外帶拿了就走" },
  { id: "yakisoba", label: "日式炒麵", blurb: "均一價 $130，可加購炙燒起司、加豬肉，11:40–14:00 供應" },
];

export function getDish(slug: string): Dish | undefined {
  return DISHES.find((d) => d.slug === slug);
}

export function dishByName(name: string): Dish | undefined {
  return DISHES.find((d) => d.name === name);
}

export function dishUrl(slug: string): string {
  return `${SITE.siteUrl}/menu/${slug}`;
}

export const DRINK_PAIRINGS = MENU.find((c) => c.id === "drinks")?.items ?? [];
