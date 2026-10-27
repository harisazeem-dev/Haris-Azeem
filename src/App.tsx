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
  Terminal,
} from 'lucide-react';
import {
  HERO_ARCHITECTURAL_MODES,
  HERO_METRICS,
  CAPABILITIES,
  CODE_ARTIFACTS,
  STACK_COMPARISON,
  CASE_STUDIES,
  CaseStudy,
  HeroArchitectureMode,
} from './data/portfolioData';
import { ResilientImage } from './components/ResilientImage';
import { ProjectEstimator, EstimatePayload } from './components/ProjectEstimator';
import { CaseStudyModal } from './components/CaseStudyModal';
import { BrandLogoMark, RAW_HARIS_LOGO_SVG } from './components/BrandLogo';

type CaseFilter = 'all' | 'editorial' | 'woocommerce' | 'enterprise';
type StackViewMode = 'comparison' | 'bespoke' | 'legacy';

export default function App() {
  // Interactive Hero Mode state
  const [heroModeId, setHeroModeId] =
    useState<HeroArchitectureMode['id']>('gutenberg');

  // Interactive state for Code Architecture Studio
  const [activeArtifactId, setActiveArtifactId] = useState<string>('block-api');
  const [copiedArtifactId, setCopiedArtifactId] = useState<string | null>(null);
  const [stackViewMode, setStackViewMode] = useState<StackViewMode>('comparison');

  // Interactive state for Custom Logo SVG Copy
  const [copiedLogoSvg, setCopiedLogoSvg] = useState(false);

  // Interactive state for Case Studies filter & modal
  const [caseFilter, setCaseFilter] = useState<CaseFilter>('all');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  // Interactive state for Consultation / Project Inquiry Form
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [engagementTrack, setEngagementTrack] = useState(
    'Custom Gutenberg Block Theme & FSE System'
  );
  const [projectBrief, setProjectBrief] = useState('');
  const [attachedScopeSummary, setAttachedScopeSummary] = useState<string | null>(
    null
  );
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

  const activeHeroMode =
    HERO_ARCHITECTURAL_MODES.find((m) => m.id === heroModeId) ||
    HERO_ARCHITECTURAL_MODES[0];

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

  const handleCopyLogoSvg = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(RAW_HARIS_LOGO_SVG).catch(() => {});
    }
    setCopiedLogoSvg(true);
    window.setTimeout(() => setCopiedLogoSvg(false), 2000);
  };

  const handleInspectCapabilityCode = (inspectorTabId: string) => {
    setActiveArtifactId(inspectorTabId);
    const el = document.getElementById('code-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimateToForm = (payload: EstimatePayload) => {
    setEngagementTrack(payload.trackLabel);
    setAttachedScopeSummary(payload.summaryText);
    if (!projectBrief.trim()) {
      setProjectBrief(
        `Hi Haris, we are looking to build a ${payload.trackLabel} (${payload.scaleLabel}). Target delivery window: ${payload.estimatedWeeks}.`
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
        ? 'High-Conversion WooCommerce Storefront'
        : study.sector === 'editorial'
        ? 'Custom Gutenberg Block Theme & FSE System'
        : 'Elementor / Divi to Native Block Migration'
    );
    setAttachedScopeSummary(
      `Reference Case Study: ${study.title} (${study.headlineMetric})`
    );
    if (!projectBrief.trim()) {
      setProjectBrief(
        `Hi Haris, we would like to discuss a WordPress architecture similar to your ${study.client} project (${study.stackSummary}).`
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
      errors.fullName = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!workEmail.trim() || !emailRegex.test(workEmail.trim())) {
      errors.workEmail = 'Please enter a valid email address.';
    }

    if (siteUrl.trim()) {
      const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
      if (!urlRegex.test(siteUrl.trim())) {
        errors.siteUrl = 'Please enter a valid domain or URL (e.g. yoursite.com).';
      }
    }

    if (!projectBrief.trim() || projectBrief.trim().length < 12) {
      errors.projectBrief =
        'Please share a few details about your WordPress project or goals.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const refNum = `HA-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRecord({
        referenceCode: refNum,
        fullName: fullName.trim(),
        workEmail: workEmail.trim(),
        siteUrl: siteUrl.trim() || 'New custom WordPress build',
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
    const text = `Reference: ${submittedRecord.referenceCode}\nDeveloper: Haris Azeem (harisazeemqureshi@gmail.com)\nClient: ${submittedRecord.fullName} (${submittedRecord.workEmail})\nTrack: ${submittedRecord.engagementTrack}\nSite: ${submittedRecord.siteUrl}\nBrief: ${submittedRecord.projectBrief}`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedBriefReceipt(true);
    window.setTimeout(() => setCopiedBriefReceipt(false), 2000);
  };

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col bg-[#09090B] text-zinc-100"
    >
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single Brand Wordmark Link with Custom HA Geometric SVG Logo */}
          <a
            href="#top"
            className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-500"
          >
            <BrandLogoMark size={34} />
            <span>Haris Azeem</span>
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
          >
            <a
              href="#portfolio"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Portfolio
            </a>
            <a
              href="#services"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#code-studio"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Code Studio
            </a>
            <a
              href="#estimator"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Estimator
            </a>
            <a
              href="#contact"
              className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="py-2 px-4 text-xs sm:text-sm font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              Start a Project
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Phase 2 Redesigned Hero: Interactive WordPress Architecture Explorer */}
        <section className="pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-zinc-800/80">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* 2-Column Split with items-stretch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left 6 Columns: Personal Identity, Expressive Headline & Interactive Architecture Switcher */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Unboxed Metadata Kicker */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-amber-400">
                    <span>HARIS AZEEM</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-300">Senior WordPress Developer</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-400">Gutenberg &amp; WooCommerce Architect</span>
                  </div>

                  <h1
                    className="mt-5 font-bold tracking-tight text-white font-display text-balance leading-[1.06]"
                    style={{ fontSize: 'clamp(2.35rem, 4.2vw, 3.85rem)' }}
                  >
                    Engineering{' '}
                    <span className="font-editorial italic font-normal text-amber-400">
                      sub-second
                    </span>{' '}
                    WordPress &amp; WooCommerce platforms.
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-[62ch]">
                    I’m <strong className="text-white font-semibold">Haris Azeem</strong>. I
                    replace sluggish page-builder sites with hand-crafted Gutenberg
                    block themes, high-conversion WooCommerce stores, and custom PHP
                    8.3 plugins engineered for 99+ Core Web Vitals.
                  </p>

                  {/* Interactive Architecture Mode Selector inside Hero */}
                  <div className="mt-7 p-4 rounded-2xl bg-[#121216] border border-zinc-800">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono text-zinc-400">
                        INTERACTIVE SPECIALTY PREVIEW · SELECT STACK
                      </span>
                      <span className="text-xs font-mono text-amber-400 tabular-nums">
                        LCP {activeHeroMode.lcp}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {HERO_ARCHITECTURAL_MODES.map((mode) => {
                        const isSelected = mode.id === heroModeId;
                        return (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setHeroModeId(mode.id)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-amber-500 ${
                              isSelected
                                ? 'bg-amber-500 text-zinc-950'
                                : 'bg-[#09090B] text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            {mode.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                      {activeHeroMode.tagline}
                    </p>
                  </div>
                </div>

                {/* Hero Action Row */}
                <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="py-3.5 px-6 text-sm font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  >
                    <span>Book a Discovery Call with Haris</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('portfolio')}
                    className="py-3.5 px-5 text-sm font-medium text-zinc-200 hover:text-white bg-[#121216] hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Explore Selected Work</span>
                  </button>
                </div>
              </div>

              {/* Right 6 Columns: Dynamic Visual & Telemetry Showcase Card */}
              <div className="lg:col-span-6 flex">
                <div className="w-full bg-[#121216] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                  {/* Top Bar of Showcase Window */}
                  <div className="px-5 py-3.5 bg-[#09090B] border-b border-zinc-800 flex items-center justify-between gap-4">
                    <div className="text-xs font-mono text-zinc-300 truncate">
                      {activeHeroMode.stackSummary}
                    </div>
                    <span className="text-xs font-mono text-amber-400 whitespace-nowrap shrink-0 tabular-nums">
                      Lighthouse {activeHeroMode.lighthouseScore}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-16/9 w-full overflow-hidden bg-[#09090B]">
                    <ResilientImage
                      src={activeHeroMode.imageUrl}
                      alt={activeHeroMode.imageCaption}
                      fallbackTitle={activeHeroMode.label}
                      fallbackSubtitle={activeHeroMode.stackSummary}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-black/30 to-transparent flex flex-col justify-end p-5">
                      <div className="text-xs font-mono text-amber-400">
                        {activeHeroMode.imageCaption}
                      </div>
                    </div>
                  </div>

                  {/* Live Telemetry & Architecture Highlights */}
                  <div className="p-5 sm:p-6 space-y-5">
                    <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#09090B] border border-zinc-800/90 font-mono tabular-nums">
                      <div>
                        <div className="text-[11px] text-zinc-400">Global TTFB</div>
                        <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                          {activeHeroMode.ttfb}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-zinc-400">Mobile LCP</div>
                        <div className="text-sm sm:text-base font-bold text-amber-400 mt-0.5">
                          {activeHeroMode.lcp}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-zinc-400">Frontend Assets</div>
                        <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                          {activeHeroMode.payloadSize}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                      {activeHeroMode.highlights.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="font-mono text-xs text-amber-400 mt-0.5 shrink-0">
                            0{idx + 1}.
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof Row Below the Hero Split */}
            <div className="mt-12 pt-10 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HERO_METRICS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#121216] border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-400 font-mono tabular-nums">
                      {item.value}
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-white">
                      {item.label}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Selected WordPress & WooCommerce Builds (Moved Up for Immediate Proof) */}
        <section
          id="portfolio"
          className="py-16 sm:py-24 border-b border-zinc-800/80"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-xs font-mono text-amber-400">
                  Selected Production Work · Engineered by Haris Azeem
                </div>
                <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
                  Featured WordPress &amp; WooCommerce case studies.
                </h2>
              </div>

              {/* Interactive Filter Controls */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#121216] border border-zinc-800 rounded-xl self-start">
                {(
                  [
                    { id: 'all', label: 'All Builds' },
                    { id: 'editorial', label: 'Custom Gutenberg' },
                    { id: 'woocommerce', label: 'WooCommerce Stores' },
                    { id: 'enterprise', label: 'Multisite & Plugins' },
                  ] as { id: CaseFilter; label: string }[]
                ).map((tab) => {
                  const isActive = caseFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCaseFilter(tab.id)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-500 ${
                        isActive
                          ? 'bg-amber-500 text-zinc-950'
                          : 'text-zinc-400 hover:text-white'
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
                    className={`${spanClass} group bg-[#121216] border border-zinc-800 hover:border-amber-500/60 rounded-2xl overflow-hidden transition-colors cursor-pointer flex flex-col ${
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
                      } overflow-hidden bg-[#09090B] border-b lg:border-b-0 border-zinc-800`}
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
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400">
                          <span className="font-medium text-zinc-200">
                            {study.client}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{study.sectorLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{study.year}</span>
                        </div>

                        <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-white font-display group-hover:text-amber-400 transition-colors text-balance">
                          {study.title}
                        </h3>

                        <div className="mt-4 py-3 px-4 bg-[#09090B] border border-zinc-800 rounded-xl">
                          <div className="text-sm font-bold font-mono tabular-nums text-amber-400">
                            {study.headlineMetric}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {study.headlineContext}
                          </div>
                        </div>

                        <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                          {study.summary}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
                        <span className="text-xs text-zinc-400 truncate">
                          {study.stackSummary}
                        </span>
                        <span className="text-xs font-semibold text-amber-400 group-hover:text-amber-300 inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                          <span>Inspect Full Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Attributable Client Testimonials Directly Adjacent to Case Studies */}
            <div className="mt-16 pt-12 border-t border-zinc-800/80">
              <div className="text-xs font-mono text-zinc-400 mb-6">
                CLIENT FEEDBACK · VERIFIED OUTCOMES WITH HARIS AZEEM
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {CASE_STUDIES.map((study) => (
                  <div
                    key={study.id}
                    className="bg-[#121216] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono text-amber-400 mb-3">
                        {study.testimonial.outcomeHighlight}
                      </div>
                      <blockquote className="text-sm text-zinc-200 leading-relaxed">
                        “{study.testimonial.quote}”
                      </blockquote>
                    </div>
                    <div className="mt-6 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
                      <div className="font-semibold text-white">
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

        {/* Section 2: Haris Azeem's 4-Pillar WordPress Services & Custom Logo Identity */}
        <section
          id="services"
          className="py-16 sm:py-24 bg-[#0D0D11] border-b border-zinc-800/80"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-amber-400">
                Specialized WordPress Engineering · Services &amp; Deliverables
              </div>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
                End-to-end WordPress development tailored for speed and scale.
              </h2>
              <p className="mt-4 text-base text-zinc-300 leading-relaxed">
                Whether you need a custom Gutenberg block theme, a high-volume
                WooCommerce store, or a migration off a slow page builder, every line
                of code is written for long-term maintainability.
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
                    className={`${colSpanClass} bg-[#121216] border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                        <span className="font-mono font-medium text-amber-400">
                          {cap.index}
                        </span>
                        <span>{cap.category}</span>
                      </div>

                      <h3 className="mt-3 text-xl font-bold tracking-tight text-white font-display text-balance">
                        {cap.title}
                      </h3>

                      <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                        {cap.summary}
                      </p>

                      {/* Deliverables List */}
                      <div className="mt-6 pt-5 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cap.deliverables.map((deliv, dIdx) => (
                          <div
                            key={dIdx}
                            className="text-xs text-zinc-200 flex items-start gap-2"
                          >
                            <span className="font-mono text-amber-400">·</span>
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs font-mono text-zinc-300">
                        Result: {cap.outcomeMetric}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleInspectCapabilityCode(cap.inspectorTabId)
                        }
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>View Live Code Sample</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bespoke Haris Azeem Monogram Logo & Brand Asset Bar */}
            <div className="mt-10 bg-[#121216] border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-5">
                <div className="p-3 rounded-2xl bg-[#09090B] border border-zinc-800 shrink-0">
                  <BrandLogoMark size={56} />
                </div>
                <div>
                  <div className="text-xs font-mono text-amber-400">
                    CUSTOM VECTOR BRAND IDENTITY · HARIS AZEEM MONOGRAM
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white font-display">
                    Architectural “HA” Block Monogram
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl">
                    Custom-designed SVG mark uniting the structural pillars of{' '}
                    <strong className="text-zinc-200">H</strong> and the angled
                    ascender of <strong className="text-zinc-200">A</strong> with a
                    modular Gutenberg block node in warm amber (`#F59E0B`).
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyLogoSvg}
                className="py-2.5 px-4 text-xs font-mono font-medium text-zinc-200 hover:text-white bg-[#09090B] hover:bg-zinc-800 border border-zinc-700 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                {copiedLogoSvg ? (
                  <>
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Copied Custom SVG Code</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>Copy Logo SVG Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive WordPress Code Studio & Stack Benchmark */}
        <section
          id="code-studio"
          className="py-16 sm:py-24 bg-[#09090B] border-b border-zinc-800/80"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Haris Azeem’s Code Studio · Clean Architecture</span>
                </div>
                <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
                  Inspect the production code behind a 99+ PageSpeed WordPress build.
                </h2>
              </div>

              {/* Interactive Segmented Control for Code Artifacts */}
              <div
                role="tablist"
                aria-label="WordPress Architecture Code Artifacts"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#121216] border border-zinc-800 rounded-xl self-start"
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
                      className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-500 ${
                        isActive
                          ? 'bg-amber-500 text-zinc-950'
                          : 'text-zinc-400 hover:text-white'
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
              <div className="lg:col-span-5 bg-[#121216] border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-400">
                    {activeArtifact.architectureLayer}
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-white font-display">
                    {activeArtifact.tabLabel}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                    {activeArtifact.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-zinc-800 space-y-4">
                    <div className="text-xs font-mono text-zinc-400">
                      PRODUCTION TELEMETRY BENCHMARK
                    </div>
                    {activeArtifact.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-[#09090B] border border-zinc-800 rounded-xl p-4"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-xs text-zinc-400">{m.label}</span>
                          <span className="text-sm font-bold font-mono tabular-nums text-white">
                            {m.value}
                          </span>
                        </div>
                        <div className="mt-1 text-xs font-mono text-amber-400">
                          {m.comparison}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
                  <span>Git-managed deployment</span>
                  <span aria-hidden="true"> · </span>
                  <span>Strict PHPCS WordPress VIP standards</span>
                </div>
              </div>

              {/* Right 7 Columns: Authentic Production Code Viewer */}
              <div className="lg:col-span-7 bg-[#0D0D11] text-zinc-100 rounded-2xl border border-zinc-800 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-[#121216] border-b border-zinc-800">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileCode2 className="w-4 h-4 text-amber-400 shrink-0" />
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
                    className="py-1.5 px-3 text-xs font-mono text-zinc-200 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedArtifactId === activeArtifact.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-amber-400" />
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

            {/* Interactive Legacy Page-Builder vs. Haris Azeem Native Block Benchmark */}
            <div className="mt-12 bg-[#121216] border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <div className="text-xs font-mono text-amber-400">
                    Architecture Comparison · Real Page Speed Audit
                  </div>
                  <h3 className="mt-1 text-lg sm:text-xl font-bold text-white font-display">
                    Haris Azeem’s Native Block Architecture vs. Typical Page Builders
                  </h3>
                </div>
                <div className="flex items-center gap-1 p-1 bg-[#09090B] border border-zinc-800 rounded-lg self-start">
                  <button
                    type="button"
                    onClick={() => setStackViewMode('comparison')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      stackViewMode === 'comparison'
                        ? 'bg-amber-500 text-zinc-950'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    type="button"
                    onClick={() => setStackViewMode('bespoke')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      stackViewMode === 'bespoke'
                        ? 'bg-amber-500 text-zinc-950'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Haris Native Stack
                  </button>
                  <button
                    type="button"
                    onClick={() => setStackViewMode('legacy')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      stackViewMode === 'legacy'
                        ? 'bg-amber-500 text-zinc-950'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Legacy Builder
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-xs font-mono text-zinc-400">
                      <th className="py-3 pr-4 font-medium">Benchmark Metric</th>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <th className="py-3 px-4 font-medium">
                          {STACK_COMPARISON.legacy.name}
                        </th>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <th className="py-3 pl-4 font-medium text-amber-400">
                          {STACK_COMPARISON.bespoke.name}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80 text-xs sm:text-sm font-mono tabular-nums">
                    <tr>
                      <td className="py-3.5 pr-4 font-sans font-medium text-zinc-200">
                        HTML DOM Nodes (Homepage)
                      </td>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <td className="py-3.5 px-4 text-zinc-400">
                          {STACK_COMPARISON.legacy.domNodes}
                        </td>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <td className="py-3.5 pl-4 font-semibold text-white">
                          {STACK_COMPARISON.bespoke.domNodes}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-sans font-medium text-zinc-200">
                        Total CSS &amp; JS Frontend Payload
                      </td>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <td className="py-3.5 px-4 text-zinc-400">
                          {STACK_COMPARISON.legacy.payload}
                        </td>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <td className="py-3.5 pl-4 font-semibold text-white">
                          {STACK_COMPARISON.bespoke.payload}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-sans font-medium text-zinc-200">
                        Median Time to First Byte (TTFB)
                      </td>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <td className="py-3.5 px-4 text-zinc-400">
                          {STACK_COMPARISON.legacy.ttfb}
                        </td>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <td className="py-3.5 pl-4 font-semibold text-amber-400">
                          {STACK_COMPARISON.bespoke.ttfb}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-sans font-medium text-zinc-200">
                        Mobile Largest Contentful Paint (LCP)
                      </td>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <td className="py-3.5 px-4 text-zinc-400">
                          {STACK_COMPARISON.legacy.lcp}
                        </td>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <td className="py-3.5 pl-4 font-semibold text-amber-400">
                          {STACK_COMPARISON.bespoke.lcp}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 font-sans font-medium text-zinc-200">
                        Database Queries per Request
                      </td>
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'legacy') && (
                        <td className="py-3.5 px-4 text-zinc-400">
                          {STACK_COMPARISON.legacy.dbQueries}
                        </td>
                      )}
                      {(stackViewMode === 'comparison' ||
                        stackViewMode === 'bespoke') && (
                        <td className="py-3.5 pl-4 font-semibold text-white">
                          {STACK_COMPARISON.bespoke.dbQueries}
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive Scope & Project Investment Estimator */}
        <section
          id="estimator"
          className="py-16 sm:py-24 bg-[#0D0D11] border-b border-zinc-800/80"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl mb-10">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Interactive Project Calculator · Transparent Pricing</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
                Configure your WordPress scope and instant project estimate.
              </h2>
              <p className="mt-3 text-base text-zinc-300 leading-relaxed">
                Select your build type, site volume, and custom integrations below to
                calculate an immediate delivery timeline and budget range.
              </p>
            </div>

            <ProjectEstimator onApplyEstimateToForm={handleApplyEstimateToForm} />
          </div>
        </section>

        {/* Section 5: Direct Contact & Project Inquiry with Haris Azeem */}
        <section id="contact" className="py-16 sm:py-24 bg-[#09090B]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left 5 Columns: Direct Consultation Details & Process */}
              <div className="lg:col-span-5 space-y-6">
                <div className="text-xs font-mono text-amber-400">
                  DIRECT COLLABORATION · CURRENTLY ACCEPTING NEW PROJECTS
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display text-balance">
                  Let’s build your next WordPress project together.
                </h2>
                <p className="text-base text-zinc-300 leading-relaxed">
                  Every project inquiry goes directly to{' '}
                  <strong className="text-white font-semibold">Haris Azeem</strong>.
                  Within 24 hours, I will review your current website or project brief
                  and reply with an actionable technical roadmap and discovery call
                  schedule.
                </p>

                <div className="pt-4 border-t border-zinc-800 space-y-4">
                  <div className="text-xs font-mono text-zinc-400">
                    HOW WE WORK TOGETHER
                  </div>
                  <div className="space-y-3 text-sm text-zinc-300">
                    <div>
                      <span className="font-mono text-xs font-semibold text-amber-400">
                        01.
                      </span>{' '}
                      <span className="font-semibold text-white">
                        Codebase &amp; Speed Audit
                      </span>{' '}
                      — I inspect your existing site’s Core Web Vitals, plugin bottlenecks, or Figma designs.
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-amber-400">
                        02.
                      </span>{' '}
                      <span className="font-semibold text-white">
                        1-on-1 Strategy &amp; Architecture Call
                      </span>{' '}
                      — Direct discussion with Haris Azeem—no middlemen or junior handoffs.
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-amber-400">
                        03.
                      </span>{' '}
                      <span className="font-semibold text-white">
                        Staging Sprints &amp; Launch
                      </span>{' '}
                      — Weekly live staging demos, clean Git version control, and 99+ PageSpeed verification.
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 text-xs text-zinc-400 space-y-1.5">
                  <div>
                    Direct Email:{' '}
                    <a
                      href="mailto:harisazeemqureshi@gmail.com"
                      className="font-mono text-amber-400 hover:underline"
                    >
                      harisazeemqureshi@gmail.com
                    </a>
                  </div>
                  <div>
                    Developer: Haris Azeem · Full-Stack WordPress &amp; WooCommerce
                    Engineer
                  </div>
                </div>
              </div>

              {/* Right 7 Columns: Validated Dark-Mode Form or Confirmation Receipt */}
              <div className="lg:col-span-7">
                {submittedRecord ? (
                  <div className="bg-[#121216] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-mono text-amber-400">
                            INQUIRY RECEIVED · REF #{submittedRecord.referenceCode}
                          </div>
                          <h3 className="text-xl font-bold text-white font-display">
                            Thank you, {submittedRecord.fullName}.
                          </h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">
                        {submittedRecord.timestamp}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Your project brief has been sent to{' '}
                      <strong className="text-white">Haris Azeem</strong>. A personalized
                      architecture review for{' '}
                      <span className="font-mono font-medium text-amber-400">
                        {submittedRecord.siteUrl}
                      </span>{' '}
                      will be delivered to{' '}
                      <span className="font-mono font-medium text-white">
                        {submittedRecord.workEmail}
                      </span>{' '}
                      within 24 hours.
                    </p>

                    <div className="bg-[#09090B] border border-zinc-800 rounded-xl p-4 space-y-2 text-xs">
                      <div className="text-zinc-400">
                        <span className="font-semibold text-white">
                          Selected Track:
                        </span>{' '}
                        {submittedRecord.engagementTrack}
                      </div>
                      {submittedRecord.scopeSummary && (
                        <div className="text-zinc-400">
                          <span className="font-semibold text-white">
                            Attached Estimate:
                          </span>{' '}
                          {submittedRecord.scopeSummary}
                        </div>
                      )}
                      <div className="text-zinc-400 pt-2 border-t border-zinc-800">
                        <span className="font-semibold text-white">
                          Project Notes:
                        </span>{' '}
                        {submittedRecord.projectBrief}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCopyBriefReceipt}
                        className="py-2 px-4 text-xs font-medium text-zinc-200 hover:text-white bg-[#09090B] border border-zinc-700 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {copiedBriefReceipt ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-amber-400" />
                            <span>Receipt Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Brief Summary</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmittedRecord(null)}
                        className="py-2 px-4 text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={validateAndSubmitForm}
                    noValidate
                    className="bg-[#121216] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5"
                  >
                    {attachedScopeSummary && (
                      <div className="p-3.5 bg-amber-500/10 border border-amber-500/40 rounded-xl flex items-start justify-between gap-3">
                        <div className="text-xs text-zinc-200">
                          <span className="font-semibold text-amber-400">
                            Attached Estimate:
                          </span>{' '}
                          {attachedScopeSummary}
                        </div>
                        <button
                          type="button"
                          onClick={() => setAttachedScopeSummary(null)}
                          className="text-xs text-zinc-400 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="full-name"
                          className="block text-xs font-semibold text-zinc-200 mb-1.5"
                        >
                          Your Name *
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
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-xs text-red-400">
                            {formErrors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="work-email"
                          className="block text-xs font-semibold text-zinc-200 mb-1.5"
                        >
                          Email Address *
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
                          placeholder="sarah@company.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                        />
                        {formErrors.workEmail && (
                          <p className="mt-1 text-xs text-red-400">
                            {formErrors.workEmail}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="site-url"
                          className="block text-xs font-semibold text-zinc-200 mb-1.5"
                        >
                          Current Website URL (Optional)
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
                          placeholder="https://yourwebsite.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                        />
                        {formErrors.siteUrl && (
                          <p className="mt-1 text-xs text-red-400">
                            {formErrors.siteUrl}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="engagement-track"
                          className="block text-xs font-semibold text-zinc-200 mb-1.5"
                        >
                          Service Needed
                        </label>
                        <select
                          id="engagement-track"
                          value={engagementTrack}
                          onChange={(e) => setEngagementTrack(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="Custom Gutenberg Block Theme & FSE System">
                            Custom Gutenberg Block Theme &amp; FSE System
                          </option>
                          <option value="High-Conversion WooCommerce Storefront">
                            High-Conversion WooCommerce Storefront
                          </option>
                          <option value="Elementor / Divi to Native Block Migration">
                            Elementor / Divi to Native Block Migration
                          </option>
                          <option value="Dedicated WordPress Engineering Retainer (Monthly)">
                            Dedicated WordPress Engineering Retainer (Monthly)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="project-brief"
                        className="block text-xs font-semibold text-zinc-200 mb-1.5"
                      >
                        Project Details &amp; Goals *
                      </label>
                      <textarea
                        id="project-brief"
                        rows={4}
                        value={projectBrief}
                        onChange={(e) => {
                          setProjectBrief(e.target.value);
                          if (formErrors.projectBrief) {
                            setFormErrors({
                              ...formErrors,
                              projectBrief: undefined,
                            });
                          }
                        }}
                        placeholder="Tell Haris about your WordPress project, current speed issues, WooCommerce requirements, or target timeline..."
                        className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                      {formErrors.projectBrief && (
                        <p className="mt-1 text-xs text-red-400">
                          {formErrors.projectBrief}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-xs text-zinc-400">
                        Direct response from Haris Azeem within 24 hours.
                      </span>
                      <button
                        type="submit"
                        className="py-3.5 px-6 text-sm font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                      >
                        <span>Send Project Brief to Haris</span>
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

      {/* Quiet Footer with Haris Azeem Custom Logo */}
      <footer className="bg-[#09090B] border-t border-zinc-800/80 py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <BrandLogoMark size={32} />
            <div>
              <div className="text-sm font-bold tracking-tight text-white font-display">
                Haris Azeem
              </div>
              <p className="text-xs text-zinc-400">
                Senior WordPress &amp; WooCommerce Developer ·{' '}
                <a
                  href="mailto:harisazeemqureshi@gmail.com"
                  className="hover:text-amber-400 transition-colors"
                >
                  harisazeemqureshi@gmail.com
                </a>{' '}
                · © {new Date().getFullYear()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-400">
            <a
              href="#portfolio"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Portfolio
            </a>
            <a
              href="#services"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Services
            </a>
            <a
              href="#code-studio"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Code Studio
            </a>
            <a
              href="#estimator"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Estimator
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Contact
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
