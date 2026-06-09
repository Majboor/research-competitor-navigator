import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from 'recharts';
import { Globe, Network, Layers, Tag } from 'lucide-react';
import { Competitor } from '../types';
import { computeInsights } from '../utils/insights';

interface CompetitorInsightsProps {
  competitors: Competitor[];
}

const CONCENTRATION_STYLES: Record<string, string> = {
  Fragmented: 'text-emerald-600 bg-emerald-50',
  Moderate: 'text-amber-600 bg-amber-50',
  Concentrated: 'text-rose-600 bg-rose-50',
};

const StatTile: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  hint?: string;
}> = ({ icon, label, value, hint }) => (
  <div className="glass-card rounded-xl p-5 text-left">
    <div className="flex items-center gap-2 text-brand-600 mb-2">
      {icon}
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </span>
    </div>
    <div className="text-2xl font-semibold text-neutral-800">{value}</div>
    {hint && <div className="text-xs text-neutral-500 mt-1">{hint}</div>}
  </div>
);

const CompetitorInsights: React.FC<CompetitorInsightsProps> = ({ competitors }) => {
  const insights = useMemo(() => computeInsights(competitors), [competitors]);

  if (insights.totalCompetitors === 0) {
    return null;
  }

  const chartData = insights.topDomains.map((d) => ({
    name: d.domain.length > 22 ? `${d.domain.slice(0, 21)}…` : d.domain,
    fullDomain: d.domain,
    count: d.count,
    share: Math.round(d.share * 100),
    link: d.sampleLink,
  }));

  const maxKeyword = insights.topKeywords[0]?.count ?? 1;

  return (
    <div className="w-full animate-fade-in" data-testid="competitor-insights">
      {/* Summary stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatTile
          icon={<Network size={16} />}
          label="Competitors"
          value={insights.totalCompetitors}
          hint="results analyzed"
        />
        <StatTile
          icon={<Globe size={16} />}
          label="Unique domains"
          value={insights.uniqueDomains}
          hint={`${insights.totalCompetitors - insights.uniqueDomains} duplicate listings`}
        />
        <StatTile
          icon={<Layers size={16} />}
          label="Market density"
          value={
            <span
              className={`inline-block px-2 py-0.5 rounded-md text-lg ${
                CONCENTRATION_STYLES[insights.concentrationLabel]
              }`}
            >
              {insights.concentrationLabel}
            </span>
          }
          hint="how crowded the field is"
        />
        <StatTile
          icon={<Tag size={16} />}
          label="Leader share"
          value={`${Math.round(insights.topDomainShare * 100)}%`}
          hint={insights.topDomains[0]?.domain ?? '—'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top domains bar chart */}
        <div className="glass-card rounded-xl p-6 text-left">
          <h3 className="font-semibold text-lg mb-1">Who shows up most</h3>
          <p className="text-sm text-neutral-500 mb-4">
            Domains ranked by how often they appear in your results.
          </p>
          <div style={{ width: '100%', height: Math.max(180, chartData.length * 40) }}>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 32, bottom: 0, left: 8 }}
                barCategoryGap={8}
              >
                <XAxis type="number" hide allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={140}
                  tick={{ fontSize: 12, fill: '#525252' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(14,165,233,0.06)' }}
                  formatter={(value: number) => [`${value} listing(s)`, 'Appearances']}
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.fullDomain ?? ''
                  }
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #e5e5e5',
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 4, 4]} label={{ position: 'right', fontSize: 12, fill: '#737373' }}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? '#0ea5e9' : '#7dd3fc'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Positioning themes / keyword cloud */}
        <div className="glass-card rounded-xl p-6 text-left">
          <h3 className="font-semibold text-lg mb-1">Positioning themes</h3>
          <p className="text-sm text-neutral-500 mb-4">
            The words your competitors lean on most — the language customers
            already associate with this market.
          </p>
          {insights.topKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {insights.topKeywords.map((k) => {
                const intensity = 0.35 + 0.65 * (k.count / maxKeyword);
                return (
                  <span
                    key={k.word}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium border border-brand-100"
                    style={{
                      backgroundColor: `rgba(14,165,233,${(intensity * 0.16).toFixed(3)})`,
                      color: '#0369a1',
                    }}
                    title={`Appears across ${k.count} competitors`}
                  >
                    {k.word}
                    <span className="text-xs text-brand-400">{k.count}</span>
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">
              Not enough overlapping language to surface themes yet — try a
              broader search or more results.
            </p>
          )}

          {insights.tlds.length > 0 && (
            <div className="mt-6 pt-4 border-t border-neutral-200/70">
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-500 mb-2">
                Domain types
              </div>
              <div className="flex flex-wrap gap-2">
                {insights.tlds.map((t) => (
                  <span
                    key={t.tld}
                    className="text-xs rounded-md bg-neutral-100 text-neutral-600 px-2 py-1"
                  >
                    .{t.tld} · {t.count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitorInsights;
