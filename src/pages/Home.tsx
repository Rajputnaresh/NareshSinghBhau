import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Phone, Mail, Linkedin, MapPin, Download, ArrowUpRight,
  TrendingUp, Users, Target, BadgeCheck, Briefcase,
  GraduationCap, Sparkles, ArrowRight, ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const RESUME_URL = './resume/Naresh-Singh-Bhau-Resume.pdf'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── DATA ───
const stats = [
  { label: 'Years in B2B Sales', value: '8+', icon: Briefcase },
  { label: 'Monthly Regional Revenue', value: '₹3Cr+', icon: TrendingUp },
  { label: 'YoY Revenue Growth', value: '18%+', icon: Target },
  { label: 'Team Led', value: '50+', icon: Users },
]

const skillsMarquee = [
  'Enterprise Sales', 'SaaS & B2B', 'Key Account Mgmt', 'Consultative Selling',
  'Regional P&L', 'GTM Strategy', 'Big-Ticket Deals', 'Revenue Leadership',
  'Customer Success', 'Team Building', 'Market Expansion', 'Data-Led GTM',
]

const experience = [
  {
    company: 'IndiaMART InterMESH Ltd',
    role: 'Regional Manager',
    sub: 'Promoted from Branch Manager',
    location: 'Jaipur, Rajasthan',
    period: 'Jul 2019 — Present',
    index: '01',
    highlights: [
      'Led a 50+ member B2B sales organisation — 36 Executives, 9 Managers, 3 Branch Managers — with 8 L1s promoted to leadership and 1 L2 to Branch Manager',
      'Managed ₹3Cr average monthly regional revenue, delivering 18%+ YoY growth while sustaining 65% customer retention across MSME & enterprise accounts',
      'Owned regional P&L outcomes — aligning topline growth with hiring strategy, attrition control, and productivity-led cost optimisation',
      'Closed multi-million-rupee deals up to ₹96 Lakhs through consultative, solution-based selling',
      'Launched the Jaipur Mansarovar branch (Dec 2024) to expand market coverage and lift field productivity',
      'Built data-led GTM dashboards tracking pipeline, revenue, productivity, renewals & churn',
    ],
  },
  {
    company: 'BYJU\'S · Think & Learn Pvt Ltd',
    role: 'Senior Business Development Associate',
    sub: 'Direct Sales · Bengaluru',
    location: 'Bengaluru, Karnataka',
    period: 'May 2017 — Jul 2019',
    index: '02',
    highlights: [
      'Managed full inside & direct sales cycles from prospecting to closure',
      'Generated ₹1Cr revenue in 7 months, achieving 35,000 WRPS and consistently exceeding targets',
      'Converted leads into paid enrolments through consultative selling and objection handling',
      'Mentored new BDAs, raising pitch quality and conversion ratios across the team',
    ],
  },
]

const achievements = [
  {
    title: '1.3× PCR Champion',
    desc: 'Drove 2× branch revenue growth at IndiaMART over 5 years.',
    tag: 'Performance',
    featured: true,
  },
  {
    title: '₹94 Lakh Deal',
    desc: 'Enterprise deal closed with 100% upfront payment.',
    tag: 'Deal',
    featured: true,
  },
  {
    title: 'Youngest RM — Jaipur',
    desc: 'Promoted 2022 on one of the fastest growth tracks in the organisation.',
    tag: 'Promotion',
  },
  {
    title: '65%+ Retention YoY',
    desc: 'Predictable renewals and long-term revenue stability.',
    tag: 'Retention',
  },
  {
    title: '6,000+ Paid Accounts',
    desc: 'Opened and scaled the Jaipur branch to 6,000+ paid B2B accounts.',
    tag: 'Growth',
  },
  {
    title: 'BYJU\'s in 3 Months',
    desc: 'Secured permanent role, closing ₹2L+ monthly revenue.',
    tag: 'Milestone',
  },
]

const competencies = [
  { skill: 'Sales & Revenue Leadership', note: 'Multi-level orgs, pipeline to close' },
  { skill: 'Enterprise & Key Account Management', note: 'Strategic accounts, long cycles' },
  { skill: 'Consultative & Solution Selling', note: 'Value-led, multi-stakeholder' },
  { skill: 'SaaS & B2B Sales', note: 'MSME + enterprise segments' },
  { skill: 'Big-Ticket Deal Closures', note: 'Multi-million-rupee negotiations' },
  { skill: 'Regional P&L Management', note: 'Growth, cost & retention' },
  { skill: 'Market Expansion & GTM Strategy', note: 'New branch & territory launches' },
  { skill: 'Team Building & Performance', note: 'Coaching, hiring, attrition' },
]

const education = [
  { degree: 'B.E. — Civil Engineering', school: 'Chandigarh University' },
  { degree: '10th & 12th', school: 'Army Public School' },
]

// ─── HELPERS ───
const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: EASE },
  }),
}

function SectionLabel({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-10 md:mb-14">
      <span className="font-mono text-xs tracking-[0.25em] text-primary/80">{num}</span>
      <span className="h-px w-10 bg-gradient-to-r from-primary/50 to-transparent" />
      <span className="text-sm text-muted-foreground tracking-wide uppercase">{children}</span>
    </div>
  )
}

function SectionHead({ title, lead }: { title: React.ReactNode; lead?: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.08]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-[65ch]">{lead}</p>
      )}
    </div>
  )
}

// ─── NAV ───
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const links = [
    { label: 'Experience', target: 'experience' },
    { label: 'Achievements', target: 'achievements' },
    { label: 'Capabilities', target: 'capabilities' },
    { label: 'Contact', target: 'contact' },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 backdrop-blur-xl bg-background/80 border-b border-border/50' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group"
          aria-label="Back to top"
        >
          <span className="w-9 h-9 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center group-hover:-rotate-6 transition-transform">
            NB
          </span>
          <span className="hidden sm:block text-left leading-tight">
            <span className="block font-semibold tracking-tight">Naresh Singh Bhau</span>
            <span className="block text-[11px] text-muted-foreground">B2B Revenue Leader</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {links.map((l) => (
            <button
              key={l.target}
              onClick={() => scrollTo(l.target)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <Button
          asChild
          className="rounded-full px-5 gap-2 h-9"
        >
          <a href={RESUME_URL} download="Naresh-Singh-Bhau-Resume.pdf">
            <Download className="w-4 h-4" /> Resume
          </a>
        </Button>
      </div>
    </motion.header>
  )
}

// ─── HERO ───
function Hero() {
  const reduce = useReducedMotion()
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24">
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute -top-32 -right-24 w-[42rem] h-[42rem] bg-primary/10 rounded-full blur-[140px]"
          style={reduce ? undefined : { animation: 'float 9s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 -left-32 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[120px]"
          style={reduce ? undefined : { animation: 'float 12s ease-in-out infinite reverse' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(220_15%_6%)_78%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-8 items-center w-full">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-primary" />
              </span>
              Open to pan-India & global roles · Office, hybrid or remote
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.04] mb-6"
          >
            Naresh <span className="text-gradient italic">Singh Bhau</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-8"
          >
            B2B revenue leader scaling MSME & enterprise sales teams — ₹3Cr+ monthly
            revenue, 18%+ YoY growth, multi-million-rupee deal closures, and regional
            P&amp;L ownership.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full px-7 h-12 gap-2 text-base">
              <a href={RESUME_URL} download="Naresh-Singh-Bhau-Resume.pdf">
                <Download className="w-5 h-5" /> Download Resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 gap-2 text-base border-white/15 bg-background/40 hover:bg-white/5"
              onClick={() => scrollTo('experience')}
            >
              View Experience <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground"
          >
            <a href="tel:+919901935806" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="w-4 h-4 text-primary" /> +91-9901 935 806
            </a>
            <a href="mailto:nareshbhau1993@gmail.com" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="w-4 h-4 text-primary" /> nareshbhau1993@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/nareshsinghbhau"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4 text-primary" /> LinkedIn
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Jaipur, Rajasthan
            </span>
          </motion.div>
        </div>

        {/* Visual: metric panel */}
        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="relative"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden glow-amber relative">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/15 blur-[70px]" aria-hidden />
            <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.07]">
              {stats.map((s) => (
                <div key={s.label} className="p-6 md:p-8">
                  <s.icon className="w-5 h-5 text-primary mb-3" />
                  <div className="font-display text-4xl md:text-[2.6rem] font-bold text-gradient leading-none mb-2">
                    {s.value}
                  </div>
                  <div className="text-sm text-muted-foreground leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/[0.07] px-6 py-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground inline-flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-primary" /> Insight Alpha — Industry Expert
              </span>
              <ArrowUpRight className="w-4 h-4 text-primary/70" />
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary/70" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── MARQUEE ───
function Marquee() {
  const reduce = useReducedMotion()
  const items = [...skillsMarquee, ...skillsMarquee]
  return (
    <section className="border-y border-white/[0.07] py-5 overflow-hidden" aria-hidden>
      <div
        className="flex gap-10 whitespace-nowrap w-max"
        style={
          reduce
            ? undefined
            : { animation: 'marquee 40s linear infinite' }
        }
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-10 text-sm text-muted-foreground">
            {item}
            <span className="text-primary/60">✳</span>
          </span>
        ))}
      </div>
    </section>
  )
}

// ─── ABOUT ───
function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.6fr] gap-12">
        <div className="lg:sticky lg:top-28 self-start">
          <SectionLabel num="01">Profile</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-[1.1]">
            The operator behind
            <br />
            the growth curve.
          </h2>
        </div>

        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p className="text-xl text-foreground/90">
            Revenue-focused B2B sales leader with{' '}
            <span className="text-foreground font-medium">8+ years</span> building and scaling
            MSME and enterprise sales teams across India.
          </p>
          <p>
            Proven track record of delivering <span className="text-foreground font-medium">18%+ YoY growth</span>,
            managing <span className="text-foreground font-medium">₹3Cr+ in monthly regional revenue</span>, closing
            multi-million-rupee deals, and launching new markets from the ground up.
          </p>
          <p>
            Hands-on regional <span className="text-foreground font-medium">P&amp;L ownership</span> — spanning revenue
            growth, cost optimisation, customer retention, and productivity-led profitability. Equally strong in
            consultative selling, key account management, customer success, and leadership development.
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="pt-6 grid sm:grid-cols-3 gap-4"
          >
            {[
              { k: '₹3 Cr+', v: 'monthly regional revenue managed' },
              { k: '2×', v: 'branch revenue growth (5 yrs)' },
              { k: '50+', v: 'sales professionals led' },
            ].map((m, i) => (
              <motion.div
                key={m.k}
                custom={i}
                variants={reveal}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
              >
                <div className="font-display text-2xl font-bold text-gradient mb-1">{m.k}</div>
                <div className="text-sm text-muted-foreground leading-snug">{m.v}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── STATS: metric wall (plain, typographic) ───
function MetricWall() {
  return (
    <section aria-label="Metric highlights" className="border-y border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-white/[0.07]">
        {[
          ['₹3Cr+', 'average monthly regional revenue', 'managed at IndiaMART'],
          ['18%+', 'YoY revenue growth', 'delivered consistently'],
          ['₹96 L', 'largest single B2B deal', 'multi-million-rupee, consultative'],
          ['65%+', 'customer retention', 'predictable renewals YoY'],
          ['6,000+', 'paid B2B accounts', 'opened & scaled in Jaipur'],
        ].map(([n, l, d], i) => (
          <motion.div
            key={n}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            custom={i}
            variants={reveal}
            className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-10 items-baseline py-8 md:py-10 group"
          >
            <div className="font-mono text-3xl md:text-4xl font-semibold text-gradient tracking-tight group-hover:translate-x-1 transition-transform">
              {n}
            </div>
            <div>
              <div className="text-foreground/90 text-lg font-medium mb-1">{l}</div>
              <div className="text-muted-foreground">{d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── EXPERIENCE (timeline) ───
function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          title={<>From direct sales to regional P&amp;L ownership.</>}
          lead="A proven track record of turning sales teams into revenue engines — and sales leaders into managers."
        />

        <div className="relative">
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent"
            aria-hidden
          />
          <div className="space-y-14 md:space-y-20">
            {experience.map((exp, i) => (
              <motion.article
                key={exp.company}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-100px' }}
                custom={i}
                variants={reveal}
                className={`relative grid md:grid-cols-2 gap-4 md:gap-0 ${
                  i % 2 === 1 ? '' : ''
                }`}
              >
                <span
                  className="absolute left-5 md:left-1/2 -translate-x-1/2 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background"
                  aria-hidden
                />
                <div className={i % 2 === 0 ? 'pl-12 md:pl-0 md:pr-16 md:text-right' : 'pl-12 md:pl-16 md:col-start-2'}>
                  <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-primary mb-3">
                    {exp.index}
                    <span className="h-px w-8 bg-primary/40" />
                    {exp.period}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-1">
                    {exp.company}
                  </h3>
                  <p className="text-primary font-medium mb-1 mt-2">
                    {exp.role} <span className="text-muted-foreground font-normal">· {exp.sub}</span>
                  </p>
                  <p className="text-muted-foreground text-sm mb-5 inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {exp.location}
                  </p>
                </div>

                <div className={i % 2 === 0 ? 'pl-12 md:pl-0 md:col-start-2' : 'pl-12 md:pl-0 md:row-start-1 md:pr-16 md:text-right'}>
                  <ul className={`space-y-3 ${
                    i % 2 === 1 ? 'md:flex md:flex-col md:items-end' : ''
                  }`}>
                    {exp.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="flex items-start gap-3 text-muted-foreground text-[15px] leading-relaxed"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full bg-primary/70 mt-2.5 shrink-0 ${
                            i % 2 === 1 ? 'md:order-2' : ''
                          }`}
                        />
                        <span className={i % 2 === 1 ? 'md:text-right' : ''}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ACHIEVEMENTS (bento, asymmetric) ───
function FeaturedTile({ a, large }: { a: (typeof achievements)[number]; large?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={reveal}
      className={`relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 to-transparent p-8 flex flex-col justify-end group ${
        large ? 'md:col-span-2 md:row-span-2' : 'md:min-h-[168px]'
      }`}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/15 blur-[60px] group-hover:scale-150 transition-transform duration-700" aria-hidden />
      <span className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-6">
        <Sparkles className="w-5 h-5" />
      </span>
      <span className="inline-flex w-fit px-3 py-1 rounded-full bg-background/60 border border-white/10 text-[11px] text-muted-foreground uppercase tracking-wider mb-3">
        {a.tag}
      </span>
      <h3 className={`font-display font-bold tracking-tight mb-2 ${large ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
        {a.title}
      </h3>
      <p className="text-muted-foreground max-w-md leading-relaxed">{a.desc}</p>
    </motion.div>
  )
}

function SmallTile({ a }: { a: (typeof achievements)[number] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={reveal}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 flex items-start gap-4 group hover:border-primary/30 hover:bg-white/[0.04] transition-all"
    >
      <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <BadgeCheck className="w-5 h-5" />
      </span>
      <div>
        <div className="font-display text-xl font-bold tracking-tight mb-1">{a.title}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
      </div>
    </motion.div>
  )
}

function Achievements() {
  const [big, f2] = achievements.filter((a) => a.featured)
  const [r0, ...bottom] = achievements.filter((a) => !a.featured)
  return (
    <section id="achievements" className="py-24 md:py-32 bg-white/[0.015] border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel num="02">Track Record</SectionLabel>
        <div className="mb-14">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.08]">
            Proof, not promises.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          <FeaturedTile a={big} large />
          <FeaturedTile a={f2} />
          <SmallTile a={r0} />
          {bottom.map((a) => (
            <SmallTile key={a.title} a={a} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CAPABILITIES (numbered list) ───
function Capabilities() {
  return (
    <section id="capabilities" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.8fr] gap-12">
        <div className="lg:sticky lg:top-28 self-start">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] mb-6">
            How I drive revenue — end to end.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            A full-stack sales-operating capability — from front-line deal execution to P&amp;L,
            hiring, and go-to-market strategy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-0">
          {competencies.map((c, i) => (
            <motion.div
              key={c.skill}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
              variants={reveal}
              className="border-t border-white/[0.08] py-6 group"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-primary/60">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors mb-1">
                    {c.skill}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── INDUSTRY EXPERT (full-width band) ───
function IndustryExpert() {
  return (
    <section className="relative overflow-hidden border-y border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" aria-hidden />
      <div className="absolute -top-20 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[90px]" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 grid lg:grid-cols-[auto_1fr] gap-10 items-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center glow-amber shrink-0">
          <Sparkles className="w-10 h-10" />
        </div>
        <div>
          <span className="font-mono text-xs tracking-[0.25em] text-primary mb-4 block">
            SELECTED INDUSTRY EXPERT · INSIGHT ALPHA
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.08] mb-6">
            Selected to advise on B2B SaaS &amp; revenue.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Providing strategic insights on enterprise sales, go-to-market strategy, revenue scaling,
            customer acquisition &amp; retention, and regional P&amp;L leadership.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── EDUCATION ───
function Education() {
  return (
    <section className="py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel num="03">Foundation</SectionLabel>
        <SectionHead title={<>Education &amp; background.</>} />
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
              variants={reveal}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 md:p-9 flex items-start gap-5 hover:border-primary/30 transition-all group"
            >
              <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight mb-1">{e.degree}</h3>
                <p className="text-muted-foreground">{e.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT / FOOTER ───
function Contact() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer id="contact" className="relative border-t border-white/[0.07] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsla(38,92%,50%,0.08),transparent_60%)]" aria-hidden />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 md:py-32 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={reveal}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            Let's build your next
            <br />
            <span className="text-gradient italic">revenue milestone.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Open to pan-India and global roles — office, hybrid, or remote.
            Ready when you are.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button asChild size="lg" className="rounded-full px-7 h-12 gap-2 text-base">
              <a href={RESUME_URL} download="Naresh-Singh-Bhau-Resume.pdf">
                <Download className="w-5 h-5" /> Download Resume
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 gap-2 text-base border-white/15 hover:bg-white/5"
            >
              <a href="mailto:nareshbhau1993@gmail.com">
                <Mail className="w-5 h-5" /> Email Me
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm">
            <a href="tel:+919901935806" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4 text-primary" /> +91-9901 935 806
            </a>
            <a href="mailto:nareshbhau1993@gmail.com" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4 text-primary" /> nareshbhau1993@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/nareshsinghbhau"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4 text-primary" /> LinkedIn
            </a>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" /> Jaipur, Rajasthan
            </span>
          </div>

          <div className="mt-14 pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Naresh Singh Bhau. All rights reserved.</span>
            <span className="font-mono tracking-wide">BUILT TO CONVERT · LIKE THE DEALS I CLOSE</span>
          </div>
        </motion.div>
      </div>

      {showTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-50"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </footer>
  )
}

// ─── PAGE ───
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <MetricWall />
      <Experience />
      <Achievements />
      <Capabilities />
      <IndustryExpert />
      <Education />
      <Contact />
    </div>
  )
}