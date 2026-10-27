import React, { useState, useMemo } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export interface EstimatePayload {
  trackLabel: string;
  scaleLabel: string;
  selectedIntegrations: string[];
  estimatedWeeks: string;
  investmentRange: string;
  summaryText: string;
}

interface ProjectEstimatorProps {
  onApplyEstimateToForm: (payload: EstimatePayload) => void;
}

interface TrackOption {
  id: 'block-theme' | 'woocommerce-hpos' | 'legacy-migration' | 'vip-retainer';
  label: string;
  shortLabel: string;
  baseWeeks: number;
  baseMinUsd: number;
  baseMaxUsd: number;
  description: string;
  deliverables: string[];
}

const TRACK_OPTIONS: TrackOption[] = [
  {
    id: 'block-theme',
    label: 'Custom Gutenberg Block Theme & FSE System',
    shortLabel: 'Gutenberg & FSE',
    baseWeeks: 4,
    baseMinUsd: 4500,
    baseMaxUsd: 8500,
    description:
      'Bespoke Block API v3 theme, locked theme.json design tokens, and zero-bloat semantic templates built for 99+ PageSpeed.',
    deliverables: [
      '10–18 custom React/PHP Gutenberg blocks',
      'Strict theme.json v3 fluid typography & color tokens',
      'Role-locked pattern library for effortless editing',
      '98+ Core Web Vitals performance guarantee',
    ],
  },
  {
    id: 'woocommerce-hpos',
    label: 'High-Conversion WooCommerce Storefront',
    shortLabel: 'WooCommerce Store',
    baseWeeks: 6,
    baseMinUsd: 7500,
    baseMaxUsd: 14000,
    description:
      'Custom WooCommerce Store API checkout, High-Performance Order Storage (HPOS), and atomic Redis inventory locks.',
    deliverables: [
      'WooCommerce HPOS custom database schema',
      'Sub-second React Store API cart & checkout flow',
      'Custom product filters, bundles & dynamic pricing',
      'Payment gateway, shipping & CRM webhook sync',
    ],
  },
  {
    id: 'legacy-migration',
    label: 'Elementor / Divi to Native Block Migration',
    shortLabel: 'Builder Migration',
    baseWeeks: 4,
    baseMinUsd: 4000,
    baseMaxUsd: 7500,
    description:
      'Surgical migration off slow Elementor, Divi, or WPBakery setups into clean native Gutenberg blocks with 100% SEO preservation.',
    deliverables: [
      'Automated WP-CLI shortcode-to-block conversion',
      'Full canonical URL, 301 & JSON-LD schema preservation',
      'Plugin consolidation (removing 15–25 bloated plugins)',
      'Zero-downtime staging cutover & speed optimization',
    ],
  },
  {
    id: 'vip-retainer',
    label: 'Dedicated WordPress Engineering Retainer (Monthly)',
    shortLabel: 'Monthly Retainer',
    baseWeeks: 4,
    baseMinUsd: 2800,
    baseMaxUsd: 4500,
    description:
      'Ongoing senior WordPress development with Haris Azeem: new custom blocks, speed audits, security hardening, and priority sprints.',
    deliverables: [
      'Up to 40 hours/month direct senior WordPress engineering',
      'Continuous Core Web Vitals & query optimization',
      'Staging-tested plugin & security patch management',
      'Direct Slack & GitHub PR workflow collaboration',
    ],
  },
];

const SCALE_TIERS = [
  {
    id: 'standard',
    label: 'Standard · Up to 15 Templates / 500 Products',
    shortLabel: 'Standard Scope',
    weeksAddon: 0,
    costMultiplier: 1.0,
  },
  {
    id: 'growth',
    label: 'Growth · Up to 35 Templates / 5,000 Products',
    shortLabel: 'Growth Volume',
    weeksAddon: 2,
    costMultiplier: 1.3,
  },
  {
    id: 'enterprise',
    label: 'Enterprise / Multisite · 10,000+ Records or Multi-Region',
    shortLabel: 'Enterprise Network',
    weeksAddon: 3,
    costMultiplier: 1.65,
  },
];

const INTEGRATION_MODULES = [
  {
    id: 'erp-crm',
    label: 'CRM / ERP Sync (HubSpot, Salesforce, NetSuite, Zapier Webhooks)',
    weeks: 1,
    cost: 1200,
  },
  {
    id: 'multilingual',
    label: 'Multilingual Setup (WPML / Polylang Pro / Multisite Localization)',
    weeks: 1,
    cost: 950,
  },
  {
    id: 'paywall-sso',
    label: 'Membership, Subscriptions or Custom Portal (Stripe / MemberPress / SSO)',
    weeks: 1.5,
    cost: 1500,
  },
  {
    id: 'search-algolia',
    label: 'Instant Faceted Search & Filtering (Algolia / ElasticPress / Custom REST)',
    weeks: 1,
    cost: 1100,
  },
];

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  onApplyEstimateToForm,
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<TrackOption['id']>('block-theme');
  const [selectedScaleId, setSelectedScaleId] = useState<string>('standard');
  const [selectedIntegrationIds, setSelectedIntegrationIds] = useState<string[]>(['search-algolia']);

  const activeTrack = useMemo(
    () => TRACK_OPTIONS.find((t) => t.id === selectedTrackId) || TRACK_OPTIONS[0],
    [selectedTrackId]
  );

  const activeScale = useMemo(
    () => SCALE_TIERS.find((s) => s.id === selectedScaleId) || SCALE_TIERS[0],
    [selectedScaleId]
  );

  const toggleIntegration = (id: string) => {
    setSelectedIntegrationIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const activeModules = INTEGRATION_MODULES.filter((m) =>
      selectedIntegrationIds.includes(m.id)
    );
    const addonWeeks = activeModules.reduce((acc, m) => acc + m.weeks, 0);
    const addonCost = activeModules.reduce((acc, m) => acc + m.cost, 0);

    const totalWeeksMin = Math.round(activeTrack.baseWeeks + activeScale.weeksAddon + addonWeeks);
    const totalWeeksMax = totalWeeksMin + 2;

    const minUsd =
      Math.round(
        ((activeTrack.baseMinUsd * activeScale.costMultiplier + addonCost) / 100)
      ) * 100;
    const maxUsd =
      Math.round(
        ((activeTrack.baseMaxUsd * activeScale.costMultiplier + addonCost * 1.15) / 100)
      ) * 100;

    const formattedMin = `$${minUsd.toLocaleString('en-US')}`;
    const formattedMax = `$${maxUsd.toLocaleString('en-US')}`;
    const estimatedWeeks =
      activeTrack.id === 'vip-retainer'
        ? 'Monthly Ongoing SLA'
        : `${totalWeeksMin}–${totalWeeksMax} Weeks`;
    const investmentRange =
      activeTrack.id === 'vip-retainer'
        ? `${formattedMin} – ${formattedMax} / mo`
        : `${formattedMin} – ${formattedMax}`;

    const moduleNames = activeModules.map((m) => m.label.split(' (')[0]);

    const summaryText = `Track: ${activeTrack.label} | Scale: ${activeScale.shortLabel} | Add-ons: ${
      moduleNames.length > 0 ? moduleNames.join(', ') : 'Core Build Only'
    } | Timeline: ${estimatedWeeks} | Estimate: ${investmentRange}`;

    return {
      estimatedWeeks,
      investmentRange,
      moduleNames,
      summaryText,
    };
  }, [activeTrack, activeScale, selectedIntegrationIds]);

  const handleTransferToForm = () => {
    onApplyEstimateToForm({
      trackLabel: activeTrack.label,
      scaleLabel: activeScale.label,
      selectedIntegrations: calculation.moduleNames,
      estimatedWeeks: calculation.estimatedWeeks,
      investmentRange: calculation.investmentRange,
      summaryText: calculation.summaryText,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left 7 Columns: Interactive Configuration Controls */}
      <div className="lg:col-span-7 bg-[#121216] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Step 1: Primary Engineering Track */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h3 className="text-base font-semibold text-white">
              01. Select WordPress Build Type
            </h3>
            <span className="text-xs text-zinc-400 font-mono tabular-nums">
              Step 1 of 3
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRACK_OPTIONS.map((track) => {
              const isSelected = track.id === selectedTrackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setSelectedTrackId(track.id)}
                  className={`text-left p-4 rounded-xl border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
                    isSelected
                      ? 'bg-amber-500/10 text-white border-amber-500'
                      : 'bg-[#09090B] text-zinc-200 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold whitespace-nowrap truncate">
                      {track.shortLabel}
                    </span>
                    <span
                      className={`text-xs font-mono tabular-nums whitespace-nowrap shrink-0 ${
                        isSelected ? 'text-amber-400' : 'text-zinc-400'
                      }`}
                    >
                      From ${track.baseMinUsd.toLocaleString('en-US')}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                    {track.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Content & Database Scale */}
        <div className="pt-6 border-t border-zinc-800">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h3 className="text-base font-semibold text-white">
              02. Site Size &amp; Catalog Volume
            </h3>
            <span className="text-xs text-zinc-400 font-mono tabular-nums">
              Step 2 of 3
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-1.5 bg-[#09090B] border border-zinc-800 rounded-xl">
            {SCALE_TIERS.map((tier) => {
              const isSelected = tier.id === selectedScaleId;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedScaleId(tier.id)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-amber-500 ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tier.shortLabel}
                </button>
              );
            })}
          </div>
          <p className="mt-2.5 text-xs text-zinc-400">
            Selected tier: {activeScale.label}
          </p>
        </div>

        {/* Step 3: Technical Integrations */}
        <div className="pt-6 border-t border-zinc-800">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h3 className="text-base font-semibold text-white">
              03. Custom Features &amp; API Integrations
            </h3>
            <span className="text-xs text-zinc-400 font-mono tabular-nums">
              Optional Modules
            </span>
          </div>
          <div className="space-y-2.5">
            {INTEGRATION_MODULES.map((mod) => {
              const isChecked = selectedIntegrationIds.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => toggleIntegration(mod.id)}
                  className={`w-full flex items-center justify-between gap-4 p-3.5 rounded-xl border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-500 ${
                    isChecked
                      ? 'bg-amber-500/10 border-amber-500/80 text-white'
                      : 'bg-[#09090B] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        isChecked
                          ? 'bg-amber-500 border-amber-500 text-zinc-950'
                          : 'border-zinc-700 bg-[#121216]'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                    </span>
                    <span className="text-xs sm:text-sm font-medium truncate">
                      {mod.label}
                    </span>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-zinc-400 whitespace-nowrap shrink-0">
                    +${mod.cost.toLocaleString('en-US')} · +{mod.weeks}w
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right 5 Columns: Live Architectural Scope Output */}
      <div className="lg:col-span-5 bg-[#121216] border border-zinc-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
        <div>
          <div className="text-xs font-mono text-amber-400">
            HARIS AZEEM · INSTANT PROJECT ESTIMATE
          </div>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-white font-display">
            {activeTrack.label}
          </h3>
          <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
            {activeTrack.description}
          </p>

          {/* Key Numerical Outputs */}
          <div className="mt-6 grid grid-cols-2 gap-4 py-5 border-y border-zinc-800">
            <div>
              <div className="text-xs text-zinc-400">Estimated Investment</div>
              <div className="mt-1 text-lg sm:text-xl font-bold font-mono tabular-nums text-amber-400">
                {calculation.investmentRange}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-400">Estimated Delivery</div>
              <div className="mt-1 text-lg sm:text-xl font-bold font-mono tabular-nums text-white">
                {calculation.estimatedWeeks}
              </div>
            </div>
          </div>

          {/* Included Architectural Deliverables */}
          <div className="mt-6">
            <div className="text-xs font-mono text-zinc-400 mb-3">
              INCLUDED IN THIS BUILD
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-200">
              {activeTrack.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-mono text-xs mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Unboxed Metadata Summary of Selected Add-ons */}
          <div className="mt-6 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
            <span>Scale: {activeScale.shortLabel}</span>
            <span aria-hidden="true"> · </span>
            <span>
              Add-ons:{' '}
              {calculation.moduleNames.length > 0
                ? calculation.moduleNames.join(' / ')
                : 'None selected'}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleTransferToForm}
            className="w-full py-3.5 px-5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            <span>Send This Estimate to Haris Azeem</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="mt-2.5 text-center text-xs text-zinc-400">
            Milestone-based payments · 100% custom code ownership · 60-day support
          </p>
        </div>
      </div>
    </div>
  );
};
