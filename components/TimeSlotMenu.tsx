"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { MENU, SITE, SLOTS, TAGS, photoFor, type SlotId, type MenuCategory } from "@/lib/data";
import { dishByName } from "@/lib/dishes";

const WEEKDAY: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** 取得 Asia/Taipei 目前的星期（0＝週日）與分鐘數（以午夜起算） */
function taipeiNow(date: Date): { weekday: number; min: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Taipei",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const h = Number(get("hour")) % 24;
  const m = Number(get("minute"));
  return { weekday: WEEKDAY[get("weekday")] ?? 1, min: h * 60 + m };
}

type Status =
  | { kind: "open"; slot: SlotId }
  | { kind: "soon"; slot: SlotId }
  | { kind: "closed"; message: string };

const [MORNING, NOON, AFTERNOON] = SLOTS;
const HOURS_TEXT = `${SITE.openDaysLabel} ${SITE.opens}–${SITE.closes}`;

/**
 * 依台北時間判斷營業狀態：
 * 週一至週五 08:10–10:30 晨間、10:30–11:40 午間即將供應、11:40–14:00 午間、14:00–17:00 午後；
 * 其餘時間（含週末、打烊後、開店前）顯示非營業訊息，並預設顯示晨間菜單。
 */
function getStatus({ weekday, min }: { weekday: number; min: number }): Status {
  const openDay = weekday >= 1 && weekday <= 5;
  if (!openDay) {
    return { kind: "closed", message: `週六、日公休，週一 ${SITE.opens} 開始供應。可先用官方 LINE 預約。` };
  }
  if (min < MORNING.startMin) {
    return { kind: "closed", message: `尚未開始營業，今天 ${SITE.opens} 開始供應。可先用官方 LINE 預約。` };
  }
  if (min < MORNING.endMin) return { kind: "open", slot: "morning" };
  if (min < NOON.startMin) return { kind: "soon", slot: "noon" };
  if (min < NOON.endMin) return { kind: "open", slot: "noon" };
  if (min < AFTERNOON.endMin) return { kind: "open", slot: "afternoon" };
  const next = weekday === 5 ? "下週一" : "明天";
  return { kind: "closed", message: `今日已打烊，${next} ${SITE.opens} 開始供應。可先用官方 LINE 預約。` };
}

export default function TimeSlotMenu() {
  const [status, setStatus] = useState<Status | null>(null);
  const [selected, setSelected] = useState<SlotId>("noon");

  useEffect(() => {
    const s = getStatus(taipeiNow(new Date()));
    setStatus(s);
    setSelected(s.kind === "closed" ? "morning" : s.slot);
  }, []);

  const slot = SLOTS.find((s) => s.id === selected) ?? SLOTS[1];
  const categories = slot.categories
    .map((id) => MENU.find((c) => c.id === id))
    .filter((c): c is MenuCategory => Boolean(c));

  return (
    <div>
      {status?.kind === "closed" && (
        <p className="mb-4 rounded border border-brand/15 bg-paper px-3 py-2 text-sm">
          <span className="font-bold text-brand">目前非營業時間。</span>
          {status.message}
          <span className="block text-xs text-ink-soft">營業時間：{HOURS_TEXT}</span>
        </p>
      )}
      <div role="tablist" aria-label="供餐時段" className="grid grid-cols-3 gap-2">
        {SLOTS.map((s) => {
          const active = s.id === selected;
          const badge =
            status && status.kind !== "closed" && status.slot === s.id
              ? status.kind === "open"
                ? "現在"
                : "即將供應"
              : null;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(s.id)}
              className={`relative rounded border px-2 py-3 text-center transition-colors ${
                active
                  ? "border-brand bg-brand text-white"
                  : "border-brand/15 bg-paper text-ink hover:bg-oat"
              }`}
            >
              {badge && (
                <span
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] font-bold ${
                    active ? "bg-paper text-brand" : "bg-brand text-white"
                  }`}
                >
                  {badge}
                </span>
              )}
              <span className="block font-serif text-sm font-bold sm:text-base">
                {s.label}
              </span>
              <span className="mt-0.5 block font-num text-xs tabular-nums opacity-90">
                {s.timeLabel}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        {slot.summary}
        {slot.note ? `（${slot.note}）` : ""}
      </p>

      <div role="tabpanel" className="mt-4 grid gap-4 md:grid-cols-2">
        {categories.map((cat) => (
          <section
            key={cat.id}
            className={`rounded border border-brand/15 bg-white/60 p-4 ${
              cat.id === "drinks" && categories.length === 3 ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-lg font-bold text-brand">{cat.title}</h3>
              {cat.badge && (
                <span className="font-num text-sm font-bold tabular-nums text-accent">
                  {cat.badge}
                </span>
              )}
            </div>
            {cat.note && <p className="mt-1 text-xs text-ink-soft">{cat.note}</p>}

            <ul
              className={`mt-3 grid gap-3 ${
                cat.id === "drinks" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"
              }`}
            >
              {cat.items.map((item) => {
                const dish = dishByName(item.name);
                const photo = photoFor(cat.id, item);
                return (
                  <li
                    key={item.name}
                    className="flex flex-col overflow-hidden rounded border border-brand/10 bg-paper"
                  >
                    {photo ? (
                      <div className="relative aspect-[4/3] bg-oat">
                        <Image
                          src={photo}
                          alt={`${item.name}示意圖`}
                          fill
                          sizes="(min-width: 768px) 25vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      /* 沒有照片的品項：4:3 佔位 */
                      <div
                        className="flex aspect-[4/3] items-center justify-center bg-oat text-ink-soft/60"
                        aria-hidden="true"
                      >
                        <Camera className="h-6 w-6" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-2.5">
                      {dish ? (
                        <Link
                          href={`/menu/${dish.slug}`}
                          className="text-sm font-bold leading-snug hover:text-brand hover:underline"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <p className="text-sm font-bold leading-snug">{item.name}</p>
                      )}
                      <p className="mt-1 font-num text-base font-bold tabular-nums text-accent">
                        ${item.price}
                      </p>
                      {item.tags && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
                                TAGS[t].tone === "leaf"
                                  ? "bg-leaf-soft text-leaf"
                                  : "bg-brand/10 text-brand"
                              }`}
                            >
                              {TAGS[t].label}
                            </span>
                          ))}
                        </div>
                      )}
                      {dish && (
                        <div className="mt-auto pt-2.5">
                          <Link
                            href={`/menu/${dish.slug}`}
                            className="block text-xs text-ink-soft underline underline-offset-2 hover:text-brand"
                          >
                            詳細介紹
                          </Link>
                          <a
                            href={SITE.lineUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 block rounded bg-accent px-2 py-1.5 text-center text-xs font-bold text-white hover:bg-accent-dark"
                          >
                            直接點餐
                          </a>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {cat.addons && (
              <p className="mt-3 border-t border-brand/10 pt-3 text-sm text-ink-soft">
                可加購：
                {cat.addons.map((a, i) => (
                  <span key={a.name}>
                    {i > 0 && "、"}
                    {a.name}{" "}
                    <span className="font-num font-bold tabular-nums text-accent">
                      +${a.price}
                    </span>
                  </span>
                ))}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
