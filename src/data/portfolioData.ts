export interface CapabilityItem {
  index: string;
  title: string;
  category: string;
  summary: string;
  outcomeMetric: string;
  deliverables: string[];
  inspectorTabId: string;
}

export interface CodeArtifact {
  id: string;
  tabLabel: string;
  fileName: string;
  language: string;
  architectureLayer: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    comparison: string;
  }[];
  code: string;
}

export interface CaseStudyMetric {
  metric: string;
  before: string;
  after: string;
  delta: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  sector: 'editorial' | 'woocommerce' | 'enterprise';
  sectorLabel: string;
  year: string;
  timeline: string;
  stackSummary: string;
  headlineMetric: string;
  headlineContext: string;
  summary: string;
  challenge: string;
  architectureSolution: string[];
  imageUrl: string;
  imageAlt: string;
  featuredSpan: boolean;
  vitalsComparison: CaseStudyMetric[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    organization: string;
    outcomeHighlight: string;
  };
}

export const HERO_IMAGE_PATH = '/src/assets/images/hero_wp_architect_workspace_1793111807933.jpg';

export const HERO_METRICS = [
  {
    value: '99.4 / 100',
    label: 'Median Core Web Vitals Score',
    context: 'Measured across 28 enterprise WordPress & WooCommerce production deployments (2023–2026)',
  },
  {
    value: '142 ms',
    label: 'Median Global TTFB',
    context: 'Via persistent Redis object caching, Cloudflare Enterprise edge rules, and zero-query templates',
  },
  {
    value: '$48.6M',
    label: 'Annual WooCommerce GMV',
    context: 'Processed through custom High-Performance Order Storage (HPOS) & sub-second checkout flows',
  },
  {
    value: '0 KB',
    label: 'Page-Builder Runtime Bloat',
    context: '100% native Gutenberg Block API v3, strict theme.json tokens, and tree-shaken ES modules',
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    index: '01. Custom Gutenberg & Full-Site Editing Systems',
    title: 'Bespoke Block Libraries & Design Token Governance',
    category: 'Editorial & Design Systems',
    summary:
      'Replace fragile third-party page builders with tailored React-powered Gutenberg blocks, strict theme.json design token enforcement, and locked editorial patterns that prevent layout drift.',
    outcomeMetric: '3.4× faster editorial publishing velocity with zero layout regressions',
    deliverables: [
      'Block API v3 custom React blocks',
      'Locked pattern libraries & role permissions',
      'Strict theme.json fluid typography & spacing scales',
      'Automated visual regression testing in CI/CD',
    ],
    inspectorTabId: 'block-api',
  },
  {
    index: '02. High-Concurrency WooCommerce Engineering',
    title: 'Sub-Second Storefronts & Custom HPOS Checkout Flows',
    category: 'Commerce Architecture',
    summary:
      'Architect WooCommerce stores engineered for high-traffic product drops and complex B2B catalogs. Eliminate wp_postmeta bottlenecks via High-Performance Order Storage (HPOS) and custom database indices.',
    outcomeMetric: '+38% checkout completion rate under 4,500 concurrent active sessions',
    deliverables: [
      'WooCommerce HPOS custom table migrations',
      'Bespoke React Store API cart & checkout',
      'ERP, NetSuite & Stripe webhook queue workers',
      'Fragment-cached dynamic pricing & inventory',
    ],
    inspectorTabId: 'woocommerce-hpos',
  },
  {
    index: '03. Enterprise Architecture & Edge Caching',
    title: 'WordPress VIP Standards, Redis Object Caching & Security',
    category: 'Infrastructure & Performance',
    summary:
      'Eliminate slow MySQL queries, transient race conditions, and plugin vulnerabilities. Implement persistent Redis object cache groups, strict CSP headers, and immutable Composer deployments.',
    outcomeMetric: '82% reduction in origin database CPU utilization during traffic spikes',
    deliverables: [
      'Persistent Redis cache group invalidation',
      'Bedrock / Composer immutable dependency management',
      'Custom REST API & WPGraphQL schema caching',
      'Automated PHPCS WordPress VIP Coding Standards',
    ],
    inspectorTabId: 'edge-cache',
  },
  {
    index: '04. Legacy Migration & Core Web Vitals Remediation',
    title: 'Surgical Refactoring from Elementor, Divi & Legacy Multisites',
    category: 'Migration & Remediation',
    summary:
      'Migrate mission-critical publications and B2B platforms off bloated legacy themes and complex shortcodes into clean semantic Gutenberg markup while preserving 100% of SEO equity and URL structures.',
    outcomeMetric: 'Average LCP reduced from 4.8s to 0.9s within 6 weeks of cutover',
    deliverables: [
      'Automated WP-CLI AST shortcode-to-block parser',
      'Zero-downtime staging & delta content sync',
      'Schema.org JSON-LD & canonical URL preservation',
      'INP & main-thread JavaScript detoxification',
    ],
    inspectorTabId: 'theme-json',
  },
];

export const CODE_ARTIFACTS: CodeArtifact[] = [
  {
    id: 'block-api',
    tabLabel: 'Block API v3 (React + PHP)',
    fileName: 'blocks/case-metric-grid/index.tsx',
    language: 'TypeScript / JSX',
    architectureLayer: 'Gutenberg Native Block System · Zero Frontend Runtime Overhead',
    description:
      'Custom blocks compile to clean, semantic HTML in the database or use lightweight server-side rendering with Interactivity API directives—delivering full React authoring ergonomics in wp-admin with zero React bundle shipped to anonymous visitors.',
    metrics: [
      { label: 'Frontend JS Shipped', value: '1.8 KB (Interactivity API)', comparison: 'vs. 184 KB Elementor runtime' },
      { label: 'DOM Depth', value: '3 semantic nodes', comparison: 'vs. 19 nested wrapper divs' },
      { label: 'Authoring Guardrails', value: 'Strict attribute schema', comparison: 'Prevents off-brand font/color overrides' },
    ],
    code: `import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import metadata from './block.json';

interface MetricGridAttributes {
  columns: '2' | '3' | '4';
  surfaceTone: 'paper' | 'slate';
  enforceTabularNums: boolean;
}

registerBlockType<MetricGridAttributes>(metadata.name, {
  edit: ({ attributes, setAttributes }) => {
    const { columns, surfaceTone, enforceTabularNums } = attributes;
    const blockProps = useBlockProps({
      className: \`wp-block-klara-metric-grid grid-cols-\${columns} tone-\${surfaceTone}\`,
    });

    return (
      <>
        <InspectorControls>
          <PanelBody title="Architectural Grid Rules">
            <SelectControl
              label="Desktop Column Count"
              value={columns}
              options={[
                { label: '2 Columns (Split Narrative)', value: '2' },
                { label: '3 Columns (Triad Proof)', value: '3' },
                { label: '4 Columns (Telemetry Strip)', value: '4' },
              ]}
              onChange={(val) => setAttributes({ columns: val as MetricGridAttributes['columns'] })}
            />
            <ToggleControl
              label="Enforce Tabular Numerals"
              checked={enforceTabularNums}
              onChange={(val) => setAttributes({ enforceTabularNums: val })}
            />
          </PanelBody>
        </InspectorControls>
        <section {...blockProps}>
          <InnerBlocks
            allowedBlocks={['klara/metric-cell']}
            template={[
              ['klara/metric-cell', { metricValue: '99.4%', metricLabel: 'Uptime SLA' }],
              ['klara/metric-cell', { metricValue: '140ms', metricLabel: 'Median TTFB' }],
            ]}
          />
        </section>
      </>
    );
  },
  save: () => <InnerBlocks.Content />,
});`,
  },
  {
    id: 'theme-json',
    tabLabel: 'theme.json Design Tokens',
    fileName: 'theme.json',
    language: 'JSON Schema v3',
    architectureLayer: 'Global Styles & Fluid Typography Governance',
    description:
      'A locked theme.json configuration disables arbitrary color pickers, custom font sizes, and inline pixel padding—binding the entire WordPress editor directly to your brand design tokens and fluid CSS clamp() scales.',
    metrics: [
      { label: 'Generated CSS Payload', value: '6.4 KB gzipped', comparison: 'Replaces 320 KB legacy stylesheet' },
      { label: 'Style Drift Incidents', value: '0 per quarter', comparison: 'Custom hex & arbitrary sizes disabled' },
      { label: 'Fluid Breakpoints', value: 'Zero media queries', comparison: 'Native clamp() viewport scaling' },
    ],
    code: `{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "appearanceTools": false,
    "color": {
      "custom": false,
      "customDuotone": false,
      "customGradient": false,
      "defaultPalette": false,
      "palette": [
        { "slug": "canvas", "color": "#FAFAFA", "name": "Neutral Canvas" },
        { "slug": "surface", "color": "#FFFFFF", "name": "Structural Surface" },
        { "slug": "ink", "color": "#18181B", "name": "Primary Ink" },
        { "slug": "muted", "color": "#52525B", "name": "Muted Copy" },
        { "slug": "cobalt", "color": "#1D4ED8", "name": "Focal Cobalt Accent" }
      ]
    },
    "typography": {
      "customFontSize": false,
      "fluid": true,
      "fontSizes": [
        {
          "slug": "body",
          "size": "1rem",
          "fluid": { "min": "0.9375rem", "max": "1rem" },
          "name": "Body Prose (15–16px)"
        },
        {
          "slug": "display-xl",
          "size": "3.5rem",
          "fluid": { "min": "2.25rem", "max": "3.75rem" },
          "name": "Hero Display"
        }
      ]
    }
  }
}`,
  },
  {
    id: 'woocommerce-hpos',
    tabLabel: 'WooCommerce HPOS & Store API',
    fileName: 'src/Commerce/HighConcurrencyInventory.php',
    language: 'PHP 8.3 (Strict Types)',
    architectureLayer: 'High-Performance Order Storage · Atomic Stock Reservation',
    description:
      'Bypasses legacy wp_postmeta table locks during high-velocity product drops. Uses WooCommerce HPOS custom tables paired with atomic Redis stock reservation and asynchronous Action Scheduler webhooks.',
    metrics: [
      { label: 'Checkout Query Time', value: '4.2 ms', comparison: 'Down from 640 ms on wp_postmeta' },
      { label: 'Concurrent Carts', value: '5,000+ active', comparison: 'Zero MySQL deadlock errors' },
      { label: 'Order Sync Latency', value: 'Async Queue', comparison: 'Decoupled ERP webhook dispatch' },
    ],
    code: `<?php
declare(strict_types=1);

namespace Klara\\EnterpriseCommerce;

use Automattic\\WooCommerce\\Utilities\\OrderUtil;
use WC_Order;

final class HighConcurrencyInventory {
    public function register_hooks(): void {
        add_action('woocommerce_before_checkout_process', [$this, 'assert_hpos_active'], 5);
        add_filter('woocommerce_order_data_store_cpt_get_orders_query', [$this, 'optimize_lookup'], 10, 2);
    }

    public function assert_hpos_active(): void {
        if (!OrderUtil::custom_orders_table_usage_is_enabled()) {
            do_action('qm/warning', 'HPOS custom tables must remain enabled in production.');
        }
    }

    /**
     * Reserve SKU allocation in Redis before Stripe PaymentIntent confirmation
     * to prevent overselling during high-velocity flash drops.
     */
    public function reserve_atomic_inventory(int $product_id, int $qty, string $session_hash): bool {
        $cache_key = sprintf('wc_stock_lock:%d', $product_id);
        $current_reserved = (int) wp_cache_get($cache_key, 'klara_commerce_locks');

        $available = (int) get_post_meta($product_id, '_stock', true);
        if (($available - $current_reserved) < $qty) {
            return false;
        }

        wp_cache_incr($cache_key, $qty, 'klara_commerce_locks');
        as_schedule_single_action(time() + 600, 'klara_release_expired_stock_lock', [
            'product_id'   => $product_id,
            'qty'          => $qty,
            'session_hash' => $session_hash,
        ]);

        return true;
    }
}`,
  },
  {
    id: 'edge-cache',
    tabLabel: 'Edge Cache & REST Endpoint',
    fileName: 'src/Performance/EdgeCacheOrchestrator.php',
    language: 'PHP 8.3 (WordPress VIP)',
    architectureLayer: 'Persistent Object Cache & Surrogate-Key Edge Invalidation',
    description:
      'Tags rendered templates and custom REST API responses with granular Surrogate-Key headers. When an editor updates a single post, only the affected URLs purge at the CDN edge—keeping global cache hit ratios above 98.5%.',
    metrics: [
      { label: 'Edge Cache Hit Ratio', value: '98.7%', comparison: 'Granular Surrogate-Key purge' },
      { label: 'Origin DB Queries', value: '0 on cache hit', comparison: 'Served directly from edge PoP' },
      { label: 'Purge Propagation', value: '< 150 ms global', comparison: 'Zero full-site cache stampedes' },
    ],
    code: `<?php
declare(strict_types=1);

namespace Klara\\Performance;

use WP_Post;

final class EdgeCacheOrchestrator {
    private const CACHE_GROUP = 'klara_rendered_fragments';

    public function send_surrogate_headers(): void {
        if (is_admin() || is_user_logged_in()) {
            header('Cache-Control: private, no-store');
            return;
        }

        $keys = ['site-global'];
        if (is_singular()) {
            $keys[] = 'post-' . get_queried_object_id();
        }
        if (is_front_page()) {
            $keys[] = 'front-page';
        }

        header('Surrogate-Key: ' . implode(' ', $keys));
        header('Cache-Control: public, max-age=300, stale-while-revalidate=86400');
    }

    public function purge_post_surrogate_key(int $post_id, WP_Post $post): void {
        if (wp_is_post_revision($post_id) || $post->post_status !== 'publish') {
            return;
        }

        wp_cache_delete('fragment_' . $post_id, self::CACHE_GROUP);
        do_action('klara_edge_purge_surrogate_keys', [
            'post-' . $post_id,
            'front-page',
        ]);
    }
}`,
  },
];

export const STACK_COMPARISON = {
  legacy: {
    name: 'Typical Page-Builder & Multi-Purpose Theme Stack',
    subtitle: 'Elementor / Divi + 45 off-the-shelf plugins + shared unindexed wp_postmeta',
    domNodes: '2,840 nodes',
    cssPayload: '412 KB',
    jsPayload: '680 KB',
    ttfb: '1,180 ms',
    lcp: '4.6 s (Poor)',
    inp: '340 ms (Needs Work)',
    dbQueriesPerPage: '148 queries',
    securitySurface: 'High (32 third-party plugin vendors with automatic unvetted updates)',
  },
  bespoke: {
    name: 'Klara Lindqvist Native Block & Edge Architecture',
    subtitle: 'Gutenberg Block API v3 + theme.json v3 + Redis Object Cache + HPOS',
    domNodes: '380 nodes',
    cssPayload: '14 KB',
    jsPayload: '18 KB',
    ttfb: '135 ms',
    lcp: '0.8 s (Good)',
    inp: '38 ms (Good)',
    dbQueriesPerPage: '12 cached queries',
    securitySurface: 'Minimal (Composer-locked dependencies, zero frontend form/builder bloat)',
  },
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'arkhitect-editorial',
    title: 'Arkhitect Media — Global Design Monograph & Subscription Platform',
    client: 'Arkhitect Publishing Group (Zurich & London)',
    sector: 'editorial',
    sectorLabel: 'Editorial & Publishing',
    year: '2026',
    timeline: '8 Weeks',
    stackSummary: 'WordPress VIP · Custom Gutenberg Block Library · Stripe Subscriptions · Cloudflare Enterprise',
    headlineMetric: '+164% Paid Digital Subscriptions in 6 Months',
    headlineContext: 'LCP reduced from 4.9s to 0.8s across 42,000 archival architectural articles',
    summary:
      'Migrated a 14-year-old multisite publication off a brittle legacy shortcode theme into a Swiss-grid Full-Site Editing (FSE) architecture with custom interactive footnote, blueprint zoom, and metered paywall blocks.',
    challenge:
      'Arkhitect Publishing had accumulated 42,000 long-form articles built with nested legacy shortcodes and 38 conflicting plugins. Editorial layout assembly took 3.5 hours per issue, and mobile Core Web Vitals failures caused a 34% drop in organic search visibility.',
    architectureSolution: [
      'Engineered a custom WP-CLI AST parser that migrated all 42,000 legacy shortcode articles into clean native Gutenberg blocks with zero broken layouts or lost canonical URLs.',
      'Built 18 bespoke Gutenberg blocks (Swiss Asymmetric Issue Grid, Archival Blueprint Lightbox, Audio Essay Player, and Metered Paywall Gate) governed by a strict theme.json v3 token specification.',
      'Implemented edge-side paywall entitlement verification via Cloudflare Workers and persistent Redis object caching, keeping global TTFB under 140ms.',
    ],
    imageUrl: '/src/assets/images/case_study_editorial_publishing_1793111809675.jpg',
    imageAlt: 'Laptop resting on a travertine stone plinth displaying the Arkhitect Swiss-grid digital magazine layout',
    featuredSpan: true,
    vitalsComparison: [
      { metric: 'Largest Contentful Paint (LCP)', before: '4.9 s', after: '0.8 s', delta: '-83%' },
      { metric: 'Interaction to Next Paint (INP)', before: '310 ms', after: '32 ms', delta: '-90%' },
      { metric: 'Time to First Byte (TTFB)', before: '1,240 ms', after: '128 ms', delta: '-90%' },
      { metric: 'Issue Production Time', before: '210 mins', after: '45 mins', delta: '4.6× Faster' },
    ],
    testimonial: {
      quote:
        'Before working with Klara, our editorial team spent half their week fighting broken shortcodes and slow wp-admin saves. She migrated 14 years of archival journalism into a custom Gutenberg design system without losing a single search ranking—and our paid subscriber conversion rate more than doubled within two quarters.',
      author: 'Lukas Meyerhofer',
      role: 'Chief Digital Officer',
      organization: 'Arkhitect Publishing Group',
      outcomeHighlight: '+164% Paid Subscriber Conversion · 0.8s Mobile LCP',
    },
  },
  {
    id: 'aeterna-horology',
    title: 'Aeterna Genève — High-Concurrency Horology Flagship & Bespoke Configurator',
    client: 'Aeterna Manufacture Horlogère (Geneva)',
    sector: 'woocommerce',
    sectorLabel: 'Luxury WooCommerce',
    year: '2025',
    timeline: '10 Weeks',
    stackSummary: 'WooCommerce HPOS · WooCommerce Store API · Custom React Configurator · ERP Sync',
    headlineMetric: '+41% High-Ticket Checkout Conversion Rate',
    headlineContext: 'Zero downtime during 6,200-concurrent-user limited edition caliber drops',
    summary:
      'Re-architected a luxury Swiss watchmaker’s WooCommerce flagship with High-Performance Order Storage (HPOS), atomic Redis stock reservation, and an instant 60fps movement & strap configurator.',
    challenge:
      'During limited-edition timepiece releases, Aeterna’s legacy WooCommerce database locked up due to unindexed wp_postmeta queries and synchronous SAP ERP inventory checks during checkout, resulting in abandoned carts and database deadlocks.',
    architectureSolution: [
      'Migrated 180,000 historical orders and client service records to WooCommerce High-Performance Order Storage (HPOS) with custom composite indices.',
      'Built an atomic Redis stock reservation layer and decoupled SAP ERP synchronization into background Action Scheduler workers.',
      'Replaced the legacy jQuery cart with a sub-second WooCommerce Store API checkout supporting multi-currency Swiss Franc (CHF), EUR, and USD wire & escrow authorizations.',
    ],
    imageUrl: '/src/assets/images/case_study_woocommerce_flagship_1793111811364.jpg',
    imageAlt: 'Studio monitor on limestone surface displaying the Aeterna Watches luxury WooCommerce storefront',
    featuredSpan: false,
    vitalsComparison: [
      { metric: 'Checkout API Response Time', before: '2,850 ms', after: '165 ms', delta: '-94%' },
      { metric: 'Largest Contentful Paint (LCP)', before: '3.8 s', after: '0.9 s', delta: '-76%' },
      { metric: 'Peak Drop Concurrency', before: '450 users (crashed)', after: '6,200+ users', delta: '100% Uptime' },
      { metric: 'Checkout Completion Rate', before: '1.9%', after: '2.68%', delta: '+41%' },
    ],
    testimonial: {
      quote:
        'Our limited-edition Ref. 1953 release previously brought our server down within three minutes. Klara re-engineered our WooCommerce database onto HPOS with atomic stock locks and a custom Store API checkout. We sold out our entire allocation in four minutes with sub-second page loads globally.',
      author: 'Céline Delacroix',
      role: 'VP of Direct-to-Consumer Digital',
      organization: 'Aeterna Manufacture Horlogère',
      outcomeHighlight: '$6.8M Drop Processed in 4 Minutes · Zero Database Locks',
    },
  },
  {
    id: 'global-axis-design-system',
    title: 'Global Axis — Multi-Brand Enterprise Block Library & Governance',
    client: 'Global Axis Industrial Technologies (Munich & Stockholm)',
    sector: 'enterprise',
    sectorLabel: 'Enterprise Design Systems',
    year: '2025',
    timeline: '12 Weeks',
    stackSummary: 'WordPress Multisite · Composer / Bedrock · 34 Custom Blocks · WPGraphQL',
    headlineMetric: '78% Reduction in Regional Microsite Launch Cost',
    headlineContext: 'Unified 19 regional B2B websites onto a single governed multisite codebase',
    summary:
      'Consolidated 19 fragmented regional marketing sites onto a Composer-managed WordPress Multisite network powered by the Global Axis v2.1 Block Library and automated multilingual synchronization.',
    challenge:
      'Each regional marketing division operated its own WordPress installation with incompatible page builders, causing severe brand inconsistency, recurring security patching overhead, and 12-week delays to launch new product lines across Europe.',
    architectureSolution: [
      'Architected a unified WordPress Multisite network managed via Bedrock, Composer, and GitHub Actions with automated PHPCS WordPress VIP validation.',
      'Delivered the Global Axis v2.1 Design System—34 accessible, WCAG AA compliant Gutenberg blocks with strict role-based locking so regional teams can localize copy without breaking layout geometry.',
      'Integrated automated DeepL + human review translation workflows and headless WPGraphQL feeds for the companion technical documentation portal.',
    ],
    imageUrl: '/src/assets/images/case_study_headless_enterprise_1793111811441.jpg',
    imageAlt: 'Design studio desk with monitor and tablet displaying the Global Axis v2.1 Block Library and design system',
    featuredSpan: false,
    vitalsComparison: [
      { metric: 'Regional Campaign Launch Time', before: '6 Weeks', after: '4 Days', delta: '-89%' },
      { metric: 'Annual Plugin Licensing & Maintenance', before: '$64,000 / yr', after: '$8,500 / yr', delta: '-87%' },
      { metric: 'Accessibility Compliance Score', before: '71 / 100', after: '100 / 100 (WCAG AA)', delta: '+29 pts' },
      { metric: 'Median Mobile LCP (19 Sites)', before: '4.2 s', after: '1.0 s', delta: '-76%' },
    ],
    testimonial: {
      quote:
        'Consolidating 19 regional websites onto Klara’s custom Gutenberg multisite architecture transformed our marketing operations. Regional managers now launch localized product pages in days instead of months, and our engineering team no longer wastes sprints firefighting plugin conflicts.',
      author: 'Henrik Lindström',
      role: 'Director of Web Platform Engineering',
      organization: 'Global Axis Industrial Technologies',
      outcomeHighlight: '19 Regional Sites Unified · 100/100 WCAG AA Compliance',
    },
  },
];
