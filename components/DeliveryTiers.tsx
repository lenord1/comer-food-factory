import { DELIVERY_RULE_SHORT, DELIVERY_TIERS } from "@/lib/data";

/** 外送滿額門檻表（首頁與會議餐盒頁共用） */
export default function DeliveryTiers() {
  return (
    <div className="rounded border border-brand/15 bg-white/60 p-5">
      <h3 className="font-serif text-lg font-bold text-brand">外送門檻</h3>
      <p className="mt-1 text-sm font-bold">{DELIVERY_RULE_SHORT}</p>
      <table className="mt-3 w-full text-sm">
        <caption className="sr-only">外送距離與滿額門檻</caption>
        <thead>
          <tr className="border-b border-brand/15 text-left text-ink-soft">
            <th scope="col" className="py-2 font-medium">與門市距離</th>
            <th scope="col" className="py-2 text-right font-medium">滿額即可外送・免運費</th>
          </tr>
        </thead>
        <tbody>
          {DELIVERY_TIERS.map((t) => (
            <tr key={t.range} className="border-b border-brand/10 last:border-0">
              <td className="py-2">{t.range}</td>
              <td className="py-2 text-right font-num font-bold tabular-nums text-accent">
                ${t.minimum.toLocaleString("en-US")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
