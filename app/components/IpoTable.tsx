"use client";

import { useState } from "react";
import type { IpoListing } from "@/app/lib/ipo";

type Lang = "en" | "ja";

const i18n = {
  ja: {
    title: "【2026年版】IPO企業情報・評価一覧表",
    subtitle: "データベースの最新情報（直近の上場・承認企業）",
    guideTitle: "総合評価の基準",
    guide: [
      ["S", "初値予想が公募比 +50万円以上！"],
      ["A", "初値予想が公募比 +20万〜+50万円！"],
      ["B", "初値予想が公募比 +10万〜+20万円"],
      ["C", "公募割れの可能性が低いIPO"],
      ["D", "公募割れの可能性が高いIPO"],
    ],
    thCompany: "企業名",
    thRating: "総合評価",
    thMarket: "上場市場",
    thBB: "申し込み期間",
    thDate: "上場日",
    thEstPrice: "想定価格",
    thCondition: "仮条件",
    thOfferPrice: "公募価格",
    thInitPrice: "初値",
    thBrokers: "狙い目証券",
    empty: "現在、登録されているIPO情報はありません。",
    lead: "主",
  },
  en: {
    title: "【2026】Japan IPO Tracker & Evaluation List",
    subtitle: "Latest data from the database (recent & upcoming listings)",
    guideTitle: "Overall Rating Criteria",
    guide: [
      ["S", "Expected gains over +500,000 JPY!"],
      ["A", "Expected gains between +200k and +500k JPY!"],
      ["B", "Expected gains between +100k and +200k JPY"],
      ["C", "Low risk of falling below the offering price"],
      ["D", "High risk of falling below the offering price"],
    ],
    thCompany: "Company Name",
    thRating: "Rating",
    thMarket: "Market",
    thBB: "Book-Building",
    thDate: "Listing Date",
    thEstPrice: "Est. Price",
    thCondition: "Interim Cond.",
    thOfferPrice: "Offer Price",
    thInitPrice: "Initial Price",
    thBrokers: "Lead / Sub Brokers",
    empty: "No IPO data available at the moment.",
    lead: "Lead",
  },
} as const;

const MARKET_EN: Record<string, string> = {
  東証グロース: "TSE Growth",
  東証プライム: "TSE Prime",
  東証スタンダード: "TSE Standard",
  東証インフラ: "TSE Infrastructure",
};

const RATING_STYLES: Record<string, string> = {
  S: "bg-red-500 text-white",
  A: "bg-orange-500 text-white",
  B: "bg-yellow-400 text-black",
  C: "bg-green-500 text-white",
  D: "bg-zinc-500 text-white",
};

function marketLabel(market: string | null, lang: Lang): string {
  if (!market) return "-";
  return lang === "en" ? (MARKET_EN[market] ?? market) : market;
}

function initialPriceClass(value: string | null): string {
  if (!value) return "";
  if (value.includes("+")) return "text-green-600 font-semibold";
  if (value.includes("-") && value !== "-") return "text-red-600 font-semibold";
  return "";
}

export default function IpoTable({ listings }: { listings: IpoListing[] }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = i18n[lang];

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t.title}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {t.subtitle}
          </p>
        </div>
        <div className="inline-flex shrink-0 overflow-hidden rounded-md border border-zinc-300 dark:border-zinc-700">
          {(["en", "ja"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                lang === l
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-black"
                  : "bg-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {l === "en" ? "EN" : "日本語"}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {t.guideTitle}
        </h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          {t.guide.map(([rank, desc]) => (
            <li key={rank} className="flex items-center gap-2">
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded text-xs font-bold ${
                  RATING_STYLES[rank] ?? "bg-zinc-400 text-white"
                }`}
              >
                {rank}
              </span>
              {desc}
            </li>
          ))}
        </ul>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 p-8 text-center text-zinc-500 dark:border-zinc-800">
          {t.empty}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-100 text-left text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                <th className="px-3 py-2.5 font-medium">{t.thCompany}</th>
                <th className="px-3 py-2.5 text-center font-medium">
                  {t.thRating}
                </th>
                <th className="px-3 py-2.5 font-medium">{t.thMarket}</th>
                <th className="px-3 py-2.5 font-medium">{t.thBB}</th>
                <th className="px-3 py-2.5 font-medium">{t.thDate}</th>
                <th className="px-3 py-2.5 font-medium">{t.thEstPrice}</th>
                <th className="px-3 py-2.5 font-medium">{t.thCondition}</th>
                <th className="px-3 py-2.5 font-medium">{t.thOfferPrice}</th>
                <th className="px-3 py-2.5 font-medium">{t.thInitPrice}</th>
                <th className="px-3 py-2.5 font-medium">{t.thBrokers}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {listings.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                >
                  <td className="px-3 py-3 align-top">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {item.company_name}
                    </span>
                    <span className="ml-1 text-xs text-zinc-400">
                      ({item.code})
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center align-top">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                        RATING_STYLES[item.rating ?? ""] ??
                        "bg-zinc-400 text-white"
                      }`}
                    >
                      {item.rating ?? "-"}
                    </span>
                  </td>
                  <td className="px-3 py-3 align-top text-zinc-600 dark:text-zinc-300">
                    {marketLabel(item.market, lang)}
                  </td>
                  <td className="px-3 py-3 align-top text-zinc-600 dark:text-zinc-300">
                    {item.bb_period || "-"}
                  </td>
                  <td className="px-3 py-3 align-top text-zinc-600 dark:text-zinc-300">
                    {item.listing_date || "-"}
                  </td>
                  <td className="px-3 py-3 align-top tabular-nums text-zinc-600 dark:text-zinc-300">
                    {item.estimated_price || "-"}
                  </td>
                  <td className="px-3 py-3 align-top text-zinc-600 dark:text-zinc-300">
                    {item.interim_condition || "-"}
                  </td>
                  <td className="px-3 py-3 align-top tabular-nums text-zinc-600 dark:text-zinc-300">
                    {item.offering_price || "-"}
                  </td>
                  <td
                    className={`px-3 py-3 align-top tabular-nums ${initialPriceClass(
                      item.initial_price,
                    )}`}
                  >
                    {item.initial_price || "-"}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <div className="flex flex-wrap gap-1">
                      {item.lead_broker && (
                        <span className="inline-flex items-center rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                          {item.lead_broker}({t.lead})
                        </span>
                      )}
                      {Array.isArray(item.sub_brokers) &&
                        item.sub_brokers.map((sub, i) => (
                          <span
                            key={`${sub}-${i}`}
                            className="inline-flex items-center rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                          >
                            {sub}
                          </span>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
