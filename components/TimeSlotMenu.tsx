"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { MENU, SITE, SLOTS, TAGS, photoFor, type SlotId, type MenuCategory } from "@/lib/data";
import { dishByName } from "@/lib/dishes";

/** 取得 Asia/Taipei 目前時間（以午夜起算的分鐘數） */
function taipeiMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Taipei",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

/** 11:00 前晨間；10:30–11:40 之間預設午間；14:00 後午後 */
function pickSlot(min: number): SlotId {
  if (min < 10 * 60 + 30) return "morning";
  if (min < 14 * 60) return "noon";
  return "afternoon";
}

export default function TimeSlotMenu() {
  const [nowMin, setNowMin] = useState<number | null>(null);
  const [selected, setSelected] = useState<SlotId>("noon");

  useEffect(() => {
    const m = taipeiMinutes(new Date());
    setNowMin(m);
    setSelected(pickSlot(m));
  }, []);

  const currentSlot = nowMin === null ? null : pickSlot(nowMin);
  const slot = SLOTS.find((s) => s.id === selected) ?? SLOTS[1];
  const categories = slot.categories
    .map((id) => MENU.find((c) => c.id === id))
    .filter((c): c is MenuCategory => Boolean(c));

  return (
    <div>
      <div role="tablist" aria-label="供餐時段" className="grid grid-cols-3 gap-2">
        {SLOTS.map((s) => {
          const active = s.id === selected;
          const isNow = s.id === currentSlot;
          const inService =
            nowMin !== null && nowMin >= s.startMin && nowMin < s.endMin;
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
              {isNow && (
                <span
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] font-bold ${
                    active ? "bg-paper text-brand" : "bg-brand text-white"
                  }`}
                >
                  {inService ? "現在" : "即將供應"}
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
