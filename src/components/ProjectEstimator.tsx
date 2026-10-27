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
    label: 'Custom Gutenberg Block System & FSE Theme',
    shortLabel: 'Gutenberg & FSE',
    baseWeeks: 5,
    baseMinUsd: 16000,
    baseMaxUsd: 24000,
    description:
      'Bespoke Block API v3 library, locked theme.json design tokens, and zero-bloat semantic templates built for editorial speed.',
    deliverables: [
      '12–20 custom React/PHP Gutenberg blocks',
      'Strict theme.json v3 fluid typography & color tokens',
      'Role-locked pattern library & editorial guardrails',
      '98+ Core Web Vitals performance guarantee',
    ],
  },
  {
    id: 'woocommerce-hpos',
    label: 'High-Concurrency WooCommerce Architecture',
    shortLabel: 'WooCommerce HPOS',
    baseWeeks: 7,
    baseMinUsd: 24000,
    baseMaxUsd: 36000,
    description:
      'Custom WooCommerce Store API checkout, High-Performance Order Storage (HPOS) migration, and atomic Redis inventory locks.',
    deliverables: [
      'WooCommerce HPOS custom database table schema',
      'Sub-second React Store API cart & checkout flow',
      'Atomic Redis inventory reservation for product drops',
      'Asynchronous Action Scheduler webhook processing',
    ],
  },
  {
    id: 'legacy-migration',
    label: 'Legacy Page-Builder to Native Block Migration',
    shortLabel: 'Builder Migration',
    baseWeeks: 6,
    baseMinUsd: 18000,
    baseMaxUsd: 28000,
    description:
      'Surgical migration off Elementor, Divi, WPfBakery, or ACF flexible content to native Gutenberg blocks with 100% SEO preservation.',
    deliverables: [
      'Automated WP-CLI AST shortcode-to-block migration',
      'Full canonical URL, redirect & JSON-LD schema audit',
      'Plugin consolidation (typically removing 20+ plugins)',
      'Zero-downtime cutover with delta content sync',
    ],
  },
  {
    id: 'vip-retainer',
    label: 'Principal Advisory & Performance Retainer (Quarterly)',
    shortLabel: 'Advisory Retainer',
    baseWeeks: 12,
    baseMinUsd: 15000,
    baseMaxUsd: 21000,
    description:
      'Dedicated principal engineering leadership for in-house teams: code reviews, query optimization, security hardening, and feature sprints.',
    deliverables: [
      'Up to 35 hours/month principal architecture & PR review',
      'Continuous New Relic / Query Monitor bottleneck profiling',
      'Composer dependency & security patch orchestration',
      'Direct Slack & architectural RFC collaboration',
    ],
  },
];

const SCALE_TIERS = [
  {
    id: 'standard',
    label: 'Single Site · Up to 2,500 Posts / SKUs',
    shortLabel: 'Standard Scale',
    weeksAddon: 0,
    costMultiplier: 1.0,
  },
  {
    id: 'growth',
    label: 'High Volume · 2,500 to 25,000 Posts / SKUs',
    shortLabel: 'Growth Volume',
    weeksAddon: 2,
    costMultiplier: 1.25,
  },
  {
    id: 'enterprise',
    label: 'Enterprise / Multisite · 25,000+ Records or Multi-Region',
    shortLabel: 'Enterprise Multisite',
    weeksAddon: 3,
    costMultiplier: 1.55,
  },
];

const INTEGRATION_MODULES = [
  {
    id: 'erp-crm',
    label: 'ERP / CRM Bidirectional Sync (NetSuite, Salesforce, HubSpot)',
    weeks: 1.5,
    cost: 4500,
  },
  {
    id: 'multilingual',
    label: 'Multilingual Architecture (Multisite / Polylang Pro / DeepL API)',
    weeks: 1,
    cost: 3200,
  },
  {
    id: 'paywall-sso',
    label: 'Enterprise SSO (Okta / SAML) or Metered Stripe Subscription Wall',
    weeks: 1.5,
    cost: 4800,
  },
  {
    id: 'search-algolia',
    label: 'Instant Faceted Search (ElasticPress / Algolia Custom Indexer)',
    weeks: 1,
    cost: 3500,
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
        ((activeTrack.baseMinUsd * activeScale.costMultiplier + addonCost) / 500)
      ) * 500;
    const maxUsd =
      Math.round(
        ((activeTrack.baseMaxUsd * activeScale.costMultiplier + addonCost * 1.15) / 500)
      ) * 500;

    const formattedMin = `$${minUsd.toLocaleString('en-US')}`;
    const formattedMax = `$${maxUsd.toLocaleString('en-US')}`;
    const estimatedWeeks =
      activeTrack.id === 'vip-retainer'
        ? 'Quarterly Renewing SLA'
        : `${totalWeeksMin}–${totalWeeksMax} Weeks`;
    const investmentRange =
      activeTrack.id === 'vip-retainer'
        ? `${formattedMin} – ${formattedMax} / quarter`
        : `${formattedMin} – ${formattedMax}`;

    const moduleNames = activeModules.map((m) => m.label.split(' (')[0]);

    const summaryText = `Track: ${activeTrack.label} | Scale: ${activeScale.label} | Integrations: ${
      moduleNames.length > 0 ? moduleNames.join(', ') : 'Core Architecture Only'
    } | Est. Timeline: ${estimatedWeeks} | Est. Investment: ${investmentRange}`;

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
      <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Step 1: Primary Engineering Track */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h3 className="text-base font-semibold text-zinc-900">
              01. Select Primary Engineering Track
            </h3>
            <span className="text-xs text-zinc-500 font-mono tabular-nums">
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
                  className={`text-left p-4 rounded-xl border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-zinc-50/70 text-zinc-900 border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold whitespace-nowrap truncate">
                      {track.shortLabel}
                    </span>
                    <span
                      className={`text-xs font-mono tabular-nums whitespace-nowrap shrink-0 ${
                        isSelected ? 'text-blue-300' : 'text-zinc-500'
                      }`}
                    >
                      From ${(track.baseMinUsd / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${
                      isSelected ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    {track.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Content & Database Scale */}
        <div className="pt-6 border-t border-zinc-200">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h3 className="text-base font-semibold text-zinc-900">
              02. Database & Content Scale
            </h3>
            <span className="text-xs text-zinc-500 font-mono tabular-nums">
              Step 2 of 3
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-1.5 bg-zinc-100 rounded-xl">
            {SCALE_TIERS.map((tier) => {
              const isSelected = tier.id === selectedScaleId;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedScaleId(tier.id)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-blue-700 ${
                    isSelected
                      ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {tier.shortLabel}
                </button>
              );
            })}
          </div>
          <p className="mt-2.5 text-xs text-zinc-500">
            Selected scope: {activeScale.label}
          </p>
        </div>

        {/* Step 3: Technical Integrations */}
        <div className="pt-6 border-t border-zinc-200">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h3 className="text-base font-semibold text-zinc-900">
              03. Systems & API Integrations
            </h3>
            <span className="text-xs text-zinc-500 font-mono tabular-nums">
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
                  className={`w-full flex items-center justify-between gap-4 p-3.5 rounded-xl border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                    isChecked
                      ? 'bg-blue-50/50 border-blue-700 text-zinc-900'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        isChecked
                          ? 'bg-blue-700 border-blue-700 text-white'
                          : 'border-zinc-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3" />}
                    </span>
                    <span className="text-xs sm:text-sm font-medium truncate">
                      {mod.label}
                    </span>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-zinc-500 whitespace-nowrap shrink-0">
                    +${mod.cost.toLocaleString('en-US')} · +{mod.weeks}w
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right 5 Columns: Live Architectural Scope Output */}
      <div className="lg:col-span-5 bg-zinc-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
        <div>
          <div className="text-xs font-mono text-zinc-400">
            ARCHITECTURAL ESTIMATE SUMMARY · TABULAR BREAKDOWN
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-white font-display">
            {activeTrack.label}
          </h3>
          <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
            {activeTrack.description}
          </p>

          {/* Key Numerical Outputs */}
          <div className="mt-6 grid grid-cols-2 gap-4 py-5 border-y border-zinc-800">
            <div>
              <div className="text-xs text-zinc-400">Estimated Investment</div>
              <div className="mt-1 text-lg sm:text-xl font-semibold font-mono tabular-nums text-white">
                {calculation.investmentRange}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-400">Delivery Horizon</div>
              <div className="mt-1 text-lg sm:text-xl font-semibold font-mono tabular-nums text-blue-400">
                {calculation.estimatedWeeks}
              </div>
            </div>
          </div>

          {/* Included Architectural Deliverables */}
          <div className="mt-6">
            <div className="text-xs font-mono text-zinc-400 mb-3">
              INCLUDED ENGINEERING DELIVERABLES
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-200">
              {activeTrack.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-blue-400 font-mono text-xs mt-0.5">
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
              Integrations:{' '}
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
            className="w-full py-3 px-5 bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <span>Load Scope into Consultation Brief</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="mt-2.5 text-center text-xs text-zinc-400">
            Fixed-scope milestone billing · Includes 60-day post-launch warranty
          </p>
        </div>
      </div>
    </div>
  );
};
