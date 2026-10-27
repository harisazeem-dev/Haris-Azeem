export interface HeroArchitectureMode {
  id: 'gutenberg' | 'woocommerce' | 'headless';
  label: string;
  tagline: string;
  lighthouseScore: string;
  ttfb: string;
  lcp: string;
  payloadSize: string;
  stackSummary: string;
  highlights: string[];
  imageUrl: string;
  imageCaption: string;
}

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

export const HERO_ARCHITECTURAL_MODES: HeroArchitectureMode[] = [
  {
    id: 'gutenberg',
    label: 'Custom Gutenberg & FSE',
    tagline: 'Zero-bloat native Block API v3 themes with strict theme.json design tokens.',
    lighthouseScore: '100 / 100',
    ttfb: '118 ms',
    lcp: '0.7 s',
    payloadSize: '14.2 KB CSS/JS',
    stackSummary: 'WordPress 6.7+ · React Block API v3 · theme.json v3 · Interactivity API',
    highlights: [
      'Replaces heavy Elementor/Divi DOM wrappers with clean semantic HTML5',
      'Role-locked block patterns so editors publish pages in minutes without breaking layouts',
      'Sub-second mobile Largest Contentful Paint across global CDN edge nodes',
    ],
    imageUrl: '/src/assets/images/case_study_editorial_publishing_1793111809675.jpg',
    imageCaption: 'Bespoke Gutenberg Block System · Swiss-Grid Publishing Architecture',
  },
  {
    id: 'woocommerce',
    label: 'High-Velocity WooCommerce',
    tagline: 'Custom Store API checkouts and HPOS database engineering built for flash drops.',
    lighthouseScore: '99 / 100',
    ttfb: '145 ms',
    lcp: '0.9 s',
    payloadSize: '22.8 KB CSS/JS',
    stackSummary: 'WooCommerce HPOS · Store API · Redis Atomic Stock Locks · Stripe / ERP Sync',
    highlights: [
      'Custom High-Performance Order Storage (HPOS) eliminating wp_postmeta bottlenecks',
      'Instant side-drawer cart and single-screen checkout with zero jQuery dependencies',
      'Asynchronous Action Scheduler workers for ERP, inventory, and CRM webhooks',
    ],
    imageUrl: '/src/assets/images/case_study_woocommerce_flagship_1793111811364.jpg',
    imageCaption: 'High-Concurrency WooCommerce Flagship · Sub-Second Checkout Flow',
  },
  {
    id: 'headless',
    label: 'Enterprise Multisite & Headless',
    tagline: 'Governed multi-brand design systems, custom plugins, and WPGraphQL APIs.',
    lighthouseScore: '100 / 100',
    ttfb: '92 ms',
    lcp: '0.6 s',
    payloadSize: '16.0 KB CSS/JS',
    stackSummary: 'WordPress Multisite · Bedrock / Composer · WPGraphQL · Redis Object Cache',
    highlights: [
      'Unified multi-region WordPress networks managed with Composer and GitHub Actions CI/CD',
      'Custom PHP 8.3 plugins engineered to strict WordPress VIP security standards',
      'Granular Surrogate-Key edge cache invalidation with 98.8% global hit ratio',
    ],
    imageUrl: '/src/assets/images/case_study_headless_enterprise_1793111811441.jpg',
    imageCaption: 'Multi-Brand Block Library & Headless WPGraphQL Architecture',
  },
];

export const HERO_METRICS = [
  {
    value: '99.4 / 100',
    label: 'Median Core Web Vitals',
    context: 'Verified across 35+ custom WordPress & WooCommerce production launches',
  },
  {
    value: '130 ms',
    label: 'Median Global TTFB',
    context: 'Engineered with persistent Redis object caching & Cloudflare edge rules',
  },
  {
    value: '$48M+',
    label: 'Client WooCommerce GMV',
    context: 'Processed through custom HPOS tables and sub-second Store API checkouts',
  },
  {
    value: '0 KB',
    label: 'Page-Builder Bloat',
    context: '100% hand-crafted Gutenberg blocks, strict PHP 8.3, and clean semantic markup',
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    index: '01. Bespoke Gutenberg Themes & Full-Site Editing',
    title: 'Custom Block Libraries That Replace Fragile Page Builders',
    category: 'Theme & Design System Engineering',
    summary:
      'I build custom WordPress themes from the ground up using Block API v3 and strict theme.json design tokens. Your marketing team gets an intuitive, drag-and-drop visual editing experience in wp-admin while visitors get lightning-fast, semantic HTML.',
    outcomeMetric: '3.6× faster page publishing with 99+ Google PageSpeed scores',
    deliverables: [
      'Custom React & PHP Gutenberg blocks',
      'Locked brand pattern libraries & editorial guardrails',
      'Fluid typography & spacing tokens in theme.json v3',
      'Zero jQuery or third-party builder overhead',
    ],
    inspectorTabId: 'block-api',
  },
  {
    index: '02. High-Conversion WooCommerce Development',
    title: 'Sub-Second Storefronts, Custom Checkouts & HPOS Scaling',
    category: 'E-Commerce Architecture',
    summary:
      'Standard WooCommerce stores slow down as catalog size and traffic grow. I re-engineer WooCommerce using High-Performance Order Storage (HPOS), custom React Store API carts, and background ERP/payment queues that never lock your database.',
    outcomeMetric: '+41% checkout completion rate during high-traffic product drops',
    deliverables: [
      'WooCommerce HPOS custom database migration',
      'Bespoke multi-step or one-click checkout flows',
      'Custom product configurators & dynamic bundle pricing',
      'Stripe, NetSuite, HubSpot & custom API integrations',
    ],
    inspectorTabId: 'woocommerce-hpos',
  },
  {
    index: '03. Custom Plugin Engineering & REST / GraphQL APIs',
    title: 'Clean, Auditable PHP 8.3 Plugins & External System Sync',
    category: 'Backend & API Architecture',
    summary:
      'When off-the-shelf plugins conflict or fall short, I write lean, object-oriented WordPress plugins tailored to your exact business logic—complete with custom database tables, WP-CLI commands, and secure REST or WPGraphQL endpoints.',
    outcomeMetric: '85% reduction in plugin footprint and recurring license costs',
    deliverables: [
      'Strict-typed PHP 8.3 custom plugins & webhooks',
      'Custom database schemas outside wp_postmeta',
      'Authenticated REST API & WPGraphQL endpoints',
      'Automated PHPCS security & VIP standards auditing',
    ],
    inspectorTabId: 'edge-cache',
  },
  {
    index: '04. Page-Builder Migration & Speed Remediation',
    title: 'Surgical Migration from Elementor, Divi & Legacy Stacks',
    category: 'Performance & SEO Preservation',
    summary:
      'Stuck with a sluggish Elementor or Divi site failing Core Web Vitals? I migrate existing content, custom post types, and SEO metadata into a modern native Gutenberg architecture with zero downtime and zero lost search rankings.',
    outcomeMetric: 'Average mobile LCP reduced from 4.8s to 0.8s within 4 weeks',
    deliverables: [
      'Automated WP-CLI shortcode-to-Gutenberg migration',
      '100% URL structure, canonical & JSON-LD preservation',
      'Main-thread JavaScript & INP latency elimination',
      'Zero-downtime staging cutover & delta content sync',
    ],
    inspectorTabId: 'theme-json',
  },
];

export const CODE_ARTIFACTS: CodeArtifact[] = [
  {
    id: 'block-api',
    tabLabel: 'Gutenberg Block (React + PHP)',
    fileName: 'blocks/haris-bento-showcase/index.tsx',
    language: 'TypeScript / Block API v3',
    architectureLayer: 'Native Gutenberg Block · Zero Client-Side React Bundle',
    description:
      'Haris Azeem’s custom blocks give editors full visual control inside wp-admin while compiling down to pure semantic HTML and lightweight Interactivity API directives on the frontend.',
    metrics: [
      { label: 'Frontend JS Shipped', value: '1.6 KB', comparison: 'vs. 195 KB Elementor runtime' },
      { label: 'HTML DOM Depth', value: '3 semantic nodes', comparison: 'vs. 22 nested builder divs' },
      { label: 'Design Governance', value: 'Strict schema', comparison: 'Prevents broken mobile padding' },
    ],
    code: `import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import metadata from './block.json';

interface BentoAttributes {
  gridLayout: 'asymmetric-7-5' | 'split-6-6' | 'triad-4-4-4';
  surfaceTheme: 'obsidian' | 'charcoal';
  tabularMetrics: boolean;
}

registerBlockType<BentoAttributes>(metadata.name, {
  edit: ({ attributes, setAttributes }) => {
    const { gridLayout, surfaceTheme, tabularMetrics } = attributes;
    const blockProps = useBlockProps({
      className: \`wp-block-haris-bento layout-\${gridLayout} surface-\${surfaceTheme}\`,
    });

    return (
      <>
        <InspectorControls>
          <PanelBody title="Haris Azeem Grid Architecture">
            <SelectControl
              label="Desktop Column Ratio"
              value={gridLayout}
              options={[
                { label: 'Asymmetric Bento (7 : 5)', value: 'asymmetric-7-5' },
                { label: 'Balanced Split (6 : 6)', value: 'split-6-6' },
                { label: 'Editorial Triad (4 : 4 : 4)', value: 'triad-4-4-4' },
              ]}
              onChange={(val) =>
                setAttributes({ gridLayout: val as BentoAttributes['gridLayout'] })
              }
            />
            <ToggleControl
              label="Enforce Tabular Numerals"
              checked={tabularMetrics}
              onChange={(val) => setAttributes({ tabularMetrics: val })}
            />
          </PanelBody>
        </InspectorControls>
        <section {...blockProps}>
          <InnerBlocks
            allowedBlocks={['haris/case-card', 'haris/metric-tile']}
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
    tabLabel: 'theme.json Token System',
    fileName: 'theme.json',
    language: 'JSON Schema v3',
    architectureLayer: 'Global Design Tokens & Fluid Clamp() Typography',
    description:
      'Locks the WordPress Site Editor to your exact brand color palette and fluid typographic scale—eliminating rogue inline styles and bloated CSS frameworks.',
    metrics: [
      { label: 'Compiled Stylesheet', value: '5.8 KB gzipped', comparison: 'Replaces 340 KB theme CSS' },
      { label: 'Responsive Scaling', value: 'Native CSS clamp()', comparison: 'Zero breakpoint jumps' },
      { label: 'Editor Guardrails', value: '100% Tokenized', comparison: 'Arbitrary hex picker disabled' },
    ],
    code: `{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "appearanceTools": false,
    "color": {
      "custom": false,
      "defaultPalette": false,
      "palette": [
        { "slug": "obsidian", "color": "#09090B", "name": "Obsidian Canvas" },
        { "slug": "charcoal", "color": "#121216", "name": "Structural Surface" },
        { "slug": "alabaster", "color": "#FAFAFA", "name": "Primary Alabaster" },
        { "slug": "zinc-muted", "color": "#A1A1AA", "name": "Muted Copy" },
        { "slug": "amber-gold", "color": "#F59E0B", "name": "Focal Amber Accent" }
      ]
    },
    "typography": {
      "customFontSize": false,
      "fluid": true,
      "fontFamilies": [
        {
          "fontFamily": "Outfit, sans-serif",
          "slug": "display",
          "name": "Outfit Display"
        },
        {
          "fontFamily": "Plus Jakarta Sans, sans-serif",
          "slug": "sans",
          "name": "Plus Jakarta Sans Body"
        }
      ]
    }
  }
}`,
  },
  {
    id: 'woocommerce-hpos',
    tabLabel: 'WooCommerce HPOS Engine',
    fileName: 'src/Commerce/AtomicStockReservation.php',
    language: 'PHP 8.3 (Strict Types)',
    architectureLayer: 'High-Performance Order Storage · Redis Stock Locks',
    description:
      'Engineered for high-volume WooCommerce stores. Uses HPOS custom tables and atomic Redis memory locks to handle thousands of simultaneous checkouts without database deadlocks.',
    metrics: [
      { label: 'Order Lookup Query', value: '3.8 ms', comparison: 'vs. 680 ms on legacy wp_postmeta' },
      { label: 'Concurrent Checkouts', value: '6,000+ active', comparison: 'Zero MySQL lock wait timeouts' },
      { label: 'ERP Sync Architecture', value: 'Async Workers', comparison: 'Non-blocking checkout response' },
    ],
    code: `<?php
declare(strict_types=1);

namespace HarisAzeem\\WooArchitecture;

use Automattic\\WooCommerce\\Utilities\\OrderUtil;

final class AtomicStockReservation {
    public function boot(): void {
        add_action('woocommerce_store_api_checkout_order_processed', [$this, 'dispatch_async_erp_sync'], 10, 1);
    }

    /**
     * Reserve SKU allocation in Redis prior to payment capture
     * to prevent overselling during high-concurrency product drops.
     */
    public function reserve_sku(int $product_id, int $quantity, string $cart_token): bool {
        if (!OrderUtil::custom_orders_table_usage_is_enabled()) {
            throw new \\RuntimeException('WooCommerce HPOS must be active.');
        }

        $lock_key = sprintf('haris_wc_lock:%d', $product_id);
        $reserved = (int) wp_cache_get($lock_key, 'haris_inventory');
        $physical_stock = (int) get_post_meta($product_id, '_stock', true);

        if (($physical_stock - $reserved) < $quantity) {
            return false;
        }

        wp_cache_incr($lock_key, $quantity, 'haris_inventory');
        as_schedule_single_action(time() + 480, 'haris_release_expired_cart_lock', [
            'product_id' => $product_id,
            'quantity'   => $quantity,
            'cart_token' => $cart_token,
        ]);

        return true;
    }
}`,
  },
  {
    id: 'edge-cache',
    tabLabel: 'Edge Cache & Surrogate Keys',
    fileName: 'src/Performance/EdgeSurrogatePurge.php',
    language: 'PHP 8.3 (WordPress VIP)',
    architectureLayer: 'Granular CDN Cache Invalidation · 98.8% Hit Ratio',
    description:
      'Tags every WordPress response with granular Surrogate-Key headers. Updating an article or product purges only affected routes at the edge in under 150ms instead of flushing the entire site cache.',
    metrics: [
      { label: 'Global Edge Hit Ratio', value: '98.8%', comparison: 'Instant worldwide delivery' },
      { label: 'Origin DB Load', value: '-84% CPU', comparison: 'Zero PHP execution on cache hit' },
      { label: 'Invalidation Latency', value: '120 ms', comparison: 'Targeted single-post purge' },
    ],
    code: `<?php
declare(strict_types=1);

namespace HarisAzeem\\Performance;

use WP_Post;

final class EdgeSurrogatePurge {
    public function attach_headers(): void {
        if (is_admin() || is_user_logged_in()) {
            header('Cache-Control: private, no-store');
            return;
        }

        $keys = ['haris-global'];
        if (is_singular()) {
            $keys[] = 'entity-' . get_queried_object_id();
        }
        if (is_front_page()) {
            $keys[] = 'route-home';
        }

        header('Surrogate-Key: ' . implode(' ', $keys));
        header('Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400');
    }

    public function on_post_updated(int $post_id, WP_Post $post): void {
        if (wp_is_post_revision($post_id) || $post->post_status !== 'publish') {
            return;
        }
        do_action('haris_purge_edge_keys', ['entity-' . $post_id, 'route-home']);
    }
}`,
  },
];

export const STACK_COMPARISON = {
  legacy: {
    name: 'Typical Page-Builder Stack (Elementor / Divi)',
    domNodes: '2,840 nodes',
    payload: '1,092 KB CSS/JS',
    ttfb: '1,180 ms',
    lcp: '4.6 s (Poor)',
    dbQueries: '148 queries / request',
  },
  bespoke: {
    name: 'Haris Azeem Native Block & HPOS Architecture',
    domNodes: '360 nodes',
    payload: '31 KB CSS/JS',
    ttfb: '125 ms',
    lcp: '0.8 s (99/100)',
    dbQueries: '9 cached queries',
  },
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'arkhitect-editorial',
    title: 'Arkhitect Media — Custom Gutenberg Publishing Platform & Paywall',
    client: 'Arkhitect Publishing Group (Zurich & London)',
    sector: 'editorial',
    sectorLabel: 'Custom Gutenberg & Publishing',
    year: '2026',
    timeline: '7 Weeks',
    stackSummary: 'Custom Block Theme · Block API v3 · Stripe Metered Paywall · Redis Edge Cache',
    headlineMetric: '+164% Paid Digital Subscriptions in 6 Months',
    headlineContext: 'Mobile LCP cut from 4.9s to 0.8s across 42,000 archival articles',
    summary:
      'Replaced a brittle 14-year-old shortcode and page-builder setup with a bespoke Swiss-grid Full-Site Editing (FSE) theme, 18 custom React Gutenberg blocks, and edge-authenticated Stripe subscription gating.',
    challenge:
      'Arkhitect’s editorial team spent over three hours formatting each issue due to deeply nested shortcodes and 38 conflicting plugins. Slow mobile page loads were hurting organic search reach and subscriber conversion.',
    architectureSolution: [
      'Engineered an automated WP-CLI AST migration script that converted 42,000 legacy articles into clean native Gutenberg blocks with zero broken URLs.',
      'Built 18 custom Gutenberg blocks (Issue Grid, Blueprint Zoom Lightbox, Audio Essay Player, and Metered Paywall Gate) governed by theme.json v3.',
      'Configured Cloudflare edge caching with Surrogate-Key invalidation and persistent Redis object caching for sub-130ms global TTFB.',
    ],
    imageUrl: '/src/assets/images/case_study_editorial_publishing_1793111809675.jpg',
    imageAlt: 'Laptop on travertine plinth showing the Arkhitect custom Gutenberg digital magazine layout engineered by Haris Azeem',
    featuredSpan: true,
    vitalsComparison: [
      { metric: 'Largest Contentful Paint (LCP)', before: '4.9 s', after: '0.8 s', delta: '-83%' },
      { metric: 'Interaction to Next Paint (INP)', before: '310 ms', after: '32 ms', delta: '-90%' },
      { metric: 'Time to First Byte (TTFB)', before: '1,240 ms', after: '128 ms', delta: '-90%' },
      { metric: 'Editorial Issue Assembly Time', before: '210 mins', after: '40 mins', delta: '5.2× Faster' },
    ],
    testimonial: {
      quote:
        'Haris Azeem completely transformed our publishing workflow. He migrated 14 years of archival journalism off a slow shortcode theme into a custom Gutenberg block system without losing a single search ranking—and our paid subscriber conversion rate more than doubled.',
      author: 'Lukas Meyerhofer',
      role: 'Chief Digital Officer',
      organization: 'Arkhitect Publishing Group',
      outcomeHighlight: '+164% Subscriber Conversion · 0.8s Mobile LCP',
    },
  },
  {
    id: 'aeterna-horology',
    title: 'Aeterna Genève — High-Concurrency WooCommerce Flagship & Configurator',
    client: 'Aeterna Manufacture Horlogère (Geneva)',
    sector: 'woocommerce',
    sectorLabel: 'High-Velocity WooCommerce',
    year: '2025',
    timeline: '9 Weeks',
    stackSummary: 'WooCommerce HPOS · Custom Store API Checkout · Redis Stock Locks · SAP ERP Sync',
    headlineMetric: '+41% High-Ticket Checkout Conversion Rate',
    headlineContext: '100% uptime during 6,200-concurrent-user limited-edition watch drops',
    summary:
      'Re-architected a luxury watchmaker’s WooCommerce store onto High-Performance Order Storage (HPOS) with atomic Redis inventory reservation and a sub-second custom Store API checkout.',
    challenge:
      'During limited-edition timepiece drops, Aeterna’s legacy WooCommerce database locked up due to unindexed wp_postmeta queries and synchronous ERP inventory checks during checkout.',
    architectureSolution: [
      'Migrated 180,000+ historical orders to WooCommerce High-Performance Order Storage (HPOS) with custom composite MySQL indices.',
      'Built an atomic Redis stock reservation layer and moved SAP ERP synchronization into asynchronous Action Scheduler background queues.',
      'Replaced the slow legacy checkout with a custom React WooCommerce Store API flow supporting multi-currency CHF, EUR, and USD transactions.',
    ],
    imageUrl: '/src/assets/images/case_study_woocommerce_flagship_1793111811364.jpg',
    imageAlt: 'Studio monitor displaying the Aeterna Watches luxury WooCommerce storefront architected by Haris Azeem',
    featuredSpan: false,
    vitalsComparison: [
      { metric: 'Checkout API Response Time', before: '2,850 ms', after: '165 ms', delta: '-94%' },
      { metric: 'Largest Contentful Paint (LCP)', before: '3.8 s', after: '0.9 s', delta: '-76%' },
      { metric: 'Peak Drop Concurrency', before: '450 users (crashed)', after: '6,200+ users', delta: '100% Uptime' },
      { metric: 'Checkout Completion Rate', before: '1.9%', after: '2.68%', delta: '+41%' },
    ],
    testimonial: {
      quote:
        'Our limited-edition releases used to crash our server within minutes. Haris re-engineered our WooCommerce backend onto HPOS with atomic Redis stock locks and a custom Store API checkout. We processed $6.8M in four minutes with sub-second load times.',
      author: 'Céline Delacroix',
      role: 'VP of Direct-to-Consumer Digital',
      organization: 'Aeterna Manufacture Horlogère',
      outcomeHighlight: '$6.8M Flash Drop in 4 Mins · Zero Database Locks',
    },
  },
  {
    id: 'global-axis-design-system',
    title: 'Global Axis — Multi-Region Enterprise Block Library & Multisite Network',
    client: 'Global Axis Industrial Technologies (Munich)',
    sector: 'enterprise',
    sectorLabel: 'Enterprise Multisite & Plugins',
    year: '2025',
    timeline: '10 Weeks',
    stackSummary: 'WordPress Multisite · Composer / Bedrock · 34 Custom Blocks · WPGraphQL',
    headlineMetric: '78% Reduction in Regional Microsite Launch Cost',
    headlineContext: 'Unified 19 regional B2B sites onto a single governed WordPress Multisite codebase',
    summary:
      'Consolidated 19 fragmented regional websites onto a Composer-managed WordPress Multisite network powered by 34 custom Gutenberg blocks and automated multilingual workflows.',
    challenge:
      'Each regional division ran a separate WordPress install with incompatible page builders, causing brand inconsistency, security patching overhead, and 6-week delays to launch new product campaigns.',
    architectureSolution: [
      'Architected a unified WordPress Multisite network managed with Bedrock, Composer, and automated GitHub Actions CI/CD pipelines.',
      'Developed 34 WCAG AA compliant Gutenberg blocks with role-based locking so regional teams can localize copy without breaking layout geometry.',
      'Built custom WPGraphQL endpoints feeding real-time product specs to the companion technical documentation portal.',
    ],
    imageUrl: '/src/assets/images/case_study_headless_enterprise_1793111811441.jpg',
    imageAlt: 'Studio desk showing the Global Axis v2.1 Block Library and multisite system engineered by Haris Azeem',
    featuredSpan: false,
    vitalsComparison: [
      { metric: 'Regional Campaign Launch Time', before: '6 Weeks', after: '4 Days', delta: '-89%' },
      { metric: 'Annual Plugin Licensing & Maintenance', before: '$64,000 / yr', after: '$8,500 / yr', delta: '-87%' },
      { metric: 'Accessibility Compliance Score', before: '71 / 100', after: '100 / 100 (WCAG AA)', delta: '+29 pts' },
      { metric: 'Median Mobile LCP (19 Sites)', before: '4.2 s', after: '1.0 s', delta: '-76%' },
    ],
    testimonial: {
      quote:
        'Consolidating 19 regional websites onto Haris Azeem’s custom Gutenberg multisite architecture saved us over $55,000 a year in plugin overhead alone. Our regional teams now launch localized campaigns in days instead of weeks.',
      author: 'Henrik Lindström',
      role: 'Director of Web Platform Engineering',
      organization: 'Global Axis Industrial Technologies',
      outcomeHighlight: '19 Regional Sites Unified · 100/100 WCAG AA Score',
    },
  },
];
