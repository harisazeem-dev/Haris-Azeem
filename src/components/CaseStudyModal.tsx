import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { CaseStudy } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onSelectForInquiry: (study: CaseStudy) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  onClose,
  onSelectForInquiry,
}) => {
  useEffect(() => {
    if (!study) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#121216] border border-zinc-800 rounded-2xl shadow-2xl my-auto text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#121216]/95 backdrop-blur-xs border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-400 truncate">
            <span className="font-medium text-zinc-100">{study.client}</span>
            <span aria-hidden="true">·</span>
            <span>{study.sectorLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Delivered {study.year} ({study.timeline})</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study modal"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-amber-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Headline & Quantified Outcome */}
          <div>
            <p className="text-xs font-mono text-amber-400">
              {study.headlineMetric} · {study.headlineContext}
            </p>
            <h2
              id="case-study-modal-title"
              className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white font-display text-balance"
            >
              {study.title}
            </h2>
            <p className="mt-2 text-xs text-zinc-400">
              {study.stackSummary}
            </p>
          </div>

          {/* High-Resolution Showcase Visual */}
          <div className="aspect-16/9 w-full rounded-xl overflow-hidden border border-zinc-800 bg-[#09090B]">
            <ResilientImage
              src={study.imageUrl}
              alt={study.imageAlt}
              fallbackTitle={study.title}
              fallbackSubtitle={study.stackSummary}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Before / After Core Web Vitals & Engineering Telemetry Table */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 mb-3">
              Production Telemetry: Legacy Stack vs. Haris Azeem Architecture
            </h3>
            <div className="overflow-x-auto border border-zinc-800 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-[#09090B] text-xs font-mono text-zinc-400">
                    <th className="py-3 px-4 font-medium">Benchmark Metric</th>
                    <th className="py-3 px-4 font-medium">Before (Legacy)</th>
                    <th className="py-3 px-4 font-medium">After (Production)</th>
                    <th className="py-3 px-4 font-medium text-right">Verified Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 text-xs sm:text-sm font-mono tabular-nums">
                  {study.vitalsComparison.map((row, idx) => (
                    <tr key={idx} className="bg-[#121216]">
                      <td className="py-3 px-4 font-sans font-medium text-zinc-100">
                        {row.metric}
                      </td>
                      <td className="py-3 px-4 text-zinc-400">{row.before}</td>
                      <td className="py-3 px-4 font-semibold text-white">
                        {row.after}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-amber-400">
                        {row.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Challenge & Architectural Execution */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-5">
              <h3 className="text-sm font-semibold text-white">
                01. The Legacy Bottleneck
              </h3>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                {study.challenge}
              </p>
            </div>
            <div className="md:col-span-7">
              <h3 className="text-sm font-semibold text-white">
                02. Haris Azeem’s Architectural Solution
              </h3>
              <ul className="mt-2 space-y-2.5 text-sm text-zinc-300 leading-relaxed">
                {study.architectureSolution.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="font-mono text-xs text-amber-400 mt-1 shrink-0">
                      0{i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Attributable Client Testimonial */}
          <div className="p-6 rounded-xl bg-[#09090B] border border-zinc-800">
            <blockquote className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              “{study.testimonial.quote}”
            </blockquote>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
              <div>
                <span className="font-semibold text-white">
                  {study.testimonial.author}
                </span>
                <span aria-hidden="true"> · </span>
                <span>{study.testimonial.role}</span>
                <span aria-hidden="true"> · </span>
                <span>{study.testimonial.organization}</span>
              </div>
              <span className="font-mono text-amber-400">
                {study.testimonial.outcomeHighlight}
              </span>
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <span className="text-xs text-zinc-400">
              Need a similar WordPress or WooCommerce architecture built for your business?
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 text-xs font-medium text-zinc-300 hover:text-white border border-zinc-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Close Case Study
              </button>
              <button
                type="button"
                onClick={() => onSelectForInquiry(study)}
                className="py-2 px-4 text-xs font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Build Similar Project with Haris</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
