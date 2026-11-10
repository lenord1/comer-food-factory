import Image from "next/image";
import {
  BadgeCheck,
  Briefcase,
  ChevronDown,
  Clock,
  Hand,
  Leaf,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Receipt,
  Store,
  Timer,
  TrainFront,
  Building2,
  Coffee,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import TimeSlotMenu from "@/components/TimeSlotMenu";
import InstagramIcon from "@/components/InstagramIcon";
import { BUSINESS_POINTS, FAQ, OPENING_HOURS, QUICK_STEPS, SITE } from "@/lib/data";

const businessIcons = [BadgeCheck, Leaf, Coffee, Receipt];

const sectionTitle = "font-serif text-2xl font-bold text-brand md:text-3xl";

export default function Home() {
  return (
    <PageShell>
      <main id="top">
        {/* 2. 首屏 Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[1fr_auto] md:py-16">
          <div>
            <h1 className="font-serif text-3xl font-bold leading-snug text-brand md:text-5xl md:leading-tight">
              {SITE.heroTitle}
            </h1>
            <p className="mt-4 text-base text-ink-soft md:text-lg">{SITE.heroSub}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a
                href={SITE.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded border border-brand/15 bg-white/60 p-5 transition-colors hover:bg-oat"
              >
                <Store className="h-6 w-6 text-brand" aria-hidden="true" />
                <p className="mt-3 font-serif text-lg font-bold text-brand">
                  個人外帶／今日自取
                </p>
                <p className="mt-1 text-sm text-ink-soft">預約免排隊，到店秒取</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded bg-accent px-3 py-2 text-sm font-bold text-white group-hover:bg-accent-dark">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  官方 LINE 預約
                </span>
              </a>
              <a
                href="#business"
                className="rounded bg-ink p-5 text-paper transition-opacity hover:opacity-95"
              >
                <Briefcase className="h-6 w-6" aria-hidden="true" />
                <p className="mt-3 font-serif text-lg font-bold">
                  企業行號／商務會議便當
                </p>
                <p className="mt-1 text-sm text-paper/80">查看 $150 均一價方案</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4">
                  查看方案
                </span>
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <Image
              src="/logo.jpg"
              alt={`${SITE.nameZh} 紅色印章 Logo`}
              width={176}
              height={176}
              className="h-44 w-44"
              priority
            />
          </div>
        </section>

        {/* 3. 時段菜單 */}
        <section id="menu" className="bg-oat">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className={sectionTitle}>時段菜單</h2>
            <p className="mt-2 text-sm text-ink-soft">
              依台北時間自動顯示目前時段，也可以手動切換查看其他時段。
            </p>
            <div className="mt-6">
              <TimeSlotMenu />
            </div>
          </div>
        </section>

        {/* 4. 商務與會議便當預訂指南 */}
        <section id="business" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className={sectionTitle}>商務與會議便當預訂指南</h2>
          <p className="mt-2 text-sm text-ink-soft">
            雙連、馬偕周邊公司行號與機關團體的會議餐盒，均一價 $150，好請款。
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {BUSINESS_POINTS.map((p, i) => {
              const Icon = businessIcons[i];
              return (
                <li key={p.title} className="rounded border border-brand/15 bg-white/60 p-5">
                  <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
                  <h3 className="mt-3 font-serif text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{p.body}</p>
                </li>
              );
            })}
          </ul>

          <h3 className="mt-10 font-serif text-xl font-bold text-brand">
            會議訂購 4 大常見問題
          </h3>
          <div className="mt-4 divide-y divide-brand/10 rounded border border-brand/15 bg-white/60">
            {FAQ.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 font-bold">
                  <span>{f.q}</span>
                  <ChevronDown
                    className="faq-chevron h-5 w-5 shrink-0 text-brand transition-transform"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-4 pb-4 text-sm leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>

          <a
            href={SITE.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded bg-accent px-5 py-3 font-bold text-white hover:bg-accent-dark"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            會議團訂諮詢
          </a>
        </section>

        {/* 5. 拿了就走快取專區 */}
        <section id="quick" className="bg-oat">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className={sectionTitle}>馬偕醫護與通勤族「拿了就走」快取專區</h2>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold">
              <span className="inline-flex items-center gap-1.5 rounded border border-brand/15 bg-paper px-3 py-1.5">
                <Timer className="h-4 w-4 text-brand" aria-hidden="true" /> 30 秒出餐
              </span>
              <span className="inline-flex items-center gap-1.5 rounded border border-brand/15 bg-paper px-3 py-1.5">
                <Hand className="h-4 w-4 text-brand" aria-hidden="true" /> 單手即食
              </span>
            </div>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {QUICK_STEPS.map((s, i) => (
                <li key={s.title} className="rounded border border-brand/15 bg-paper p-5">
                  <span className="font-num text-3xl font-bold tabular-nums text-brand/40">
                    {i + 1}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
                </li>
              ))}
            </ol>
            <a
              href={SITE.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded bg-accent px-5 py-3 font-bold text-white hover:bg-accent-dark"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              官方 LINE 點餐
            </a>
          </div>
        </section>

        {/* 6. 門市資訊與地圖 */}
        <section id="store" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className={sectionTitle}>門市資訊與地圖</h2>
          <p className="mt-3 max-w-3xl whitespace-pre-line font-serif text-lg leading-loose text-ink">
            {SITE.philosophy}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="font-bold">{SITE.address}</p>
                  <ul className="mt-1 space-y-1 text-sm text-ink-soft">
                    <li className="flex items-center gap-1.5">
                      <TrainFront className="h-4 w-4" aria-hidden="true" />
                      {SITE.transit[0]}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" aria-hidden="true" />
                      {SITE.transit[1]}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div className="w-full">
                  <p className="font-bold">營業時間</p>
                  <ul className="mt-1 space-y-1.5 text-sm">
                    {OPENING_HOURS.map((h) => (
                      <li key={h.label}>
                        <span className="font-num font-bold tabular-nums">{h.time}</span>
                        <span className="ml-2">{h.label}</span>
                        <span className="ml-2 text-ink-soft">
                          {h.items}
                          {h.note ? `（${h.note}）` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="rounded border border-brand/15 bg-oat p-3 text-sm text-ink-soft">
                {SITE.deliveryNote}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded bg-accent px-4 py-2.5 font-bold text-white hover:bg-accent-dark"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  撥打 {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-brand px-4 py-2.5 font-bold text-brand hover:bg-oat"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  地圖導航
                </a>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-brand px-4 py-2.5 font-bold text-brand hover:bg-oat"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded border border-brand/15">
              <iframe
                title={`${SITE.nameZh} 地圖`}
                src={SITE.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full md:h-full md:min-h-[22rem]"
              />
            </div>
          </div>
        </section>
      </main>

    </PageShell>
  );
}
