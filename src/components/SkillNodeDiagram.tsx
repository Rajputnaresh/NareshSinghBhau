import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SkillNode {
  id: string;
  label: string;
  shortLabel: string;
  category: 'sales' | 'tech' | 'analytics' | 'enterprise';
  categoryLabel: string;
  level: 'core' | 'hub' | 'primary' | 'sub';
  x: number;
  y: number;
  radius: number;
  metric: string;
  metricLabel: string;
  description: string;
  tools: string[];
  modalTarget: 'P&L Metrics' | 'Track Record' | 'Leadership' | 'Experience';
}

export interface SkillLink {
  source: string;
  target: string;
  category: 'core' | 'sales' | 'tech' | 'analytics' | 'enterprise' | 'cross';
}

const CATEGORY_STYLES = {
  sales: {
    name: 'Sales Leadership & P&L',
    color: '#F59E0B', // Amber
    fill: 'rgba(245, 158, 11, 0.15)',
    border: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.4)',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
  },
  tech: {
    name: 'Market Expansion & GTM',
    color: '#06B6D4', // Cyan
    fill: 'rgba(6, 182, 212, 0.15)',
    border: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.4)',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
  },
  analytics: {
    name: 'Direct Sales & Operations',
    color: '#10B981', // Emerald
    fill: 'rgba(16, 185, 129, 0.15)',
    border: '#10B981',
    glow: 'rgba(16, 185, 129, 0.4)',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
  },
  enterprise: {
    name: 'Enterprise & Big-Ticket Deals',
    color: '#A855F7', // Purple
    fill: 'rgba(168, 85, 247, 0.15)',
    border: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.4)',
    badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
  },
  core: {
    name: 'Executive Core',
    color: '#FFFFFF',
    fill: 'rgba(255, 255, 255, 0.2)',
    border: '#FBBF24',
    glow: 'rgba(251, 191, 36, 0.5)',
    badgeBg: 'bg-white/10 border-white/20 text-white',
  },
};

const SKILL_NODES: SkillNode[] = [
  // CENTRAL CORE
  {
    id: 'core-leader',
    label: 'B2B Revenue & Sales Leadership',
    shortLabel: 'Naresh Singh Bhau',
    category: 'sales',
    categoryLabel: 'Executive Core',
    level: 'core',
    x: 500,
    y: 310,
    radius: 38,
    metric: '₹3Cr+ / month · 50+ Team',
    metricLabel: 'Regional P&L & Revenue Ownership',
    description:
      'Revenue-focused B2B Sales Leader with 8+ years of experience building and scaling MSME and enterprise sales teams. Proven track record of delivering 18%+ YoY growth, managing ₹3 Cr+ monthly regional revenue, closing multi-million-rupee deals, and launching new markets.',
    tools: ['Regional P&L', 'Enterprise Sales', 'Consultative Selling', 'GTM Dashboards', 'Team Building'],
    modalTarget: 'Experience',
  },

  // 1. SALES LEADERSHIP & P&L CLUSTER
  {
    id: 'hub-sales',
    label: 'Sales Leadership & Regional P&L',
    shortLabel: 'Sales & P&L Hub',
    category: 'sales',
    categoryLabel: 'Domain Hub',
    level: 'hub',
    x: 230,
    y: 180,
    radius: 28,
    metric: '₹3Cr+ Monthly Regional Revenue',
    metricLabel: 'Regional P&L Ownership',
    description:
      'Full regional P&L ownership across Jaipur and Rajasthan territories, managing ₹3 Cr average monthly regional revenue, delivering 18%+ YoY growth.',
    tools: ['Regional P&L Management', 'Topline Growth', 'Attrition Control', 'Cost Optimisation'],
    modalTarget: 'P&L Metrics',
  },
  {
    id: 'pnl-scale',
    label: 'Regional P&L Outcomes',
    shortLabel: '₹3Cr+ Territory Revenue',
    category: 'sales',
    categoryLabel: 'Sales Leadership',
    level: 'primary',
    x: 95,
    y: 110,
    radius: 20,
    metric: '₹3Cr+ / month',
    metricLabel: '18%+ YoY Growth',
    description:
      'Owned regional P&L outcomes, aligning topline growth with hiring strategy, attrition control, and productivity-led cost optimisation.',
    tools: ['Topline Alignment', 'Hiring Strategy', 'Attrition Control', 'Cost Optimisation'],
    modalTarget: 'P&L Metrics',
  },
  {
    id: 'headcount-mgmt',
    label: '50+ Member Sales Leadership',
    shortLabel: '50+ Sales Org',
    category: 'sales',
    categoryLabel: 'Sales Leadership',
    level: 'primary',
    x: 230,
    y: 65,
    radius: 20,
    metric: '50+ Members Led',
    metricLabel: '36 Executives · 9 Managers · 3 Branch Managers',
    description:
      'Led a 50+ member B2B sales organization (36 Executives, 9 Managers, 3 Branch Managers), with a strong leadership pipeline: 8 L1s promoted to leadership and 1 L2 to Branch Manager.',
    tools: ['Sales Organization Leadership', 'Talent Coaching', 'Performance Management'],
    modalTarget: 'Leadership',
  },
  {
    id: 'retention-renewal',
    label: 'Customer Retention & Renewals',
    shortLabel: '65%+ Customer Retention',
    category: 'sales',
    categoryLabel: 'Sales Leadership',
    level: 'primary',
    x: 95,
    y: 250,
    radius: 19,
    metric: '65%+ Retention YoY',
    metricLabel: 'Predictable Renewals & Revenue Stability',
    description:
      'Sustained 65%+ customer retention YoY across MSME and enterprise accounts, ensuring predictable renewals and long-term revenue stability.',
    tools: ['Account Retention', 'Renewal Pacing', 'Customer Success'],
    modalTarget: 'Track Record',
  },
  {
    id: 'leadership-culture',
    label: 'Leadership Succession Pipeline',
    shortLabel: '8 L1s & 1 L2 Promoted',
    category: 'sales',
    categoryLabel: 'Sales Leadership',
    level: 'sub',
    x: 345,
    y: 105,
    radius: 17,
    metric: '8 L1s + 1 L2 Promoted',
    metricLabel: 'Internal Leadership Track',
    description:
      'Built a strong talent succession pipeline, promoting 8 L1s into leadership roles and 1 L2 to Branch Manager.',
    tools: ['Leadership Pipeline', 'Talent Succession', 'Rep Coaching'],
    modalTarget: 'Leadership',
  },

  // 2. MARKET EXPANSION & GTM CLUSTER
  {
    id: 'hub-tech',
    label: 'Market Expansion & GTM Strategy',
    shortLabel: 'Market Expansion & GTM',
    category: 'tech',
    categoryLabel: 'Domain Hub',
    level: 'hub',
    x: 770,
    y: 180,
    radius: 28,
    metric: 'Mansarovar (Dec 2024)',
    metricLabel: 'Territory & Branch Expansion',
    description:
      'Launched a new Jaipur Mansarovar branch (Dec 2024) to expand market coverage, reduce travel dependency, and improve overall field productivity.',
    tools: ['Market Expansion', 'GTM Strategy', 'Branch Scaling', 'Field Productivity'],
    modalTarget: 'Leadership',
  },
  {
    id: 'crm-architecture',
    label: 'Data-Led GTM Dashboards',
    shortLabel: 'GTM & Revenue Dashboards',
    category: 'tech',
    categoryLabel: 'Market Expansion',
    level: 'primary',
    x: 905,
    y: 110,
    radius: 20,
    metric: 'Real-Time Telemetry',
    metricLabel: 'Pipeline, Revenue, Productivity, Renewals & Churn',
    description:
      'Drove data-led go-to-market strategy, building and managing dashboards to track pipeline, revenue, productivity, renewals, and churn.',
    tools: ['GTM Dashboards', 'Pipeline Tracking', 'Renewal Dashboards', 'Churn Tracking'],
    modalTarget: 'Experience',
  },
  {
    id: 'lead-enrichment',
    label: 'Jaipur Branch Scale',
    shortLabel: '6,000+ Paid Accounts',
    category: 'tech',
    categoryLabel: 'Market Expansion',
    level: 'primary',
    x: 770,
    y: 65,
    radius: 20,
    metric: '6,000+ B2B Accounts',
    metricLabel: 'Paid Client Portfolio',
    description:
      'Opened and scaled the Jaipur branch from scratch to 6,000+ paid B2B accounts, establishing commercial operations and hiring pipelines.',
    tools: ['Account Acquisition', 'Territory Inception', 'Client Scaling'],
    modalTarget: 'Track Record',
  },
  {
    id: 'workflow-automation',
    label: '1.3× PCR Champion Recognition',
    shortLabel: '1.3× PCR Champion',
    category: 'tech',
    categoryLabel: 'Market Expansion',
    level: 'primary',
    x: 905,
    y: 250,
    radius: 19,
    metric: '1.3× PCR Champion',
    metricLabel: '2× Branch Growth over 5 Years',
    description:
      'Recognized as 1.3× PCR Champion at IndiaMART, driving 2× branch revenue growth over 5 years.',
    tools: ['PCR Champion Benchmark', 'Branch Revenue Doubling', 'Operational Rigor'],
    modalTarget: 'Experience',
  },
  {
    id: 'marketplace-tech',
    label: 'Fastest Promotion Track',
    shortLabel: 'Youngest RM in Jaipur',
    category: 'tech',
    categoryLabel: 'Market Expansion',
    level: 'sub',
    x: 655,
    y: 105,
    radius: 17,
    metric: 'Youngest RM (2022)',
    metricLabel: 'Rapid Career Acceleration',
    description:
      'Youngest Regional Manager in Jaipur, promoted on one of the fastest growth tracks in the organisation (2022).',
    tools: ['Fast-Track Promotion', 'Quota Overachievement', 'Executive Advancement'],
    modalTarget: 'Track Record',
  },

  // 3. DIRECT SALES & OPERATIONS CLUSTER
  {
    id: 'hub-analytics',
    label: 'Direct Sales & Ramp Velocity',
    shortLabel: 'Direct Sales Hub',
    category: 'analytics',
    categoryLabel: 'Domain Hub',
    level: 'hub',
    x: 230,
    y: 440,
    radius: 28,
    metric: '₹1 Cr in 7 Months',
    metricLabel: "BYJU'S Direct Sales Benchmark",
    description:
      'Managed full inside and direct sales cycles from prospecting to closure, achieving 35,000 WRPS and securing permanent role within 3 months.',
    tools: ['Direct Sales Cycles', 'Inside Sales', 'Consultative Selling', 'Objection Handling'],
    modalTarget: 'P&L Metrics',
  },
  {
    id: 'predictive-forecasting',
    label: '35,000 WRPS Revenue Scoring',
    shortLabel: '35,000 WRPS',
    category: 'analytics',
    categoryLabel: 'Direct Sales',
    level: 'primary',
    x: 95,
    y: 370,
    radius: 20,
    metric: '35,000 WRPS',
    metricLabel: 'Weekly Revenue Productivity Score',
    description:
      'Generated ₹1 Cr revenue in 7 months, achieving 35,000 WRPS and exceeding targets consistently.',
    tools: ['Target Overachievement', 'High-Velocity Sales', 'Ramp Benchmarking'],
    modalTarget: 'P&L Metrics',
  },
  {
    id: 'bi-dashboards',
    label: '3-Month Permanent Role Conversion',
    shortLabel: 'Permanent in 3 Months',
    category: 'analytics',
    categoryLabel: 'Direct Sales',
    level: 'primary',
    x: 230,
    y: 555,
    radius: 20,
    metric: 'Permanent in 3 Mos',
    metricLabel: '₹2L+ Monthly Revenue',
    description:
      'Secured permanent role at BYJU’S within 3 months, exceeding targets and closing ₹2L+ monthly revenue.',
    tools: ['Rapid Role Conversion', 'Consistent Closing', 'Quota Exceeding'],
    modalTarget: 'Experience',
  },
  {
    id: 'funnel-velocity',
    label: 'Lead Conversion & Objection Handling',
    shortLabel: 'Conversion & Closing',
    category: 'analytics',
    categoryLabel: 'Direct Sales',
    level: 'primary',
    x: 95,
    y: 510,
    radius: 19,
    metric: 'Consultative Closing',
    metricLabel: 'Paid Enrollment Conversions',
    description:
      'Converted leads into paid enrolments using consultative selling and rigorous objection handling.',
    tools: ['Consultative Pitching', 'Objection Handling', 'Lead-to-Paid Conversion'],
    modalTarget: 'P&L Metrics',
  },
  {
    id: 'pricing-governance',
    label: 'BDA Coaching & Mentorship',
    shortLabel: 'Rep Coaching',
    category: 'analytics',
    categoryLabel: 'Direct Sales',
    level: 'sub',
    x: 345,
    y: 515,
    radius: 17,
    metric: 'Elevated Pitch Quality',
    metricLabel: 'Team Conversion Lift',
    description:
      'Mentored new BDAs, improving pitch quality and team conversion ratios.',
    tools: ['Peer Mentoring', 'Pitch Quality', 'Conversion Elevation'],
    modalTarget: 'P&L Metrics',
  },

  // 4. ENTERPRISE DEALS & ADVISORY CLUSTER
  {
    id: 'hub-enterprise',
    label: 'Enterprise & Big-Ticket Deals',
    shortLabel: 'Enterprise Deal Hub',
    category: 'enterprise',
    categoryLabel: 'Domain Hub',
    level: 'hub',
    x: 770,
    y: 440,
    radius: 28,
    metric: 'Up to ₹96 Lakhs',
    metricLabel: '₹94L with 100% Upfront Payment',
    description:
      'Closed multi-million-rupee enterprise and B2B deals (up to ₹96 Lakhs) through consultative and solution-based selling.',
    tools: ['Enterprise Sales', 'Consultative Selling', 'Solution-Based Closing', 'Key Account Management'],
    modalTarget: 'Track Record',
  },
  {
    id: 'cxo-pitching',
    label: 'Consultative & Solution Selling',
    shortLabel: 'Consultative Selling',
    category: 'enterprise',
    categoryLabel: 'Deal Architecture',
    level: 'primary',
    x: 905,
    y: 370,
    radius: 20,
    metric: 'Multi-Million Deals',
    metricLabel: 'Solution-Based Framework',
    description:
      'Consultative and solution-based selling addressing complex client requirements across MSME and industrial enterprise accounts.',
    tools: ['Consultative Selling', 'Solution Architecture', 'Client Discovery'],
    modalTarget: 'Track Record',
  },
  {
    id: 'large-deals',
    label: '₹94L Enterprise Contract Execution',
    shortLabel: '₹94L Deal (100% Upfront)',
    category: 'enterprise',
    categoryLabel: 'Deal Architecture',
    level: 'primary',
    x: 770,
    y: 555,
    radius: 20,
    metric: '₹94L Deal (100% Upfront)',
    metricLabel: 'Deals Closed up to ₹96 Lakhs',
    description:
      'Closed multi-million rupee enterprise deals (up to ₹96 Lakhs) through consultative selling, including a landmark ₹94 Lakhs enterprise deal with 100% upfront payment.',
    tools: ['Consultative Selling', 'Solution-Based Closing', '100% Upfront Terms', 'Enterprise Negotiation'],
    modalTarget: 'Track Record',
  },
  {
    id: 'procurement-legal',
    label: 'Deals Closed up to ₹96 Lakhs',
    shortLabel: 'Up to ₹96L Closures',
    category: 'enterprise',
    categoryLabel: 'Deal Architecture',
    level: 'primary',
    x: 905,
    y: 510,
    radius: 19,
    metric: 'Up to ₹96 Lakhs',
    metricLabel: 'Big-Ticket B2B & Enterprise',
    description:
      'Closed multi-million-rupee enterprise and B2B deals up to ₹96 Lakhs through solution-based selling.',
    tools: ['Enterprise Accounts', 'Contract Execution', 'Commercial Terms'],
    modalTarget: 'Track Record',
  },
  {
    id: 'consultative-method',
    label: 'Insight Alpha Industry Expert',
    shortLabel: 'Insight Alpha Advisory',
    category: 'enterprise',
    categoryLabel: 'Deal Architecture',
    level: 'sub',
    x: 655,
    y: 515,
    radius: 17,
    metric: 'Strategic Advisor',
    metricLabel: 'B2B SaaS, GTM, Revenue, P&L',
    description:
      'Selected industry expert providing strategic insights on B2B SaaS, enterprise sales, go-to-market strategy, revenue scaling, customer acquisition & retention, and regional P&L leadership.',
    tools: ['B2B SaaS', 'GTM Strategy', 'Revenue Scaling', 'Regional P&L Leadership'],
    modalTarget: 'Experience',
  },
];

const SKILL_LINKS: SkillLink[] = [
  // Core to Hubs
  { source: 'core-leader', target: 'hub-sales', category: 'sales' },
  { source: 'core-leader', target: 'hub-tech', category: 'tech' },
  { source: 'core-leader', target: 'hub-analytics', category: 'analytics' },
  { source: 'core-leader', target: 'hub-enterprise', category: 'enterprise' },

  // Sales Hub to Subnodes
  { source: 'hub-sales', target: 'pnl-scale', category: 'sales' },
  { source: 'hub-sales', target: 'headcount-mgmt', category: 'sales' },
  { source: 'hub-sales', target: 'retention-renewal', category: 'sales' },
  { source: 'hub-sales', target: 'leadership-culture', category: 'sales' },

  // Tech Hub to Subnodes
  { source: 'hub-tech', target: 'crm-architecture', category: 'tech' },
  { source: 'hub-tech', target: 'lead-enrichment', category: 'tech' },
  { source: 'hub-tech', target: 'workflow-automation', category: 'tech' },
  { source: 'hub-tech', target: 'marketplace-tech', category: 'tech' },

  // Analytics Hub to Subnodes
  { source: 'hub-analytics', target: 'predictive-forecasting', category: 'analytics' },
  { source: 'hub-analytics', target: 'bi-dashboards', category: 'analytics' },
  { source: 'hub-analytics', target: 'funnel-velocity', category: 'analytics' },
  { source: 'hub-analytics', target: 'pricing-governance', category: 'analytics' },

  // Enterprise Hub to Subnodes
  { source: 'hub-enterprise', target: 'cxo-pitching', category: 'enterprise' },
  { source: 'hub-enterprise', target: 'large-deals', category: 'enterprise' },
  { source: 'hub-enterprise', target: 'procurement-legal', category: 'enterprise' },
  { source: 'hub-enterprise', target: 'consultative-method', category: 'enterprise' },

  // Cross-Domain Synergies (demonstrates full executive breadth)
  { source: 'pnl-scale', target: 'predictive-forecasting', category: 'cross' },
  { source: 'large-deals', target: 'pricing-governance', category: 'cross' },
  { source: 'crm-architecture', target: 'bi-dashboards', category: 'cross' },
  { source: 'lead-enrichment', target: 'workflow-automation', category: 'cross' },
  { source: 'headcount-mgmt', target: 'leadership-culture', category: 'cross' },
  { source: 'consultative-method', target: 'marketplace-tech', category: 'cross' },
  { source: 'retention-renewal', target: 'funnel-velocity', category: 'cross' },
  { source: 'cxo-pitching', target: 'large-deals', category: 'cross' },
];

interface SkillNodeDiagramProps {
  onSelectModal: (modal: 'P&L Metrics' | 'Track Record' | 'Leadership' | 'Experience') => void;
  theme?: 'deep-space' | 'slate';
}

export function SkillNodeDiagram({ onSelectModal, theme = 'deep-space' }: SkillNodeDiagramProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('core-leader');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'graph' | 'matrix'>('graph');
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Map of node lookup by ID
  const nodeMap = useMemo(() => {
    const map = new Map<string, SkillNode>();
    SKILL_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  // Selected node object
  const selectedNode = useMemo(() => {
    return nodeMap.get(selectedNodeId) || SKILL_NODES[0];
  }, [selectedNodeId, nodeMap]);

  // Determine connected node IDs for the active/hovered node
  const activeFocusId = hoveredNodeId || selectedNodeId;
  const connectedNodeIds = useMemo(() => {
    const set = new Set<string>();
    set.add(activeFocusId);
    SKILL_LINKS.forEach((link) => {
      if (link.source === activeFocusId) set.add(link.target);
      if (link.target === activeFocusId) set.add(link.source);
    });
    return set;
  }, [activeFocusId]);

  // Filtered nodes based on category and search query
  const matchingNodeIds = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const set = new Set<string>();

    SKILL_NODES.forEach((node) => {
      const matchesCategory =
        activeCategory === 'all' ||
        node.category === activeCategory ||
        node.level === 'core';

      const matchesQuery =
        !query ||
        node.label.toLowerCase().includes(query) ||
        node.shortLabel.toLowerCase().includes(query) ||
        node.description.toLowerCase().includes(query) ||
        node.tools.some((t) => t.toLowerCase().includes(query)) ||
        node.metric.toLowerCase().includes(query);

      if (matchesCategory && matchesQuery) {
        set.add(node.id);
      }
    });

    return set;
  }, [activeCategory, searchQuery]);

  return (
    <section id="competency-graph" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 border-b border-white/10">
      {/* SECTION HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-amber-400/90 font-mono font-medium">
              02 / COMPETENCY TOPOLOGY · INTERACTIVE NODE-LINK ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Technical & Sales Competency Map
          </h2>
        </div>
        <p className="text-sm text-white/60 max-w-md leading-relaxed">
          Interactive network graph mapping 17 verified capabilities across P&L leadership, enterprise sales execution, and modern revenue technology.
        </p>
      </div>

      {/* INTERACTIVE CONTROLS BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        {/* Category Filter Segments (Zero-pill discipline: quiet functional segmented buttons) */}
        <div className={`flex flex-wrap items-center gap-1 p-1 rounded-xl border ${
          theme === 'slate' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/[0.03] border-white/10'
        }`}>
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            All Competencies (17)
          </button>
          <button
            onClick={() => setActiveCategory('sales')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeCategory === 'sales'
                ? 'bg-amber-400 text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-amber-300 hover:bg-white/[0.05]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Sales Leadership & P&L
          </button>
          <button
            onClick={() => setActiveCategory('tech')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeCategory === 'tech'
                ? 'bg-cyan-400 text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-cyan-300 hover:bg-white/[0.05]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Sales Tech & CRM
          </button>
          <button
            onClick={() => setActiveCategory('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeCategory === 'analytics'
                ? 'bg-emerald-400 text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-emerald-300 hover:bg-white/[0.05]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Revenue Analytics
          </button>
          <button
            onClick={() => setActiveCategory('enterprise')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeCategory === 'enterprise'
                ? 'bg-purple-400 text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-purple-300 hover:bg-white/[0.05]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Deal Architecture
          </button>
        </div>

        {/* Search input & view mode toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Salesforce, P&L)..."
              className={`w-full px-3 py-1.5 text-xs rounded-xl border focus:outline-none transition-colors ${
                theme === 'slate'
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400'
                  : 'bg-white/[0.04] border-white/15 text-white placeholder-white/40 focus:border-amber-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* View toggle */}
          <div className={`flex items-center p-0.5 rounded-xl border ${
            theme === 'slate' ? 'bg-slate-900 border-slate-800' : 'bg-white/[0.03] border-white/10'
          }`}>
            <button
              onClick={() => setViewMode('graph')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                viewMode === 'graph' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
              }`}
              title="Interactive Network Graph"
            >
              Graph
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                viewMode === 'matrix' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
              }`}
              title="Structured Matrix Grid"
            >
              Matrix
            </button>
          </div>
        </div>
      </div>

      {/* GRAPH & INSPECTOR SPLIT STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: INTERACTIVE CANVAS CONTAINER */}
        <div className={`lg:col-span-8 rounded-3xl border relative overflow-hidden shadow-2xl transition-all duration-300 ${
          theme === 'slate'
            ? 'bg-slate-950/80 border-slate-800/80 shadow-black/50'
            : 'bg-black/60 border-white/10 shadow-black/80'
        }`}>
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {viewMode === 'graph' ? (
            <div className="relative w-full aspect-[16/10] min-h-[460px] sm:min-h-[520px] select-none">
              <svg
                ref={svgRef}
                viewBox="0 0 1000 620"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Glow filter */}
                  <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* High glow filter for selected node */}
                  <filter id="high-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="12" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Gradient definitions for links */}
                  <linearGradient id="link-grad-sales" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D97706" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="link-grad-tech" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="link-grad-analytics" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="link-grad-enterprise" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="link-grad-cross" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* 1. DRAW LINKS */}
                <g className="links-layer">
                  {SKILL_LINKS.map((link, idx) => {
                    const sourceNode = nodeMap.get(link.source);
                    const targetNode = nodeMap.get(link.target);
                    if (!sourceNode || targetNode === undefined) return null;

                    const isConnected =
                      activeFocusId === link.source || activeFocusId === link.target;
                    const isCross = link.category === 'cross';

                    // Source and target matches current category filter
                    const sourceMatches = matchingNodeIds.has(link.source);
                    const targetMatches = matchingNodeIds.has(link.target);
                    const isMuted = !sourceMatches && !targetMatches;

                    // Stroke color
                    let strokeColor = 'rgba(255, 255, 255, 0.12)';
                    if (isCross) {
                      strokeColor = isConnected ? 'rgba(251, 191, 36, 0.7)' : 'rgba(255, 255, 255, 0.08)';
                    } else if (link.category === 'sales') {
                      strokeColor = isConnected ? '#F59E0B' : 'rgba(245, 158, 11, 0.22)';
                    } else if (link.category === 'tech') {
                      strokeColor = isConnected ? '#06B6D4' : 'rgba(6, 182, 212, 0.22)';
                    } else if (link.category === 'analytics') {
                      strokeColor = isConnected ? '#10B981' : 'rgba(16, 185, 129, 0.22)';
                    } else if (link.category === 'enterprise') {
                      strokeColor = isConnected ? '#A855F7' : 'rgba(168, 85, 247, 0.22)';
                    }

                    // Stroke width
                    const strokeWidth = isConnected ? 2.5 : isCross ? 1 : 1.5;

                    // Calculate curved path for visual elegance
                    const dx = targetNode.x - sourceNode.x;
                    const dy = targetNode.y - sourceNode.y;
                    const cx = (sourceNode.x + targetNode.x) / 2 - dy * 0.08;
                    const cy = (sourceNode.y + targetNode.y) / 2 + dx * 0.08;
                    const pathData = `M ${sourceNode.x} ${sourceNode.y} Q ${cx} ${cy} ${targetNode.x} ${targetNode.y}`;

                    return (
                      <g key={`${link.source}-${link.target}-${idx}`}>
                        <path
                          d={pathData}
                          fill="none"
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          strokeDasharray={isCross ? '4 4' : undefined}
                          opacity={isMuted ? 0.08 : isConnected ? 1 : 0.65}
                          style={{
                            transition: 'stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease',
                          }}
                        />

                        {/* Animated signal particle traveling along connected lines */}
                        {isConnected && (
                          <circle r={2.5} fill="#FFFFFF">
                            <animateMotion
                              path={pathData}
                              dur="2.4s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* 2. DRAW NODES */}
                <g className="nodes-layer">
                  {SKILL_NODES.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const isHovered = hoveredNodeId === node.id;
                    const isConnected = connectedNodeIds.has(node.id);
                    const isMatch = matchingNodeIds.has(node.id);
                    const isCore = node.level === 'core';
                    const isHub = node.level === 'hub';

                    const catStyle = CATEGORY_STYLES[node.category] || CATEGORY_STYLES.sales;
                    const nodeColor = isCore ? '#FBBF24' : catStyle.color;

                    // Dim non-matching nodes
                    const opacity = isMatch ? (isConnected || isSelected || isHovered ? 1 : 0.7) : 0.18;

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNodeId(node.id)}
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                        className="cursor-pointer group"
                        style={{
                          opacity,
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                        }}
                      >
                        {/* Outer pulse aura for selected or core node */}
                        {(isSelected || isCore) && (
                          <circle
                            r={node.radius + 12}
                            fill="none"
                            stroke={nodeColor}
                            strokeWidth={1.5}
                            opacity={0.3}
                            className="animate-ping"
                            style={{ transformOrigin: 'center' }}
                          />
                        )}

                        {/* Hover/Selection Halo */}
                        {(isSelected || isHovered) && (
                          <circle
                            r={node.radius + 6}
                            fill={nodeColor}
                            opacity={0.2}
                            filter="url(#glow)"
                          />
                        )}

                        {/* Base Node Circle */}
                        <circle
                          r={node.radius}
                          fill={
                            isSelected
                              ? nodeColor
                              : isCore
                              ? '#1A1813'
                              : isHub
                              ? 'rgba(15, 23, 42, 0.95)'
                              : 'rgba(20, 20, 24, 0.9)'
                          }
                          stroke={nodeColor}
                          strokeWidth={isSelected ? 3 : isHub ? 2.5 : 1.8}
                          filter={isSelected ? 'url(#high-glow)' : undefined}
                          className="transition-all duration-300"
                        />

                        {/* Inner accent ring for Hubs and Core */}
                        {(isCore || isHub) && (
                          <circle
                            r={node.radius - 6}
                            fill="none"
                            stroke={nodeColor}
                            strokeWidth={1}
                            strokeDasharray="3 3"
                            opacity={isSelected ? 0.9 : 0.5}
                          />
                        )}

                        {/* Node Monogram / Icon Symbol */}
                        <text
                          x={0}
                          y={isCore ? -2 : 4}
                          textAnchor="middle"
                          fill={isSelected && !isCore ? '#000000' : isCore ? '#FBBF24' : '#FFFFFF'}
                          fontSize={isCore ? 14 : isHub ? 12 : 9.5}
                          fontWeight="700"
                          fontFamily="monospace"
                          pointerEvents="none"
                        >
                          {isCore ? 'NB' : isHub ? 'HUB' : node.shortLabel.substring(0, 3).toUpperCase()}
                        </text>

                        {/* Secondary text for core */}
                        {isCore && (
                          <text
                            x={0}
                            y={14}
                            textAnchor="middle"
                            fill="#FBBF24"
                            fontSize={8.5}
                            fontFamily="monospace"
                            fontWeight="600"
                            letterSpacing="1px"
                            pointerEvents="none"
                          >
                            LEADER
                          </text>
                        )}

                        {/* Node Label (positioned below or above) */}
                        <g transform={`translate(0, ${node.radius + 15})`} pointerEvents="none">
                          {/* Label background pill for crisp readability */}
                          <rect
                            x={-node.shortLabel.length * 3.4 - 7}
                            y={-10}
                            width={node.shortLabel.length * 6.8 + 14}
                            height={18}
                            rx={4}
                            fill="rgba(0, 0, 0, 0.85)"
                            stroke={isSelected ? nodeColor : 'rgba(255, 255, 255, 0.15)'}
                            strokeWidth={isSelected ? 1.2 : 0.7}
                          />
                          <text
                            x={0}
                            y={3}
                            textAnchor="middle"
                            fill={isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)'}
                            fontSize={isHub ? 11 : 9.5}
                            fontWeight={isSelected || isHub ? '700' : '500'}
                            fontFamily="system-ui, sans-serif"
                            letterSpacing="0.2px"
                          >
                            {node.shortLabel}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Quick instructions indicator overlay */}
              <div className="absolute bottom-3 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-white/40 pointer-events-none gap-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Click any node to inspect verified evidence & tools
                </span>
                <span>Hover lines to reveal cross-discipline linkages</span>
              </div>
            </div>
          ) : (
            /* MATRIX GRID VIEW FOR DIRECT SCANNING */
            <div className="p-6 space-y-6 max-h-[580px] overflow-y-auto">
              {(['sales', 'tech', 'analytics', 'enterprise'] as const).map((catKey) => {
                const catNodes = SKILL_NODES.filter((n) => n.category === catKey && n.level !== 'core');
                const catStyle = CATEGORY_STYLES[catKey];

                return (
                  <div key={catKey} className="space-y-3">
                    <div className="flex items-center gap-2 pb-1 border-b border-white/10">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catStyle.color }} />
                      <h4 className="text-sm font-semibold text-white tracking-wide">{catStyle.name}</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {catNodes.map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <div
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-white/10 border-amber-400 shadow-md shadow-amber-400/10'
                                : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-medium text-white group-hover:text-amber-300">
                                {node.label}
                              </span>
                              <span className="text-[10px] font-mono text-white/40">
                                {node.level.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-amber-400 font-semibold mb-2">
                              {node.metric}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {node.tools.slice(0, 3).map((tool) => (
                                <span
                                  key={tool}
                                  className="text-[10px] font-mono text-white/50 px-1.5 py-0.5 rounded bg-white/[0.05]"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT: DYNAMIC NODE INSPECTION DOCK */}
        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className={`p-6 sm:p-7 rounded-3xl border shadow-xl flex flex-col justify-between ${
                theme === 'slate'
                  ? 'bg-slate-900/90 border-slate-800 text-slate-100'
                  : 'bg-[#0d0e12] border-white/15 text-white'
              }`}
            >
              <div>
                {/* Category kicker */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                      CATEGORY_STYLES[selectedNode.category]?.badgeBg || 'bg-white/10 text-white'
                    }`}
                  >
                    {selectedNode.categoryLabel}
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    ID: {selectedNode.id}
                  </span>
                </div>

                {/* Node Title */}
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 text-white">
                  {selectedNode.label}
                </h3>

                {/* Proof Metric Highlight Card */}
                <div className="my-4 p-4 rounded-2xl bg-amber-400/[0.07] border border-amber-400/25">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80 block mb-1">
                    {selectedNode.metricLabel}
                  </span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">
                    {selectedNode.metric}
                  </div>
                </div>

                {/* Narrative description */}
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5">
                  {selectedNode.description}
                </p>

                {/* Key Tools & Methodologies */}
                <div className="mb-5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-2">
                    Core Tooling & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-white/90"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Synergies in Graph */}
                <div className="mb-6 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-2">
                    Directly Connected Synergies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SKILL_LINKS.filter(
                      (l) => l.source === selectedNode.id || l.target === selectedNode.id
                    ).map((link) => {
                      const peerId = link.source === selectedNode.id ? link.target : link.source;
                      const peerNode = nodeMap.get(peerId);
                      if (!peerNode) return null;

                      return (
                        <button
                          key={peerId}
                          onClick={() => setSelectedNodeId(peerId)}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
                        >
                          → {peerNode.shortLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button: Opens Detailed Modal Dossier */}
              <button
                onClick={() => onSelectModal(selectedNode.modalTarget)}
                className="w-full py-3 px-4 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase font-mono hover:bg-amber-400 hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
              >
                <span>Inspect {selectedNode.modalTarget} Dossier</span>
                <span>↗</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER METRICS BAR */}
      <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <span className="text-white/40 block mb-1">REGIONAL REVENUE</span>
          <span className="text-white font-medium">₹3Cr+ / month (18%+ YoY)</span>
        </div>
        <div>
          <span className="text-white/40 block mb-1">SALES ORGANIZATION</span>
          <span className="text-white font-medium">50+ (36E · 9M · 3BM)</span>
        </div>
        <div>
          <span className="text-white/40 block mb-1">ENTERPRISE DEALS</span>
          <span className="text-white font-medium">Up to ₹96L (₹94L Upfront)</span>
        </div>
        <div>
          <span className="text-white/40 block mb-1">CUSTOMER RETENTION</span>
          <span className="text-white font-medium">65%+ YoY Predictable Renewals</span>
        </div>
      </div>
    </section>
  );
}
