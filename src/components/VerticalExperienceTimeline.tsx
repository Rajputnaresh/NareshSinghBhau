import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MilestoneRole {
  id: string;
  role: string;
  company: string;
  division?: string;
  location: string;
  period: string;
  duration: string;
  isCurrent?: boolean;
  headlineMetric: string;
  metricContext: string;
  promotionContext?: string;
  summary: string;
  milestones: {
    category: string;
    detail: string;
    metric?: string;
  }[];
  skills: string[];
  modalTarget?: 'P&L Metrics' | 'Track Record' | 'Leadership' | 'Experience';
}

const CAREER_TIMELINE: MilestoneRole[] = [
  {
    id: 'indiamart-rm',
    role: 'Regional Manager',
    company: 'IndiaMART InterMESH Ltd.',
    division: 'Regional Sales & Revenue Operations (Promoted from Branch Manager)',
    location: 'Jaipur, Rajasthan',
    period: 'Jul 2019 — Present (RM: 2022 — Present)',
    duration: '5+ Years at IndiaMART',
    isCurrent: true,
    headlineMetric: '₹3Cr+ / month',
    metricContext: 'Average Monthly Regional Revenue',
    promotionContext: 'Youngest Regional Manager in Jaipur (2022), promoted on one of the fastest growth tracks in the organisation.',
    summary:
      'Full regional P&L ownership across Jaipur and Rajasthan territories, managing ₹3 Cr average monthly regional revenue, delivering 18%+ YoY growth, and leading a 50+ member revenue engine across MSME and enterprise accounts.',
    milestones: [
      {
        category: '50+ Member Sales Leadership',
        detail: 'Direct leadership of 50+ member B2B sales organization (36 Executives, 9 Managers, 3 Branch Managers). Built strong leadership pipeline: 8 L1s promoted to leadership and 1 L2 to Branch Manager.',
        metric: '50+ Org (36E/9M/3BM)',
      },
      {
        category: 'P&L & Revenue Expansion',
        detail: 'Managed ₹3 Cr average monthly regional revenue, delivering 18%+ YoY growth while sustaining 65% customer retention across MSME and enterprise accounts. Owned P&L outcomes aligning topline with hiring, attrition control, and productivity.',
        metric: '18%+ YoY · 65% Ret',
      },
      {
        category: 'Big-Ticket Enterprise Deals',
        detail: 'Closed multi-million-rupee enterprise and B2B deals (up to ₹96 Lakhs) through consultative and solution-based selling, including landmark ₹94 Lakhs deal with 100% upfront payment.',
        metric: 'Up to ₹96L (₹94L Upfront)',
      },
      {
        category: 'New Market & Branch Expansion',
        detail: 'Launched new Jaipur Mansarovar branch (Dec 2024) to expand market coverage, reduce travel dependency, and improve overall field productivity. Drove data-led GTM dashboards tracking pipeline, revenue, renewals, and churn.',
        metric: 'Mansarovar (Dec 2024)',
      },
    ],
    skills: ['Regional P&L', 'Enterprise Sales', 'Consultative Selling', 'Dashboards & Telemetry', 'Team Building'],
    modalTarget: 'P&L Metrics',
  },
  {
    id: 'indiamart-bm',
    role: 'Branch Manager',
    company: 'IndiaMART InterMESH Ltd.',
    division: 'Territory Sales & Client Acquisition',
    location: 'Jaipur, Rajasthan',
    period: 'Jul 2019 — 2022',
    duration: '3 Years',
    headlineMetric: '6,000+ Accounts',
    metricContext: 'Paid B2B Accounts Scaled',
    promotionContext: '1.3× PCR Champion at IndiaMART, driving 2× branch revenue growth over 5 years.',
    summary:
      'Opened and scaled the Jaipur branch from scratch to 6,000+ paid B2B customer accounts, establishing commercial operations, hiring pipelines, and sustained retention.',
    milestones: [
      {
        category: 'Branch Incubation & Scale',
        detail: 'Opened and scaled the Jaipur branch to 6,000+ paid B2B accounts, driving 2× branch revenue growth through disciplined territory expansion and account acquisition.',
        metric: '6,000+ B2B Accounts',
      },
      {
        category: '1.3× PCR Champion Recognition',
        detail: 'Recognized as 1.3× PCR Champion at IndiaMART for sustained operational excellence and quota achievement across consecutive quarters.',
        metric: '1.3× PCR Champion',
      },
      {
        category: 'Predictable Renewals & Retention',
        detail: 'Sustained 65%+ customer retention YoY across MSME client cohorts, ensuring predictable renewal cash flows and long-term customer lifetime value.',
        metric: '65%+ Customer Retention',
      },
      {
        category: 'Rapid Leadership Track',
        detail: 'Achieved accelerated promotion to Regional Manager in 2022 on one of the fastest growth trajectories in the national organisation.',
        metric: 'Promoted to RM in 2022',
      },
    ],
    skills: ['Branch Scaling', 'MSME Customer Acquisition', 'Retention Architecture', 'Performance Management'],
    modalTarget: 'Track Record',
  },
  {
    id: 'byjus-sales',
    role: 'Senior Business Development Associate (Direct Sales)',
    company: "BYJU'S (Think & Learn Pvt Ltd)",
    division: 'Direct Sales · Prev: Business Development Associate - Tele Sales (May 2017 – Nov 2017)',
    location: 'Bengaluru, Karnataka',
    period: 'May 2017 — Jul 2019',
    duration: '2 Years 2 Months',
    headlineMetric: '₹1 Cr in 7 Months',
    metricContext: 'Direct Sales Revenue Generated',
    promotionContext: 'Secured permanent role at BYJU’S within 3 months, exceeding targets and closing ₹2L+ monthly revenue.',
    summary:
      'Managed full inside and direct sales cycles from prospecting to closure, delivering consultative selling and objection handling across high-intent prospects.',
    milestones: [
      {
        category: 'Top-Tier Revenue Generation',
        detail: 'Generated ₹1 Cr revenue in the first 7 months, achieving 35,000 WRPS (Weekly Revenue Productivity Score) and consistently exceeding monthly targets.',
        metric: '35,000 WRPS Target',
      },
      {
        category: 'Accelerated Role Conversion',
        detail: 'Converted from probation to permanent role within 3 months by consistently closing ₹2L+ monthly revenue with superior pitch quality.',
        metric: 'Permanent in 3 Months',
      },
      {
        category: 'Consultative Closing Velocity',
        detail: 'Managed end-to-end sales cycles from lead qualification to boardroom presentation and paid enrollment conversion.',
        metric: 'Full-Cycle Direct Sales',
      },
      {
        category: 'Frontline Rep Mentorship',
        detail: 'Mentored incoming cohort of BDAs on objection handling, discovery framework, and consultative negotiation, improving team conversion ratios.',
        metric: 'BDA Mentorship',
      },
    ],
    skills: ['Consultative Selling', 'Direct & Inside Sales', 'Objection Handling', 'Pipeline Velocity'],
    modalTarget: 'Experience',
  },
  {
    id: 'insight-alpha',
    role: 'Industry Expert (External)',
    company: 'Insight Alpha',
    division: 'B2B SaaS | Enterprise Sales | GTM | Revenue | P&L',
    location: 'Advisory / Global',
    period: 'Ongoing Strategic Advisory',
    duration: 'External Engagement',
    headlineMetric: 'Strategic Advisor',
    metricContext: 'B2B SaaS & Enterprise GTM Insights',
    summary:
      'Selected industry expert providing strategic commercial insights on B2B SaaS, enterprise sales motions, go-to-market strategies, revenue scaling, and regional P&L leadership.',
    milestones: [
      {
        category: 'B2B SaaS & Enterprise Strategy',
        detail: 'Deliver expert perspectives on enterprise sales cycles, GTM expansion, sales org structuring, and high-ticket customer acquisition.',
        metric: 'Enterprise GTM',
      },
      {
        category: 'Retention & P&L Governance',
        detail: 'Share operational frameworks on customer retention, churn mitigation, unit economics, and productivity-led profitability in emerging markets.',
        metric: 'P&L & Churn Defense',
      },
    ],
    skills: ['B2B SaaS', 'GTM Strategy', 'Revenue Scaling', 'Customer Retention', 'Regional P&L Leadership'],
    modalTarget: 'Leadership',
  },
  {
    id: 'education-credentials',
    role: 'BE – Civil Engineering',
    company: 'Chandigarh University',
    division: 'Schooling: 10th & 12th | Army Public School',
    location: 'Chandigarh / Mohali, India',
    period: 'Bachelor of Engineering',
    duration: 'Graduated',
    headlineMetric: 'BE – Civil Engg',
    metricContext: 'Chandigarh University · Army Public School',
    summary:
      'Engineering education and disciplined Army Public School upbringing providing analytical rigor, structural problem solving, and resilience that drive large-scale revenue operations.',
    milestones: [
      {
        category: 'Academic Foundation',
        detail: 'Bachelor of Engineering in Civil Engineering from Chandigarh University; established quantitative modeling, systems analysis, and structural execution skills.',
        metric: 'Chandigarh Univ',
      },
      {
        category: 'Foundational Discipline',
        detail: 'Completed 10th and 12th education at Army Public School, fostering leadership, discipline, adaptability, and high personal accountability.',
        metric: 'Army Public School',
      },
      {
        category: 'Global Mobility',
        detail: 'Open to pan-India and global leadership roles across in-office, hybrid, or remote operating models.',
        metric: 'Pan-India & Global',
      },
    ],
    skills: ['Systems Thinking', 'Quantitative Analysis', 'Executive Discipline', 'Adaptability'],
    modalTarget: 'Experience',
  },
];

interface VerticalExperienceTimelineProps {
  onSelectModal: (modal: 'P&L Metrics' | 'Track Record' | 'Leadership' | 'Experience') => void;
  theme?: 'deep-space' | 'slate';
}

export function VerticalExperienceTimeline({
  onSelectModal,
  theme = 'deep-space',
}: VerticalExperienceTimelineProps) {
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);
  const [pinnedRoleId, setPinnedRoleId] = useState<string | null>('indiamart-rm');
  const [expandAll, setExpandAll] = useState<boolean>(false);

  // Active role is either hovered or pinned
  const activeRoleId = hoveredRoleId || pinnedRoleId;

  return (
    <section id="experience-timeline" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 border-b border-white/10">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs uppercase tracking-widest text-white/50 font-mono font-medium">
              01 / AUTHENTIC CAREER CHRONICLE
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Professional Milestones
          </h2>
          <p className="text-sm text-white/60 mt-2 max-w-2xl font-normal">
            Verified career trajectory from official executive resume: IndiaMART, BYJU’S, Insight Alpha advisory, and academic credentials.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setExpandAll(!expandAll)}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
              expandAll
                ? 'bg-white text-black font-semibold border-white'
                : 'bg-white/[0.04] text-white/70 border-white/10 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            {expandAll ? 'Collapse Detail Cards' : 'Expand All Milestones'}
          </button>
          <a
            href="/resume/Naresh-Singh-Bhau-Resume.pdf"
            download="Naresh-Singh-Bhau-Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 text-black font-mono font-semibold text-xs hover:bg-amber-300 transition-colors"
          >
            <span>Official Resume (PDF)</span>
            <span>↓</span>
          </a>
        </div>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative">
        {/* Continuous Vertical Spine Line */}
        <div
          className="absolute left-4 sm:left-8 top-3 bottom-8 w-[2px]"
          style={{
            background:
              theme === 'slate'
                ? 'linear-gradient(to bottom, rgba(56, 189, 248, 0.8), rgba(255, 255, 255, 0.15) 80%, transparent)'
                : 'linear-gradient(to bottom, rgba(245, 158, 11, 0.9), rgba(255, 255, 255, 0.15) 80%, transparent)',
          }}
        />

        {/* ROLES LIST */}
        <div className="space-y-8 sm:space-y-10">
          {CAREER_TIMELINE.map((item, index) => {
            const isHovered = hoveredRoleId === item.id;
            const isPinned = pinnedRoleId === item.id;
            const isExpanded = expandAll || isHovered || isPinned;
            const isDimmed = !expandAll && activeRoleId !== null && activeRoleId !== item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredRoleId(item.id)}
                onMouseLeave={() => setHoveredRoleId(null)}
                onClick={() => setPinnedRoleId(item.id === pinnedRoleId ? null : item.id)}
                className={`relative pl-12 sm:pl-20 transition-all duration-300 group cursor-pointer ${
                  isDimmed ? 'opacity-40 hover:opacity-100' : 'opacity-100'
                }`}
              >
                {/* TIMELINE NODE DOT */}
                <div
                  className={`absolute left-4 sm:left-8 -translate-x-1/2 top-1.5 flex items-center justify-center transition-all duration-300 ${
                    item.isCurrent ? 'w-5 h-5' : 'w-4 h-4'
                  }`}
                >
                  {/* Outer pulse aura for current role or hovered role */}
                  {(item.isCurrent || isHovered) && (
                    <span
                      className={`absolute inset-0 rounded-full animate-ping opacity-40 ${
                        theme === 'slate' ? 'bg-sky-400' : 'bg-amber-400'
                      }`}
                    />
                  )}

                  {/* Main Node Ring */}
                  <div
                    className={`w-full h-full rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isExpanded
                        ? theme === 'slate'
                          ? 'border-sky-400 bg-sky-400 shadow-md shadow-sky-400/50 scale-125'
                          : 'border-amber-400 bg-amber-400 shadow-md shadow-amber-400/50 scale-125'
                        : item.isCurrent
                        ? 'border-amber-400 bg-black'
                        : 'border-white/40 bg-black group-hover:border-white'
                    }`}
                  >
                    {item.isCurrent && !isExpanded && (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </div>
                </div>

                {/* ROLE CARD */}
                <div
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                    isExpanded
                      ? theme === 'slate'
                        ? 'bg-slate-900/90 border-slate-700 shadow-2xl shadow-sky-500/5'
                        : 'bg-[#0f1015] border-white/20 shadow-2xl shadow-black/80'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Header Row: Dates & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 font-semibold">0{index + 1}</span>
                      <span className="text-white/30">/</span>
                      <span
                        className={`font-medium ${
                          item.isCurrent ? 'text-amber-400' : 'text-white/60'
                        }`}
                      >
                        {item.period}
                      </span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/40">{item.duration}</span>
                    </div>

                    {item.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-amber-400/10 text-amber-300 border border-amber-400/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Current Role · Jaipur
                      </span>
                    )}
                  </div>

                  {/* Title & Organization */}
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-amber-300 transition-colors">
                        {item.role}
                      </h3>
                      <div className="text-sm sm:text-base text-white/70 font-normal mt-0.5">
                        <span className="text-white font-medium">{item.company}</span>
                        {item.division && <span className="text-white/50"> · {item.division}</span>}
                        <span className="text-white/40 font-mono text-xs ml-2">({item.location})</span>
                      </div>
                    </div>

                    {/* Headline Metric Badge */}
                    <div className="self-start md:self-auto text-left md:text-right p-2.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/[0.04] border border-white/10">
                      <div className="text-lg sm:text-xl font-bold font-mono text-amber-300">
                        {item.headlineMetric}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider font-mono text-white/50">
                        {item.metricContext}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-white/80 leading-relaxed max-w-3xl mb-4">
                    {item.summary}
                  </p>

                  {/* Promotion context callout if present */}
                  {item.promotionContext && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-white/70">
                      <span className="text-amber-400">⚡</span>
                      <span>{item.promotionContext}</span>
                    </div>
                  )}

                  {/* HOVER-TRIGGERED ACCORDION / EXPANDABLE CONTENT */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden pt-4 mt-4 border-t border-white/10"
                      >
                        {/* Section Subheading */}
                        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 mb-3 flex items-center gap-1.5">
                          <span>Verified Resume Milestones</span>
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          <span className="text-white/40 text-[10px]">Direct from PDF Chronicle</span>
                        </div>

                        {/* Milestone Detailed Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                          {item.milestones.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                  <span className="text-xs font-semibold text-white tracking-wide">
                                    {m.category}
                                  </span>
                                  {m.metric && (
                                    <span className="text-[11px] font-mono text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                                      {m.metric}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed">
                                  {m.detail}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Skills and Tools Chips */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] font-mono text-white/40 mr-1">Domain Competencies:</span>
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-white/80"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Action Button: Opens Modal Dossier */}
                          {item.modalTarget && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.modalTarget) onSelectModal(item.modalTarget);
                              }}
                              className="text-xs font-mono font-medium text-amber-400 hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>Inspect {item.modalTarget} Dossier</span>
                              <span>↗</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Micro Hint when not expanded */}
                  {!isExpanded && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 pt-2 group-hover:text-white/70 transition-colors">
                      <span>Hover or click to inspect verified milestones & competencies</span>
                      <span>↓</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
