/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Code2,
  SlidersHorizontal,
  FileCode2,
  CheckCircle2,
} from 'lucide-react';
import {
  HERO_IMAGE_PATH,
  HERO_METRICS,
  CAPABILITIES,
  CODE_ARTIFACTS,
  STACK_COMPARISON,
  CASE_STUDIES,
  CaseStudy,
} from './data/portfolioData';
import { ResilientImage } from './components/ResilientImage';
import { ProjectEstimator, EstimatePayload } from './components/ProjectEstimator';
import { CaseStudyModal } from './components/CaseStudyModal';

type CaseFilter = 'all' | 'editorial' | 'woocommerce' | 'enterprise';
type StackViewMode = 'comparison' | 'bespoke' | 'legacy';

export default function App() {
  // Interactive state for Code Architecture Inspector
  const [activeArtifactId, setActiveArtifactId] = useState<string>('block-api');
  const [copiedArtifactId, setCopiedArtifactId] = useState<string | null>(null);
  const [stackViewMode, setStackViewMode] = useState<StackViewMode>('comparison');

  // Interactive state for Case Studies filter & modal
  const [caseFilter, setCaseFilter] = useState<CaseFilter>('all');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  // Interactive state for Consultation / Technical Audit Form
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [engagementTrack, setEngagementTrack] = useState(
    'Custom Gutenberg Block System & FSE Theme'
  );
  const [projectBrief, setProjectBrief] = useState('');
  const [attachedScopeSummary, setAttachedScopeSummary] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    workEmail?: string;
    siteUrl?: string;
    projectBrief?: string;
  }>({});
  const [submittedRecord, setSubmittedRecord] = useState<{
    referenceCode: string;
    fullName: string;
    workEmail: string;
    siteUrl: string;
    engagementTrack: string;
    projectBrief: string;
    scopeSummary: string | null;
    timestamp: string;
  } | null>(null);
  const [copiedBriefReceipt, setCopiedBriefReceipt] = useState(false);

  const activeArtifact =
    CODE_ARTIFACTS.find((a) => a.id === activeArtifactId) || CODE_ARTIFACTS[0];

  const filteredCaseStudies =
    caseFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((study) => study.sector === caseFilter);

  const handleCopyCode = (code: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedArtifactId(id);
    window.setTimeout(() => {
      setCopiedArtifactId((prev) => (prev === id ? null : prev));
    }, 2000);
  };

  const handleInspectCapabilityCode = (inspectorTabId: string) => {
    setActiveArtifactId(inspectorTabId);
    const el = document.getElementById('architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimateToForm = (payload: EstimatePayload) => {
    setEngagementTrack(payload.trackLabel);
    setAttachedScopeSummary(payload.summaryText);
    if (!projectBrief.trim()) {
      setProjectBrief(
        `We are planning a ${payload.trackLabel} (${payload.scaleLabel}). Target timeline: ${payload.estimatedWeeks}.`
      );
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectStudyForInquiry = (study: CaseStudy) => {
    setActiveModalStudy(null);
    setEngagementTrack(
      study.sector === 'woocommerce'
        ? 'High-Concurrency WooCommerce Architecture'
        : study.sector === 'editorial'
        ? 'Custom Gutenberg Block System & FSE Theme'
        : 'Legacy Page-Builder to Native Block Migration'
    );
    setAttachedScopeSummary(
      `Reference Case Study: ${study.title} (${study.headlineMetric})`
    );
    if (!projectBrief.trim()) {
      setProjectBrief(
        `We would like to discuss an architecture similar to the ${study.client} deployment (${study.stackSummary}).`
      );
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateAndSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      fullName?: string;
      workEmail?: string;
      siteUrl?: string;
      projectBrief?: string;
    } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!workEmail.trim() || !emailRegex.test(workEmail.trim())) {
      errors.workEmail = 'Please enter a valid work email address.';
    }

    if (siteUrl.trim()) {
      const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
      if (!urlRegex.test(siteUrl.trim())) {
        errors.siteUrl = 'Please enter a valid domain or URL (e.g. example.com).';
      }
    }

    if (!projectBrief.trim() || projectBrief.trim().length < 15) {
      errors.projectBrief =
        'Please share at least a brief sentence on your current WordPress stack or goals.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const refNum = `WP-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRecord({
        referenceCode: refNum,
        fullName: fullName.trim(),
        workEmail: workEmail.trim(),
        siteUrl: siteUrl.trim() || 'New greenfield build',
        engagementTrack,
        projectBrief: projectBrief.trim(),
        scopeSummary: attachedScopeSummary,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      });
    }
  };

  const handleCopyBriefReceipt = () => {
    if (!submittedRecord || !navigator.clipboard) return;
    const text = `Reference: ${submittedRecord.referenceCode}\nName: ${submittedRecord.fullName} (${submittedRecord.workEmail})\nTrack: ${submittedRecord.engagementTrack}\nSite: ${submittedRecord.siteUrl}\nBrief: ${submittedRecord.projectBrief}`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedBriefReceipt(true);
    window.setTimeout(() => setCopiedBriefReceipt(false), 2000);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-xs border-b border-zinc-200">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-zinc-900 font-display whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            Klara Lindqvist
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
          >
            <a
              href="#capabilities"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Capabilities
            </a>
            <a
              href="#architecture"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Architecture
            </a>
            <a
              href="#case-studies"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Case Studies
            </a>
            <a
              href="#estimator"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Estimator
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="py-2 px-4 text-xs sm:text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Schedule Technical Audit
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section: Split-Screen with Full-Width 4-Column Telemetry Strip Below */}
        <section className="pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-zinc-200">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* 2-Column Split with items-stretch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Typographic Hierarchy & Primary CTA */}
              <div className="lg:col-span-7 flex flex-col justify-between py-2">
                <div>
                  {/* Unboxed Metadata Kicker (Regional & Practice Context) */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-zinc-600">
                    <span>Principal WordPress Architect</span>
                    <span aria-hidden="true">·</span>
                    <span>Stockholm &amp; Zurich</span>
                    <span aria-hidden="true">·</span>
                    <span>12 Years Enterprise PHP &amp; Gutenberg Engineering</span>
                  </div>

                  <h1
                    className="mt-5 font-bold tracking-tight text-zinc-900 font-display text-balance leading-[1.08]"
                    style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
                  >
                    Enterprise WordPress systems engineered without page-builder bloat.
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-[65ch]">
                    I architect bespoke Gutenberg block libraries, high-concurrency
                    WooCommerce storefronts, and sub-second editorial platforms for
                    media publishers and B2B organizations outgrowing fragile off-the-shelf
                    themes.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="py-3 px-6 text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    <span>Schedule Technical Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('case-studies')}
                    className="py-3 px-5 text-sm font-medium text-zinc-800 hover:text-zinc-950 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Explore Verified Case Studies</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Matching Height Visual Container */}
              <div className="lg:col-span-5 flex">
                <div className="relative w-full min-h-[320px] lg:min-h-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-900">
                  <ResilientImage
                    src={HERO_IMAGE_PATH}
                    alt="Minimalist architectural engineering studio with ultra-wide display showing block design systems"
                    fallbackTitle="Klara Lindqvist — WordPress Architecture Studio"
                    fallbackSubtitle="Bespoke Gutenberg Block API v3 & High-Concurrency WooCommerce"
                    className="w-full h-full lg:h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                  {/* Measured Contrast Scrim for Media Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <div className="text-xs font-mono text-zinc-300">
                      <span>WordPress Core 6.7+</span>
                      <span aria-hidden="true"> · </span>
                      <span>PHP 8.3 Strict Types</span>
                      <span aria-hidden="true"> · </span>
                      <span>VIP Coding Standards</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-white">
                      Direct principal engineering—from database schema design to React block authoring.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof Row Below the Hero Split */}
            <div className="mt-10 pt-8 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HERO_METRICS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 font-mono tabular-nums">
                      {item.value}
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-zinc-900">
                      {item.label}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Core Capabilities (Numbered Editorial Architecture) */}
        <section id="capabilities" className="py-16 sm:py-24 border-b border-zinc-200">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-zinc-500">
                Engineering Capabilities · Specialized WordPress Practice
              </div>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 font-display text-balance">
                Built for editorial teams that publish daily and commerce brands that cannot afford downtime.
              </h2>
              <p className="mt-4 text-base text-zinc-600 leading-relaxed">
                Every engagement replaces fragile plugin stacks with clean, auditable
                code governed by automated testing and strict design tokens.
              </p>
            </div>

            {/* Asymmetric 2x2 Bento Capability Grid */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {CAPABILITIES.map((cap, i) => {
                const colSpanClass =
                  i === 0 || i === 3 ? 'lg:col-span-7' : 'lg:col-span-5';
                return (
                  <div
                    key={cap.index}
                    className={`${colSpanClass} bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
                        <span className="font-mono font-medium text-blue-700">
                          {cap.index}
                        </span>
                        <span>{cap.category}</span>
                      </div>

                      <h3 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 font-display text-balance">
                        {cap.title}
                      </h3>

                      <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                        {cap.summary}
                      </p>

                      {/* Deliverables List */}
                      <div className="mt-6 pt-5 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cap.deliverables.map((deliv, dIdx) => (
                          <div
                            key={dIdx}
                            className="text-xs text-zinc-700 flex items-start gap-2"
                          >
                            <span className="font-mono text-zinc-400">·</span>
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs font-mono text-zinc-700">
                        Outcome: {cap.outcomeMetric}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleInspectCapabilityCode(cap.inspectorTabId)}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Inspect Code Pattern</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Interactive WordPress Code & Stack Architecture Inspector */}
        <section
          id="architecture"
          className="py-16 sm:py-24 bg-white border-b border-zinc-200"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-xs font-mono text-zinc-500">
                  Production Code Standards · Zero-Bloat Verification
                </div>
                <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 font-display text-balance">
                  Inspect how bespoke Gutenberg &amp; WooCommerce architecture works under the hood.
                </h2>
              </div>

              {/* Interactive Segmented Control for Code Artifacts */}
              <div
                role="tablist"
                aria-label="WordPress Architecture Code Artifacts"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-100 rounded-xl self-start"
              >
                {CODE_ARTIFACTS.map((artifact) => {
                  const isActive = artifact.id === activeArtifactId;
                  return (
                    <button
                      key={artifact.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveArtifactId(artifact.id)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700 ${
                        isActive
                          ? 'bg-zinc-900 text-white shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {artifact.tabLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code Inspector Panel */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 5 Columns: Architectural Rationale & Telemetry */}
              <div className="lg:col-span-5 bg-[#FAFAFA] border border-zinc-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-blue-700">
                    {activeArtifact.architectureLayer}
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 font-display">
                    {activeArtifact.tabLabel}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                    {activeArtifact.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-zinc-200 space-y-4">
                    <div className="text-xs font-mono text-zinc-500">
                      PRODUCTION TELEMETRY BENCHMARK
                    </div>
                    {activeArtifact.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-zinc-200 rounded-xl p-4"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-xs text-zinc-500">{m.label}</span>
                          <span className="text-sm font-semibold font-mono tabular-nums text-zinc-900">
                            {m.value}
                          </span>
                        </div>
                        <div className="mt-1 text-xs font-mono text-blue-700">
                          {m.comparison}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200 text-xs text-zinc-500">
                  <span>All code ships via GitHub Actions CI</span>
                  <span aria-hidden="true"> · </span>
                  <span>PHPCS WordPress-VIP-Go verified</span>
                </div>
              </div>

              {/* Right 7 Columns: Authentic Production Code Viewer */}
              <div className="lg:col-span-7 bg-zinc-950 text-zinc-100 rounded-2xl border border-zinc-800 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileCode2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-xs font-mono text-zinc-200 truncate">
                      {activeArtifact.fileName}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
                      · {activeArtifact.language}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyCode(activeArtifact.code, activeArtifact.id)
                    }
                    className="py-1.5 px-3 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedArtifactId === activeArtifact.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Snippet</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Snippet</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-5 sm:p-6 text-xs sm:text-[13px] font-mono leading-relaxed text-zinc-200 overflow-x-auto flex-1">
                  <code>{activeArtifact.code}</code>
                </pre>
              </div>
            </div>

            {/* Interactive Legacy Page-Builder vs. Bespoke Block Architecture Comparator */}
            <div className="mt-12 bg-[#FAFAFA] border border-zinc-200 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
                <div>
                  <div className="text-xs font-mono text-zinc-500">
                    Architectural Benchmark · Real-World Page Audit
                  </div>
                  <h3 className="mt-1 text-lg sm:text-xl font-bold text-zinc-900 font-display">
                    Why replacing page builders transforms Core Web Vitals &amp; conversion rates
                  </h3>
                </div>
                <div className="flex items-center gap-1 p-1 bg-zinc-200/75 rounded-lg self-start">
                  <button
                    type="button"
                    onClick={() => setStackViewMode('comparison')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      stackViewMode === 'comparison'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    type="button"
                    onClick={() => setStackViewMode('bespoke')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      stackViewMode === 'bespoke'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Bespoke Native Blocks
                  </button>
                  <button
                    type="button"
                    onClick={() => setStackViewMode('legacy')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      stackViewMode === 'legacy'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Legacy Page Builder
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 text-xs font-mono text-zinc-500">
                      <th className="py-3 pr-4 font-medium">Architecture Dimension</th>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <th className="py-3 px-4 font-medium">
                          {STACK_COMPARISON.legacy.name}
                        </th>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <th className="py-3 pl-4 font-medium text-blue-700">
                          {STACK_COMPARISON.bespoke.name}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-xs sm:text-sm font-mono tabular-nums">
                    <tr>
                      <td className="py-3.5 pr-4 font-sans font-medium text-zinc-900">
                        HTML DOM Node Count (Homepage)
                      </td>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <td className="py-3.5 px-4 text-zinc-500">
                          {STACK_COMPARISON.legacy.domNodes}
                        </td>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <td className="py-3.5 pl-4 font-semibold text-zinc-900">
                          {STACK_COMPARISON.bespoke.domNodes}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-sans font-medium text-zinc-900">
                        CSS &amp; JS Frontend Payload (Gzipped)
                      </td>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <td className="py-3.5 px-4 text-zinc-500">
                          {STACK_COMPARISON.legacy.cssPayload} CSS ·{' '}
                          {STACK_COMPARISON.legacy.jsPayload} JS
                        </td>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <td className="py-3.5 pl-4 font-semibold text-zinc-900">
                          {STACK_COMPARISON.bespoke.cssPayload} CSS ·{' '}
                          {STACK_COMPARISON.bespoke.jsPayload} JS
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-sans font-medium text-zinc-900">
                        Median Time to First Byte (TTFB)
                      </td>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <td className="py-3.5 px-4 text-zinc-500">
                          {STACK_COMPARISON.legacy.ttfb}
                        </td>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <td className="py-3.5 pl-4 font-semibold text-blue-700">
                          {STACK_COMPARISON.bespoke.ttfb}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-sans font-medium text-zinc-900">
                        Mobile Largest Contentful Paint (LCP)
                      </td>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <td className="py-3.5 px-4 text-zinc-500">
                          {STACK_COMPARISON.legacy.lcp}
                        </td>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <td className="py-3.5 pl-4 font-semibold text-blue-700">
                          {STACK_COMPARISON.bespoke.lcp}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-sans font-medium text-zinc-900">
                        MySQL Queries per Uncached Request
                      </td>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <td className="py-3.5 px-4 text-zinc-500">
                          {STACK_COMPARISON.legacy.dbQueriesPerPage}
                        </td>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <td className="py-3.5 pl-4 font-semibold text-zinc-900">
                          {STACK_COMPARISON.bespoke.dbQueriesPerPage}
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Proof of Impact — Case Studies & Attributable Testimonials */}
        <section id="case-studies" className="py-16 sm:py-24 border-b border-zinc-200">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-xs font-mono text-zinc-500">
                  Selected Production Work · Verified Telemetry &amp; Outcomes
                </div>
                <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 font-display text-balance">
                  Case studies with measurable revenue and latency outcomes.
                </h2>
              </div>

              {/* Interactive Filter Controls */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-200/70 rounded-xl self-start">
                {(
                  [
                    { id: 'all', label: 'All Projects' },
                    { id: 'editorial', label: 'Editorial & Publishing' },
                    { id: 'woocommerce', label: 'Luxury WooCommerce' },
                    { id: 'enterprise', label: 'Enterprise Multisite' },
                  ] as { id: CaseFilter; label: string }[]
                ).map((tab) => {
                  const isActive = caseFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCaseFilter(tab.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700 ${
                        isActive
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Bento Case Study Grid */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {filteredCaseStudies.map((study) => {
                const spanClass =
                  caseFilter === 'all'
                    ? study.featuredSpan
                      ? 'lg:col-span-12'
                      : 'lg:col-span-6'
                    : 'lg:col-span-12';

                return (
                  <article
                    key={study.id}
                    onClick={() => setActiveModalStudy(study)}
                    className={`${spanClass} group bg-white border border-zinc-200 hover:border-zinc-400 rounded-2xl overflow-hidden transition-colors cursor-pointer flex flex-col ${
                      study.featuredSpan || caseFilter !== 'all'
                        ? 'lg:grid lg:grid-cols-12'
                        : ''
                    }`}
                  >
                    {/* Visual Container */}
                    <div
                      className={`${
                        study.featuredSpan || caseFilter !== 'all'
                          ? 'lg:col-span-7 aspect-16/9 lg:aspect-auto lg:h-full'
                          : 'aspect-4/3 w-full'
                      } overflow-hidden bg-zinc-900 border-b lg:border-b-0 border-zinc-200`}
                    >
                      <ResilientImage
                        src={study.imageUrl}
                        alt={study.imageAlt}
                        fallbackTitle={study.title}
                        fallbackSubtitle={study.stackSummary}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.015]"
                      />
                    </div>

                    {/* Narrative & Telemetry Container */}
                    <div
                      className={`${
                        study.featuredSpan || caseFilter !== 'all'
                          ? 'lg:col-span-5'
                          : ''
                      } p-6 sm:p-8 flex flex-col justify-between flex-1`}
                    >
                      <div>
                        {/* Unboxed Metadata with Typographic Separators */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
                          <span className="font-medium text-zinc-800">
                            {study.client}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{study.sectorLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{study.year}</span>
                        </div>

                        <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 font-display group-hover:text-blue-700 transition-colors text-balance">
                          {study.title}
                        </h3>

                        <div className="mt-3 py-2.5 px-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                          <div className="text-sm font-bold font-mono tabular-nums text-blue-700">
                            {study.headlineMetric}
                          </div>
                          <div className="text-xs text-zinc-600 mt-0.5">
                            {study.headlineContext}
                          </div>
                        </div>

                        <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
                          {study.summary}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between gap-4">
                        <span className="text-xs text-zinc-500 truncate">
                          {study.stackSummary}
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 group-hover:text-blue-700 inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                          <span>Read Architecture Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Attributable Client Testimonials Placed Directly Adjacent to Case Studies */}
            <div className="mt-16 pt-12 border-t border-zinc-200">
              <div className="text-xs font-mono text-zinc-500 mb-6">
                ATTRIBUTABLE CLIENT VERIFICATION · ENGINEERING &amp; EXECUTIVE LEADERSHIP
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {CASE_STUDIES.map((study) => (
                  <div
                    key={study.id}
                    className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono text-blue-700 mb-3">
                        {study.testimonial.outcomeHighlight}
                      </div>
                      <blockquote className="text-sm text-zinc-700 leading-relaxed">
                        “{study.testimonial.quote}”
                      </blockquote>
                    </div>
                    <div className="mt-6 pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                      <div className="font-semibold text-zinc-900">
                        {study.testimonial.author}
                      </div>
                      <div className="mt-0.5">
                        <span>{study.testimonial.role}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{study.testimonial.organization}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive Scope & Performance Estimator */}
        <section
          id="estimator"
          className="py-16 sm:py-24 bg-[#FAFAFA] border-b border-zinc-200"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl mb-10">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-700" />
                <span>Interactive Architecture &amp; Investment Calculator</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 font-display text-balance">
                Estimate your WordPress architecture timeline and deliverable scope.
              </h2>
              <p className="mt-3 text-base text-zinc-600 leading-relaxed">
                Select your primary engineering track, content volume, and third-party
                integrations to generate a transparent project milestone breakdown.
              </p>
            </div>

            <ProjectEstimator onApplyEstimateToForm={handleApplyEstimateToForm} />
          </div>
        </section>

        {/* Section 5: Interactive Lead Capture / Technical Audit Consultation */}
        <section id="contact" className="py-16 sm:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left 5 Columns: Direct Consultation Details & Process */}
              <div className="lg:col-span-5 space-y-6">
                <div className="text-xs font-mono text-blue-700">
                  Q4 2026 / Q1 2027 Availability · 1 Principal Slot Open
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 font-display text-balance">
                  Request a technical architecture audit or project proposal.
                </h2>
                <p className="text-base text-zinc-600 leading-relaxed">
                  Every inquiry is reviewed directly by Klara Lindqvist. Within 24
                  business hours, you will receive an initial Core Web Vitals &amp;
                  database bottleneck assessment alongside a calendar link for a
                  45-minute technical discovery call.
                </p>

                <div className="pt-4 border-t border-zinc-200 space-y-4">
                  <div className="text-xs font-mono text-zinc-500">
                    WHAT HAPPENS AFTER YOU SUBMIT
                  </div>
                  <div className="space-y-3 text-sm text-zinc-700">
                    <div>
                      <span className="font-mono text-xs font-semibold text-blue-700">
                        01.
                      </span>{' '}
                      <span className="font-semibold text-zinc-900">
                        Preliminary Stack &amp; TTFB Profiling
                      </span>{' '}
                      — Review of your current DOM payload, caching headers, and REST/GraphQL surface.
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-blue-700">
                        02.
                      </span>{' '}
                      <span className="font-semibold text-zinc-900">
                        45-Minute Principal Discovery Call
                      </span>{' '}
                      — Direct architectural discussion with zero junior account managers.
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-blue-700">
                        03.
                      </span>{' '}
                      <span className="font-semibold text-zinc-900">
                        Fixed-Milestone Engineering Proposal
                      </span>{' '}
                      — Clear weekly sprint deliverables, CI/CD workflow, and performance SLA.
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 text-xs text-zinc-500 space-y-1">
                  <div>
                    Direct Email:{' '}
                    <span className="font-mono text-zinc-800">
                      klara@lindqvist-wp.arch
                    </span>
                  </div>
                  <div>
                    Practice Locations: Stockholm (CET) · Zurich (CET) · Remote Worldwide
                  </div>
                </div>
              </div>

              {/* Right 7 Columns: Validated Minimalist Form or Confirmation Receipt */}
              <div className="lg:col-span-7">
                {submittedRecord ? (
                  <div className="bg-[#FAFAFA] border border-zinc-300 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-700 shrink-0" />
                        <div>
                          <div className="text-xs font-mono text-blue-700">
                            AUDIT REQUEST CONFIRMED · REF #{submittedRecord.referenceCode}
                          </div>
                          <h3 className="text-xl font-bold text-zinc-900 font-display">
                            Thank you, {submittedRecord.fullName}.
                          </h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-500">
                        {submittedRecord.timestamp}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-600 leading-relaxed">
                      Your architectural brief has been logged for review. A preliminary
                      Core Web Vitals and stack assessment for{' '}
                      <span className="font-mono font-medium text-zinc-900">
                        {submittedRecord.siteUrl}
                      </span>{' '}
                      will be sent to{' '}
                      <span className="font-mono font-medium text-zinc-900">
                        {submittedRecord.workEmail}
                      </span>{' '}
                      within one business day.
                    </p>

                    <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-2 text-xs">
                      <div className="text-zinc-500">
                        <span className="font-semibold text-zinc-900">
                          Selected Track:
                        </span>{' '}
                        {submittedRecord.engagementTrack}
                      </div>
                      {submittedRecord.scopeSummary && (
                        <div className="text-zinc-500">
                          <span className="font-semibold text-zinc-900">
                            Configured Scope:
                          </span>{' '}
                          {submittedRecord.scopeSummary}
                        </div>
                      )}
                      <div className="text-zinc-500 pt-1 border-t border-zinc-100">
                        <span className="font-semibold text-zinc-900">
                          Submitted Notes:
                        </span>{' '}
                        {submittedRecord.projectBrief}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCopyBriefReceipt}
                        className="py-2 px-4 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-white border border-zinc-300 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {copiedBriefReceipt ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-blue-700" />
                            <span>Receipt Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Brief Reference</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmittedRecord(null)}
                        className="py-2 px-4 text-xs font-medium text-blue-700 hover:text-blue-800 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={validateAndSubmitForm}
                    noValidate
                    className="bg-[#FAFAFA] border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-5"
                  >
                    {attachedScopeSummary && (
                      <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start justify-between gap-3">
                        <div className="text-xs text-zinc-800">
                          <span className="font-semibold text-blue-800">
                            Attached Scope Configuration:
                          </span>{' '}
                          {attachedScopeSummary}
                        </div>
                        <button
                          type="button"
                          onClick={() => setAttachedScopeSummary(null)}
                          className="text-xs text-zinc-500 hover:text-zinc-900 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="full-name"
                          className="block text-xs font-semibold text-zinc-800 mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="full-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (formErrors.fullName) {
                              setFormErrors({ ...formErrors, fullName: undefined });
                            }
                          }}
                          placeholder="e.g. Henrik Lindström"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-xl text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700"
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-xs text-red-600">
                            {formErrors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="work-email"
                          className="block text-xs font-semibold text-zinc-800 mb-1.5"
                        >
                          Work Email *
                        </label>
                        <input
                          id="work-email"
                          type="email"
                          value={workEmail}
                          onChange={(e) => {
                            setWorkEmail(e.target.value);
                            if (formErrors.workEmail) {
                              setFormErrors({ ...formErrors, workEmail: undefined });
                            }
                          }}
                          placeholder="henrik@organization.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-xl text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700"
                        />
                        {formErrors.workEmail && (
                          <p className="mt-1 text-xs text-red-600">
                            {formErrors.workEmail}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="site-url"
                          className="block text-xs font-semibold text-zinc-800 mb-1.5"
                        >
                          Current WordPress Domain (Optional)
                        </label>
                        <input
                          id="site-url"
                          type="text"
                          value={siteUrl}
                          onChange={(e) => {
                            setSiteUrl(e.target.value);
                            if (formErrors.siteUrl) {
                              setFormErrors({ ...formErrors, siteUrl: undefined });
                            }
                          }}
                          placeholder="https://example.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-xl text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700"
                        />
                        {formErrors.siteUrl && (
                          <p className="mt-1 text-xs text-red-600">
                            {formErrors.siteUrl}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="engagement-track"
                          className="block text-xs font-semibold text-zinc-800 mb-1.5"
                        >
                          Primary Engagement Track
                        </label>
                        <select
                          id="engagement-track"
                          value={engagementTrack}
                          onChange={(e) => setEngagementTrack(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-xl text-zinc-900 focus:outline-none focus:border-blue-700"
                        >
                          <option value="Custom Gutenberg Block System & FSE Theme">
                            Custom Gutenberg Block System &amp; FSE Theme
                          </option>
                          <option value="High-Concurrency WooCommerce Architecture">
                            High-Concurrency WooCommerce Architecture
                          </option>
                          <option value="Legacy Page-Builder to Native Block Migration">
                            Legacy Page-Builder to Native Block Migration
                          </option>
                          <option value="Principal Advisory & Performance Retainer">
                            Principal Advisory &amp; Performance Retainer
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="project-brief"
                        className="block text-xs font-semibold text-zinc-800 mb-1.5"
                      >
                        Architectural Context &amp; Objectives *
                      </label>
                      <textarea
                        id="project-brief"
                        rows={4}
                        value={projectBrief}
                        onChange={(e) => {
                          setProjectBrief(e.target.value);
                          if (formErrors.projectBrief) {
                            setFormErrors({ ...formErrors, projectBrief: undefined });
                          }
                        }}
                        placeholder="Describe your current WordPress bottleneck, traffic scale, integration requirements, or target launch window..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-xl text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700"
                      />
                      {formErrors.projectBrief && (
                        <p className="mt-1 text-xs text-red-600">
                          {formErrors.projectBrief}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-xs text-zinc-500">
                        Mutual NDA available prior to repository or staging access.
                      </span>
                      <button
                        type="submit"
                        className="py-3 px-6 text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                      >
                        <span>Request Technical Audit</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#FAFAFA] border-t border-zinc-200 py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-sm font-bold tracking-tight text-zinc-900 font-display">
              Klara Lindqvist
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Principal WordPress &amp; WooCommerce Architect · Stockholm &amp; Zurich ·
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-600">
            <a
              href="#capabilities"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap"
            >
              Capabilities
            </a>
            <a
              href="#architecture"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap"
            >
              Architecture
            </a>
            <a
              href="#case-studies"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap"
            >
              Case Studies
            </a>
            <a
              href="#estimator"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap"
            >
              Scope Estimator
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap"
            >
              Technical Audit
            </a>
          </div>
        </div>
      </footer>

      {/* Case Study Lightbox / Modal */}
      <CaseStudyModal
        study={activeModalStudy}
        onClose={() => setActiveModalStudy(null)}
        onSelectForInquiry={handleSelectStudyForInquiry}
      />
    </div>
  );
}
