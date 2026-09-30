"use client"

import { useState } from "react"

import {
  AnalyticsLineChart,
  DEFAULT_DATA,
  DEFAULT_GRADIENT,
  EASE_OUT,
  type AnalyticsDataPoint,
  type AnalyticsGradientStop,
} from "@/registry/default/ui/analytics-chart"

const ANALYTICS_DEMO_SETS = {
  ecommerce: {
    title: "Clicks",
    sub: "Conversion analytics",
    data: DEFAULT_DATA,
    valueLabel: "clicks",
  },
  signups: {
    title: "Signups",
    sub: "Organic acquisition",
    data: [
      { date: "2024-01-07", label: "organic", value: 340 },
      { date: "2024-01-14", label: "organic", value: 520 },
      { date: "2024-01-21", label: "organic", value: 480 },
      { date: "2024-01-28", label: "organic", value: 710 },
      { date: "2024-02-04", label: "organic", value: 890 },
      { date: "2024-02-11", label: "organic", value: 1250 },
    ],
    valueLabel: "signups",
  },
  revenue: {
    title: "Revenue",
    sub: "SaaS MRR growth",
    data: [
      { date: "2023-07-01", label: "saas-mrr", value: 14_200 },
      { date: "2023-08-01", label: "saas-mrr", value: 16_800 },
      { date: "2023-09-01", label: "saas-mrr", value: 15_900 },
      { date: "2023-10-01", label: "saas-mrr", value: 21_300 },
      { date: "2023-11-01", label: "saas-mrr", value: 24_700 },
      { date: "2023-12-01", label: "saas-mrr", value: 28_100 },
      { date: "2024-01-01", label: "saas-mrr", value: 31_500 },
      { date: "2024-02-01", label: "saas-mrr", value: 35_800 },
    ],
    valueLabel: "USD",
    gradient: [
      { offset: "0%", color: "#c084fc" },
      { offset: "50%", color: "#818cf8" },
      { offset: "100%", color: "#6366f1" },
    ],
  },
} as const satisfies Record<
  string,
  {
    title: string
    sub: string
    data: AnalyticsDataPoint[]
    valueLabel: string
    gradient?: AnalyticsGradientStop[]
  }
>

type AnalyticsDemoKey = keyof typeof ANALYTICS_DEMO_SETS

function AnalyticsChartDemo() {
  const [tab, setTab] = useState<AnalyticsDemoKey>("ecommerce")
  const [epoch, setEpoch] = useState(0)
  const demo = ANALYTICS_DEMO_SETS[tab]

  function pick(k: AnalyticsDemoKey) {
    setTab(k)
    setEpoch((e) => e + 1)
  }

  return (
    <div
      data-slot="analytics-chart-demo"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div style={{ width: "100%", maxWidth: 620 }}>
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 2,
            padding: 4,
            marginBottom: 16,
            background: "var(--card)",
            borderRadius: 11,
            border: "1px solid var(--border)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {(
            Object.entries(ANALYTICS_DEMO_SETS) as [
              AnalyticsDemoKey,
              (typeof ANALYTICS_DEMO_SETS)[AnalyticsDemoKey],
            ][]
          ).map(([k, v]) => {
            const on = tab === k
            return (
              <button
                data-slot="analytics-chart-demo-tab"
                key={k}
                onClick={() => pick(k)}
                onMouseDown={(e) => {
                  if (!on) {
                    e.currentTarget.style.transform = "scale(0.97)"
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = ""
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = ""
                }}
                style={{
                  flex: 1,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "7px 14px",
                  borderRadius: 8,
                  background: on ? "var(--primary)" : "transparent",
                  color: on
                    ? "var(--primary-foreground)"
                    : "var(--muted-foreground)",
                  boxShadow: on ? "0 1px 4px rgba(0,0,0,0.18)" : "none",
                  transition: `all 200ms ${EASE_OUT}`,
                  fontFamily: "inherit",
                }}
                type="button"
              >
                {v.title}
              </button>
            )
          })}
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "20px 24px 14px",
            border: "1px solid var(--border)",
            boxShadow: [
              "0 1px 2px -1px rgba(0,0,0,0.06)",
              "0 4px 12px rgba(0,0,0,0.04)",
              "0 14px 32px -6px rgba(0,0,0,0.06)",
            ].join(","),
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "0 2px",
              marginBottom: 2,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--foreground)",
                  lineHeight: 1.3,
                  textWrap: "balance",
                }}
              >
                {demo.title}
              </h2>
              <p
                style={{
                  margin: "1px 0 0",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--muted-foreground)",
                }}
              >
                {demo.sub}
              </p>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--muted-foreground)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {demo.data.length} points
            </span>
          </div>

          <AnalyticsLineChart
            data={demo.data}
            gradientStops={
              "gradient" in demo ? demo.gradient : DEFAULT_GRADIENT
            }
            key={epoch}
            valueLabel={demo.valueLabel}
          />

          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "var(--muted-foreground)",
              margin: "4px 0 0",
              fontWeight: 500,
              opacity: 0.6,
            }}
          >
            Hover points for details
          </p>
        </div>

        {/* Props */}
        <div
          style={{
            marginTop: 10,
            background: "var(--card)",
            borderRadius: 12,
            padding: "12px 16px",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--muted-foreground)",
              margin: "0 0 5px",
            }}
          >
            Component API
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px 18px",
              fontSize: 11,
              color: "var(--muted-foreground)",
            }}
          >
            {[
              ["data", "chart data points"],
              ["gradientStops", "line color stops"],
              ["dotColors", "per-dot overrides"],
              ["gridLines", "grid line count"],
              ["pinnedIndices", "pinned tooltips"],
              ["valueLabel", "unit label"],
            ].map(([p, d]) => (
              <span key={p}>
                <code
                  style={{
                    color: "var(--foreground)",
                    fontSize: 10.5,
                    fontFamily: "'Geist Mono',ui-monospace,monospace",
                  }}
                >
                  {p}
                </code>
                {" — "}
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsChartDemo
